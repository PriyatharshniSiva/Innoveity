"use client";

import React from "react";
import { motion } from "framer-motion";
import { Edit3, ImagePlus, Trophy, Users, FileText, MonitorPlay } from "lucide-react";

import { useAboutManagement } from "./AboutManagementState";

const actions = [
  { id: 1, title: "Edit Company Story", icon: Edit3, color: "#185D46", action: "overview" },
  { id: 2, title: "Upload Images", icon: ImagePlus, color: "#0ea5e9", action: "gallery" },
  { id: 3, title: "Add Achievement", icon: Trophy, color: "#F59E0B", action: "journey" },
  { id: 4, title: "Manage Team", icon: Users, color: "#8b5cf6", action: "team" },
  { id: 5, title: "Our Foundation", icon: FileText, color: "#f43f5e", action: "mission" },
  { id: 6, title: "Preview About", icon: MonitorPlay, color: "#eab308", action: "preview" }
];

export default function AboutQuickActions() {
  const { setActiveSection } = useAboutManagement();

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, idx) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(action.action)}
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
