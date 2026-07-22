import React from "react";
import { useKnowledgeHub } from "./KnowledgeHubState";
import { Edit2, Eye, Trash2, ImageIcon, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function KnowledgeHubTable() {
  const {
    articles,
    searchQuery,
    categoryFilter,
    statusFilter,
    sortOrder,
    setIsDrawerOpen,
    setEditingArticleId
  } = useKnowledgeHub();

  // Apply Filters & Sorting
  let filtered = [...articles];

  if (searchQuery) {
    const lowerQ = searchQuery.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(lowerQ) || 
      a.instructor.toLowerCase().includes(lowerQ)
    );
  }

  if (categoryFilter !== "All Categories") {
    filtered = filtered.filter(a => a.level === categoryFilter);
  }

  if (statusFilter !== "All Statuses") {
    filtered = filtered.filter(a => a.status === statusFilter);
  }

  filtered.sort((a, b) => {
    if (sortOrder === "Newest") return new Date(b.nextBatch).getTime() - new Date(a.nextBatch).getTime();
    if (sortOrder === "Oldest") return new Date(a.nextBatch).getTime() - new Date(b.nextBatch).getTime();
    if (sortOrder === "Most Viewed") return b.views - a.views;
    return 0;
  });

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider bg-slate-50/50">
              <th className="px-6 py-5 font-bold">Article</th>
              <th className="px-6 py-5 font-bold">Category</th>
              <th className="px-6 py-5 font-bold">Author</th>
              <th className="px-6 py-5 font-bold">Date</th>
              <th className="px-6 py-5 font-bold">Status</th>
              <th className="px-6 py-5 font-bold">Views</th>
              <th className="px-6 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="font-semibold text-slate-600">No articles found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((article, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={article.id} 
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-200">
                        {article.image ? (
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-[#185D46] transition-colors">{article.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{article.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold tracking-wide uppercase">
                      {article.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-700">{article.instructor}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 font-medium">{article.nextBatch}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      article.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' : 'bg-amber-50 text-amber-600 border border-amber-200/50'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${article.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-600">{article.views.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingArticleId(article.id); setIsDrawerOpen(true); }}
                        className="p-2 text-slate-400 hover:text-[#185D46] hover:bg-primary/10 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
