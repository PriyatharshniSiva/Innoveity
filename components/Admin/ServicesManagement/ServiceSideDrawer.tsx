"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServices, ServiceItem } from "./ServicesState";
import { X, ImagePlus, Save } from "lucide-react";

export default function ServiceSideDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, editingServiceId, services, setServices, categories } = useServices();
  const [formData, setFormData] = useState<Partial<ServiceItem>>({});

  useEffect(() => {
    if (editingServiceId) {
      const serviceToEdit = services.find(s => s.id === editingServiceId);
      if (serviceToEdit) {
        setFormData(serviceToEdit);
      }
    } else {
      setFormData({
        title: "",
        description: "",
        categoryId: categories[0]?.id || "",
        iconName: "LayoutTemplate",
        image: "/placeholder-service.jpg",
        status: "Active",
        featured: false,
        buttonText: "Learn More",
        buttonLink: ""
      });
    }
  }, [editingServiceId, isDrawerOpen, services, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Instant live preview sync if editing existing
    if (editingServiceId) {
      setServices(prev => prev.map(s => {
        if (s.id === editingServiceId) {
          return { ...s, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value } as ServiceItem;
        }
        return s;
      }));
    }
  };

  const handleSave = () => {
    if (!editingServiceId) {
      // Add new
      const newService: ServiceItem = {
        ...(formData as ServiceItem),
        id: Math.random().toString(36).substr(2, 9),
        order: services.length + 1
      };
      setServices([...services, newService]);
    }
    setIsDrawerOpen(false);
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
            onClick={() => setIsDrawerOpen(false)}
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
              <h2 className="text-xl font-bold text-slate-800">
                {editingServiceId ? "Edit Service" : "Add New Service"}
              </h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Service Title</label>
                <input 
                  type="text" name="title" value={formData.title || ""} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description</label>
                <textarea 
                  name="description" value={formData.description || ""} onChange={handleChange} rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                  <select 
                    name="categoryId" value={formData.categoryId || ""} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Icon Name</label>
                  <input 
                    type="text" name="iconName" value={formData.iconName || ""} onChange={handleChange}
                    placeholder="e.g. Shield"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Service Image</label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                    {formData.image && formData.image !== "/placeholder-service.jpg" ? (
                       <img src={formData.image} alt="Service" className="w-full h-full object-cover" />
                    ) : (
                       <ImagePlus className="w-8 h-8 text-slate-300" />
                    )}
                  </div>
                  <button className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center transition-colors">
                    Upload New
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Button Text</label>
                  <input 
                    type="text" name="buttonText" value={formData.buttonText || ""} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Button Link</label>
                  <input 
                    type="text" name="buttonLink" value={formData.buttonLink || ""} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Featured Service</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Show this on the Home page</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="featured" checked={formData.featured || false} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F59E0B]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Status</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Toggle visibility</p>
                </div>
                <select 
                  name="status" value={formData.status || "Active"} onChange={handleChange}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold focus:outline-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

            </div>

            <div className="p-6 border-t border-slate-100 bg-white">
              <button 
                onClick={handleSave}
                className="w-full py-3.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all flex items-center justify-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Service
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
