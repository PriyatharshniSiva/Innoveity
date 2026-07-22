"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EdukaPresence({ data }: { data?: any }) {
  const presenceItems = data?.list || [
    {
      title: "Global Standards",
      description: "International best practices and partnerships with world-leading corporates.",
      iconName: "Globe"
    },
    {
      title: "Pan-India Reach",
      description: "Serving educational institutions and industries across all major cities in India.",
      iconName: "MapPin"
    },
    {
      title: "Strong Network",
      description: "Extensive network of world-leading corporate partners and 50+ academic institutions.",
      iconName: "Users"
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
        </svg>
      );
      case 'MapPin': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
      case 'Users': return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <section className="pt-[50px] pb-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden text-slate-800 border-t border-slate-100">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div className="space-y-12 text-left">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-black text-[var(--color-brand-primary, #0F172A)] tracking-tight"
            >
              {(() => {
                const text = data?.title || "Our Presence";
                if (typeof text === 'string' && text.includes("Our ")) {
                  const parts = text.split("Our ");
                  return (
                    <>
                      {parts[0]}
                      <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Our </span>
                      {parts.slice(1).join("Our ")}
                    </>
                  );
                }
                return text;
              })()}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-gray-500 text-lg leading-relaxed font-medium"
            >
              {data?.subtitle || "Nationwide network of partnerships and collaborations with strong regional hubs across Tamil Nadu."}
            </motion.p>
          </div>

          <div className="space-y-8">
            {presenceItems.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex items-start gap-6 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-slate-50 text-[#185D46] rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-[#185D46] group-hover:text-white group-hover:border-transparent transition-all duration-300 group-hover:scale-110 shadow-sm">
                  {getIcon(item.iconName)}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#185D46] group-hover:text-[#185D46] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Map Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-[#F8FAFC] border border-slate-100 shadow-xl p-4 flex items-center justify-center group"
        >
          <img
            src="/tamil_nadu_map.png"
            alt="INNOVATION ECOSYSTEM: TAMIL NADU"
            className="w-full h-full object-cover rounded-2xl group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        </motion.div>
      </div>
    </section>
  );
}
