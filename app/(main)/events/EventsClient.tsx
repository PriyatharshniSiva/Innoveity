"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsClient({ courses }: { courses: any[] }) {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<"All" | "ME" | "Other">("All");

  const filteredCourses = courses.filter(course => {
    if (activeCategory === "All") return true;
    if (activeCategory === "ME") return course.title.startsWith("ME ");
    if (activeCategory === "Other") return !course.title.startsWith("ME ");
  });

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCourse]);

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
    <div className="min-h-screen bg-slate-50 text-[#0F172A] selection:bg-[#185D46] selection:text-white pb-24">
      {/* Header */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#185D4620] rounded-full blur-[120px] opacity-70 -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#185D46] rounded-full blur-[150px] opacity-10 -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
        
        <div className="text-center space-y-6 max-w-5xl mx-auto relative z-10">

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tight"
          >
            Our <span className="text-[#185D46]">Courses</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 leading-relaxed font-medium"
          >
            Discover our comprehensive range of AICTE affiliated courses and certified programs. <br /> Transform your career with industry-leading education designed for the future of work.
          </motion.p>
        </div>
      </section>

      {/* Affiliation Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-10 relative z-20 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-[#0F172A] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 shadow-[0_30px_60px_rgba(22,163,74,0.15)] border border-primary/20 hover:shadow-[0_40px_70px_rgba(22,163,74,0.25)] hover:border-primary/40 transition-all duration-500 overflow-hidden relative group"
        >
          {/* Background Glow inside banner */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#185D46] rounded-full blur-[150px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

          <div className="space-y-4 max-w-3xl relative z-10">
            <span className="text-[#F59E0B] text-xs font-bold uppercase tracking-widest bg-accent/10 px-3 py-1.5 rounded border border-accent/20">
              AICTE Affiliation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold !text-white tracking-tight">AICTE Affiliated Programs</h2>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              All our courses are affiliated with AICTE (All India Council for Technical Education) and offer industry-recognized certifications to boost your professional credentials.
            </p>
          </div>
          <Link href="/contact" className="flex-shrink-0 relative z-10">
            <button className="bg-[#185D46] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#185D46] hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:-translate-y-1 transition-all duration-300">
              Inquire About Enrollment
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 -mt-8 relative z-20">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 bg-white py-4 px-6 rounded-3xl border border-slate-100 shadow-sm max-w-4xl mx-auto">
          <button 
            onClick={() => setActiveCategory("All")}
            className={`flex items-center px-6 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 cursor-pointer ${
              activeCategory === "All" 
                ? "bg-[#185D46] text-white shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]" 
                : "bg-transparent text-primary/80 hover:text-[#185D46] hover:bg-slate-50/50"
            }`}
          >
            {/* Book Icon */}
            <svg className="w-5 h-5 mr-2.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            All Programs
          </button>

          <button 
            onClick={() => setActiveCategory("ME")}
            className={`flex items-center px-6 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 cursor-pointer ${
              activeCategory === "ME" 
                ? "bg-[#185D46] text-white shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]" 
                : "bg-transparent text-primary/80 hover:text-[#185D46] hover:bg-slate-100/50"
            }`}
          >
            {/* Graduation Cap Icon */}
            <svg className="w-5 h-5 mr-2.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            ME Courses
          </button>

          <button 
            onClick={() => setActiveCategory("Other")}
            className={`flex items-center px-6 py-3.5 rounded-2xl text-base font-bold transition-all duration-300 cursor-pointer ${
              activeCategory === "Other" 
                ? "bg-[#185D46] text-white shadow-[0_10px_25px_-5px_rgba(16,185,129,0.3)]" 
                : "bg-transparent text-primary/80 hover:text-[#185D46] hover:bg-slate-100/50"
            }`}
          >
            {/* Medal/Ribbon Icon */}
            <svg className="w-5 h-5 mr-2.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a4 4 0 100-8 4 4 0 000 8z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.286 14.5L6 21l3.5-2.5L13 21l-2.286-6.5" />
            </svg>
            Other Affiliated Courses
          </button>
        </div>
      </section>

      {/* Courses List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              onClick={() => setSelectedCourse(course)}
              className="bg-white rounded-[24px] p-6 sm:p-8 flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(5,150,105,0.12)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 cursor-pointer group"
            >
              {/* Top Row: Badges & Rating */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2.5">
                  <span className="bg-[#D1FAE5] text-[#047857] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    AICTE
                  </span>
                  <span className="bg-[#F1F5F9] text-[#475569] text-[12px] font-bold px-3 py-1 rounded-full">
                    Certified
                  </span>
                </div>
                <div className="flex items-center text-[#F59E0B] font-bold text-[14px]">
                  <svg className="w-4 h-4 mr-1.5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {course.rating}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-[22px] font-bold text-[#0F172A] leading-snug mb-4 line-clamp-2 pr-2 group-hover:text-[#047857] transition-colors duration-300">
                {course.title}
              </h3>
              <p className="text-[#64748B] text-[15px] leading-relaxed mb-8 flex-1 line-clamp-3 pr-2">
                {course.desc}
              </p>

              {/* Details List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-[#475569] text-[14px] font-medium">
                  <svg className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {course.duration.replace(" (Degree)", "").replace(" (Certification)", "").replace(" (Workshop)", "").toLowerCase()} • {course.level}
                </div>
                <div className="flex items-center text-[#475569] text-[14px] font-medium">
                  <svg className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  {course.studentsEnrolled.replace(" students enrolled", "")} students enrolled
                </div>
                <div className="flex items-center text-[#475569] text-[14px] font-medium">
                  <svg className="w-5 h-5 mr-3 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Next batch: {course.nextBatch}
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-end mt-auto">
                <button className="bg-[#059669] hover:bg-[#047857] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 text-[15px] shadow-sm hover:shadow-md">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
            onClick={() => setSelectedCourse(null)}
          >
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#F3F4F6] rounded-[32px] w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row p-5 md:p-8 text-left gap-6 md:gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 p-2 rounded-full border border-slate-100 transition-colors shadow-sm z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Column */}
              <div className="flex-1 space-y-6 md:space-y-8">
                {/* Title and Badges */}
                <div className="space-y-3 md:space-y-4 pr-4 md:pr-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#047857] tracking-tight leading-snug">
                      {selectedCourse.title}
                    </h2>
                    <span className="bg-[#A7F3D0]/60 text-[#047857] text-sm font-bold px-4 py-1.5 rounded-full flex-shrink-0">
                      AICTE Affiliated
                    </span>
                    {/* Book Icon */}
                    <svg className="w-7 h-7 text-[#047857] ml-auto hidden sm:block flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                    {selectedCourse.desc}
                  </p>
                </div>

                {/* Course Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#047857]">Course Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(() => {
                        let features = [];
                        try {
                            features = JSON.parse(selectedCourse.features);
                        } catch(e) {
                            features = [selectedCourse.features];
                        }
                        if (!Array.isArray(features)) features = [features];
                        return features.map((feature: any, fIdx: number) => (
                      <div key={fIdx} className="flex items-center space-x-3">
                        <svg className="w-6 h-6 text-[#059669] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-slate-700 text-base font-medium">{feature}</span>
                      </div>
                    ))})()}
                  </div>
                </div>

                {/* AICTE Certification */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-[#047857]">AICTE Certification</h3>
                  <div className="bg-[#ECFDF5] rounded-xl p-5 md:p-6 border border-[#A7F3D0] flex items-start space-x-3 md:space-x-4">
                    <svg className="w-7 h-7 text-[#059669] flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#047857] text-lg">Industry-Recognized Certificate</h4>
                      <p className="text-slate-600 text-base leading-relaxed">
                        {selectedCourse.certification}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Sidebar details card) */}
              <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0">
                <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl space-y-5 lg:space-y-6">
                  {/* Rating */}
                  <div className="text-center space-y-2 mb-8">
                    <div className="flex items-center justify-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F59E0B]" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-lg text-[#047857]">{selectedCourse.rating} Rating</span>
                    </div>
                    <p className="text-slate-500 text-sm">{selectedCourse.studentsEnrolled.replace(" students enrolled", "")} students enrolled</p>
                  </div>

                  {/* Details list */}
                  <div className="space-y-5 text-base text-[#047857] font-medium">
                    {/* Duration */}
                    <div className="flex items-center space-x-4">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Duration: {selectedCourse.duration}</span>
                    </div>
                    {/* Level */}
                    <div className="flex items-center space-x-4">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      <span>Level: {selectedCourse.level}</span>
                    </div>
                    {/* Next batch */}
                    <div className="flex items-center space-x-4">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Next batch: {selectedCourse.nextBatch}</span>
                    </div>
                    {/* Instructor */}
                    <div className="flex items-start space-x-4">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="leading-snug">Instructor: {selectedCourse.instructor}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-4 pt-6">
                    <Link href="/contact" className="block w-full">
                      <button className="w-full bg-[#059669] text-white py-3.5 rounded-xl font-bold hover:bg-[#047857] hover:shadow-lg transition-all duration-300 text-base cursor-pointer">
                        Enroll Now
                      </button>
                    </Link>
                    <Link href="/contact" className="block w-full">
                      <button className="w-full border-2 border-[#059669] text-[#059669] py-3 rounded-xl font-bold hover:bg-[#059669]/5 transition-colors duration-300 text-base cursor-pointer">
                        Download Brochure
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
