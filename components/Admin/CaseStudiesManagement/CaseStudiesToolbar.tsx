"use client";

import React from "react";
import { Search, Filter, LayoutGrid, List } from "lucide-react";
import { useCaseStudies } from "./CaseStudiesState";

export default function CaseStudiesToolbar() {
  const { 
    searchQuery, setSearchQuery, 
    categoryFilter, setCategoryFilter,
    statusFilter, setStatusFilter,
    viewMode, setViewMode
  } = useCaseStudies();

  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 relative z-10">
      
      {/* Search */}
      <div className="relative w-full md:w-96">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          placeholder="Search case studies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium"
        />
      </div>

      <div className="flex items-center space-x-3 w-full md:w-auto">
        {/* Filters */}
        <div className="flex items-center space-x-2 flex-grow md:flex-grow-0">
          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 transition-colors text-sm font-semibold text-slate-700 appearance-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Faculty Development">Faculty Development</option>
              <option value="Corporate Training">Corporate Training</option>
              <option value="ESG Consulting">ESG Consulting</option>
            </select>
          </div>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 transition-colors text-sm font-semibold text-slate-700 appearance-none cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setViewMode("Grid")}
            className={`p-2 rounded-lg transition-all ${viewMode === "Grid" ? "bg-white shadow-sm text-[#185D46]" : "text-slate-400 hover:text-slate-600"}`}
            title="Grid View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode("Table")}
            className={`p-2 rounded-lg transition-all ${viewMode === "Table" ? "bg-white shadow-sm text-[#185D46]" : "text-slate-400 hover:text-slate-600"}`}
            title="Table View"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
