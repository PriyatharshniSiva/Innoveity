"use client";

import React from "react";
import { CsrProvider } from "./CsrState";
import CsrQuickStats from "./CsrQuickStats";
import CsrToolbar from "./CsrToolbar";
import CsrInitiativesGrid from "./CsrInitiativesGrid";
import CsrSdgGrid from "./CsrSdgGrid";
import CsrImpactManager from "./CsrImpactManager";
import CsrGalleryManager from "./CsrGalleryManager";
import CsrLivePreview from "./CsrLivePreview";
import CsrSideDrawer from "./CsrSideDrawer";
import { RefreshCw, Globe, ArrowRight } from "lucide-react";

export default function CsrManagement() {
  return (
    <CsrProvider>
      <div className="bg-slate-50 min-h-[calc(100vh-80px)] selection:bg-[#185D46] selection:text-white">
        
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">CSR & ESG Management</h1>
            <p className="text-sm text-slate-500 font-medium mt-1 flex items-center">
              Manage CSR initiatives, ESG impact, SDG alignment, gallery, and reports.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] transition-all">
              <Globe className="w-4 h-4" />
              Preview Website
            </button>
            <button className="flex items-center gap-2 bg-[#185D46] hover:bg-[#154d3a] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all">
              Publish Changes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 py-8">
          <div className="max-w-5xl mx-auto flex flex-col space-y-2">
            <CsrToolbar />
            <CsrQuickStats />
            
            <div className="space-y-6">
              <CsrImpactManager />
              <CsrInitiativesGrid />
              <CsrSdgGrid />
              <CsrGalleryManager />
            </div>
          </div>
        </div>

        {/* Slide-out Drawer */}
        <CsrSideDrawer />
      </div>
    </CsrProvider>
  );
}
