"use client";

import React, { createContext, useContext, useState } from "react";

export interface CaseStudyStat {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudy {
  id: string;
  categoryBadge: string;
  title: string;
  challenge: string;
  solution: string;
  thumbnail: string;
  video: string; // URL or path
  youtubeUrl: string;
  keyResults: CaseStudyStat[]; // Key Results (e.g. 85%, increase in placement rates)
  statistics: CaseStudyStat[]; // Optional extra stats
  clientLogo: string;
  gallery: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  status: "Published" | "Draft";
  featured: boolean;
  institutionType: "Academic" | "Corporate";
  year: string;
  publishedDate: string;
  views: number;
  category: string;
}

interface CaseStudiesContextType {
  caseStudies: CaseStudy[];
  setCaseStudies: React.Dispatch<React.SetStateAction<CaseStudy[]>>;
  viewMode: "Grid" | "Table";
  setViewMode: React.Dispatch<React.SetStateAction<"Grid" | "Table">>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingCaseStudyId: string | null;
  setEditingCaseStudyId: React.Dispatch<React.SetStateAction<string | null>>;
  partnerQuotes: any[];
  setPartnerQuotes: React.Dispatch<React.SetStateAction<any[]>>;
}

const initialCaseStudies: CaseStudy[] = [
  {
    id: "1",
    categoryBadge: "EDUCATIONAL INSTITUTION",
    title: "Transforming Engineering Education at a Partner Institution",
    challenge: "How we helped Educational Institution to enhance their curriculum and improve student placement rates by 85%.",
    solution: "Implemented an end-to-end placement training program for students combined with AICTE-recognized faculty development workshops.",
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070",
    video: "",
    youtubeUrl: "https://youtube.com/watch?v=example",
    keyResults: [
      { label: "increase in placement rates", value: "85", suffix: "%" },
      { label: "industry partnerships", value: "40", suffix: "+" },
      { label: "students trained", value: "500", suffix: "+" }
    ],
    statistics: [],
    clientLogo: "https://upload.wikimedia.org/wikipedia/en/4/4c/Anna_University_Logo.svg",
    gallery: [],
    testimonial: {
      quote: "INNOVEITY's comprehensive faculty development program revolutionized our teaching methodologies. Our students are now industry-ready from day one.",
      author: "",
      role: ""
    },
    tags: ["Education", "FDP", "AICTE"],
    seoTitle: "Anna University Case Study | INNOVEITY",
    seoDescription: "Learn how INNOVEITY transformed engineering education at Anna University.",
    status: "Published",
    featured: true,
    institutionType: "Academic",
    year: "2023",
    publishedDate: "2023-11-15",
    views: 12500,
    category: "Faculty Development"
  },
  {
    id: "2",
    categoryBadge: "CORPORATE TRAINING",
    title: "Training Excellence Program at Corporate Partner",
    challenge: "Comprehensive training program that enhanced workforce capabilities and operational efficiency.",
    solution: "Designed and delivered a scalable training framework with measurable outcomes across all business units.",
    thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070",
    video: "https://example.com/video.mp4",
    youtubeUrl: "",
    keyResults: [
      { label: "individuals trained", value: "2000", suffix: "+" },
      { label: "efficiency increase", value: "60", suffix: "%" },
      { label: "satisfaction rating", value: "95", suffix: "%" }
    ],
    statistics: [],
    clientLogo: "",
    gallery: [],
    testimonial: {
      quote: "This program transformed our team's capabilities and significantly improved our productivity and innovation metrics.",
      author: "",
      role: ""
    },
    tags: ["Corporate", "AI", "Upskilling"],
    seoTitle: "Tech Mahindra L&D Case Study",
    seoDescription: "Tech Mahindra workforce upskilling case study.",
    status: "Published",
    featured: true,
    institutionType: "Corporate",
    year: "2024",
    publishedDate: "2024-02-10",
    views: 8900,
    category: "Corporate Training"
  },
  {
    id: "3",
    categoryBadge: "CORPORATE ESG",
    title: "Corporate ESG Transformation for a Tech Partner",
    challenge: "Implemented comprehensive ESG practices leading to improved sustainability metrics and stakeholder satisfaction.",
    solution: "Delivered end-to-end ESG framework implementation including carbon footprint analysis, sustainability reporting, and CSR-compliant training programs.",
    thumbnail: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=2070",
    video: "",
    youtubeUrl: "",
    keyResults: [
      { label: "reduction in carbon footprint", value: "50", suffix: "%" },
      { label: "employee satisfaction", value: "95", suffix: "%" },
      { label: "14001 certification achieved", value: "ISO", suffix: "" }
    ],
    statistics: [],
    clientLogo: "",
    gallery: [],
    testimonial: {
      quote: "The ESG consulting provided by INNOVEITY helped us achieve carbon neutrality ahead of schedule while improving employee satisfaction scores.",
      author: "",
      role: ""
    },
    tags: ["ESG", "Manufacturing", "Sustainability"],
    seoTitle: "ESG Consulting Case Study",
    seoDescription: "ESG compliance case study for manufacturing.",
    status: "Draft",
    featured: false,
    institutionType: "Corporate",
    year: "2024",
    publishedDate: "2024-05-20",
    views: 0,
    category: "ESG Consulting"
  }
];

const CaseStudiesContext = createContext<CaseStudiesContextType | undefined>(undefined);

export function CaseStudiesProvider({ children }: { children: React.ReactNode }) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [viewMode, setViewMode] = useState<"Grid" | "Table">("Grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCaseStudyId, setEditingCaseStudyId] = useState<string | null>(null);
  const [partnerQuotes, setPartnerQuotes] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/case-studies')
      .then(res => res.json())
      .then(data => {
        if (data && data.caseStudies) {
          const mappedData: CaseStudy[] = data.caseStudies.map((cs: any) => ({
            id: cs.id.toString(),
            categoryBadge: cs.type ? cs.type.toUpperCase() : "CASE STUDY",
            title: cs.title,
            challenge: cs.challenge,
            solution: cs.solution,
            thumbnail: cs.videoId ? `https://img.youtube.com/vi/${cs.videoId}/maxresdefault.jpg` : "",
            video: "",
            youtubeUrl: cs.videoId ? `https://www.youtube.com/watch?v=${cs.videoId}` : "",
            keyResults: cs.results || [],
            statistics: [],
            clientLogo: "",
            gallery: [],
            testimonial: {
              quote: cs.quote || "",
              author: cs.quoteAuthor || "",
              role: ""
            },
            tags: [],
            seoTitle: cs.title,
            seoDescription: cs.challenge,
            status: "Published",
            featured: true,
            institutionType: "Corporate",
            year: cs.createdAt ? new Date(cs.createdAt).getFullYear().toString() : "2024",
            publishedDate: cs.createdAt || new Date().toISOString(),
            views: Math.floor(Math.random() * 5000) + 1000,
            category: cs.type || "General"
          }));
          setCaseStudies(mappedData);
        }
        if (data && data.partnerQuotes) {
          setPartnerQuotes(data.partnerQuotes);
        }
      })
      .catch(err => console.error("Failed to load case studies", err));
  }, []);

  return (
    <CaseStudiesContext.Provider value={{
      caseStudies, setCaseStudies,
      viewMode, setViewMode,
      searchQuery, setSearchQuery,
      categoryFilter, setCategoryFilter,
      statusFilter, setStatusFilter,
      isDrawerOpen, setIsDrawerOpen,
      editingCaseStudyId, setEditingCaseStudyId,
      partnerQuotes, setPartnerQuotes
    }}>
      {children}
    </CaseStudiesContext.Provider>
  );
}

export function useCaseStudies() {
  const context = useContext(CaseStudiesContext);
  if (context === undefined) {
    throw new Error("useCaseStudies must be used within a CaseStudiesProvider");
  }
  return context;
}
