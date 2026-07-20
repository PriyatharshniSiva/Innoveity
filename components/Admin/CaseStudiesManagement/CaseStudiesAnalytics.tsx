"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCaseStudies } from "./CaseStudiesState";
import { FileText, Globe, Play, TrendingUp, Building2, CheckCircle2 } from "lucide-react";

export default function CaseStudiesAnalytics() {
  const { caseStudies } = useCaseStudies();

  const total = caseStudies.length;
  const published = caseStudies.filter(c => c.status === "Published").length;
  const draft = caseStudies.filter(c => c.status === "Draft").length;
  
  // Mock aggregations for demo purposes
  const totalViews = caseStudies.reduce((acc, curr) => acc + curr.views, 0);
  const avgPlacement = "75%";
  const partnerInstitutions = 52;

  const stats = [
    {
      title: "Total Case Studies",
      value: total.toString(),
      change: "+12% from last month",
      trend: "up",
      icon: FileText,
      color: "from-blue-500/20 to-blue-500/5",
      textColor: "text-blue-600",
      iconBg: "bg-blue-100"
    },
    {
      title: "Published Stories",
      value: published.toString(),
      change: "+3 new this week",
      trend: "up",
      icon: CheckCircle2,
      color: "from-[#185D46]/20 to-[#185D46]/5",
      textColor: "text-[#185D46]",
      iconBg: "bg-[#185D46]/10"
    },
    {
      title: "Total Video Views",
      value: totalViews.toLocaleString(),
      change: "+1,200 this week",
      trend: "up",
      icon: Play,
      color: "from-rose-500/20 to-rose-500/5",
      textColor: "text-rose-600",
      iconBg: "bg-rose-100"
    },
    {
      title: "Avg. Placement Boost",
      value: avgPlacement,
      change: "+5% vs 2022",
      trend: "up",
      icon: TrendingUp,
      color: "from-amber-500/20 to-amber-500/5",
      textColor: "text-amber-600",
      iconBg: "bg-amber-100"
    },
    {
      title: "Partner Institutions",
      value: partnerInstitutions.toString(),
      change: "+2 new this month",
      trend: "up",
      icon: Building2,
      color: "from-purple-500/20 to-purple-500/5",
      textColor: "text-purple-600",
      iconBg: "bg-purple-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`relative p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group hover:-translate-y-1 transition-all duration-300`}
          >
            {/* Background Gradient Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                {/* Mini Chart Placeholder */}
                <div className="w-16 h-8 opacity-50 flex items-end justify-between space-x-1">
                  {[40, 70, 45, 90, 65, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: idx * 0.1 + i * 0.05, duration: 0.5 }}
                      className={`w-1.5 rounded-t-sm ${stat.iconBg.replace('bg-', 'bg-').replace('/10', '/40')}`}
                    />
                  ))}
                </div>
              </div>
              
              <h3 className="text-slate-500 text-sm font-semibold mb-1">{stat.title}</h3>
              <p className="text-3xl font-black text-slate-800 tracking-tight mb-2">{stat.value}</p>
              
              <div className="mt-auto">
                <p className={`text-xs font-medium ${stat.textColor} flex items-center`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
