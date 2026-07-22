"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVGs
const Phone = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const Mail = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);
const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const MapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const ChevronDown = ({ size, className }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const Building = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
);

// Form Components
const FloatingInput = ({ label, type, required = false, icon }: { label: string, type: string, required?: boolean, icon?: React.ReactNode }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group">
      {icon && (
        <div className={`absolute left-4 top-[18px] transition-colors duration-300 z-20 ${focused ? 'text-[#185D46]' : 'text-gray-400'}`}>
          {icon}
        </div>
      )}
      <input
        type={type}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className={`w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/30 focus:shadow-[0_0_15px_rgba(22,163,74,0.08)] rounded-[16px] text-[#0F172A] font-semibold transition-all pt-7 pb-3 peer relative z-10 ${icon ? 'pl-12 pr-4' : 'px-5'}`}
      />
      <label
        className={`absolute transition-all duration-300 pointer-events-none z-20 ${
          focused || hasValue 
            ? "top-2.5 text-[11px] font-bold text-[#185D46] uppercase tracking-wider" 
            : "top-4 text-gray-400 text-[15px] font-medium"
        } ${icon ? 'left-12' : 'left-5'}`}
      >
        {label} {required && <span className="text-[#f97316]">*</span>}
      </label>
    </div>
  );
};

const FloatingSelect = ({ label, required = false }: { label: string, required?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative group">
      <select
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        defaultValue=""
        className={`w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/30 focus:shadow-[0_0_15px_rgba(22,163,74,0.08)] rounded-[16px] text-[#0F172A] font-semibold transition-all pt-7 pb-3 px-5 appearance-none peer relative z-10 ${hasValue ? '' : 'text-transparent'}`}
      >
        <option value="" disabled hidden>Select type</option>
        <option value="course_enrollment" className="text-[#0F172A]">Course Enrollment</option>
        <option value="corporate_training" className="text-[#0F172A]">Corporate Training</option>
        <option value="college_partnership" className="text-[#0F172A]">College Partnership</option>
        <option value="general_inquiry" className="text-[#0F172A]">General Inquiry</option>
      </select>
      <label
        className={`absolute transition-all duration-300 pointer-events-none z-20 ${
          focused || hasValue 
            ? "top-2.5 text-[11px] font-bold text-[#185D46] uppercase tracking-wider left-5" 
            : "top-4 text-gray-400 text-[15px] font-medium left-5"
        }`}
      >
        {label} {required && <span className="text-[#f97316]">*</span>}
      </label>
      <div className={`absolute right-4 top-5 pointer-events-none transition-colors z-20 ${focused ? 'text-[#185D46]' : 'text-gray-400'}`}>
        <ChevronDown size={20} />
      </div>
    </div>
  );
};

const FloatingTextarea = ({ label, required = false }: { label: string, required?: boolean }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative group">
      <textarea
        rows={4}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/30 focus:shadow-[0_0_15px_rgba(22,163,74,0.08)] rounded-[20px] text-[#0F172A] font-semibold transition-all pt-7 pb-3 px-5 resize-none peer relative z-10"
      ></textarea>
      <label
        className={`absolute transition-all duration-300 pointer-events-none z-20 ${
          focused || value.length > 0
            ? "top-3 text-[11px] font-bold text-[#185D46] uppercase tracking-wider left-5" 
            : "top-5 text-gray-400 text-[15px] font-medium left-5"
        }`}
      >
        {label} {required && <span className="text-[#f97316]">*</span>}
      </label>
      <div className="absolute bottom-4 right-5 text-[11px] text-gray-400 font-bold z-20 bg-slate-50/80 px-2 py-1 rounded">
        {value.length}/2000
      </div>
    </div>
  );
};

export default function ContactClient({ data }: { data: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  const offices = data?.offices?.filter((o: any) => o.status === 'Active') || [
    {
      name: "Main Office",
      type: "Headquarters",
      address: ["No:11 Ritherdon Avenue, Ritherdon Road", "Vepery, Chennai - 600007", "Tamil Nadu, India"],
      color: "var(--color-primary)"
    },
    {
      name: "Branch Offices",
      type: "",
      address: ["Trichy Office", "Salem Office", "Tirunelveli", "Bangalore Office"],
      color: "#3b82f6"
    },
    {
      name: "Research Center",
      type: "Industry 4.0 & AI/ML",
      address: ["Anna University Atal Innovation Center", "Chennai - 600025"],
      color: "#a855f7"
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f97316]/5 rounded-full blur-[120px] opacity-70"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-100px" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">

          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#0F172A] leading-[1.1] mb-6 tracking-tight">
            {data?.hero?.titleLine1 || "Corporate Training & College Development"}<br className="hidden md:block" />
            <span className="inline-block px-4 font-light text-gray-300">|</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#185D46] to-[#185D46]">{data?.hero?.titleLine2 || "Chennai Tamil Nadu"}</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-[#475569] md:text-[19px] max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
            {data?.hero?.description || "Transform your institution with INNOVEITY's proven solutions. 2000+ students trained across 50+ Tamil Nadu colleges, 85% placement improvement. Contact Chennai office for free consultation."}
          </motion.p>

          {/* 4 Stat Cards */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(data?.stats || [
              { icon: 'users', value: "2000+", label: "Students" },
              { icon: 'building', value: "50+", label: "Institutions" },
              { icon: 'chart', value: "85%", label: "Improvement" },
              { icon: 'briefcase', value: "100+", label: "Corporate" }
            ]).map((stat: any, i: number) => {
              let IconComponent = UserIcon;
              if (stat.icon === 'building') IconComponent = Building;
              else if (stat.icon === 'chart') IconComponent = ({className}: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>;
              else if (stat.icon === 'briefcase') IconComponent = ({className}: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

              return (
                <motion.div 
                  key={i} 
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.08)] transition-all duration-300 flex flex-col items-center justify-center border border-slate-100 group"
                >
                  <div className="text-[#185D46] mb-5 bg-primary/10 p-4 rounded-[16px] group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#185D46] group-hover:text-white">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black text-[#0F172A] mb-1">{stat.value}</h3>
                  <p className="text-gray-500 font-bold text-sm tracking-wide uppercase">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Two Column Layout: Form & Contact Details */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Premium Form */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-3xl font-black text-[#0F172A] mb-2">{data?.form?.title || "Get Free Consultation"}</h2>
                  <p className="text-gray-500 mb-10 font-medium">{data?.form?.subtitle || "We usually respond within 24 hours."}</p>
                  
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FloatingInput label="Full Name" type="text" icon={<UserIcon className="w-5 h-5" />} required />
                      <FloatingInput label="Email" type="email" icon={<Mail className="w-5 h-5" />} required />
                      <FloatingInput label="Phone" type="tel" icon={<Phone className="w-5 h-5" />} />
                      <FloatingInput label="Organization" type="text" icon={<Building className="w-5 h-5" />} />
                    </div>

                    <FloatingSelect label="Inquiry Type" required />
                    <FloatingTextarea label="Message" required />

                    <div className="pt-4">
                      <motion.button 
                        whileHover={isSubmitting ? {} : { scale: 1.01, boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.4)" }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#185D46] to-[#185D46] hover:from-[#f97316] hover:to-[#ea580c] text-white font-black text-[17px] py-5 rounded-[20px] transition-all duration-500 relative overflow-hidden group flex items-center justify-center min-h-[64px] cursor-pointer shadow-[0_8px_20px_rgba(22,163,74,0.2)]"
                      >
                        <AnimatePresence mode="wait">
                          {isSubmitting ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3"
                            >
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Sending...</span>
                            </motion.div>
                          ) : (
                            <motion.span
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="relative z-10 flex items-center justify-center gap-2 tracking-wide"
                            >
                              Submit Request
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20 min-h-[500px]"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
                  >
                    <motion.svg 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </motion.svg>
                  </motion.div>
                  <h3 className="text-3xl font-black text-[#0F172A] mb-4">Request Sent!</h3>
                  <p className="text-gray-500 font-medium max-w-md">
                    Thank you for reaching out. Our team will review your requirements and get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Contact Details Cards */}
          <motion.div 
            variants={containerVariants}
            className="lg:col-span-2 space-y-5"
          >
            {/* Phone Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-7 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.08)] border border-slate-100 flex items-center gap-6 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-primary/10 p-4 rounded-[16px] text-[#185D46] group-hover:bg-[#185D46] group-hover:text-white transition-colors duration-300 shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</h3>
                <p className="text-xl font-black text-[#0F172A]">{data?.contactInfo?.phone || "+91 880 770 8818"}</p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-7 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] border border-slate-100 flex items-center gap-6 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-[#f97316]/10 p-4 rounded-[16px] text-[#f97316] group-hover:bg-[#f97316] group-hover:text-white transition-colors duration-300 shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</h3>
                {(data?.contactInfo?.emails || ["info@innoveity.com", "admin@innoveity.com"]).map((email: string, i: number) => (
                  <p key={i} className="text-[17px] font-bold text-[#0F172A] mb-0.5">{email}</p>
                ))}
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-7 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(12,74,65,0.08)] border border-slate-100 flex items-center gap-6 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-primary/10 p-4 rounded-[16px] text-[#185D46] group-hover:bg-[#185D46] group-hover:text-white transition-colors duration-300 shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Working Hours</h3>
                {(data?.contactInfo?.hours || ["Mon - Fri: 9 AM - 6 PM", "Saturday: 10 AM - 4 PM"]).map((hour: string, i: number) => (
                  <p key={i} className="text-[16px] font-bold text-[#0F172A] mb-0.5">{hour}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 w-full"
        >
          <div className="bg-white p-3 sm:p-4 rounded-[32px] sm:rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 relative group overflow-hidden h-[450px]">
            <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden relative">
              <iframe
                src={data?.map?.url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.417387438497!2d80.2582846153664!3d13.08272919078347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265e3170425a7%3A0xc008f10ea82b4a!2sChennai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale-[0.2] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-out"
              ></iframe>
              
              {/* Floating CTA on Map */}
              <a 
                href={data?.map?.link || "https://maps.google.com/?q=Chennai"}
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute bottom-6 right-6 bg-white hover:bg-slate-50 text-[#0F172A] font-bold text-sm px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center gap-3 transition-transform hover:-translate-y-1 z-10"
              >
                {data?.map?.linkText || "Open in Google Maps"}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#f97316]"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Office Locations */}
        <motion.div 
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {offices.map((office: any, i: number) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`bg-white p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.08)] border border-slate-100 border-t-4 border-t-transparent hover:border-t-[${office.color}] transition-all duration-300 relative group`}
            >
              <div className={`w-12 h-12 bg-[${office.color}]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[${office.color}] group-hover:text-white text-[${office.color}] transition-colors duration-300`}>
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A] mb-2 flex items-center gap-2">
                {office.name} <span className={`w-2 h-2 rounded-full bg-[${office.color}]`}></span>
              </h3>
              <div className="text-gray-500 font-medium space-y-1 mb-4">
                {office.address.map((line: string, j: number) => (
                  <p key={j} className="flex items-center gap-2">
                    {office.name === "Branch Offices" && <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>}
                    {line}
                  </p>
                ))}
              </div>
              {office.type && (
                <p className={`text-[${office.color}] font-bold text-sm tracking-wide uppercase mt-6`}>{office.type}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
}
