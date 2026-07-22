import React from "react";
import { Search, Filter, SortDesc } from "lucide-react";
import { useKnowledgeHub } from "./KnowledgeHubState";

export default function KnowledgeHubToolbar() {
  const {
    searchQuery, setSearchQuery,
    categoryFilter, setCategoryFilter,
    statusFilter, setStatusFilter,
    sortOrder, setSortOrder,
    articles
  } = useKnowledgeHub();

  // Extract unique categories from articles for the dropdown
  const uniqueCategories = ["All Categories", ...Array.from(new Set(articles.map(a => a.level)))];

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col xl:flex-row gap-4 items-center justify-between">
      
      {/* Search */}
      <div className="relative w-full xl:w-96 flex-shrink-0 group">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#185D46] transition-colors" />
        <input 
          type="text" 
          placeholder="Search articles by title or author..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white text-sm font-medium text-slate-700"
        />
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
        
        {/* Category Filter */}
        <div className="relative flex-1 sm:flex-none">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-44 pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative flex-1 sm:flex-none">
          <div className="w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 bg-amber-500 pointer-events-none" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-40 pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {/* Sort */}
        <div className="relative flex-1 sm:flex-none">
          <SortDesc className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="w-full sm:w-40 pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Most Viewed">Most Viewed</option>
          </select>
        </div>
        
      </div>
    </div>
  );
}
