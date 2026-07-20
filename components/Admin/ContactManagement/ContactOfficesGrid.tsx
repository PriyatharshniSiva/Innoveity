"use client";

import React from "react";
import { motion } from "framer-motion";
import { useContact } from "./ContactState";
import { GripVertical, Edit2, Trash2, MapPin, Plus } from "lucide-react";

export default function ContactOfficesGrid() {
  const { offices, setOffices, openDrawer } = useContact();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this office?")) {
      setOffices(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Office Locations</h3>
        <button onClick={() => openDrawer("office")} className="text-sm font-bold text-[#185D46] hover:text-[#124634] flex items-center">
          <Plus className="w-4 h-4 mr-1" /> Add Office
        </button>
      </div>
      
      <div className="p-4 space-y-3">
        {offices.map((office, idx) => (
          <motion.div
            key={office.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white rounded-xl p-3 border border-slate-100 hover:border-[#185D46]/30 hover:shadow-md transition-all flex items-center group"
          >
            <div className="px-1 cursor-grab text-slate-300 hover:text-slate-500">
              <GripVertical className="w-5 h-5" />
            </div>

            <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 mx-3" style={{ backgroundColor: `${office.color}15`, color: office.color }}>
              <MapPin className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-slate-800 truncate">{office.name}</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-600">{office.branchType}</span>
              </div>
              <p className="text-sm text-slate-500 truncate">{office.city}</p>
            </div>

            <div className="flex items-center space-x-1 ml-4">
              <button onClick={() => openDrawer("office", office.id)} className="p-2 text-slate-400 hover:text-[#185D46] hover:bg-[#185D46]/10 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(office.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
