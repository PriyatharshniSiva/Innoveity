"use client";

import React, { createContext, useContext, useState } from "react";

interface HeroState {
  titleLine1: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  backgroundImage: string;
}

interface StatItem {
  id: string;
  label: string;
  value: string;
  iconName: string;
}

interface CorporateHighlightsState {
  title: string;
  description: string;
  highlightsList: { id: string; text: string }[];
}

interface FaqItem {
  id: string;
  question: string;
  mainAnswer: string;
  detailedExplanation: string;
}

interface FeaturedServiceItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  badge: string;
  image: string;
}

interface FeaturedServicesState {
  title: string;
  subtitle: string;
  servicesList: FeaturedServiceItem[];
}

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  date: string;
}

interface TestimonialsState {
  title: string;
  subtitle: string;
  list: TestimonialItem[];
}

interface OurServicesItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface OurServicesState {
  title: string;
  subtitle: string;
  backgroundColor: string;
  list: OurServicesItem[];
}

interface OurPresenceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface OurPresenceState {
  title: string;
  subtitle: string;
  mapImage: string;
  list: OurPresenceItem[];
}

interface OverviewDivisionCard {
  id: string;
  badge: string;
  title: string;
  text: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  iconPath: string;
}

interface OverviewWhyChooseItem {
  id: string;
  text: string;
}

interface OverviewCoreDetail {
  id: string;
  title: string;
  text: string;
  icon: string;
  color: string;
  bg: string;
}

interface EdukaOverviewState {
  heroTitle1: string;
  heroHighlight: string;
  heroTitle2: string;
  heroDescription: string;
  divisionCards: OverviewDivisionCard[];
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyChooseItems: OverviewWhyChooseItem[];
  coreDetails: OverviewCoreDetail[];
  contactTitle: string;
  contactDescription: string;
}

interface HomeManagementContextType {
  hero: HeroState;
  setHero: React.Dispatch<React.SetStateAction<HeroState>>;
  stats: StatItem[];
  setStats: React.Dispatch<React.SetStateAction<StatItem[]>>;
  corporateHighlights: CorporateHighlightsState;
  setCorporateHighlights: React.Dispatch<React.SetStateAction<CorporateHighlightsState>>;
  featuredServices: FeaturedServicesState;
  setFeaturedServices: React.Dispatch<React.SetStateAction<FeaturedServicesState>>;
  faqs: FaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>;
  testimonials: TestimonialsState;
  setTestimonials: React.Dispatch<React.SetStateAction<TestimonialsState>>;
  ourServices: OurServicesState;
  setOurServices: React.Dispatch<React.SetStateAction<OurServicesState>>;
  ourPresence: OurPresenceState;
  setOurPresence: React.Dispatch<React.SetStateAction<OurPresenceState>>;
  edukaOverview: EdukaOverviewState;
  setEdukaOverview: React.Dispatch<React.SetStateAction<EdukaOverviewState>>;
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: HomeManagementContextType = {
  hero: {
    titleLine1: "Bridging Education",
    titleHighlight: "↔ Industry Future",
    description: "Transforming education through innovative solutions, corporate training, and sustainable development initiatives across India.",
    primaryButtonText: "About Us",
    secondaryButtonText: "Learn More",
    backgroundImage: "/inv1.jpg"
  },
  setHero: () => {},
  stats: [
    { id: "1", label: "Minds Stimulated", value: "50,000+", iconName: "Users" },
    { id: "2", label: "Corporate Clients", value: "120+", iconName: "Briefcase" },
    { id: "3", label: "Institutions Partnered", value: "35+", iconName: "Building" },
    { id: "4", label: "Google Rating", value: "4.8", iconName: "Star" }
  ],
  setStats: () => {},
  corporateHighlights: {
    title: "Leading Corporate Training & College Development Partner in Tamil Nadu",
    description: "INNOVEITY transforms institutions and organizations through proven training solutions. We've achieved 85% average placement improvement across 50+ engineering colleges and trained 2000+ students annually in Chennai, Coimbatore, Madurai, and throughout Tamil Nadu.",
    highlightsList: [
      { id: "1", text: "85% average placement improvement for engineering colleges" },
      { id: "2", text: "2000+ students trained annually with industry-relevant skills" },
      { id: "3", text: "50+ Tamil Nadu colleges and universities as active partners" },
      { id: "4", text: "AICTE-recognized faculty development programs aligned with NEP 2020" },
      { id: "5", text: "ISO-certified trainers with 15+ years of industry experience" },
      { id: "6", text: "Flexible delivery: on-site, online, or hybrid training models" },
      { id: "7", text: "Bilingual training capability in English and Tamil" },
      { id: "8", text: "ROI guarantee: 200-300% for corporate L&D programs" }
    ]
  },
  setCorporateHighlights: () => {},
  featuredServices: {
    title: "Our Impact in Action",
    subtitle: "Witness the transformation we bring to educational institutions and industries",
    servicesList: [
      {
        id: "1",
        category: "Change Management Classes",
        title: "Change Management Classes",
        desc: "Empowering organizations to navigate transformation effectively",
        badge: "Leadership",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "2",
        category: "Faculty Development",
        title: "Faculty Development",
        desc: "Enhancing teaching capabilities with modern methodologies and industry insights",
        badge: "Education",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "3",
        category: "Corporate Training",
        title: "Corporate Training",
        desc: "Comprehensive skill development programs for industry professionals",
        badge: "Enterprise",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  setFeaturedServices: () => {},
  faqs: [
    {
      id: "1",
      question: "What makes INNOVEITY different from other training providers in Tamil Nadu?",
      mainAnswer: "INNOVEITY delivers measurable results with an 85% average placement improvement rate across 50+ partner institutions. We combine AICTE-recognized programs, ISO-certified trainers, and flexible bilingual delivery (Tamil and English) with outcome-based pricing models that guarantee ROI.",
      detailedExplanation: "Our comprehensive approach includes pre-training assessments, customized curriculum design, hands-on delivery, post-training support, and transparent ROI tracking using Kirkpatrick's evaluation model. We maintain local presence across Chennai, Coimbatore, and Madurai for rapid deployment within 48-72 hours."
    },
    {
      id: "2",
      question: "How does INNOVEITY improve college placement rates?",
      mainAnswer: "We provide end-to-end placement enhancement including aptitude coaching, technical upskilling, soft skills development, mock interviews, resume building, and direct industry connections. Our programs have achieved 60-85% placement improvement across engineering colleges in Tamil Nadu.",
      detailedExplanation: "Each program includes baseline assessment, gap analysis, customized training modules, regular progress tracking, industry exposure through guest lectures and company visits, and post-placement support. Our success rate is backed by verifiable data from 50+ partner institutions."
    },
    {
      id: "3",
      question: "What corporate training services does INNOVEITY offer in Chennai?",
      mainAnswer: "INNOVEITY offers comprehensive L&D solutions including leadership development, behavioral training, technical skills enhancement, ESG consulting, digital transformation programs, and customized workshops. All programs include ROI measurement, post-training support, and flexible delivery options.",
      detailedExplanation: "We serve manufacturing, IT, healthcare, BFSI, and other sectors across Tamil Nadu. Programs can be delivered on-site at your Chennai, Coimbatore, or Madurai offices, online via virtual sessions, or through hybrid formats. Enterprise discounts available for annual partnerships and bulk bookings."
    }
  ],
  setFaqs: () => {},
  testimonials: {
    title: "What Our Clients Say",
    subtitle: "Real reviews from our valued partners and clients who have experienced the INNOVEITY difference.",
    list: [
      {
        id: "1",
        quote: "Exceptional training programs! INNOVEITY transformed our organization with their innovative approach to skill development. Highly recommended for corporate training.",
        name: "Rajesh Kumar",
        date: "Verified August 15, 2024"
      },
      {
        id: "2",
        quote: "Outstanding ESG consulting services. Their tree plantation initiative helped us achieve our sustainability goals effectively. Professional and impactful work.",
        name: "Priya Sharma",
        date: "Verified Jul 2024"
      },
      {
        id: "3",
        quote: "Excellent leadership development programs. The training methodology is innovative and results-oriented. Our team's performance improved significantly.",
        name: "Dr. Amit Patel",
        date: "Verified Jun 2024"
      },
      {
        id: "4",
        quote: "INNOVEITY delivered beyond expectations. Their industrial safety training programs are comprehensive and well-structured. Great team to work with.",
        name: "Sarah Johnson",
        date: "Verified May 2024"
      },
      {
        id: "5",
        quote: "Impressed with their change management expertise. The consultants are knowledgeable and the implementation was smooth. Definitely recommend their services.",
        name: "Vikram Singh",
        date: "Verified Apr 2024"
      }
    ]
  },
  setTestimonials: () => {},
  ourServices: {
    title: "Our Services",
    subtitle: "Comprehensive solutions bridging the gap between education and industry",
    backgroundColor: "#185D46",
    list: [
      {
        id: "1",
        title: "Educational Solutions",
        description: "Comprehensive training and development programs",
        iconName: "GraduationCap"
      },
      {
        id: "2",
        title: "Corporate Training",
        description: "Industry-focused skill development programs",
        iconName: "Building"
      },
      {
        id: "3",
        title: "Community Engagement",
        description: "Building bridges between education and industry",
        iconName: "Users"
      }
    ]
  },
  setOurServices: () => {},
  ourPresence: {
    title: "Our Presence",
    subtitle: "Nationwide network of partnerships and collaborations with strong regional hubs across Tamil Nadu.",
    mapImage: "/tamil_nadu_map.png",
    list: [
      {
        id: "1",
        title: "Global Standards",
        description: "International best practices and partnerships with world-leading corporates.",
        iconName: "Globe"
      },
      {
        id: "2",
        title: "Pan-India Reach",
        description: "Serving educational institutions and industries across all major cities in India.",
        iconName: "MapPin"
      },
      {
        id: "3",
        title: "Strong Network",
        description: "Extensive network of world-leading corporate partners and 50+ academic institutions.",
        iconName: "Users"
      }
    ]
  },
  setOurPresence: () => {},
  edukaOverview: {
    heroTitle1: "Leading Corporate Training &",
    heroHighlight: "College Development",
    heroTitle2: "Partner in Tamil Nadu",
    heroDescription: "INNOVEITY is Tamil Nadu's premier corporate training and college development organization, dedicated to bridging the critical gap between academic education and industry requirements. With a proven track record of training over 2,000 students annually across 50+ institutions in Chennai, Coimbatore, Madurai, and throughout Tamil Nadu, we deliver measurable results that transform educational outcomes and corporate performance.",
    divisionCards: [
      {
        id: "1",
        badge: "Institutions",
        title: "Comprehensive Training Solutions for Engineering Colleges & Universities",
        text: "Our AICTE-recognized faculty development programs and student placement training modules have helped engineering colleges achieve 60-85% improvement in campus placement statistics. We specialize in aptitude training, technical certifications, soft skills development, mock interview preparation, and industry connect programs aligned with NEP 2020 guidelines. Partner with INNOVEITY to enhance your institution's reputation and student success rates through evidence-based training methodologies.",
        accent: "#185D46",
        badgeBg: "bg-[#185D46]/5",
        badgeText: "text-[#185D46]",
        iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      },
      {
        id: "2",
        badge: "Corporates",
        title: "Corporate L&D Training & ESG Consulting Services",
        text: "Maximize your learning and development ROI with customized corporate training solutions delivering 200-300% returns through improved productivity, reduced employee attrition, and enhanced innovation capabilities. Our ISO-certified trainers bring 15+ years of industry experience across manufacturing, IT, healthcare, and BFSI sectors. We offer flexible delivery models including on-site training at your Chennai, Coimbatore, or Madurai offices, online virtual sessions, and hybrid learning formats tailored to your organizational needs.",
        accent: "#F59E0B",
        badgeBg: "bg-amber-50",
        badgeText: "text-amber-700",
        iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6",
      },
      {
        id: "3",
        badge: "Sustainability",
        title: "ESG Implementation & Sustainability Consulting",
        text: "Navigate complex Environmental, Social, and Governance (ESG) requirements with INNOVEITY's comprehensive consulting services. We provide carbon footprint analysis, sustainability reporting, CSR-compliant training programs for MCA documentation, and complete ESG framework implementation across Tamil Nadu. Our CSR training initiatives qualify for company CSR spending under Schedule VII, helping you meet compliance requirements while creating meaningful social impact.",
        accent: "#185D46",
        badgeBg: "bg-[#185D46]/5",
        badgeText: "text-[#185D46]",
        iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
      }
    ],
    whyChooseTitle: "Why Leading Institutions Choose INNOVEITY",
    whyChooseSubtitle: "Delivering excellence through recognized certifications and optimized training strategies.",
    whyChooseItems: [
      { id: "1", text: "85%+ placement improvement rate for engineering colleges" },
      { id: "2", text: "2,000+ students trained annually with industry-relevant skills" },
      { id: "3", text: "50+ Tamil Nadu colleges and universities as active partners" },
      { id: "4", text: "4.8★ average client satisfaction rating" },
      { id: "5", text: "AICTE recognition and government-approved certifications" },
      { id: "6", text: "ISO-certified training professionals with proven expertise" },
      { id: "7", text: "Bilingual training capability (English and Tamil)" },
      { id: "8", text: "Rapid deployment within 48-72 hours for urgent needs" },
      { id: "9", text: "Flexible payment models including outcome-based pricing" },
      { id: "10", text: "Comprehensive post-training support and assessment" }
    ],
    coreDetails: [
      {
        id: "1",
        title: "Our Service Coverage Across Tamil Nadu",
        text: "INNOVEITY maintains a strong presence across major Tamil Nadu cities including Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruchirappalli, and surrounding regions. Our regional expertise combined with local market knowledge enables us to deliver culturally relevant, context-appropriate training solutions that resonate with Tamil Nadu's unique educational and corporate landscape. Whether you're an engineering college in Chennai seeking to improve placement statistics, a manufacturing company in Coimbatore requiring safety training, or a corporate entity in Madurai looking for leadership development programs, INNOVEITY has the expertise and infrastructure to support your growth.",
        icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
        color: "#185D46",
        bg: "bg-[#185D46]/5",
      },
      {
        id: "2",
        title: "Industry-Recognized Certifications & Compliance",
        text: "All INNOVEITY programs are designed to meet the highest industry standards and regulatory requirements. Our courses are aligned with AICTE guidelines, NSDC (National Skill Development Corporation) frameworks, Tamil Nadu Skill Development Corporation standards, and NEP 2020 educational policies. We provide government-approved skill certifications that enhance student employability and corporate competitiveness. Our trainers hold prestigious certifications including PMP (Project Management Professional), Six Sigma Black Belt, SHRM (Society for Human Resource Management), and specialized credentials in behavioral psychology, adult learning theory, and instructional design.",
        icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
        color: "#F59E0B",
        bg: "bg-amber-50",
      },
      {
        id: "3",
        title: "Measurable Results & ROI Tracking",
        text: "Unlike generic training providers, INNOVEITY emphasizes measurable outcomes and transparent ROI tracking. We employ Kirkpatrick's Four-Level Training Evaluation Model to assess Reaction (participant feedback), Learning (knowledge gained), Behavior (on-job application), and Results (business impact). Our clients receive comprehensive dashboards showing pre and post-training assessments, skill gap analysis, productivity improvements, and bottom-line business impact. This data-driven approach ensures your training investment delivers tangible returns and demonstrates clear value to stakeholders.",
        icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        color: "#185D46",
        bg: "bg-[#185D46]/5",
      }
    ],
    contactTitle: "Contact INNOVEITY Today",
    contactDescription: "Ready to transform your institution or organization? Contact INNOVEITY at <span className=\"text-[#F59E0B] font-black\">+91 880 770 8818</span> or email <span className=\"text-[#F59E0B] font-black\">admin@innoveity.com</span> for a free consultation. Our team of experts will assess your specific needs and design a customized training solution that delivers measurable results. Join 50+ leading Tamil Nadu institutions and 100+ corporate clients who trust INNOVEITY for their training and development requirements. Visit our office at No:11 Ritherdon Avenue, Ritherdon Road Vepery, Chennai 600007, or schedule a virtual consultation to discuss how we can help you achieve your educational and business objectives.",
  },
  setEdukaOverview: () => {},
  activeSection: "hero",
  setActiveSection: () => {}
};

const HomeManagementContext = createContext<HomeManagementContextType>(initialState);

export function HomeManagementProvider({ children }: { children: React.ReactNode }) {
  const [hero, setHero] = useState<HeroState>(initialState.hero);
  const [stats, setStats] = useState<StatItem[]>(initialState.stats);
  const [corporateHighlights, setCorporateHighlights] = useState<CorporateHighlightsState>(initialState.corporateHighlights);
  const [featuredServices, setFeaturedServices] = useState<FeaturedServicesState>(initialState.featuredServices);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialState.faqs);
  const [testimonials, setTestimonials] = useState<TestimonialsState>(initialState.testimonials);
  const [ourServices, setOurServices] = useState<OurServicesState>(initialState.ourServices);
  const [ourPresence, setOurPresence] = useState<OurPresenceState>(initialState.ourPresence);
  const [edukaOverview, setEdukaOverview] = useState<EdukaOverviewState>(initialState.edukaOverview);
  const [activeSection, setActiveSection] = useState<string>("hero");

  return (
    <HomeManagementContext.Provider value={{ hero, setHero, stats, setStats, corporateHighlights, setCorporateHighlights, featuredServices, setFeaturedServices, faqs, setFaqs, testimonials, setTestimonials, ourServices, setOurServices, ourPresence, setOurPresence, edukaOverview, setEdukaOverview, activeSection, setActiveSection }}>
      {children}
    </HomeManagementContext.Provider>
  );
}

export function useHomeManagement() {
  const context = useContext(HomeManagementContext);
  if (!context) {
    throw new Error("useHomeManagement must be used within a HomeManagementProvider");
  }
  return context;
}
