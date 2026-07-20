"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Plus, Edit2, Trash2, Image as ImageIcon, FolderKanban } from "lucide-react";

const activities = [
  { id: 1, title: "Added 'Cloud Infrastructure' Service", time: "1 hour ago", icon: Plus, color: "#185D46" },
  { id: 2, title: "Updated 'Faculty Development'", time: "3 hours ago", icon: Edit2, color: "#0ea5e9" },
  { id: 3, title: "Changed Image for 'ESG Consulting'", time: "Yesterday", icon: ImageIcon, color: "#F59E0B" },
  { id: 4, title: "Deleted 'Legacy Systems'", time: "2 days ago", icon: Trash2, color: "#ef4444" },
  { id: 5, title: "Reordered Categories", time: "3 days ago", icon: FolderKanban, color: "#8b5cf6" },
];

export default function ServicesRecentActivity() {
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
