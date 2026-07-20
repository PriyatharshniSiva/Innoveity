"use client";

import React from "react";
import { useContact } from "./ContactState";
import { Plus, MapPin, Mail, Settings, Download } from "lucide-react";

export default function ContactToolbar() {
  const { openDrawer } = useContact();

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <button 
        onClick={() => openDrawer("office")}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all"
      >
        <MapPin className="w-4 h-4 text-[#185D46]" />
        Add Office
      </button>

      <button 
        onClick={() => openDrawer("settings")}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all"
      >
        <Settings className="w-4 h-4 text-[#F59E0B]" />
        General Settings
      </button>

      <button 
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all"
      >
        <Mail className="w-4 h-4 text-blue-500" />
        View Enquiries
      </button>

      <button 
        className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-200 transition-all ml-auto"
      >
        <Download className="w-4 h-4 text-slate-400" />
        Export CSV
      </button>
    </div>
  );
}
