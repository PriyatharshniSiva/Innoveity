"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, CheckCircle, Smartphone, Mail, MapPin } from "lucide-react";

import { useToast } from "@/components/Admin/Toast";

export default function ThemeManagementClient({ initialData }: { initialData: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  // Default values for Floating Contact Widget
  const [contactOptions, setContactOptions] = useState(initialData?.floatingContactWidget || [
    {
      id: "location",
      label: "Location",
      href: "https://maps.google.com/?q=Chennai,+Tamil+Nadu",
      color: "bg-blue-600",
      iconType: "MapPin"
    },
    {
      id: "email",
      label: "Email Us",
      href: "mailto:contact@innoveity.com",
      color: "bg-[#F59E0B]",
      iconType: "Mail"
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/919876543210",
      color: "bg-[#25D366]",
      iconType: "WhatsApp"
    },
    {
      id: "call",
      label: "Call Us",
      href: "tel:+919876543210",
      color: "bg-[#0B6B57]",
      iconType: "Phone"
    }
  ]);

  const handleOptionChange = (idx: number, field: string, value: string) => {
    const newOptions = [...contactOptions];
    newOptions[idx][field] = value;
    setContactOptions(newOptions);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...initialData,
          floatingContactWidget: contactOptions
        })
      });

      if (res.ok) {
        success("Theme settings saved successfully!");
      } else {
        error("Failed to save theme settings.");
      }
    } catch (err) {
      console.error("Failed to save theme settings:", err);
      error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0a0a0a] p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-white/5 relative z-20">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Theme Settings</h1>
          <p className="text-sm font-semibold text-slate-500 mt-1">Manage site appearance and floating widgets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#185D46] hover:bg-[#0f3d2e] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Floating Contact Widget Settings */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-800 font-sans mb-4">Floating Contact Widget</h2>
        <div className="space-y-4">
          {contactOptions.map((opt: any, idx: number) => (
            <div key={opt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Label</label>
                  <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => handleOptionChange(idx, "label", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Link / Action</label>
                  <input
                    type="text"
                    value={opt.href}
                    onChange={(e) => handleOptionChange(idx, "href", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Background Color (Tailwind Class)</label>
                  <input
                    type="text"
                    value={opt.color}
                    onChange={(e) => handleOptionChange(idx, "color", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
