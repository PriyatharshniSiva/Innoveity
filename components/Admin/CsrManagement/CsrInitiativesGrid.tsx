"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCsr } from "./CsrState";
import { GripVertical, Edit2, Trash2, Eye, Star, StarOff, MonitorSmartphone, Leaf, Briefcase, Plus } from "lucide-react";

export default function CsrInitiativesGrid() {
  const { initiatives, setInitiatives, openDrawer } = useCsr();

  const handleToggleFeatured = (id: string) => {
    setInitiatives(prev => prev.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this initiative?")) {
      setInitiatives(prev => prev.filter(s => s.id !== id));
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Leaf": return Leaf;
      case "MonitorSmartphone": return MonitorSmartphone;
      default: return Briefcase;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800">CSR Initiatives</h3>
        <button onClick={() => openDrawer("initiative")} className="text-sm font-bold text-[#185D46] hover:text-[#124634] flex items-center">
          <Plus className="w-4 h-4 mr-1" /> Add New
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        {initiatives.map((ini, idx) => {
          const IconComp = getIcon(ini.iconName);
          return (
            <motion.div
              key={ini.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white rounded-xl p-3 border border-slate-100 hover:border-[#185D46]/30 hover:shadow-md transition-all flex items-center group"
            >
              <div className="px-1 cursor-grab text-slate-300 hover:text-slate-500">
                <GripVertical className="w-5 h-5" />
              </div>

              <div className="w-12 h-12 rounded-lg bg-[#185D46]/10 text-[#185D46] flex items-center justify-center shrink-0 mx-3">
                <IconComp className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-slate-800 truncate">{ini.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">{ini.category}</span>
                  {ini.status === "Hidden" && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-600">Hidden</span>}
                </div>
                <p className="text-sm text-slate-500 truncate">{ini.description}</p>
              </div>

              <div className="flex items-center space-x-1 ml-4">
                <button 
                  onClick={() => handleToggleFeatured(ini.id)}
                  className={`p-2 rounded-lg transition-colors ${ini.featured ? 'text-[#F59E0B] bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20' : 'text-slate-400 hover:text-[#F59E0B] hover:bg-slate-100'}`}
                >
                  {ini.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                </button>
                <button onClick={() => openDrawer("initiative", ini.id)} className="p-2 text-slate-400 hover:text-[#185D46] hover:bg-[#185D46]/10 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(ini.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
