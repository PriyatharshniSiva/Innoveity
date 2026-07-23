import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, organization, type, message } = data;

    // 1. Send Email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const formatType = (str: string) => {
      if (!str) return 'N/A';
      return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const displayType = formatType(type);

    const mailOptions = {
      from: `"Innoveity" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Notify the site owner
      replyTo: email,
      subject: `New Inquiry: ${displayType} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 20px; color: #334155; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .header { background-color: #185D46; color: #ffffff; padding: 30px 40px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
            .content { padding: 40px; }
            .badge { display: inline-block; background-color: #ecfdf5; color: #059669; padding: 6px 12px; border-radius: 999px; font-size: 14px; font-weight: 600; border: 1px solid #a7f3d0; margin-bottom: 24px; }
            .table { width: 100%; border-collapse: collapse; }
            .table td { padding: 16px 0; border-bottom: 1px solid #f1f5f9; }
            .table tr:last-child td { border-bottom: none; }
            .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; font-weight: 700; margin-bottom: 4px; display: block; }
            .value { font-size: 16px; color: #0f172a; font-weight: 500; }
            .value a { color: #2563eb; text-decoration: none; }
            .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; margin-top: 32px; }
            .message-text { font-size: 15px; line-height: 1.6; color: #334155; margin: 0; white-space: pre-wrap; }
            .footer { background-color: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 13px; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Innoveity Contact Request</h1>
            </div>
            <div class="content">
              <div style="text-align: center;">
                <span class="badge">${displayType}</span>
              </div>
              
              <table class="table">
                <tr>
                  <td>
                    <span class="label">Full Name</span>
                    <span class="value">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="label">Email Address</span>
                    <span class="value"><a href="mailto:${email}">${email}</a></span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="label">Phone Number</span>
                    <span class="value">${phone || '<span style="color: #cbd5e1; font-style: italic;">Not provided</span>'}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="label">Organization</span>
                    <span class="value">${organization || '<span style="color: #cbd5e1; font-style: italic;">Not provided</span>'}</span>
                  </td>
                </tr>
              </table>

              <div class="message-box">
                <span class="label" style="margin-bottom: 12px;">Message</span>
                <p class="message-text">${message || '<span style="color: #cbd5e1; font-style: italic;">No message provided</span>'}</p>
              </div>
            </div>
            <div class="footer">
              This email was automatically generated from your website's contact form.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 2. Save to Database (Admin Panel Enquiries)
    try {
      const contactContent = await prisma.contactContent.findUnique({
        where: { id: 1 },
      });

      if (contactContent) {
        const contentData = JSON.parse(contactContent.contentJson);
        const newEnquiry = {
          id: Date.now().toString(),
          name,
          email,
          phone: phone || '',
          organization: organization || '',
          type,
          message,
          date: new Date().toISOString().split('T')[0],
          status: 'Unread',
        };

        if (!contentData.enquiries) {
          contentData.enquiries = [];
        }
        
        contentData.enquiries.unshift(newEnquiry); // Add to beginning of array

        await prisma.contactContent.update({
          where: { id: 1 },
          data: {
            contentJson: JSON.stringify(contentData),
          },
        });
      }
    } catch (dbError) {
      console.error("Failed to save enquiry to database:", dbError);
      // Even if DB fails, if email succeeds we return success
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
