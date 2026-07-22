"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function EdukaJourneyTimeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const journeySteps = [
    {
      year: "2018",
      title: "Foundation",
      description: "INNOVEITY was founded with a vision to transform education.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
      )
    },
    {
      year: "2019",
      title: "First 1000",
      description: "1500+ students successfully trained across various programs.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
      )
    },
    {
      year: "2020",
      title: "Digital Pivot",
      description: "Adapted to digital learning during pandemic, reaching 2000+ students.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
      )
    },
    {
      year: "2021",
      title: "Corporate Expansion",
      description: "Expanded to corporate training with 35+ industry partners.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"></path></svg>
      )
    },
    {
      year: "2022",
      title: "National Reach",
      description: "Established presence across India.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      year: "2023",
      title: "ESG Focus",
      description: "Launched comprehensive ESG and sustainability programs.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      )
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description: "50,000+ minds stimulated, 120+ corporate clients, 35+ institution partnerships.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={containerRef}>
      
      {/* Soft Background Accents */}
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="text-4xl sm:text-5xl font-extrabold text-[#185D46] tracking-tight"
          >
            Our Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
          >
            Key milestones in our mission to transform education and industry across India.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full hidden sm:block" />
          
          {/* Animated Central Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#185D46] to-[#F59E0B] -translate-x-1/2 rounded-full hidden sm:block origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16 sm:space-y-24">
            {journeySteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col sm:flex-row items-center ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                  
                  {/* Center Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#185D46] -translate-x-1/2 z-20 shadow-lg hidden sm:block"
                  />

                  {/* Empty space for alternating layout */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
                    className={`w-full sm:w-1/2 pl-12 pr-4 sm:px-12 ${isEven ? 'text-left sm:text-left' : 'text-left sm:text-right'}`}
                  >
                    <div className={`bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(20,121,107,0.12)] border border-slate-100/50 transition-all duration-500 hover:-translate-y-2 relative group flex flex-col ${isEven ? 'items-start sm:items-start' : 'items-start sm:items-end'}`}>
                      
                      {/* Decorative Line on Hover */}
                      <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-[#185D46] to-[#F59E0B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isEven ? 'left-0 origin-left' : 'right-0 origin-right'}`} />

                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-slate-50 text-[#185D46] flex items-center justify-center group-hover:bg-[#185D46] group-hover:text-white transition-colors duration-500 shadow-sm group-hover:scale-110 group-hover:-rotate-6">
                          {step.icon}
                        </div>
                        <span className="text-4xl font-black text-[#185D46] group-hover:text-[#F59E0B] transition-colors duration-300">
                          {step.year}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#185D46] transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      <p className="text-slate-500 leading-relaxed font-medium">
                        {step.description}
                      </p>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
