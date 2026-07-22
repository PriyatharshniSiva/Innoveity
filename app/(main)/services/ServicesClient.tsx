"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

export default function ServicesClient({ data }: { data: any }) {
  const highlights = data?.overview?.highlights || [
    "Faculty development programs aligned with AICTE and NEP 2020",
    "Student training with 85% placement improvement guarantee",
    "Corporate L&D solutions with 200-300% ROI",
    "ESG consulting for CSR compliance and sustainability",
    "Digital transformation and technology consulting",
    "Community skill challenges and webinars",
    "Bilingual delivery in English and Tamil",
    "Flexible on-site, online, or hybrid formats"
  ];

  const DynamicIcon = ({ name }: { name: string }) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <div className="w-6 h-6 bg-gray-200 rounded-full" />;
    return <IconComponent className="w-8 h-8" />;
  };

  const getFilteredServices = (categoryId: string) => {
    if (!data?.services) return [];
    return data.services.filter((s: any) => s.categoryId === categoryId && s.status === 'Active');
  };

  const categories = data?.categories || [
    { id: 'edu', name: 'Educational Institutions' },
    { id: 'ind', name: 'Industries' },
    { id: 'com', name: 'Communities' },
  ];

  const faqs = data?.faqs || [
    {
      question: "What training services does INNOVEITY provide for engineering colleges?",
      answer: "INNOVEITY provides faculty development programs, student placement training, technical certifications, aptitude coaching, soft skills workshops, and industry connect programs. All programs are AICTE-recognized and aligned with NEP 2020 guidelines, achieving 60-85% placement improvement across 50+ partner institutions."
    },
    {
      question: "What corporate training programs are available in Chennai and Tamil Nadu?",
      answer: "INNOVEITY offers leadership development, behavioral training, technical upskilling, ESG consulting, digital transformation, safety training, and custom L&D programs. We serve manufacturing, IT, healthcare, and BFSI sectors with flexible on-site, online, or hybrid delivery across Chennai, Coimbatore, and Madurai."
    },
    {
      question: "Does INNOVEITY provide ESG and sustainability consulting?",
      answer: "Yes, INNOVEITY provides comprehensive ESG consulting including carbon footprint analysis, sustainability reporting, CSR-compliant training programs, and complete ESG framework implementation. Our programs qualify for CSR spending under Schedule VII of the Companies Act."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#185D46] selection:text-white">
      
      {/* 1. Hero Section with Mesh Gradient */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#185D4620] rounded-full blur-[120px] opacity-60 -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#185D46] rounded-full blur-[150px] opacity-10 -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] mb-8 tracking-tight"
          >
            {data?.overview?.titleLine1 || "Our"} <span className="text-[#185D46]">{data?.overview?.titleHighlight || "Services"}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            {data?.overview?.description || "Comprehensive solutions designed to bridge the gap between education and industry, fostering growth, innovation, and sustainable development."}
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content Card with Left Border and Accent */}
      <div className="px-4 sm:px-6 lg:px-8 flex justify-center items-start pb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl w-full"
        >
          <section className="bg-gradient-to-br from-[#185D4610]/30 to-[#f0f9ff]/20 backdrop-blur-xl rounded-[24px] p-8 md:p-12 border border-[#185D4630] border-l-[6px] border-l-[#185D46] shadow-[0_20px_50px_rgba(12,74,65,0.05)] relative overflow-hidden group">
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-brand-primary, #0F172A)] mb-6 tracking-tight leading-tight">
              {(() => {
                const text = data?.overview?.mainTitle || "Comprehensive Training Solutions for Tamil Nadu";
                if (typeof text === 'string' && text.includes("Comprehensive Training ")) {
                  const parts = text.split("Comprehensive Training ");
                  return (
                    <>
                      {parts[0]}
                      <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Comprehensive Training </span>
                      {parts.slice(1).join("Comprehensive Training ")}
                    </>
                  );
                }
                return text;
              })()}
            </h2>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              {data?.overview?.description || "INNOVEITY offers specialized training programs for educational institutions, corporate organizations, and communities across Tamil Nadu. Our services include faculty development, student placement training, corporate L&D solutions, ESG consulting, and community outreach programs—all delivered by ISO-certified trainers with proven track records."}
            </p>
            
            <div className="mb-10">
              <h3 className="font-bold text-[#185D46] mb-6 text-xl tracking-wide">
                Key Highlights:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {highlights.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <span className="text-[#185D46] font-black text-xl mr-3 mt-0.5 leading-none">✓</span>
                    <span className="font-semibold leading-relaxed text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/contact" className="inline-block">
              <button className="px-8 py-4 bg-[#185D46] hover:bg-[#124836] text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center cursor-pointer">
                Get Custom Quote
              </button>
            </Link>
          </section>
        </motion.div>
      </div>

      {/* ── Premium FAQ Accordion ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#185D4610] overflow-hidden border-t border-primary/20">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(12,74,65,0.045) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-3xl mx-auto relative z-10 space-y-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20 text-[#185D46] text-xs font-extrabold tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#185D46] inline-block" />
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#185D46] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              Everything you need to know about INNOVEITY's training programs.
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((item: any, idx: number) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                  className="rounded-[20px] border overflow-hidden transition-all duration-300"
                  style={{
                    background: "white",
                    borderColor: isOpen ? "var(--color-primary)" : "#e2e8f0",
                    boxShadow: isOpen
                      ? "0 0 0 3px rgba(22,163,74,0.10), 0 16px 40px -8px rgba(12,74,65,0.13)"
                      : "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="text-base sm:text-lg font-bold leading-snug transition-colors duration-200"
                      style={{ color: isOpen ? "var(--color-primary)" : "#1e293b" }}
                    >
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-200"
                      style={{
                        background: isOpen ? "var(--color-primary)" : "var(--color-primary)10",
                        borderColor: isOpen ? "var(--color-primary)" : "#bbf7d0",
                        color: isOpen ? "#fff" : "var(--color-primary)",
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-7 border-t border-primary/20/80">
                          <div className="mt-5 bg-[#185D4610] border-l-[4px] border-[#185D46] rounded-r-xl px-5 py-4">
                            <p className="text-slate-800 font-semibold leading-relaxed text-sm sm:text-base">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reusable Section Wrapper Component */}
      {categories.map((category: any, idx: number) => {
        const sectionData = getFilteredServices(category.id);
        if (sectionData.length === 0) return null;
        const bg = idx % 2 === 0 ? "bg-slate-50/50" : "bg-white";

        return (
          <section key={category.id} className={`pt-8 pb-24 px-4 sm:px-6 lg:px-8 ${bg} relative overflow-hidden`}>
            {idx === 1 && (
              <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#185D4620] rounded-full blur-[150px] opacity-30 -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            )}
            
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                className="text-4xl md:text-5xl font-extrabold text-center text-[var(--color-brand-primary, #0F172A)] mb-16 tracking-tight"
              >
                {(() => {
                  const text = category.name;
                  if (typeof text === 'string' && text.includes("Educational ")) {
                    const parts = text.split("Educational ");
                    return (
                      <>
                        {parts[0]}
                        <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Educational </span>
                        {parts.slice(1).join("Educational ")}
                      </>
                    );
                  }
                  return text;
                })()}
              </motion.h2>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: "-50px" }}
                className={`grid grid-cols-1 md:grid-cols-2 ${sectionData.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}
              >
                {sectionData.map((card: any, cardIdx: number) => (
                  <motion.div
                    key={card.id}
                    variants={cardVariant}
                    className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgb(22,163,74,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center group relative overflow-hidden min-h-[320px]"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#185D46] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[20px]" />
                    
                    <div className="flex flex-col items-center w-full justify-center transform transition-transform duration-500 group-hover:-translate-y-10 mt-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#185D4620] text-[#185D46] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm shrink-0">
                        <DynamicIcon name={card.iconName} />
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#185D46] transition-colors">{card.title}</h3>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-white z-10">
                      <p className="text-gray-600 font-medium leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* 7. CTA Section */}
      <section className="pt-8 pb-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-[#0F172A] rounded-[32px] p-12 md:p-20 text-center shadow-[0_20px_50px_rgb(15,23,42,0.2)] border border-slate-800 relative overflow-hidden group"
          >
            {/* Interactive Glow inside CTA */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#185D46] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

            <h2 className="text-4xl md:text-5xl font-black !text-white mb-6 tracking-tight relative z-10">
              {data?.cta?.title || "Ready to Shape the Future of Industry?"}
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium relative z-10">
              {data?.cta?.description || "Whether you're an academic institution looking to upgrade your relevance or a corporate entity seeking elite talent, the bridge starts here."}
            </p>
            <Link href={data?.cta?.buttonLink || "/contact"}>
              <button className="relative z-10 group px-10 py-5 bg-[#F59E0B] text-[#0F172A] font-black text-lg rounded-xl shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/40 overflow-hidden flex items-center justify-center mx-auto">
                <span className="relative z-20">{data?.cta?.buttonText || "Get Started Today"}</span>
                <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
