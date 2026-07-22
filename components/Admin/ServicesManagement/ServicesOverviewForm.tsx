"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Plus, Trash2 } from "lucide-react";
import { useServices } from "./ServicesState";

export default function ServicesOverviewForm() {
  const { overview, setOverview } = useServices();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden mb-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 font-sans">Services Overview Section</h3>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
            <div className="p-6 space-y-6">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Main Title</label>
                <input type="text" value={overview.mainTitle} onChange={e => setOverview({...overview, mainTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea rows={4} value={overview.description} onChange={e => setOverview({...overview, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white resize-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">Key Highlights</label>
                <div className="space-y-3">
                  {overview.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 group">
                      <input 
                        type="text" 
                        value={item} 
                        onChange={(e) => {
                          const newHighlights = [...overview.highlights];
                          newHighlights[idx] = e.target.value;
                          setOverview({...overview, highlights: newHighlights});
                        }} 
                        className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm bg-slate-50" 
                      />
                      <button 
                        onClick={() => {
                          const newHighlights = overview.highlights.filter((_, i) => i !== idx);
                          setOverview({...overview, highlights: newHighlights});
                        }}
                        className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setOverview({...overview, highlights: [...overview.highlights, ""]})}
                  className="w-full mt-4 py-3 border-2 border-dashed border-primary/20 text-[#185D46] rounded-xl font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Highlight
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
