import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Escape HTML to prevent XSS
    const escapeHtml = (unsafe: string) => {
      return (unsafe || '').replace(/[&<"'>]/g, function (match) {
        switch (match) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&#39;';
          default: return match;
        }
      });
    };

    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const phone = escapeHtml(data.phone);
    const organization = escapeHtml(data.organization);
    const type = escapeHtml(data.type);
    const message = escapeHtml(data.message);

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
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; margin: 0; padding: 40px 20px; color: #1e293b; }
            .wrapper { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0; }
            .header { background: linear-gradient(135deg, #185D46 0%, #0f3d2e 100%); padding: 40px 30px 60px; text-align: center; }
            .header-logo { font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 8px; }
            .header-logo span { color: #F59E0B; }
            .header-title { color: #e2e8f0; font-size: 15px; font-weight: 500; margin: 0; letter-spacing: 0.5px; }
            
            .content { padding: 0 40px 40px; background-color: #ffffff; }
            
            .badge-container { text-align: center; margin-top: -20px; margin-bottom: 30px; }
            .badge { display: inline-block; background-color: #ffffff; color: #185D46; padding: 8px 24px; border-radius: 30px; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
            
            .greeting { font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 24px; text-align: center; }
            
            .details-card { background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px solid #e2e8f0; }
            .table { width: 100%; border-collapse: collapse; }
            .table td { padding: 12px 0; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
            .table tr:last-child td { border-bottom: none; padding-bottom: 0; }
            .table tr:first-child td { padding-top: 0; }
            
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; display: block; margin-bottom: 4px; }
            .value { font-size: 15px; color: #0f172a; font-weight: 600; line-height: 1.4; }
            .value a { color: #185D46; text-decoration: none; border-bottom: 1px solid #185D46; padding-bottom: 1px; }
            
            .message-container { margin-top: 30px; }
            .message-header { margin-bottom: 12px; }
            .message-header h3 { margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700; }
            .message-box { background-color: #ffffff; border-left: 4px solid #F59E0B; padding: 24px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.03); border: 1px solid #e2e8f0; border-left-width: 4px; }
            .message-text { font-size: 15px; line-height: 1.7; color: #334155; margin: 0; white-space: pre-wrap; font-style: italic; }
            
            .footer { background-color: #f1f5f9; padding: 24px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; }
            .footer p { margin: 0; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <div class="header-logo">INNOVEITY</div>
              <p class="header-title">New Contact Inquiry Received</p>
            </div>
            
            <div class="content">
              <div class="badge-container">
                <span class="badge">${displayType}</span>
              </div>
              
              <h2 class="greeting">You have a new message from ${name}!</h2>
              
              <div class="details-card">
                <table class="table">
                  <tr>
                    <td width="50%">
                      <span class="label">Full Name</span>
                      <span class="value">${name}</span>
                    </td>
                    <td width="50%">
                      <span class="label">Email Address</span>
                      <span class="value"><a href="mailto:${email}">${email}</a></span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 24px;">
                      <span class="label">Phone Number</span>
                      <span class="value">${phone || '<span style="color: #94a3b8; font-weight: 400; font-style: italic;">Not provided</span>'}</span>
                    </td>
                    <td style="padding-top: 24px;">
                      <span class="label">Organization</span>
                      <span class="value">${organization || '<span style="color: #94a3b8; font-weight: 400; font-style: italic;">Not provided</span>'}</span>
                    </td>
                  </tr>
                </table>
              </div>
              
              <div class="message-container">
                <div class="message-header">
                  <h3>Message Contents</h3>
                </div>
                <div class="message-box">
                  <p class="message-text">"${message || '<span style="color: #94a3b8; font-style: normal;">No message provided</span>'}"</p>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <p>This is an automated notification from your Innoveity website.</p>
              <p style="margin-top: 8px;">Please do not reply directly to this system email, click the email address above to reply.</p>
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
