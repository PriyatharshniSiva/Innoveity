"use client";

import React from "react";
import { Search, RefreshCcw, Save, Sparkles } from "lucide-react";
import { HomeManagementProvider } from "@/components/Admin/HomeManagement/HomeManagementState";
import QuickStats from "@/components/Admin/HomeManagement/QuickStats";
import QuickActions from "@/components/Admin/HomeManagement/QuickActions";
import RecentActivity from "@/components/Admin/HomeManagement/RecentActivity";
import ManagementForms from "@/components/Admin/HomeManagement/ManagementForms";
import LivePreview from "@/components/Admin/HomeManagement/LivePreview";

export default function HomeManagement() {
  return (
    <HomeManagementProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pb-20 font-sans">
        
        {/* Top Header */}
        <div className="bg-white/80 dark:bg-black/50 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#185D46] to-[#0f3a2c] rounded-2xl flex items-center justify-center shadow-lg shadow-[#185D46]/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Home Management</h1>
                <p className="text-sm font-medium text-slate-500 dark:text-neutral-400 mt-0.5">Control center for your main landing page.</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search sections..." 
                  className="pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 border-none rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#185D46]/30 transition-all w-64 text-slate-700 dark:text-white placeholder-slate-400"
                />
              </div>
              <button className="p-3 text-slate-500 dark:text-neutral-400 hover:text-[#185D46] dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-[#185D46]/10 dark:hover:bg-white/10 rounded-xl transition-all">
                <RefreshCcw className="w-5 h-5" />
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#185D46] to-[#114332] hover:from-[#134937] hover:to-[#0a2e22] text-white font-bold rounded-xl shadow-lg shadow-[#185D46]/25 hover:shadow-xl hover:shadow-[#185D46]/40 transition-all flex items-center transform hover:-translate-y-0.5">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8 space-y-10">
          {/* Quick Stats */}
          <QuickStats />
          
          {/* Quick Actions */}
          <QuickActions />

          {/* Main Layout */}
          <div className="max-w-5xl mx-auto flex flex-col space-y-8">
            <div className="bg-white dark:bg-[#111] p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Page Sections</h2>
              <ManagementForms />
            </div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </HomeManagementProvider>
  );
}
