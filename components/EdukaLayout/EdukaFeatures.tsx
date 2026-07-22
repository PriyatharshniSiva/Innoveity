"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface EdukaFeaturesProps {
  features: FeatureItem[];
}

export default function EdukaFeatures({ features }: EdukaFeaturesProps) {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-24 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
            whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(24, 93, 70, 0.12)" }}
            className="eduka-card p-8 text-center group cursor-pointer relative overflow-hidden border border-slate-100 hover:border-primary/30 transition-all duration-300 rounded-2xl bg-white"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#185D46] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            
            <div className="w-16 h-16 mx-auto bg-slate-50 text-[#185D46] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#185D46] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md transform group-hover:scale-110">
               {feature.icon}
            </div>
            
            <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#185D46] transition-colors duration-300">
              {feature.title}
            </h3>
            
            <p className="text-slate-500 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
