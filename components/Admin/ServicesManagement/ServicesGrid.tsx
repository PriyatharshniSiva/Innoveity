"use client";

import React from "react";
import { motion } from "framer-motion";
import { useServices } from "./ServicesState";
import { GripVertical, Edit2, Trash2, Copy, Eye, Star, StarOff, Image as ImageIcon } from "lucide-react";
import * as Icons from "lucide-react";

export default function ServicesGrid() {
  const { services, setServices, setIsDrawerOpen, setEditingServiceId, searchQuery, categoryFilter, categories } = useServices();

  const handleEdit = (id: string) => {
    setEditingServiceId(id);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleToggleFeatured = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, featured: !s.featured } : s));
  };

  // Filter services
  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || s.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {filteredServices.map((service, idx) => {
        // @ts-ignore
        const IconComponent = Icons[service.iconName] || Icons.LayoutTemplate;
        const categoryName = categories.find(c => c.id === service.categoryId)?.name || "Unknown";
        
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(24,93,70,0.08)] hover:border-[#185D46]/20 transition-all duration-300 flex items-center group"
          >
            {/* Drag Handle */}
            <div className="px-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 transition-colors">
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Icon / Image Thumbnail */}
            <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 ml-2 relative overflow-hidden group-hover:border-[#185D46]/30 transition-colors">
              {service.image && service.image !== "/placeholder-service.jpg" ? (
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <IconComponent className="w-7 h-7 text-[#185D46]" />
              )}
            </div>

            {/* Content */}
            <div className="ml-5 flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                <h3 className="text-base font-bold text-slate-800 dark:text-neutral-200 group-hover:text-[#185D46] dark:group-hover:text-white transition-colors truncate">
                  {service.title}
                </h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                    {categoryName}
                  </span>
                  {service.status === "Hidden" && (
                    <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-wider">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-neutral-500 truncate">{service.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 ml-4">
              <button 
                onClick={() => handleToggleFeatured(service.id)}
                className={`p-2 rounded-lg transition-colors ${service.featured ? 'text-[#F59E0B] bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20' : 'text-slate-400 hover:text-[#F59E0B] hover:bg-slate-100'}`}
                title={service.featured ? "Remove from Featured" : "Mark as Featured"}
              >
                {service.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
              </button>
              
              <div className="w-px h-6 bg-slate-200 mx-1"></div>

              <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Preview">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Duplicate">
                <Copy className="w-4 h-4" />
              </button>
              <button onClick={() => handleEdit(service.id)} className="p-2 text-slate-400 hover:text-[#185D46] hover:bg-[#185D46]/10 rounded-lg transition-colors" title="Edit">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(service.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        );
      })}

      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No services found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}
