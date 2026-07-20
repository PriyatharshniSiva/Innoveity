"use client";

import React from "react";
import { Construction } from "lucide-react";

export default function RolesManagement() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-[#185D46]/10 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Construction className="w-10 h-10 text-[#185D46]" />
      </div>
      <h1 className="text-3xl font-black text-slate-800 tracking-tight">Roles Management</h1>
      <p className="text-slate-500 mt-3 max-w-md">This module is currently under development. Soon you will be able to manage all roles content directly from this beautiful interface.</p>
    </div>
  );
}
