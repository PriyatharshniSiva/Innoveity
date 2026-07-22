"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Mail, PhoneCall, Send, MapPin, Zap, CheckCircle2 } from "lucide-react";

export default function ContactQuickStats() {
  const stats = [
    { title: "Total Enquiries", value: 0, icon: Send, color: "text-[#185D46]", bg: "bg-primary/10", border: "border-primary/20" },
    { title: "Phone Calls", value: 0, icon: PhoneCall, color: "text-[#F59E0B]", bg: "bg-accent/10", border: "border-accent/20" },
    { title: "Emails Received", value: 0, icon: Mail, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { title: "Office Locations", value: 0, icon: MapPin, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
    { title: "Response Rate", value: 0, suffix: "%", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
    { title: "Active Contacts", value: 0, icon: CheckCircle2, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className={`bg-white rounded-2xl p-5 border ${stat.border} shadow-sm flex items-center space-x-4`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{stat.title}</p>
            <div className="flex items-baseline text-2xl font-black text-slate-800">
              <CountUp end={stat.value} duration={2} separator="," />
              {stat.suffix && <span className="ml-1 text-lg">{stat.suffix}</span>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
