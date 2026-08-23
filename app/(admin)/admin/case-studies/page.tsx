"use client";

import React from "react";
import { Plus, Download, Upload, MonitorPlay } from "lucide-react";
import { CaseStudiesProvider, useCaseStudies } from "@/components/Admin/CaseStudiesManagement/CaseStudiesState";
import CaseStudiesAnalytics from "@/components/Admin/CaseStudiesManagement/CaseStudiesAnalytics";
import CaseStudiesToolbar from "@/components/Admin/CaseStudiesManagement/CaseStudiesToolbar";
import CaseStudiesGrid from "@/components/Admin/CaseStudiesManagement/CaseStudiesGrid";
import CaseStudiesTable from "@/components/Admin/CaseStudiesManagement/CaseStudiesTable";
import CaseStudiesDrawer from "@/components/Admin/CaseStudiesManagement/CaseStudiesDrawer";
import CaseStudiesActivity from "@/components/Admin/CaseStudiesManagement/CaseStudiesActivity";
import CaseStudiesTestimonials from "@/components/Admin/CaseStudiesManagement/CaseStudiesTestimonials";
import DeleteCaseStudyModal from "@/components/Admin/CaseStudiesManagement/DeleteCaseStudyModal";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { TestimonialsProvider } from "@/components/Admin/TestimonialsManagement/TestimonialsState";

function CaseStudiesContent() {
  const { viewMode, setIsDrawerOpen, setEditingCaseStudyId, caseStudies, setCaseStudies } = useCaseStudies();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    // Keep function signature for potential future use or if something else references it, but we can also just remove it.
    // Let's actually remove it entirely since it's only used by the button.
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = e => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (Array.isArray(importedData)) {
            // Very basic validation, could be improved
            setCaseStudies([...caseStudies, ...importedData]);
            alert("Successfully imported case studies!");
          } else {
            alert("Invalid file format. Expected an array of case studies.");
          }
        } catch (error) {
          alert("Error parsing JSON file.");
        }
      };
    }
    // Reset input so the same file can be imported again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Case Studies Management</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Manage all case studies, success stories, videos, metrics, and publishing from one place.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImport} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl border border-slate-200 transition-colors flex items-center shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Import
            </button>

            <Link href="/case-studies" target="_blank">
              <button className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-semibold rounded-xl border border-slate-200 transition-colors flex items-center shadow-sm">
                <MonitorPlay className="w-4 h-4 mr-2" />
                Preview Website
              </button>
            </Link>
            <button 
              onClick={() => { setEditingCaseStudyId(null); setIsDrawerOpen(true); }}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all flex items-center"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add Case Study
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        
        {/* Analytics Section */}
        <div className="mb-10">
          <CaseStudiesAnalytics />
        </div>
        
        {/* Toolbar (Search, Filter, View Toggle) */}
        <CaseStudiesToolbar />

        {/* View Layout (Grid or Table) */}
        <AnimatePresence mode="wait">
          {viewMode === "Grid" ? <CaseStudiesGrid key="grid" /> : <CaseStudiesTable key="table" />}
        </AnimatePresence>
        
        {/* Testimonials */}
        <CaseStudiesTestimonials />

        {/* Activity Timeline */}
        <CaseStudiesActivity />
        
      </div>
      
      {/* Editor Drawer */}
      <CaseStudiesDrawer />

      {/* Delete Confirmation Modal */}
      <DeleteCaseStudyModal />

    </div>
  );
}

export default function AdminCaseStudies() {
  return (
    <TestimonialsProvider>
      <CaseStudiesProvider>
        <CaseStudiesContent />
      </CaseStudiesProvider>
    </TestimonialsProvider>
  );
}
