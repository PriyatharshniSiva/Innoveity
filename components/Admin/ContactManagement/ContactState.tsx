"use client";

import React, { createContext, useContext, useState } from "react";

export interface OfficeItem {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  branchType: string;
  color: string;
  order: number;
}

export interface EnquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  type: string;
  date: string;
  status: "Unread" | "Read" | "Replied";
}

export interface ContactSettings {
  phonePrimary: string;
  emailPrimary: string;
  emailSecondary: string;
  hoursWeekday: string;
  hoursWeekend: string;
  mapLat: string;
  mapLng: string;
}

interface ContactContextType {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  editingType: "office" | "enquiry" | "settings" | null;
  setEditingType: (type: "office" | "enquiry" | "settings" | null) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  
  offices: OfficeItem[];
  setOffices: React.Dispatch<React.SetStateAction<OfficeItem[]>>;
  
  enquiries: EnquiryItem[];
  setEnquiries: React.Dispatch<React.SetStateAction<EnquiryItem[]>>;
  
  settings: ContactSettings;
  setSettings: React.Dispatch<React.SetStateAction<ContactSettings>>;
  
  openDrawer: (type: "office" | "enquiry" | "settings", id?: string) => void;
  closeDrawer: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

const initialOffices: OfficeItem[] = [
  { id: "1", name: "Main Office", address: "No:11 Ritherdon Avenue, Ritherdon Road", city: "Vepery, Chennai", pincode: "600007", branchType: "Headquarters", color: "#185D46", order: 1 },
  { id: "2", name: "Branch Offices", address: "Trichy, Salem, Tirunelveli, Bangalore", city: "Multiple Cities", pincode: "", branchType: "Branches", color: "#3b82f6", order: 2 },
  { id: "3", name: "Research Center", address: "Anna University Atal Innovation Center", city: "Chennai", pincode: "600025", branchType: "Industry 4.0 & AI/ML", color: "#a855f7", order: 3 }
];

const initialEnquiries: EnquiryItem[] = [];

const initialSettings: ContactSettings = {
  phonePrimary: "+91 880 770 8818",
  emailPrimary: "info@innoveity.com",
  emailSecondary: "admin@innoveity.com",
  hoursWeekday: "Mon - Fri: 9 AM - 6 PM",
  hoursWeekend: "Saturday: 10 AM - 4 PM",
  mapLat: "13.082729",
  mapLng: "80.258284"
};

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingType, setEditingType] = useState<"office" | "enquiry" | "settings" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [offices, setOffices] = useState<OfficeItem[]>(initialOffices);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [settings, setSettings] = useState<ContactSettings>(initialSettings);

  const openDrawer = (type: "office" | "enquiry" | "settings", id?: string) => {
    setEditingType(type);
    setEditingId(id || null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setEditingType(null);
      setEditingId(null);
    }, 300);
  };

  return (
    <ContactContext.Provider value={{
      isDrawerOpen, setIsDrawerOpen,
      editingType, setEditingType,
      editingId, setEditingId,
      offices, setOffices,
      enquiries, setEnquiries,
      settings, setSettings,
      openDrawer, closeDrawer
    }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
}
