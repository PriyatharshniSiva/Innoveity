"use client";

import React, { useState } from "react";
import { MonitorPlay, Globe, Save } from "lucide-react";
import { ServicesProvider } from "@/components/Admin/ServicesManagement/ServicesState";
import ServicesQuickStats from "@/components/Admin/ServicesManagement/ServicesQuickStats";
import ServicesQuickActions from "@/components/Admin/ServicesManagement/ServicesQuickActions";
import ServicesManagementForms from "@/components/Admin/ServicesManagement/ServicesManagementForms";
import ServicesRecentActivity from "@/components/Admin/ServicesManagement/ServicesRecentActivity";
import Link from "next/link";

export default function ServicesManagement() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      alert("Changes published successfully!");
    }, 1000);
  };

  return (
    <ServicesProvider>
      <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in fade-in duration-500">
        
        {/* Top Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Services Management</h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Manage all services, categories, icons, images and display order.</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link href="/services" target="_blank">
                <button className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl border border-slate-200 transition-colors flex items-center">
                  <MonitorPlay className="w-4 h-4 mr-2" />
                  Preview Website
                </button>
              </Link>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Globe className="w-4 h-4 mr-2" />
                {isSaving ? "Publishing..." : "Publish to Live"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 py-8">
          {/* Quick Stats */}
          <ServicesQuickStats />
          
          {/* Quick Actions */}
          <ServicesQuickActions />

          {/* Main Layout */}
          <div className="max-w-5xl mx-auto flex flex-col space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Services Page Sections</h2>
              <ServicesManagementForms />
            </div>
            
            <ServicesRecentActivity />
          </div>
        </div>

      </div>
    </ServicesProvider>
  );
}
