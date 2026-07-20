"use client";

import React from "react";
import { MonitorPlay, Globe, Save } from "lucide-react";
import { AboutManagementProvider, useAboutManagement } from "@/components/Admin/AboutManagement/AboutManagementState";
import AboutQuickStats from "@/components/Admin/AboutManagement/AboutQuickStats";
import AboutQuickActions from "@/components/Admin/AboutManagement/AboutQuickActions";
import AboutRecentActivity from "@/components/Admin/AboutManagement/AboutRecentActivity";
import AboutManagementForms from "@/components/Admin/AboutManagement/AboutManagementForms";
import AboutLivePreview from "@/components/Admin/AboutManagement/AboutLivePreview";
import Link from "next/link";
import { useState } from "react";

function AboutManagementContent() {
  const { overview, journey, missionVision, strengths, statistics, team, gallery, certifications } = useAboutManagement();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        overview,
        journey,
        missionVision,
        strengths,
        statistics,
        team,
        gallery,
        certifications
      };
      
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Failed to save");
      alert("Changes published successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">About Us Management</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Manage every section of the About Us page from one place.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link href="/about" target="_blank">
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
        <AboutQuickStats />
        
        {/* Quick Actions */}
        <AboutQuickActions />

        {/* Main Layout */}
        <div className="max-w-5xl mx-auto flex flex-col space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6">About Page Sections</h2>
            <AboutManagementForms />
          </div>
          <AboutRecentActivity />
        </div>
      </div>
    </div>
  );
}

export default function AboutManagement() {
  return (
    <AboutManagementProvider>
      <AboutManagementContent />
    </AboutManagementProvider>
  );
}
