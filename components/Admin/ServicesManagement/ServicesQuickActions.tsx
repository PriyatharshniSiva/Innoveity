"use client";

import React from "react";
import { motion } from "framer-motion";
import { useServices } from "./ServicesState";
import { Plus, ImagePlus, FolderKanban, Star, BarChart3 } from "lucide-react";

export default function ServicesQuickActions() {
  const { setIsDrawerOpen, setEditingServiceId } = useServices();

  const handleAddService = () => {
    setEditingServiceId(null);
    setIsDrawerOpen(true);
  };

  const actions = [
    { id: 1, title: "Add Service", icon: Plus, color: "#185D46", onClick: handleAddService },
    { id: 2, title: "Upload Image", icon: ImagePlus, color: "#0ea5e9", onClick: () => {} },
    { id: 3, title: "Manage Categories", icon: FolderKanban, color: "#F59E0B", onClick: () => {} },
    { id: 4, title: "Featured Services", icon: Star, color: "#eab308", onClick: () => {} },
    { id: 5, title: "Service Analytics", icon: BarChart3, color: "#8b5cf6", onClick: () => {} }
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action, idx) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgb(24,93,70,0.1)] transition-shadow duration-300 group"
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:rotate-12"
              style={{ backgroundColor: `${action.color}15`, color: action.color }}
            >
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-[#185D46] transition-colors leading-tight">
              {action.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
