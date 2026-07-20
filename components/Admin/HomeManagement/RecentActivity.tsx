"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Image as ImageIcon, GraduationCap, FileText, CheckCircle2, ChevronRight } from "lucide-react";

const activities = [
  { id: 1, title: "Home Page Hero updated", time: "2 hours ago", icon: CheckCircle2, color: "#185D46" },
  { id: 2, title: "Uploaded 3 Journey Images", time: "5 hours ago", icon: ImageIcon, color: "#0ea5e9" },
  { id: 3, title: "Added new course: Problem Solving", time: "1 day ago", icon: GraduationCap, color: "#F59E0B" },
  { id: 4, title: "Published blog: Future of ESG", time: "2 days ago", icon: FileText, color: "#8b5cf6" },
];

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-[#111] rounded-[24px] p-6 lg:p-8 shadow-sm border border-slate-200 dark:border-white/5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-slate-50 to-transparent dark:from-white/5 pointer-events-none rounded-bl-full" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center font-sans tracking-tight">
          <Clock className="w-5 h-5 mr-2.5 text-[#185D46] dark:text-emerald-400" />
          Recent Activity
        </h2>
        <Link href="/admin/activity" className="text-sm font-bold text-[#185D46] dark:text-emerald-400 hover:text-[#114332] dark:hover:text-emerald-300 transition-colors flex items-center group">
          View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative pl-5 space-y-7 z-10">
        {/* Vertical Line */}
        <div className="absolute left-[29px] top-2 bottom-2 w-[2px] bg-slate-100 dark:bg-white/10 rounded-full" />

        {activities.map((activity, idx) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex items-start relative group"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white dark:border-[#111] shadow-sm relative z-10 transition-transform group-hover:scale-110 duration-300"
              style={{ backgroundColor: `${activity.color}20`, color: activity.color }}
            >
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="ml-5 pt-0.5 group-hover:translate-x-1 transition-transform duration-300">
              <p className="text-slate-800 dark:text-neutral-200 font-bold text-sm font-sans">{activity.title}</p>
              <p className="text-slate-500 dark:text-neutral-500 text-xs mt-1.5 font-medium flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {activity.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
