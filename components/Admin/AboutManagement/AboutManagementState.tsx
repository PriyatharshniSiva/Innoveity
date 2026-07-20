"use client";

import React, { createContext, useContext, useState } from "react";

interface OverviewState {
  titleLine1: string;
  titleHighlight: string;
  description: string[];
  featuredImage: string;
}

interface JourneyStep {
  id: string;
  year: string;
  title: string;
  description: string;
  iconName: string;
}

interface MissionVisionState {
  mission: string;
  vision: string;
  values: string;
}

interface StrengthItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
}

interface CertificationItem {
  id: string;
  name: string;
  logoUrl: string;
}

interface ClientFeedbackItem {
  id: string;
  quote: string;
  name: string;
  date: string;
}

interface AboutManagementContextType {
  overview: OverviewState;
  setOverview: React.Dispatch<React.SetStateAction<OverviewState>>;
  journey: JourneyStep[];
  setJourney: React.Dispatch<React.SetStateAction<JourneyStep[]>>;
  
  missionVision: MissionVisionState;
  setMissionVision: React.Dispatch<React.SetStateAction<MissionVisionState>>;
  strengths: StrengthItem[];
  setStrengths: React.Dispatch<React.SetStateAction<StrengthItem[]>>;
  statistics: StatItem[];
  setStatistics: React.Dispatch<React.SetStateAction<StatItem[]>>;
  team: TeamMember[];
  setTeam: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  certifications: CertificationItem[];
  setCertifications: React.Dispatch<React.SetStateAction<CertificationItem[]>>;
  clientFeedback: ClientFeedbackItem[];
  setClientFeedback: React.Dispatch<React.SetStateAction<ClientFeedbackItem[]>>;

  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: AboutManagementContextType = {
  overview: {
    titleLine1: "About",
    titleHighlight: "INNOVEITY",
    description: [
      "INNOVEITY is a forward-looking organization that connects global technology and innovation directly to students by working closely with world-leading corporates such as BMW, Caterpillar, and many others.",
      "Our mission is to ensure that students gain access to international standards, advanced technologies, and industry practices that prepare them for the future of work.",
      "Through strategic partnerships with educational institutions and industry leaders, we create comprehensive training programs, development initiatives, and sustainable solutions that bridge the gap between academia and real-world application."
    ],
    featuredImage: "/inv4.jpg"
  },
  setOverview: () => {},
  journey: [
    { id: "1", year: "2018", title: "Foundation", description: "INNOVEITY was founded with a vision to transform education.", iconName: "Building" },
    { id: "2", year: "2019", title: "First 1000", description: "1500+ students successfully trained across various programs.", iconName: "Users" },
    { id: "3", year: "2020", title: "Digital Pivot", description: "Adapted to digital learning during pandemic, reaching 2000+ students.", iconName: "Laptop" },
    { id: "4", year: "2021", title: "Corporate Expansion", description: "Expanded to corporate training with 35+ industry partners.", iconName: "Briefcase" },
    { id: "5", year: "2022", title: "National Reach", description: "Established presence across India.", iconName: "MapPin" },
    { id: "6", year: "2023", title: "ESG Focus", description: "Launched comprehensive ESG and sustainability programs.", iconName: "Leaf" },
    { id: "7", year: "2024", title: "Innovation Hub", description: "50,000+ minds stimulated, 120+ corporate clients, 35+ institution partnerships.", iconName: "Lightbulb" }
  ],
  setJourney: () => {},

  missionVision: {
    mission: "To bridge the gap between education and industry through innovative solutions and sustainable practices.",
    vision: "To become the global gold standard for educational integration, where the boundary between classroom and career ceases to exist.",
    values: "Innovation, Integrity, Excellence, Sustainability, and Collaborative Growth."
  },
  setMissionVision: () => {},
  
  strengths: [
    { id: "1", title: "Proven Expertise", description: "6+ years of experience in educational innovation and industry partnerships", iconName: "Award" },
    { id: "2", title: "Strong Network", description: "Extensive network of educational institutions and corporate partners across India", iconName: "Globe" },
    { id: "3", title: "Innovation Focus", description: "Cutting-edge solutions combining technology, sustainability, and practical skills", iconName: "Lightbulb" }
  ],
  setStrengths: () => {},

  statistics: [
    { id: "1", value: "50K+", label: "Students Trained" },
    { id: "2", value: "120+", label: "Corporate Partners" },
    { id: "3", value: "35+", label: "Institutions" }
  ],
  setStatistics: () => {},

  team: [
    { id: "1", name: "Dr. Arul Kumaran", role: "Director", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: "2", name: "Meera Venkat", role: "Operations Head", image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: "3", name: "Siddharth Raja", role: "Technical Lead", image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800" }
  ],
  setTeam: () => {},

  gallery: [
    { id: "1", imageUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Innovation Lab" },
    { id: "2", imageUrl: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800", caption: "Corporate Workshop" }
  ],
  setGallery: () => {},

  certifications: [
    { id: "1", name: "ISO 9001", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ISO_Logo_%28Red_square%29.svg/480px-ISO_Logo_%28Red_square%29.svg.png" }
  ],
  setCertifications: () => {},

  clientFeedback: [
    { id: "1", quote: "Exceptional training programs! INNOVEITY transformed our organization with their innovative approach to skill development. Highly recommended for corporate training.", name: "Rajesh Kumar", date: "Verified August 15, 2024" },
    { id: "2", quote: "Outstanding ESG consulting services. Their tree plantation initiative helped us achieve our sustainability goals effectively. Professional and impactful work.", name: "Priya Sharma", date: "Verified Jul 2024" },
    { id: "3", quote: "Excellent leadership development programs. The training methodology is innovative and results-oriented. Our team's performance improved significantly.", name: "Dr. Amit Patel", date: "Verified Jun 2024" },
    { id: "4", quote: "INNOVEITY delivered beyond expectations. Their industrial safety training programs are comprehensive and well-structured. Great team to work with.", name: "Sarah Johnson", date: "Verified May 2024" },
    { id: "5", quote: "Impressed with their change management expertise. The consultants are knowledgeable and the implementation was smooth. Definitely recommend their services.", name: "Vikram Singh", date: "Verified Apr 2024" }
  ],
  setClientFeedback: () => {},

  activeSection: "overview",
  setActiveSection: () => {}
};

const AboutManagementContext = createContext<AboutManagementContextType>(initialState);

export function AboutManagementProvider({ children }: { children: React.ReactNode }) {
  const [overview, setOverview] = useState<OverviewState>(initialState.overview);
  const [journey, setJourney] = useState<JourneyStep[]>(initialState.journey);
  const [missionVision, setMissionVision] = useState<MissionVisionState>(initialState.missionVision);
  const [strengths, setStrengths] = useState<StrengthItem[]>(initialState.strengths);
  const [statistics, setStatistics] = useState<StatItem[]>(initialState.statistics);
  const [team, setTeam] = useState<TeamMember[]>(initialState.team);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialState.gallery);
  const [certifications, setCertifications] = useState<CertificationItem[]>(initialState.certifications);
  const [clientFeedback, setClientFeedback] = useState<ClientFeedbackItem[]>(initialState.clientFeedback);
  const [activeSection, setActiveSection] = useState<string>("overview");

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/about");
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            if (json.data.overview) setOverview(json.data.overview);
            if (json.data.journey) setJourney(json.data.journey);
            if (json.data.missionVision) setMissionVision(json.data.missionVision);
            if (json.data.strengths) setStrengths(json.data.strengths);
            if (json.data.statistics) setStatistics(json.data.statistics);
            if (json.data.team) setTeam(json.data.team);
            if (json.data.gallery) setGallery(json.data.gallery);
            if (json.data.certifications) setCertifications(json.data.certifications);
          }
        }
      } catch (err) {
        console.error("Failed to load about data:", err);
      }
    }
    loadData();
  }, []);

  return (
    <AboutManagementContext.Provider value={{ 
      overview, setOverview, 
      journey, setJourney, 
      missionVision, setMissionVision,
      strengths, setStrengths,
      statistics, setStatistics,
      team, setTeam,
      gallery, setGallery,
      certifications, setCertifications,
      clientFeedback, setClientFeedback,
      activeSection, setActiveSection 
    }}>
      {children}
    </AboutManagementContext.Provider>
  );
}

export function useAboutManagement() {
  const context = useContext(AboutManagementContext);
  if (!context) {
    throw new Error("useAboutManagement must be used within an AboutManagementProvider");
  }
  return context;
}
