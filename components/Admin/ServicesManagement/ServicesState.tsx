"use client";

import React, { createContext, useContext, useState } from "react";

export interface CategoryItem {
  id: string;
  name: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  iconName: string;
  image: string;
  status: "Active" | "Hidden";
  featured: boolean;
  order: number;
  buttonText: string;
  buttonLink: string;
}

export interface ServicesOverview {
  titleLine1: string;
  titleHighlight: string;
  mainTitle: string;
  description: string;
  highlights: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface ServicesCTA {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface ServicesContextType {
  categories: CategoryItem[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingServiceId: string | null;
  setEditingServiceId: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  overview: ServicesOverview;
  setOverview: React.Dispatch<React.SetStateAction<ServicesOverview>>;
  faqs: FaqItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FaqItem[]>>;
  cta: ServicesCTA;
  setCta: React.Dispatch<React.SetStateAction<ServicesCTA>>;
}

const initialCategories: CategoryItem[] = [
  { id: "edu", name: "Educational Institutions", order: 1 },
  { id: "ind", name: "Industries", order: 2 },
  { id: "com", name: "Communities", order: 3 },
];

const initialServices: ServiceItem[] = [
  { id: "1", title: "Faculty Development", description: "Empower educators with modern methodologies, AICTE-aligned programs, and effective NEP 2020 integration.", categoryId: "edu", iconName: "GraduationCap", image: "", status: "Active", featured: true, order: 1, buttonText: "Learn More", buttonLink: "/services" },
  { id: "2", title: "Student Training", description: "Enhance employability through aptitude coaching, technical certifications, and targeted soft skills workshops.", categoryId: "edu", iconName: "Users", image: "", status: "Active", featured: true, order: 2, buttonText: "Learn More", buttonLink: "/services" },
  { id: "3", title: "Placement Assistance", description: "Boost placement rates by up to 85% with our industry-connect programs and specialized interview prep.", categoryId: "edu", iconName: "Briefcase", image: "", status: "Active", featured: false, order: 3, buttonText: "Learn More", buttonLink: "/services" },
  { id: "4", title: "Corporate Training", description: "Empower your workforce with customized L&D programs, leadership training, and technical upskilling with measurable ROI.", categoryId: "ind", iconName: "Building", image: "", status: "Active", featured: true, order: 4, buttonText: "Learn More", buttonLink: "/services" },
  { id: "5", title: "ESG Consulting", description: "Navigate sustainability reporting, carbon footprint analysis, and CSR compliance with our comprehensive ESG frameworks.", categoryId: "ind", iconName: "Leaf", image: "", status: "Active", featured: true, order: 5, buttonText: "Learn More", buttonLink: "/services" },
  { id: "6", title: "Legal Audits", description: "Ensure full compliance with industry regulations, labor laws, and corporate governance through expert auditing services.", categoryId: "ind", iconName: "Scale", image: "", status: "Active", featured: false, order: 6, buttonText: "Learn More", buttonLink: "/services" },
  { id: "7", title: "Digital Solutions", description: "Drive digital transformation with innovative technology consulting, process automation, and tailored IT solutions.", categoryId: "ind", iconName: "Laptop", image: "", status: "Active", featured: false, order: 7, buttonText: "Learn More", buttonLink: "/services" },
  { id: "8", title: "Webinars & Symposiums", description: "Join interactive sessions led by industry experts covering emerging technologies, leadership, and sustainability.", categoryId: "com", iconName: "MonitorPlay", image: "", status: "Active", featured: false, order: 8, buttonText: "Learn More", buttonLink: "/services" },
  { id: "9", title: "Skill Challenges", description: "Participate in hackathons and coding challenges designed to foster innovation and practical problem-solving.", categoryId: "com", iconName: "Trophy", image: "", status: "Active", featured: true, order: 9, buttonText: "Learn More", buttonLink: "/services" },
  { id: "10", title: "Community Outreach", description: "Engage in impactful CSR initiatives that support local communities through education and digital literacy.", categoryId: "com", iconName: "Heart", image: "", status: "Active", featured: true, order: 10, buttonText: "Learn More", buttonLink: "/services" }
];

const initialOverview: ServicesOverview = {
  titleLine1: "Our",
  titleHighlight: "Services",
  mainTitle: "Comprehensive Training Solutions for Tamil Nadu",
  description: "INNOVEITY offers specialized training programs for educational institutions, corporate organizations, and communities across Tamil Nadu. Our services include faculty development, student placement training, corporate L&D solutions, ESG consulting, and community outreach programs—all delivered by ISO-certified trainers with proven track records.",
  highlights: [
    "Faculty development programs aligned with AICTE and NEP 2020",
    "Student training with 85% placement improvement guarantee",
    "Corporate L&D solutions with 200-300% ROI",
    "ESG consulting for CSR compliance and sustainability",
    "Digital transformation and technology consulting",
    "Community skill challenges and webinars",
    "Bilingual delivery in English and Tamil",
    "Flexible on-site, online, or hybrid formats"
  ]
};

const initialFaqs: FaqItem[] = [
  {
    id: "1",
    order: 1,
    question: "What training services does INNOVEITY provide for engineering colleges?",
    answer: "INNOVEITY provides faculty development programs, student placement training, technical certifications, aptitude coaching, soft skills workshops, and industry connect programs. All programs are AICTE-recognized and aligned with NEP 2020 guidelines, achieving 60-85% placement improvement across 50+ partner institutions."
  },
  {
    id: "2",
    order: 2,
    question: "What corporate training programs are available in Chennai and Tamil Nadu?",
    answer: "INNOVEITY offers leadership development, behavioral training, technical upskilling, ESG consulting, digital transformation, safety training, and custom L&D programs. We serve manufacturing, IT, healthcare, and BFSI sectors with flexible on-site, online, or hybrid delivery across Chennai, Coimbatore, and Madurai."
  },
  {
    id: "3",
    order: 3,
    question: "Does INNOVEITY provide ESG and sustainability consulting?",
    answer: "Yes, INNOVEITY provides comprehensive ESG consulting including carbon footprint analysis, sustainability reporting, CSR-compliant training programs, and complete ESG framework implementation. Our programs qualify for CSR spending under Schedule VII of the Companies Act."
  }
];

const initialCta: ServicesCTA = {
  title: "Ready to Shape the Future of Industry?",
  description: "Whether you're an academic institution looking to upgrade your relevance or a corporate entity seeking elite talent, the bridge starts here.",
  buttonText: "Get Started Today",
  buttonLink: "/contact"
};

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [overview, setOverview] = useState<ServicesOverview>(initialOverview);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [cta, setCta] = useState<ServicesCTA>(initialCta);

  return (
    <ServicesContext.Provider value={{ 
      categories, setCategories, 
      services, setServices, 
      isDrawerOpen, setIsDrawerOpen, 
      editingServiceId, setEditingServiceId,
      searchQuery, setSearchQuery,
      categoryFilter, setCategoryFilter,
      overview, setOverview,
      faqs, setFaqs,
      cta, setCta
    }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
}
