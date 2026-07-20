"use client";

import React from "react";
import { useCsr } from "./CsrState";
import { Plus, Target, BarChart2, Image as ImageIcon } from "lucide-react";

export default function CsrToolbar() {
  const { openDrawer } = useCsr();

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <button 
        onClick={() => openDrawer("initiative")}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all"
      >
        <Plus className="w-4 h-4 text-[#185D46]" />
        Add Initiative
      </button>

      <button 
        onClick={() => openDrawer("sdg")}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all"
      >
        <Target className="w-4 h-4 text-[#F59E0B]" />
        Manage SDGs
      </button>

      <button 
        onClick={() => openDrawer("chart")}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all"
      >
        <BarChart2 className="w-4 h-4 text-blue-500" />
        Update Charts
      </button>

      <button 
        onClick={() => openDrawer("gallery")}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all"
      >
        <ImageIcon className="w-4 h-4 text-purple-500" />
        Manage Gallery
      </button>
    </div>
  );
}
