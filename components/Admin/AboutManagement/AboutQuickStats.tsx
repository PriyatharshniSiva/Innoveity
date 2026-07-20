"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { LayoutTemplate, Image as ImageIcon, Trophy, Users, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const data = [
  { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }
];

const stats = [
  { id: 1, title: "About Sections", count: 0, trend: "-", icon: LayoutTemplate, color: "#185D46" },
  { id: 2, title: "Gallery Images", count: 0, trend: "-", icon: ImageIcon, color: "#0ea5e9" },
  { id: 3, title: "Achievements", count: 0, trend: "-", icon: Trophy, color: "#F59E0B" },
  { id: 4, title: "Team Members", count: 0, trend: "-", icon: Users, color: "#8b5cf6" }
];

export default function AboutQuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full whitespace-nowrap">
              <TrendingUp className="w-3 h-3 mr-1" />
              {stat.trend}
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-slate-500 text-sm font-semibold mb-1">{stat.title}</h3>
            <div className="text-3xl font-black text-slate-800">
              <CountUp end={stat.count} separator="," duration={2.5} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`about-gradient-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={stat.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={stat.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke={stat.color} fillOpacity={1} fill={`url(#about-gradient-${stat.id})`} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
