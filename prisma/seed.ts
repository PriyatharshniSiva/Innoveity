const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed KnowledgeArticles
  const knowledgeArticles = [
    {
      title: "Top 5 Skills Students Need in 2025",
      desc: "Explore the most in-demand skills that will define career success in the coming years.",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
      level: "SKILLS",
      nextBatch: "1/15/2024",
      instructor: "Dr. Priya Sharma"
    },
    {
      title: "Digital Transformation in Indian Education",
      desc: "How technology is reshaping the educational landscape across India.",
      image: "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800",
      level: "TECHNOLOGY",
      nextBatch: "1/10/2024",
      instructor: "Rajesh Kumar"
    },
    {
      title: "Sustainable Business Practices: A Corporate Guide",
      desc: "Essential ESG practices every business should implement for long-term success.",
      image: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=800",
      level: "SUSTAINABILITY",
      nextBatch: "1/5/2024",
      instructor: "Anita Desai"
    },
    {
      title: "Industry 4.0: Preparing the Workforce",
      desc: "Understanding the skills gap and how educational institutions can bridge it.",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      level: "INDUSTRY",
      nextBatch: "12/28/2023",
      instructor: "Vikram Singh"
    },
    {
      title: "Building Resilient Learning Communities",
      desc: "Strategies for creating adaptive and supportive educational environments.",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      level: "SKILLS",
      nextBatch: "12/20/2023",
      instructor: "Meera Patel"
    },
    {
      title: "Green Technology Adoption in Corporations",
      desc: "Case studies of successful green technology implementations in Indian companies.",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
      level: "SUSTAINABILITY",
      nextBatch: "12/15/2023",
      instructor: "Arjun Reddy"
    }
  ];

  for (const article of knowledgeArticles) {
    await prisma.knowledgeArticle.create({ data: article });
  }

  // 2. Seed Courses
  const courses = [
    {
      title: "ME in Industrial Safety Engineering",
      desc: "Master of Engineering in Industrial Safety Engineering. AICTE affiliated degree program focusing on workplace safety, risk assessment, and...",
      duration: "2 years",
      mode: "On-Campus / Hybrid",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.8",
      studentsEnrolled: "450",
      level: "Advanced",
      nextBatch: "July 2025",
      instructor: "Dr. Rajesh Kumar, Safety Engineering Expert",
      features: JSON.stringify([
        "Risk Assessment & Management",
        "Safety Engineering Principles",
        "Industrial Hygiene",
        "Safety Management Systems",
        "Accident Investigation",
        "Safety Auditing"
      ]),
      certification: "Upon successful completion, you'll receive an AICTE affiliated certificate that is recognized across industries in India. This certification validates your skills and enhances your professional credibility in the job market."
    },
    {
      title: "ME in Environmental Sustainability",
      desc: "Master of Engineering in Environmental Sustainability. AICTE affiliated program focusing on sustainable development, environmental management, and green technologies.",
      duration: "2 years",
      mode: "On-Campus / Hybrid",
      image: "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.6",
      studentsEnrolled: "380",
      level: "Advanced",
      nextBatch: "July 2025",
      instructor: "Dr. Ananya Patel, Environmental Engineer",
      features: JSON.stringify([
        "Environmental Impact Assessment",
        "Sustainable Design",
        "Green Technologies",
        "Climate Change Mitigation",
        "Waste Management",
        "Renewable Energy Systems"
      ]),
      certification: "Upon successful completion, you'll receive an AICTE affiliated certificate that is recognized across industries in India. This certification validates your skills and enhances your professional credibility in the job market."
    },
    {
      title: "Industrial Safety Management",
      desc: "Comprehensive safety management program for industrial professionals. Learn to implement effective safety protocols and manage workplace hazards.",
      duration: "6 months",
      mode: "On-site / Online",
      image: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.7",
      studentsEnrolled: "320",
      level: "Intermediate",
      nextBatch: "February 2025",
      instructor: "Mr. K. Srinivasan, HSE Lead Auditor",
      features: JSON.stringify([
        "Hazard Identification",
        "OSHA Standards compliance",
        "Emergency Response Planning",
        "First Aid & CPR Training",
        "PPE Management",
        "Safety Inspection Methods"
      ]),
      certification: "Upon successful completion, you'll receive an industry-recognized certificate in Industrial Safety Management that is accredited and accepted globally."
    },
    {
      title: "Fire Safety & Emergency Response",
      desc: "Specialized program covering fire safety principles, emergency response procedures, and fire prevention strategies for industrial environments.",
      duration: "3 months",
      mode: "On-site / Online",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.6",
      studentsEnrolled: "280",
      level: "Intermediate",
      nextBatch: "March 2025",
      instructor: "Capt. Vijay Anand, Fire Safety Veteran",
      features: JSON.stringify([
        "Fire Behavior & Dynamics",
        "Suppression Systems",
        "Evacuation Simulation",
        "Hazardous Material Handling",
        "Industrial Fire Drills",
        "Risk Minimization Coding"
      ]),
      certification: "Upon successful completion, you'll receive a professional certification in Fire Safety and Emergency Response, validating your competency in fire prevention and safety drills."
    },
    {
      title: "Time Management for Industrial Professionals",
      desc: "Essential time management skills tailored for industrial and manufacturing environments. Learn to optimize productivity and manage work priorities...",
      duration: "1 month",
      mode: "On-site / Hybrid",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.5",
      studentsEnrolled: "450",
      level: "Beginner",
      nextBatch: "January 2025",
      instructor: "Ms. Sunita Rao, Productivity Coach",
      features: JSON.stringify([
        "Time Blocking",
        "Prioritization Matrices",
        "Shift Schedule Optimization",
        "Meeting Efficiency",
        "Task Delegation",
        "Stress Management"
      ]),
      certification: "Upon successful completion, you'll receive a professional certification in Industrial Time Management, validating your productivity skills."
    },
    {
      title: "Advanced ESG Reporting Frameworks",
      desc: "Master the complexities of ESG reporting. Learn to create comprehensive sustainability reports aligned with global frameworks and standards.",
      duration: "4 months",
      mode: "Online",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.9",
      studentsEnrolled: "210",
      level: "Advanced",
      nextBatch: "April 2025",
      instructor: "Dr. Vikram Seth, ESG Consultant",
      features: JSON.stringify([
        "GRI Standards",
        "SASB Framework",
        "TCFD Recommendations",
        "Data Collection & Verification",
        "Stakeholder Engagement",
        "Impact Measurement"
      ]),
      certification: "Upon successful completion, you'll receive a professional certification in ESG Reporting Frameworks, establishing your expertise in sustainability disclosures."
    }
  ];

  for (const course of courses) {
    await prisma.course.create({ data: course });
  }

  // 3. Seed Case Studies
  const caseStudies = [
    {
      type: "Educational Institution",
      title: "Transforming Engineering Education at a Partner Institution",
      challenge: "How we helped Educational Institution to enhance their curriculum and improve student placement rates by 85%.",
      solution: "Implemented an end-to-end placement training program for students combined with AICTE-recognized faculty development workshops.",
      quote: "INNOVEITY's comprehensive faculty development program revolutionized our teaching methodologies. Our students are now industry-ready from day one.",
      quoteAuthor: "Director, Partner Institution",
      results: JSON.stringify([
        { stat: "85%", label: "increase in placement rates" },
        { stat: "40+", label: "industry partnerships" },
        { stat: "500+", label: "students trained" },
      ]),
      videoId: "4jwBt2ZUuRc",
      accentColor: "#185D46",
    },
    {
      type: "Corporate ESG",
      title: "Corporate ESG Transformation for a Tech Partner",
      challenge: "Implemented comprehensive ESG practices leading to improved sustainability metrics and stakeholder satisfaction.",
      solution: "Delivered end-to-end ESG framework implementation including carbon footprint analysis, sustainability reporting, and CSR-compliant training programs.",
      quote: "The ESG consulting provided by INNOVEITY helped us achieve carbon neutrality ahead of schedule while improving employee satisfaction scores.",
      quoteAuthor: "VP of Sustainability, Tech Partner",
      results: JSON.stringify([
        { stat: "50%", label: "reduction in carbon footprint" },
        { stat: "95%", label: "employee satisfaction" },
        { stat: "ISO", label: "14001 certification achieved" },
      ]),
      videoId: "4jwBt2ZUuRc",
      accentColor: "#185D46",
    },
    {
      type: "Corporate Training",
      title: "Training Excellence Program at Corporate Partner",
      challenge: "Comprehensive training program that enhanced workforce capabilities and operational efficiency.",
      solution: "Designed and delivered a scalable training framework with measurable outcomes across all business units.",
      quote: "This program transformed our team's capabilities and significantly improved our productivity and innovation metrics.",
      quoteAuthor: "L&D Head, Corporate Partner",
      results: JSON.stringify([
        { stat: "2000+", label: "individuals trained" },
        { stat: "60%", label: "efficiency increase" },
        { stat: "95%", label: "satisfaction rating" },
      ]),
      videoId: "4jwBt2ZUuRc",
      accentColor: "#F59E0B",
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.create({ data: cs });
  }

  // 4. Seed Testimonials (Partner Quotes)
  const testimonials = [
    {
      quote: "INNOVEITY's comprehensive faculty development program revolutionized our teaching methodologies. Our students are now industry-ready from day one.",
      author: "Director, Partner Institution",
    },
    {
      quote: "The ESG consulting provided by INNOVEITY helped us achieve carbon neutrality ahead of schedule while improving employee satisfaction scores.",
      author: "VP of Sustainability, Manufacturing Partner",
    },
    {
      quote: "This program transformed our team's capabilities and significantly improved our productivity and innovation metrics.",
      author: "L&D Head, BFSI Client",
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
