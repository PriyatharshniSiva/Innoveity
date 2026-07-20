"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCsr, InitiativeItem, SdgItem } from "./CsrState";
import { X, Save, ImagePlus } from "lucide-react";

export default function CsrSideDrawer() {
  const { isDrawerOpen, closeDrawer, editingType, editingId, initiatives, setInitiatives, sdgs, setSdgs } = useCsr();
  
  const [initiativeData, setInitiativeData] = useState<Partial<InitiativeItem>>({});
  const [sdgData, setSdgData] = useState<Partial<SdgItem>>({});

  useEffect(() => {
    if (editingType === "initiative") {
      if (editingId) {
        setInitiativeData(initiatives.find(i => i.id === editingId) || {});
      } else {
        setInitiativeData({
          title: "", category: "Environment", description: "", impact: "", status: "Active", featured: false, iconName: "Leaf"
        });
      }
    } else if (editingType === "sdg") {
      if (editingId) {
        setSdgData(sdgs.find(s => s.id === editingId) || {});
      } else {
        setSdgData({
          number: 1, title: "", description: "", color: "#185D46", status: "Active"
        });
      }
    }
  }, [editingType, editingId, initiatives, sdgs]);

  const handleInitiativeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setInitiativeData(prev => ({ ...prev, [name]: val }));

    if (editingId) {
      setInitiatives(prev => prev.map(i => i.id === editingId ? { ...i, [name]: val } as InitiativeItem : i));
    }
  };

  const handleSdgChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let val: string | number | boolean = value;
    if (type === 'checkbox') val = (e.target as HTMLInputElement).checked;
    if (name === 'number') val = parseInt(value, 10);
    
    setSdgData(prev => ({ ...prev, [name]: val }));

    if (editingId) {
      setSdgs(prev => prev.map(s => s.id === editingId ? { ...s, [name]: val } as SdgItem : s));
    }
  };

  const handleSave = () => {
    if (editingType === "initiative" && !editingId) {
      const newInit = { ...initiativeData, id: Math.random().toString(36).substr(2, 9), order: initiatives.length + 1 } as InitiativeItem;
      setInitiatives([...initiatives, newInit]);
    } else if (editingType === "sdg" && !editingId) {
      const newSdg = { ...sdgData, id: Math.random().toString(36).substr(2, 9), order: sdgs.length + 1 } as SdgItem;
      setSdgs([...sdgs, newSdg]);
    }
    closeDrawer();
  };

  const getTitle = () => {
    if (editingType === "initiative") return editingId ? "Edit Initiative" : "Add Initiative";
    if (editingType === "sdg") return editingId ? "Edit SDG" : "Add SDG";
    if (editingType === "chart") return "Manage Impact Charts";
    if (editingType === "gallery") return "Manage Gallery";
    return "";
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div key="drawer-overlay-wrapper" className="fixed inset-0 z-50 flex justify-end">
          <motion.div 
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div 
            key="drawer-content"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">{getTitle()}</h2>
              <button onClick={closeDrawer} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {editingType === "initiative" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                    <input type="text" name="title" value={initiativeData.title || ""} onChange={handleInitiativeChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea name="description" value={initiativeData.description || ""} onChange={handleInitiativeChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Key Impact</label>
                    <input type="text" name="impact" value={initiativeData.impact || ""} onChange={handleInitiativeChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                      <select name="status" value={initiativeData.status || "Active"} onChange={handleInitiativeChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white">
                        <option value="Active">Active</option>
                        <option value="Hidden">Hidden</option>
                      </select>
                    </div>
                    <div className="flex items-center mt-8">
                      <input type="checkbox" name="featured" checked={initiativeData.featured || false} onChange={handleInitiativeChange} className="w-5 h-5 rounded border-slate-300 text-[#185D46] focus:ring-[#185D46]" />
                      <span className="ml-2 text-sm font-semibold text-slate-700">Featured</span>
                    </div>
                  </div>
                </>
              )}

              {editingType === "sdg" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">SDG Number</label>
                      <input type="number" name="number" value={sdgData.number || 1} onChange={handleSdgChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Color</label>
                      <input type="color" name="color" value={sdgData.color || "#185D46"} onChange={handleSdgChange} className="w-full h-12 rounded-xl border border-slate-200 cursor-pointer p-1" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Goal Title</label>
                    <input type="text" name="title" value={sdgData.title || ""} onChange={handleSdgChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea name="description" value={sdgData.description || ""} onChange={handleSdgChange} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all resize-none" />
                  </div>
                </>
              )}

              {editingType === "chart" && (
                <div className="text-center py-12 text-slate-500">Chart editor coming soon...</div>
              )}
              
              {editingType === "gallery" && (
                <div className="text-center py-12 text-slate-500">Gallery manager coming soon...</div>
              )}
            </div>

            {(editingType === "initiative" || editingType === "sdg") && (
              <div className="p-6 border-t border-slate-100 bg-white">
                <button 
                  onClick={handleSave}
                  className="w-full py-3.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
