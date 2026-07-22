"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCaseStudies } from "./CaseStudiesState";
import { Play, MoreHorizontal, Edit2, Copy, Eye, Trash2, Globe, Clock } from "lucide-react";
import Image from "next/image";

export default function CaseStudiesGrid() {
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
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
    >
      <AnimatePresence>
        {filteredStudies.map((study, idx) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              {study.thumbnail ? (
                <img 
                  src={study.thumbnail} 
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
              )}
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${study.status === 'Published' ? 'bg-primary/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                  {study.status}
                </span>
                {study.featured && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-[#185D46] backdrop-blur-md">
                    Featured
                  </span>
                )}
              </div>

              {/* Video Indicator */}
              {(study.video || study.youtubeUrl) && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              )}

              {/* Quick Actions Dropdown (Simulated via hover for simplicity, or just simple buttons on hover) */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-1 flex items-center space-x-1 shadow-lg border border-white/50">
                  <button onClick={() => { setEditingCaseStudyId(study.id); setIsDrawerOpen(true); }} className="p-2 text-slate-600 hover:text-[#185D46] hover:bg-white rounded-lg transition-colors" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors" title="Preview">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-800 leading-snug mb-2 mt-4 line-clamp-2 group-hover:text-[#185D46] transition-colors">{study.title}</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2">{study.challenge}</p>
              
              {/* Key Results */}
              <div className="mt-auto space-y-4">
                <div className="flex flex-wrap gap-2">
                  {study.keyResults.slice(0, 2).map((res, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                      {res.value}{res.suffix} {res.label}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center text-xs font-medium text-slate-400">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {new Date(study.publishedDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-xs font-bold text-[#185D46]">
                    <Globe className="w-3.5 h-3.5 mr-1.5" />
                    {study.views.toLocaleString()} views
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredStudies.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-500 font-medium">
            No case studies found matching your criteria.
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
