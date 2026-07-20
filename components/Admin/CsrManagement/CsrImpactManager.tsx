"use client";

import React from "react";
import { BarChart, UploadCloud, Edit2 } from "lucide-react";

export default function CsrImpactManager() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Impact Over Time Chart</h3>
        <button className="text-sm font-bold text-blue-500 hover:text-blue-700 flex items-center">
          <Edit2 className="w-4 h-4 mr-1" /> Edit Data
        </button>
      </div>
      <div className="p-12 flex flex-col items-center justify-center text-slate-400">
        <BarChart className="w-12 h-12 mb-4 opacity-50" />
        <p className="font-medium text-slate-500">Interactive chart manager will be integrated here.</p>
      </div>
    </div>
  );
}
