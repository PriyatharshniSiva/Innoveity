"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

// Custom Counter Component
const AnimatedCounter = ({ value, label }: { value: string, label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  
  // Extract number and suffix/prefix (e.g., "5,000+", "98%")
  const numericString = value.replace(/[^0-9]/g, "");
  const numValue = parseInt(numericString, 10);
  const hasPlus = value.includes("+");
  const hasPercent = value.includes("%");
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    let formatted = Math.round(latest).toLocaleString();
    if (hasPlus) formatted += "+";
    if (hasPercent) formatted += "%";
    return formatted;
  });

  useEffect(() => {
    if (isInView && !isNaN(numValue)) {
      animate(count, numValue, { duration: 2, ease: "easeOut" });
    }
  }, [count, isInView, numValue]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-slate-100 p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(22,163,74,0.1)] hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#185D4620] rounded-full blur-[40px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />
      <motion.div className="text-4xl sm:text-5xl font-black text-[#F59E0B] mb-3 relative z-10">
        {!isNaN(numValue) ? <motion.span>{rounded}</motion.span> : value}
      </motion.div>
      <div className="text-xs sm:text-sm text-gray-500 font-bold tracking-widest uppercase relative z-10">{label}</div>
    </motion.div>
  );
};

// Inline Counter for Charts
const ChartInlineCounter = ({ value, className }: { value: number, className: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [count, isInView, value]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
};

export default function CsrClient({ data }: { data: any }) {
  const metrics = data?.metrics || [
    { label: "CO₂ Tons Reduced", value: "2500" }, 
    { label: "Green Jobs Enabled", value: "1200" },
    { label: "Communities Reached", value: "5000+" },
    { label: "Satisfaction Rate", value: "98%" }
  ];

  const initiatives = data?.initiatives?.filter((i: any) => i.status === 'Active') || [
    {
      title: "Digital Inclusion Program",
      desc: "Bridging the digital divide in rural communities through free digital literacy training, essential tech courses, and device accessibility programs.",
      impact: "5,000+ individuals trained in digital skills"
    },
    {
      title: "Green Skills Development",
      desc: "Comprehensive vocational training programs focused on solar energy installation, sustainable agriculture practices, and environmental conservation skills.",
      impact: "1,200+ green jobs created and verified"
    },
    {
      title: "Women Entrepreneur Support",
      desc: "Mentorship, financial literacy training, and startup accelerator programs supporting women-led micro-businesses across Tamil Nadu and neighboring states.",
      impact: "800+ women entrepreneurs supported"
    },
    {
      title: "Sustainable Corporate Practices",
      desc: "Expert consulting and workshops designed to assist manufacturing corporations in auditing emissions, saving power, and implementing ESG practices.",
      impact: "2,500 tons CO₂ emissions reduced"
    }
  ];

  const sdgs = data?.sdgs?.filter((s: any) => s.status === 'Active') || [
    {
      goal: "Quality Education",
      desc: "Ensuring inclusive, equitable quality education and promoting lifelong learning opportunities through faculty workshops and placement aptitude modules."
    },
    {
      goal: "Decent Work & Growth",
      desc: "Promoting sustained economic growth, full and productive employment, and decent work environments through domain upskilling certifications."
    },
    {
      goal: "Reduced Inequalities",
      desc: "Reducing structural education inequalities within and among districts through subsidized or free remote digital inclusion programs."
    },
    {
      goal: "Climate Action",
      desc: "Taking urgent action to combat climate change and its impacts by training professionals in safety engineering and environmental sustainability."
    }
  ];

  const co2Data = [
    { year: "2022", value: 800, height: "h-[30%]" },
    { year: "2023", value: 1400, height: "h-[55%]" },
    { year: "2024", value: 2000, height: "h-[80%]" },
    { year: "2025", value: 2500, height: "h-[100%]" }
  ];

  const jobsData = [
    { year: "2022", value: 300, height: "h-[25%]" },
    { year: "2023", value: 650, height: "h-[54%]" },
    { year: "2024", value: 950, height: "h-[79%]" },
    { year: "2025", value: 1200, height: "h-[100%]" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden selection:bg-[#185D46] selection:text-white pb-24">
      {/* 1. Premium Header with Soft Backgrounds */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#185D4620] rounded-full blur-[150px] opacity-70 -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#185D46] rounded-full blur-[150px] opacity-10 -z-10 -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDuration: '10s' }} />
        
        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">

          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tight"
          >
            {data?.hero?.titleLine1 || "CSR & ESG"} <span className="text-[#185D46]">{data?.hero?.titleHighlight || "Impact"}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-500 leading-relaxed font-medium max-w-3xl mx-auto"
          >
            {data?.hero?.description || "Our commitment to creating positive social and environmental impact through sustainable business practices, community engagement, and responsible innovation."}
          </motion.p>
        </div>
      </section>

      {/* 2. Metrics Dashboard with Counters */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-12 relative z-20 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {metrics.map((m: any, idx: number) => (
            <AnimatedCounter key={idx} value={m.value} label={m.label} />
          ))}
        </div>
      </section>

      {/* 3. Impact Over Time Dashboard (Premium Analytics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 mt-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/70 backdrop-blur-3xl rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-100 p-8 md:p-16 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 hover:shadow-[0_30px_70px_rgba(22,163,74,0.08)]"
        >
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 mix-blend-multiply" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-black text-[var(--color-brand-primary, #0F172A)] tracking-tight mb-16 relative z-10">
            <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Impact </span>Over Time
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 relative z-10">
            
            {/* CO2 Emissions Custom SVG Chart */}
            <div className="space-y-8 relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">CO₂ Emissions Reduced (Tons)</h3>
                <div className="px-3 py-1 bg-primary/10 text-[#185D46] rounded-full text-xs font-bold uppercase tracking-wider">
                  +312% Growth
                </div>
              </div>
              
              <div className="relative h-64 w-full">
                {/* Y-axis Guides */}
                <div className="absolute top-[30%] left-0 w-full h-px bg-slate-200 border-dashed border-t border-slate-200" />
                <div className="absolute top-[65%] left-0 w-full h-px bg-slate-200 border-dashed border-t border-slate-200" />
                <div className="absolute top-[100%] left-0 w-full h-px bg-slate-200 border-t border-slate-200" />

                <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none">
                  {/* Defs for gradients */}
                  <defs>
                    <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="co2Line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#4ADE80" />
                      <stop offset="100%" stopColor="var(--color-primary)" />
                    </linearGradient>
                  </defs>

                  {/* Area Fill */}
                  <motion.path 
                    d="M10,100 L10,77.6 L36.6,60.8 L63.3,44 L90,30 L90,100 Z"
                    fill="url(#co2Gradient)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  
                  {/* Animated Line */}
                  <motion.path 
                    d="M10,77.6 L36.6,60.8 L63.3,44 L90,30"
                    fill="none"
                    stroke="url(#co2Line)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Data Points */}
                  {[
                    { cx: 10, cy: 77.6, delay: 0.5 },
                    { cx: 36.6, cy: 60.8, delay: 0.8 },
                    { cx: 63.3, cy: 44, delay: 1.1 },
                    { cx: 90, cy: 30, delay: 1.4, latest: true }
                  ].map((pt, i) => (
                    <motion.circle 
                      key={i}
                      cx={pt.cx} cy={pt.cy} r={pt.latest ? "3" : "2"}
                      fill="#FFFFFF"
                      stroke="var(--color-primary)"
                      strokeWidth="1.5"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: pt.delay, type: "spring" }}
                      className={pt.latest ? "drop-shadow-[0_0_8px_rgba(22,163,74,0.8)]" : ""}
                    />
                  ))}
                </svg>

                {/* Values floating over points */}
                <div className="absolute inset-0 pointer-events-none">
                  {[
                    { val: 800, left: "10%", top: "77.6%" },
                    { val: 1400, left: "36.6%", top: "60.8%" },
                    { val: 2000, left: "63.3%", top: "44%" },
                    { val: 2500, left: "90%", top: "30%", latest: true }
                  ].map((pt, i) => (
                    <div key={i} className="absolute transform -translate-x-1/2 -translate-y-[150%]" style={{ left: pt.left, top: pt.top }}>
                      <ChartInlineCounter 
                        value={pt.val} 
                        className={`text-sm font-black ${pt.latest ? 'text-[#185D46] drop-shadow-[0_2px_4px_rgba(22,163,74,0.2)]' : 'text-gray-600'}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between px-2 text-sm font-bold text-gray-400 pt-2">
                {co2Data.map((data, idx) => (
                  <div key={idx} className="w-[20%] text-center group-hover:text-gray-900 transition-colors duration-300">{data.year}</div>
                ))}
              </div>
            </div>

            {/* Green Jobs Custom SVG Chart */}
            <div className="space-y-8 relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Green Jobs Enabled</h3>
                <div className="px-3 py-1 bg-accent/10 text-[#F59E0B] rounded-full text-xs font-bold uppercase tracking-wider">
                  +300% Growth
                </div>
              </div>
              
              <div className="relative h-64 w-full">
                {/* Y-axis Guides */}
                <div className="absolute top-[30%] left-0 w-full h-px bg-slate-200 border-dashed border-t border-slate-200" />
                <div className="absolute top-[65%] left-0 w-full h-px bg-slate-200 border-dashed border-t border-slate-200" />
                <div className="absolute top-[100%] left-0 w-full h-px bg-slate-200 border-t border-slate-200" />

                <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none">
                  {/* Defs for gradients */}
                  <defs>
                    <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="jobsLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="100%" stopColor="var(--color-accent)" />
                    </linearGradient>
                  </defs>

                  {/* Area Fill */}
                  <motion.path 
                    d="M10,100 L10,82.5 L36.6,62.1 L63.3,44.6 L90,30 L90,100 Z"
                    fill="url(#jobsGradient)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  
                  {/* Animated Line */}
                  <motion.path 
                    d="M10,82.5 L36.6,62.1 L63.3,44.6 L90,30"
                    fill="none"
                    stroke="url(#jobsLine)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Data Points */}
                  {[
                    { cx: 10, cy: 82.5, delay: 0.5 },
                    { cx: 36.6, cy: 62.1, delay: 0.8 },
                    { cx: 63.3, cy: 44.6, delay: 1.1 },
                    { cx: 90, cy: 30, delay: 1.4, latest: true }
                  ].map((pt, i) => (
                    <motion.circle 
                      key={i}
                      cx={pt.cx} cy={pt.cy} r={pt.latest ? "3" : "2"}
                      fill="#FFFFFF"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: pt.delay, type: "spring" }}
                      className={pt.latest ? "drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" : ""}
                    />
                  ))}
                </svg>

                {/* Values floating over points */}
                <div className="absolute inset-0 pointer-events-none">
                  {[
                    { val: 300, left: "10%", top: "82.5%" },
                    { val: 650, left: "36.6%", top: "62.1%" },
                    { val: 950, left: "63.3%", top: "44.6%" },
                    { val: 1200, left: "90%", top: "30%", latest: true }
                  ].map((pt, i) => (
                    <div key={i} className="absolute transform -translate-x-1/2 -translate-y-[150%]" style={{ left: pt.left, top: pt.top }}>
                      <ChartInlineCounter 
                        value={pt.val} 
                        className={`text-sm font-black ${pt.latest ? 'text-[#F59E0B] drop-shadow-[0_2px_4px_rgba(245,158,11,0.2)]' : 'text-gray-600'}`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between px-2 text-sm font-bold text-gray-400 pt-2">
                {jobsData.map((data, idx) => (
                  <div key={idx} className="w-[20%] text-center group-hover:text-gray-900 transition-colors duration-300">{data.year}</div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      
      {/* 4. The New Timeline UI for Initiatives */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-24 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[var(--color-brand-primary, #0F172A)] tracking-tight">
            <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Key </span>Initiatives
          </h2>
          <p className="text-xl text-gray-500 font-medium">Driving change where it matters most.</p>
        </motion.div>

        <div className="relative">
          {/* Animated Center Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#185D46] to-[#185D4620] -translate-x-1/2 rounded-full hidden md:block" 
          />

          <div className="space-y-16">
            {initiatives.map((ini: any, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[45%]" />
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-10 h-10 absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#185D46] ring-4 ring-[#185D4620] shadow-lg z-10" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-[45%]">
                    <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(22,163,74,0.1)] transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />
                      
                      <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-4 group-hover:text-[#185D46] transition-colors">{ini.title}</h3>
                      <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium mb-8">{ini.desc}</p>
                      
                      <div className="bg-primary/5 rounded-2xl p-5 border-l-4 border-[#185D46]">
                        <span className="text-[#185D46] block text-xs font-bold uppercase tracking-[0.15em] mb-2">Key Impact</span>
                        <div className="text-gray-900 font-bold text-sm md:text-base">{ini.impact}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. UN SDGs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-brand-primary, #0F172A)] tracking-tight">
            <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>UN SDG </span>Alignment
          </h2>
          <p className="text-xl text-gray-500 font-medium">Contributing directly to the United Nations Sustainable Development Goals.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sdgs.map((sdg: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.08)] hover:-translate-y-2 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#185D4620] text-[#185D46] font-black text-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  0{idx + 4}
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A] mb-4 tracking-tight group-hover:text-[#185D46] transition-colors">{sdg.goal}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">{sdg.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          className="bg-[#0F172A] text-white rounded-[40px] p-10 md:p-20 text-center shadow-[0_30px_60px_rgba(15,23,42,0.3)] space-y-8 relative overflow-hidden group"
        >
          {/* Animated Background Orbs */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#185D46] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#F59E0B] rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
          
          <h2 className="text-4xl md:text-5xl font-black !text-white tracking-tight relative z-10">
            {data?.cta?.title || "Join Our Impact Journey"}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium relative z-10">
            {data?.cta?.description || "Partner with INNOVEITY to implement ESG consulting or execute CSR projects that align under Schedule VII. Let's build a sustainable and equitable future together."}
          </p>
          <div className="pt-4 relative z-10">
            <Link href={data?.cta?.buttonLink || "/contact"} className="inline-block">
              <button className="bg-[#185D46] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#185D46] hover:shadow-[0_0_30px_rgba(22,163,74,0.4)] hover:-translate-y-1 transition-all duration-300">
                {data?.cta?.buttonText || "Get in Touch"}
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
