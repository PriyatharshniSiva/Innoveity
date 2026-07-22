"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Edit3, Image as ImageIcon, Trophy, Target } from "lucide-react";

const activities = [
  { id: 1, title: "Updated Company Story", time: "1 hour ago", icon: Edit3, color: "var(--color-primary)" },
  { id: 2, title: "Uploaded 2 Gallery Images", time: "3 hours ago", icon: ImageIcon, color: "#0ea5e9" },
  { id: 3, title: "Added New Achievement", time: "Yesterday", icon: Trophy, color: "var(--color-accent)" },
  { id: 4, title: "Modified Mission Statement", time: "2 days ago", icon: Target, color: "#8b5cf6" },
];

export default function AboutRecentActivity() {
  return (
    <div className="bg-white rounded-[24px] p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-[#185D46]" />
          Recent Activity
        </h2>
        <Link href="/admin/activity" className="text-sm font-semibold text-[#185D46] hover:underline">View All</Link>
      </div>

      <div className="relative pl-4 space-y-6">
        {/* Vertical Line */}
        <div className="absolute left-[23px] top-2 bottom-2 w-px bg-slate-200"></div>

        {activities.map((activity, idx) => (
          <motion.div 
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex items-start relative z-10"
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm"
              style={{ backgroundColor: `${activity.color}15`, color: activity.color }}
            >
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="ml-4 mt-1">
              <p className="text-slate-700 font-semibold text-sm">{activity.title}</p>
              <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
