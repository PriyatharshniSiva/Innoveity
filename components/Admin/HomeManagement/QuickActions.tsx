"use client";

import React from "react";
import { motion } from "framer-motion";
import { ImagePlus, MessageSquarePlus, Target, Video, BarChart2, MessageCircleQuestion } from "lucide-react";

import { useHomeManagement } from "./HomeManagementState";

const actions = [
  { id: 1, title: "Add Hero Banner", icon: ImagePlus, color: "#185D46", action: "hero" },
  { id: 2, title: "Upload Journey Image", icon: Video, color: "#0ea5e9", action: "hero" },
  { id: 3, title: "Add Impact Card", icon: Target, color: "#8b5cf6", action: "stats" },
  { id: 4, title: "Add Testimonial", icon: MessageSquarePlus, color: "#f43f5e", action: "testimonials" },
  { id: 5, title: "Add FAQ", icon: MessageCircleQuestion, color: "#eab308", action: "faq" },
  { id: 6, title: "View Analytics", icon: BarChart2, color: "#F59E0B", action: "analytics" }
];

export default function QuickActions() {
  const { setActiveSection } = useHomeManagement();

  return (
    <div className="mb-10 relative z-10">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-sans">Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, idx) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(action.action)}
            className="bg-white dark:bg-[#111] rounded-[20px] p-5 flex flex-col items-center justify-center text-center cursor-pointer border border-slate-100 dark:border-white/5 shadow-lg shadow-slate-200/40 dark:shadow-black/40 hover:shadow-xl hover:shadow-[#185D46]/10 dark:hover:shadow-black/60 transition-all duration-300 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-2xl" style={{ from: action.color, to: 'transparent' }} />
            
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-inner relative z-10"
              style={{ backgroundColor: `${action.color}15`, color: action.color }}
            >
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-neutral-300 group-hover:text-[#185D46] dark:group-hover:text-white transition-colors relative z-10 font-sans">
              {action.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
