"use client";

import React from "react";
import { CsrProvider, useCsr } from "./CsrState";
import CsrQuickStats from "./CsrQuickStats";
import CsrToolbar from "./CsrToolbar";
import CsrInitiativesGrid from "./CsrInitiativesGrid";
import CsrSdgGrid from "./CsrSdgGrid";
import CsrImpactManager from "./CsrImpactManager";
import CsrGalleryManager from "./CsrGalleryManager";
import CsrSideDrawer from "./CsrSideDrawer";
import { RefreshCw, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

function CsrManagementContent() {
  const { isSaving, saveAllChanges } = useCsr();

  return (
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
          <Link href="/csr" target="_blank">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] transition-all">
              <Globe className="w-4 h-4" />
              Preview Website
            </button>
          </Link>
          <button 
            onClick={saveAllChanges}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#185D46] hover:bg-[#154d3a] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </>
            ) : (
              <>
                Publish Changes
                <ArrowRight className="w-4 h-4" />
              </>
            )}
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
  );
}

export default function CsrManagement() {
  return (
    <CsrProvider>
      <CsrManagementContent />
    </CsrProvider>
  );
}
