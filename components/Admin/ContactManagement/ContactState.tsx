"use client";

import React, { createContext, useContext, useState } from "react";
import { useToast } from "@/components/Admin/Toast";

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
  saveAllChanges: () => Promise<void>;
  isSaving: boolean;
  isLoading: boolean;
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          if (data.offices) setOffices(data.offices);
          // Enquiries are usually not updated in bulk settings API, but we'll include it
          if (data.enquiries) setEnquiries(data.enquiries);
          if (data.settings) setSettings(data.settings);
        }
      })
      .catch(err => console.error("Failed to load contact content", err))
      .finally(() => setIsLoading(false));
  }, []);

  const { success, error } = useToast();

  const saveAllChanges = async () => {
    setIsSaving(true);
    try {
      const payload = {
        offices, enquiries, settings
      };
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        success("Changes saved successfully!");
      } else {
        error("Failed to save changes.");
      }
    } catch (err) {
      console.error(err);
      error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ContactContext.Provider value={{
      isDrawerOpen, setIsDrawerOpen,
      editingType, setEditingType,
      editingId, setEditingId,
      offices, setOffices,
      enquiries, setEnquiries,
      settings, setSettings,
      openDrawer, closeDrawer,
      saveAllChanges, isSaving, isLoading
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
