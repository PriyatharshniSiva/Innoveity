"use client";

import React, { createContext, useContext, useState } from "react";

export interface InitiativeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  status: "Active" | "Hidden";
  featured: boolean;
  image: string;
  iconName: string;
  order: number;
}

export interface SdgItem {
  id: string;
  number: number;
  title: string;
  description: string;
  color: string;
  status: "Active" | "Hidden";
  order: number;
}

export interface ChartDataPoint {
  id: string;
  year: string;
  co2Value: number;
  jobsValue: number;
}

interface CsrContextType {
  // Global drawer state
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  editingType: "initiative" | "sdg" | "chart" | "gallery" | null;
  setEditingType: (type: "initiative" | "sdg" | "chart" | "gallery" | null) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  
  // Data
  initiatives: InitiativeItem[];
  setInitiatives: React.Dispatch<React.SetStateAction<InitiativeItem[]>>;
  sdgs: SdgItem[];
  setSdgs: React.Dispatch<React.SetStateAction<SdgItem[]>>;
  chartData: ChartDataPoint[];
  setChartData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>;
  
  // Handlers
  openDrawer: (type: "initiative" | "sdg" | "chart" | "gallery", id?: string) => void;
  closeDrawer: () => void;
}

const CsrContext = createContext<CsrContextType | undefined>(undefined);

const initialInitiatives: InitiativeItem[] = [
  { id: "1", title: "Digital Inclusion Program", category: "Education", description: "Bridging the digital divide in rural communities through free digital literacy training, essential tech courses, and device accessibility programs.", impact: "5,000+ individuals trained in digital skills", status: "Active", featured: true, image: "", iconName: "Laptop", order: 1 },
  { id: "2", title: "Green Skills Development", category: "Environment", description: "Comprehensive vocational training programs focused on solar energy installation, sustainable agriculture practices, and environmental conservation skills.", impact: "1,200+ green jobs created and verified", status: "Active", featured: true, image: "", iconName: "Leaf", order: 2 },
  { id: "3", title: "Women Entrepreneur Support", category: "Social", description: "Mentorship, financial literacy training, and startup accelerator programs supporting women-led micro-businesses across Tamil Nadu and neighboring states.", impact: "800+ women entrepreneurs supported", status: "Active", featured: true, image: "", iconName: "Users", order: 3 },
  { id: "4", title: "Sustainable Corporate Practices", category: "Environment", description: "Expert consulting and workshops designed to assist manufacturing corporations in auditing emissions, saving power, and implementing ESG practices.", impact: "2,500 tons CO₂ emissions reduced", status: "Active", featured: true, image: "", iconName: "Building", order: 4 }
];

const initialSdgs: SdgItem[] = [
  { id: "1", number: 4, title: "Quality Education", description: "Ensuring inclusive, equitable quality education and promoting lifelong learning opportunities through faculty workshops and placement aptitude modules.", color: "#C5192D", status: "Active", order: 1 },
  { id: "2", number: 8, title: "Decent Work & Growth", description: "Promoting sustained economic growth, full and productive employment, and decent work environments through domain upskilling certifications.", color: "#A21942", status: "Active", order: 2 },
  { id: "3", number: 10, title: "Reduced Inequalities", description: "Reducing structural education inequalities within and among districts through subsidized or free remote digital inclusion programs.", color: "#DD1367", status: "Active", order: 3 },
  { id: "4", number: 13, title: "Climate Action", description: "Taking urgent action to combat climate change and its impacts by training professionals in safety engineering and environmental sustainability.", color: "#3F7E44", status: "Active", order: 4 }
];

const initialChartData: ChartDataPoint[] = [
  { id: "1", year: "2022", co2Value: 800, jobsValue: 300 },
  { id: "2", year: "2023", co2Value: 1400, jobsValue: 650 },
  { id: "3", year: "2024", co2Value: 2000, jobsValue: 950 },
  { id: "4", year: "2025", co2Value: 2500, jobsValue: 1200 }
];

export function CsrProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingType, setEditingType] = useState<"initiative" | "sdg" | "chart" | "gallery" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [initiatives, setInitiatives] = useState<InitiativeItem[]>(initialInitiatives);
  const [sdgs, setSdgs] = useState<SdgItem[]>(initialSdgs);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(initialChartData);

  const openDrawer = (type: "initiative" | "sdg" | "chart" | "gallery", id?: string) => {
    setEditingType(type);
    setEditingId(id || null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Allow exit animation to finish before clearing state
    setTimeout(() => {
      setEditingType(null);
      setEditingId(null);
    }, 300);
  };

  return (
    <CsrContext.Provider value={{
      isDrawerOpen, setIsDrawerOpen,
      editingType, setEditingType,
      editingId, setEditingId,
      initiatives, setInitiatives,
      sdgs, setSdgs,
      chartData, setChartData,
      openDrawer, closeDrawer
    }}>
      {children}
    </CsrContext.Provider>
  );
}

export function useCsr() {
  const context = useContext(CsrContext);
  if (context === undefined) {
    throw new Error("useCsr must be used within a CsrProvider");
  }
  return context;
}
