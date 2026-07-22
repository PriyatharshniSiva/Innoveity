"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import EdukaTestimonials from '@/components/EdukaLayout/EdukaTestimonials';

export default function AboutClient({ initialData, testimonials }: { initialData: any, testimonials: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [overview, setOverview] = useState<any>(initialData?.overview || {
    titleLine1: "About",
    titleHighlight: "INNOVEITY",
    description: [
      "INNOVEITY is a forward-looking organization that connects global technology and innovation directly to students by working closely with world-leading corporates such as BMW, Caterpillar, and many others.",
      "Our mission is to ensure that students gain access to international standards, advanced technologies, and industry practices that prepare them for the future of work.",
      "Through strategic partnerships with educational institutions and industry leaders, we create comprehensive training programs, development initiatives, and sustainable solutions that bridge the gap between academia and real-world application."
    ],
    featuredImage: "/inv4.jpg"
  });

  const [missionVision, setMissionVision] = useState<any>(initialData?.missionVision || {
    mission: "To bridge the gap between education and industry through innovative solutions and sustainable practices.",
    vision: "To become the global gold standard for educational integration, where the boundary between classroom and career ceases to exist.",
    values: "Innovation, Integrity, Excellence, Sustainability, and Collaborative Growth."
  });

  const [journeySteps, setJourneySteps] = useState<any[]>(initialData?.journey || [
    { year: "2018", title: "Foundation", description: "INNOVEITY was founded with a vision to transform education.", iconName: "Building" },
    { year: "2019", title: "First 1000", description: "1500+ students successfully trained across various programs.", iconName: "Users" },
    { year: "2020", title: "Digital Pivot", description: "Adapted to digital learning during pandemic, reaching 2000+ students.", iconName: "Laptop" },
    { year: "2021", title: "Corporate Expansion", description: "Expanded to corporate training with 35+ industry partners.", iconName: "Briefcase" },
    { year: "2022", title: "National Reach", description: "Established presence across India.", iconName: "MapPin" },
    { year: "2023", title: "ESG Focus", description: "Launched comprehensive ESG and sustainability programs.", iconName: "Leaf" },
    { year: "2024", title: "Innovation Hub", description: "50,000+ minds stimulated, 120+ corporate clients, 35+ institution partnerships.", iconName: "Lightbulb" }
  ]);

  const [strengths, setStrengths] = useState<any[]>(initialData?.strengths || [
    { title: "Proven Expertise", description: "6+ years of experience in educational innovation and industry partnerships", iconName: "Award" },
    { title: "Strong Network", description: "Extensive network of educational institutions and corporate partners across India", iconName: "Globe" },
    { title: "Innovation Focus", description: "Cutting-edge solutions combining technology, sustainability, and practical skills", iconName: "Lightbulb" }
  ]);

  const getIconSvg = (name: string, className: string = "w-6 h-6") => {
    // Dynamic icon lookup logic can go here. For simplicity, falling back to basic icons.
    return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
  };

  return (
    <div className="bg-white min-h-screen text-[#0F172A] selection:bg-[#185D46] selection:text-white">
      
      {/* 1. Hero / About Split */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#185D4620] rounded-full blur-[120px] opacity-50 -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#185D4620] rounded-full blur-[100px] opacity-40 -z-10 -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <h1 className="text-5xl sm:text-6xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
                {overview?.titleLine1 || "About"} <span className="text-[#185D46]">{overview?.titleHighlight || "INNOVEITY"}</span>
              </h1>
              
              <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                {overview?.description?.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgb(22,163,74,0.15)] aspect-[4/3] group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              {overview?.featuredImage && <img src={overview.featuredImage} alt="About" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Mission Grid */}
      <section className="pt-8 pb-24 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl sm:text-5xl font-extrabold text-[var(--color-brand-primary, #0F172A)] tracking-tight"
            >
              <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Our </span>Foundation
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto font-medium"
            >
              The core principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Our Mission", description: missionVision?.mission || "", iconName: "Target" },
              { title: "Our Vision", description: missionVision?.vision || "", iconName: "Eye" },
              { title: "Our Values", description: missionVision?.values || "", iconName: "Star" }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 100 }}
                className="bg-[#185D46] rounded-[20px] p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(22,163,74,0.2)] border border-[#185D46] transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left h-full group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {getIconSvg(card.iconName, "w-8 h-8")}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
                  {card.title}
                </h3>
                <p className="text-white/90 leading-relaxed font-medium">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

      {/* 3. Journey Timeline */}
      <section className="pt-8 pb-24 bg-white relative overflow-hidden" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-24 space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight"
            >
              <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Our</span> Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto font-medium"
            >
              Key milestones in our mission to transform education and industry across India.
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full hidden sm:block" />
            
            {/* Animated Central Line */}
            <motion.div 
              className="absolute left-4 md:left-1/2 top-0 w-1 bg-[#185D46] -translate-x-1/2 rounded-full hidden sm:block origin-top shadow-[0_0_15px_rgb(22,163,74,0.5)]"
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
                      className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#185D46] -translate-x-1/2 z-20 shadow-[0_0_15px_rgb(22,163,74,0.3)] hidden sm:block"
                    />

                    <div className="hidden sm:block sm:w-1/2" />

                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
                      className={`w-full sm:w-1/2 pl-12 pr-4 sm:px-12 ${isEven ? 'text-left sm:text-left' : 'text-left sm:text-right'}`}
                    >
                      <div className={`bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(22,163,74,0.12)] border border-slate-100/50 transition-all duration-500 hover:-translate-y-2 relative group flex flex-col ${isEven ? 'items-start sm:items-start' : 'items-start sm:items-end'}`}>
                        <div className={`absolute top-0 w-full h-1 bg-[#185D46] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isEven ? 'left-0 origin-left' : 'right-0 origin-right'} rounded-t-[20px]`} />

                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-14 h-14 rounded-[16px] bg-[#185D4620] text-[#185D46] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            {getIconSvg(step.iconName, "w-8 h-8")}
                          </div>
                          <h4 className="text-3xl font-black text-[#185D46]">{step.year}</h4>
                        </div>
                        <h3 className="text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                        <p className="text-gray-600 font-medium leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <EdukaTestimonials 
        title="Client Feedback"
        badge="Reviews"
        testimonials={testimonials}
      />

      {/* 5. Our Strengths */}
      <section className="pt-8 pb-24 bg-white relative overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#185D4620] rounded-full blur-[150px] opacity-30 -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl sm:text-5xl font-extrabold text-[var(--color-brand-primary, #0F172A)] tracking-tight"
            >
              <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Our </span>Strengths
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg md:text-xl font-medium"
            >
              What makes INNOVEITY the preferred partner for educational transformation
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strengths.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, type: "spring", stiffness: 100 }}
                className="bg-white rounded-[20px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgb(22,163,74,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center group relative overflow-hidden h-[260px]"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[#185D46] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[20px]" />
                
                <div className="flex flex-col items-center h-full w-full justify-center transform transition-transform duration-500 group-hover:-translate-y-6">
                  <div className="text-[#185D46] mb-6 group-hover:scale-110 transition-transform duration-500">
                    {getIconSvg(item.iconName, "w-10 h-10")}
                  </div>
                  <h3 className="text-xl font-bold text-[#185D46]">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 pt-4 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-white">
                  <p className="text-primary/70 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
