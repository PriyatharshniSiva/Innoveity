"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, Mail, GraduationCap, FolderOpen, Newspaper, Star, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const data = [
  { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
];

const stats = [
  { id: 1, title: "Total Visitors", count: 0, trend: "0%", icon: Users, color: "var(--color-primary)" },
  { id: 2, title: "Enquiries", count: 0, trend: "0%", icon: Mail, color: "var(--color-accent)" },
  { id: 3, title: "Courses", count: 0, trend: "0%", icon: GraduationCap, color: "#0ea5e9" },
  { id: 4, title: "Case Studies", count: 0, trend: "0%", icon: FolderOpen, color: "#8b5cf6" },
  { id: 5, title: "Blogs", count: 0, trend: "0%", icon: Newspaper, color: "#f43f5e" },
  { id: 6, title: "Testimonials", count: 0, trend: "0%", icon: Star, color: "#eab308" }
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-[#111] rounded-[24px] p-6 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/40 dark:shadow-black/40 relative overflow-hidden group cursor-pointer"
        >
          {/* Subtle background glow effect on hover */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: stat.color }}
          />

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div 
              className="w-14 h-14 rounded-[18px] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
              {stat.trend}
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-slate-500 dark:text-neutral-400 text-sm font-bold uppercase tracking-wider mb-2 font-sans">{stat.title}</h3>
            <div className="text-4xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
              <CountUp end={stat.count} separator="," duration={2.5} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.15] group-hover:opacity-[0.35] transition-opacity duration-500 pointer-events-none translate-y-4 group-hover:translate-y-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`gradient-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={stat.color} stopOpacity={1}/>
                    <stop offset="100%" stopColor={stat.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke={stat.color} fillOpacity={1} fill={`url(#gradient-${stat.id})`} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
