"use client";

import React from "react";
import { Plus } from "lucide-react";
import { KnowledgeHubProvider, useKnowledgeHub } from "@/components/Admin/KnowledgeHubManagement/KnowledgeHubState";
import KnowledgeHubToolbar from "@/components/Admin/KnowledgeHubManagement/KnowledgeHubToolbar";
import KnowledgeHubTable from "@/components/Admin/KnowledgeHubManagement/KnowledgeHubTable";
import KnowledgeHubDrawer from "@/components/Admin/KnowledgeHubManagement/KnowledgeHubDrawer";

function KnowledgeHubContent() {
  const { setIsDrawerOpen, setEditingArticleId } = useKnowledgeHub();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-800">Knowledge Hub Management</h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">Manage your premium blog, success stories, metrics, and publishing from one place.</p>
        </div>
        <button 
          onClick={() => { setEditingArticleId(null); setIsDrawerOpen(true); }}
          className="flex items-center gap-2 bg-[#185D46] hover:bg-[#124634] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-[#185D46]/20 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          Add New Article
        </button>
      </div>

      <KnowledgeHubToolbar />
      <KnowledgeHubTable />
      <KnowledgeHubDrawer />
      
    </div>
  );
}

export default function AdminKnowledgeHub() {
  return (
    <KnowledgeHubProvider>
      <KnowledgeHubContent />
    </KnowledgeHubProvider>
  );
}
