"use client";

import React from "react";
import { useServices } from "./ServicesState";
import { Search, Filter, SortDesc } from "lucide-react";

export default function ServicesToolbar() {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, categories } = useServices();

  return (
    <div className="bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      
      <div className="relative flex-1 max-w-md">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search services by name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all"
        />
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#185D46]/20 focus-within:border-[#185D46] transition-all">
          <Filter className="w-4 h-4 text-slate-400 mr-2" />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#185D46]/20 focus-within:border-[#185D46] transition-all">
          <SortDesc className="w-4 h-4 text-slate-400 mr-2" />
          <select 
            className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="order">Display Order</option>
            <option value="newest">Newest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
      
    </div>
  );
}
