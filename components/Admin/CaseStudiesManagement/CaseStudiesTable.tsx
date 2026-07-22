"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCaseStudies } from "./CaseStudiesState";
import { Play, Edit2, Copy, Eye, Trash2, MoreHorizontal } from "lucide-react";

export default function CaseStudiesTable() {
  const { 
    caseStudies, 
    searchQuery, 
    categoryFilter, 
    statusFilter,
    setEditingCaseStudyId,
    setIsDrawerOpen
  } = useCaseStudies();

  // Filter logic
  const filteredStudies = caseStudies.filter(study => {
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          study.institutionType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || study.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || study.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Case Study</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Institution</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Media</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudies.map((study, idx) => (
              <motion.tr 
                key={study.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 relative border border-slate-200">
                      {study.thumbnail ? (
                        <img src={study.thumbnail} alt={study.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">No Img</div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 line-clamp-1 group-hover:text-[#185D46] transition-colors">{study.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{new Date(study.publishedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-700">{study.institutionType}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                    {study.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {study.video || study.youtubeUrl ? (
                      <span className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md border border-rose-100">
                        <Play className="w-3 h-3 mr-1" /> Video
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">Image Only</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${study.status === 'Published' ? 'bg-primary/10 text-[#185D46] border border-primary/20' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                    {study.status === 'Published' ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-[#185D46] mr-1.5" /> Published</>
                    ) : (
                      <><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" /> Draft</>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingCaseStudyId(study.id); setIsDrawerOpen(true); }} className="p-2 text-slate-400 hover:text-[#185D46] hover:bg-primary/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {filteredStudies.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-slate-500 font-medium">
                  No case studies found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
