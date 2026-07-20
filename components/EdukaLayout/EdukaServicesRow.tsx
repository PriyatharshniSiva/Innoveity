"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EdukaServicesRow() {
  const services = [
    {
      title: "Educational Solutions",
      description: "Comprehensive training and development programs",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
    },
    {
      title: "Corporate Training",
      description: "Industry-focused skill development programs",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
        </svg>
      ),
    },
    {
      title: "Community Engagement",
      description: "Building bridges between education and industry",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#185D46] border-t border-emerald-950 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#185D46]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold !text-white tracking-tight">
            Our Services
          </h2>
          <p className="text-emerald-100 text-lg font-medium">
            Comprehensive solutions bridging the gap between education and industry
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(24, 93, 70, 0.08)" }}
              className="bg-white rounded-[24px] p-10 text-center border border-slate-100 hover:border-[#185D46]/20 transition-all duration-300 flex flex-col items-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-full cursor-pointer group"
            >
              <div className="w-16 h-16 bg-[#F8FAFC] text-[#185D46] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#185D46] group-hover:text-white transition-all duration-300 border border-slate-100 shadow-sm">
                {srv.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#185D46] mb-4 group-hover:text-[#185D46] transition-colors duration-300">
                {srv.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed font-medium">
                {srv.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
