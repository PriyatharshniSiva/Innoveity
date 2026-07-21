"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function KnowledgeHubClient({ articles }: { articles: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "All") return matchesSearch;
    
    const matchesCategory = course.level === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-[#0F172A] selection:bg-[#185D46] selection:text-white pb-24">
      
      {/* 1. Premium Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 pt-32 overflow-hidden bg-white">
        {/* Soft Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#185D4620] rounded-full blur-[120px] opacity-70 -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#185D46] rounded-full blur-[150px] opacity-10 -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">

          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tight"
          >
            Knowledge <span className="text-[#185D46]">Hub</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Insights, trends, and expert perspectives on education, technology, and sustainable business practices from our team of thought leaders.
          </motion.p>
        </div>
      </section>

      {/* 2. Search & Filter Bar */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto -mt-8 relative z-20 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-[24px] shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-slate-100 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Search Input */}
          <div className="relative w-full flex-1 max-w-md flex items-center group">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-5 w-5 h-5 text-gray-400 group-focus-within:text-[#185D46] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search articles, topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-[16px] text-[#0F172A] placeholder-gray-400 focus:outline-none focus:border-[#185D46] focus:ring-4 focus:ring-[#185D4620] text-base font-semibold transition-all shadow-inner"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center flex-wrap justify-center md:justify-end gap-2 w-full md:w-auto">
            {["All", "SKILLS", "TECHNOLOGY", "SUSTAINABILITY", "INDUSTRY"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-[12px] text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#185D46] text-white shadow-[0_8px_20px_rgb(22,163,74,0.3)] -translate-y-0.5"
                    : "bg-transparent text-gray-500 hover:text-[#0F172A] hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Grid Articles - 3 in a row */}
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredArticles.map((course, idx) => (
                  <motion.article
                    key={idx}
                    variants={fadeUp}
                    className="bg-white border border-[#185D46]/20 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-lg hover:shadow-[0_20px_40px_rgba(22,163,74,0.1)] hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer"
                  >
                    <Link href="/events" className="block h-52 sm:h-56 overflow-hidden relative">
                      {course.image && (
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      )}
                      <div className="absolute inset-0 bg-[#185D46]/10 group-hover:bg-transparent transition-colors duration-500" />
                      {/* Animated Reading Progress Bar */}
                      <div className="absolute bottom-0 left-0 h-1 bg-[#185D46] w-0 group-hover:w-full transition-all duration-1000 ease-out" />
                    </Link>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      
                      {/* Date and Author */}
                      <div className="flex justify-between items-center mb-5 text-[14px] sm:text-[15px] font-medium text-[#185D46]">
                        {course.nextBatch && (
                          <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{course.nextBatch}</span>
                          </div>
                        )}
                        {course.instructor && (
                          <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{course.instructor}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-snug mb-4 group-hover:text-[#185D46] transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-[#334155] text-[16px] sm:text-[17px] leading-relaxed mb-8 flex-1 line-clamp-3">
                        {course.desc}
                      </p>
                      
                      {/* Tag and Read More */}
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        {course.level && (
                          <span className="bg-[#e6f4ea] text-[#185D46] font-bold text-xs sm:text-sm tracking-wide uppercase px-3 py-1.5 rounded-[6px]">
                            {course.level}
                          </span>
                        )}
                        <Link href="/events" className="font-bold text-[#185D46] text-[15px] sm:text-[17px] flex items-center group-hover:translate-x-1 transition-transform cursor-pointer">
                          Read More 
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px] ml-1.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2">No articles found</h3>
              <p className="text-gray-500 font-medium">Try adjusting your search or category filters.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>



    </div>
  );
}
