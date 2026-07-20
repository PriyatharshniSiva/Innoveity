"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32, scale: 0.97 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: false, margin: "-60px" },
  transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1], delay },
});

export default function EdukaOverview() {
  const chooseItems = [
    "85%+ placement improvement rate for engineering colleges",
    "2,000+ students trained annually with industry-relevant skills",
    "50+ Tamil Nadu colleges and universities as active partners",
    "4.8★ average client satisfaction rating",
    "AICTE recognition and government-approved certifications",
    "ISO-certified training professionals with proven expertise",
    "Bilingual training capability (English and Tamil)",
    "Rapid deployment within 48-72 hours for urgent needs",
    "Flexible payment models including outcome-based pricing",
    "Comprehensive post-training support and assessment",
  ];

  const divisionCards = [
    {
      badge: "Institutions",
      title: "Comprehensive Training Solutions for Engineering Colleges & Universities",
      text: "Our AICTE-recognized faculty development programs and student placement training modules have helped engineering colleges achieve 60-85% improvement in campus placement statistics. We specialize in aptitude training, technical certifications, soft skills development, mock interview preparation, and industry connect programs aligned with NEP 2020 guidelines. Partner with INNOVEITY to enhance your institution's reputation and student success rates through evidence-based training methodologies.",
      accent: "#185D46",
      badgeBg: "bg-[#185D46]/5",
      badgeText: "text-[#185D46]",
      iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
    {
      badge: "Corporates",
      title: "Corporate L&D Training & ESG Consulting Services",
      text: "Maximize your learning and development ROI with customized corporate training solutions delivering 200-300% returns through improved productivity, reduced employee attrition, and enhanced innovation capabilities. Our ISO-certified trainers bring 15+ years of industry experience across manufacturing, IT, healthcare, and BFSI sectors. We offer flexible delivery models including on-site training at your Chennai, Coimbatore, or Madurai offices, online virtual sessions, and hybrid learning formats tailored to your organizational needs.",
      accent: "#F59E0B",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-700",
      iconPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6",
    },
    {
      badge: "Sustainability",
      title: "ESG Implementation & Sustainability Consulting",
      text: "Navigate complex Environmental, Social, and Governance (ESG) requirements with INNOVEITY's comprehensive consulting services. We provide carbon footprint analysis, sustainability reporting, CSR-compliant training programs for MCA documentation, and complete ESG framework implementation across Tamil Nadu. Our CSR training initiatives qualify for company CSR spending under Schedule VII, helping you meet compliance requirements while creating meaningful social impact.",
      accent: "#185D46",
      badgeBg: "bg-[#185D46]/5",
      badgeText: "text-[#185D46]",
      iconPath: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
    },
  ];

  const coreDetails = [
    {
      title: "Our Service Coverage Across Tamil Nadu",
      text: "INNOVEITY maintains a strong presence across major Tamil Nadu cities including Chennai, Coimbatore, Madurai, Trichy, Salem, Tiruchirappalli, and surrounding regions. Our regional expertise combined with local market knowledge enables us to deliver culturally relevant, context-appropriate training solutions that resonate with Tamil Nadu's unique educational and corporate landscape. Whether you're an engineering college in Chennai seeking to improve placement statistics, a manufacturing company in Coimbatore requiring safety training, or a corporate entity in Madurai looking for leadership development programs, INNOVEITY has the expertise and infrastructure to support your growth.",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      color: "#185D46",
      bg: "bg-[#185D46]/5",
    },
    {
      title: "Industry-Recognized Certifications & Compliance",
      text: "All INNOVEITY programs are designed to meet the highest industry standards and regulatory requirements. Our courses are aligned with AICTE guidelines, NSDC (National Skill Development Corporation) frameworks, Tamil Nadu Skill Development Corporation standards, and NEP 2020 educational policies. We provide government-approved skill certifications that enhance student employability and corporate competitiveness. Our trainers hold prestigious certifications including PMP (Project Management Professional), Six Sigma Black Belt, SHRM (Society for Human Resource Management), and specialized credentials in behavioral psychology, adult learning theory, and instructional design.",
      icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
      color: "#F59E0B",
      bg: "bg-amber-50",
    },
    {
      title: "Measurable Results & ROI Tracking",
      text: "Unlike generic training providers, INNOVEITY emphasizes measurable outcomes and transparent ROI tracking. We employ Kirkpatrick's Four-Level Training Evaluation Model to assess Reaction (participant feedback), Learning (knowledge gained), Behavior (on-job application), and Results (business impact). Our clients receive comprehensive dashboards showing pre and post-training assessments, skill gap analysis, productivity improvements, and bottom-line business impact. This data-driven approach ensures your training investment delivers tangible returns and demonstrates clear value to stakeholders.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      color: "#185D46",
      bg: "bg-[#185D46]/5",
    },
  ];

  return (
    <div className="bg-white">

      {/* ── SECTION 1: Hero Header ── */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-t border-slate-100">
        {/* Soft dot grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(12,74,65,0.05) 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">

          <motion.h2
            {...fadeUp(0.08)}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-[#185D46] tracking-tight leading-[1.1]"
          >
            Leading Corporate Training &{" "}
            <span className="text-[#F59E0B]">College Development</span>{" "}
            Partner in Tamil Nadu
          </motion.h2>

          <motion.p
            {...fadeUp(0.16)}
            className="text-slate-600 text-lg sm:text-xl leading-relaxed font-medium max-w-4xl mx-auto"
          >
            INNOVEITY is Tamil Nadu's premier corporate training and college development organization, dedicated to bridging the critical gap between academic education and industry requirements. With a proven track record of training over 2,000 students annually across 50+ institutions in Chennai, Coimbatore, Madurai, and throughout Tamil Nadu, we deliver measurable results that transform educational outcomes and corporate performance.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2: Three Division Cards ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#185D4610] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-50"
          style={{
            backgroundImage: "radial-gradient(rgba(12,74,65,0.04) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {divisionCards.map((card, idx) => (
              <motion.div
                key={idx}
                {...fadeUp(idx * 0.12)}
                whileHover={{ y: -8, boxShadow: "0 24px 48px -8px rgba(12,74,65,0.12)" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group bg-white rounded-[24px] border border-slate-100 p-8 flex flex-col gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] cursor-pointer"
              >
                {/* Top row: badge + icon */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase ${card.badgeBg} ${card.badgeText} border border-current/10`}>
                    {card.badge}
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ background: card.accent + "15" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke={card.accent} strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={card.iconPath} />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-lg sm:text-xl font-extrabold leading-snug tracking-tight"
                  style={{ color: card.accent }}
                >
                  {card.title}
                </h3>

                {/* Divider */}
                <div className="h-px bg-slate-100" />

                {/* Body */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium flex-grow">
                  {card.text}
                </p>

                {/* Bottom glow accent */}
                <div
                  className="h-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-2"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Why Choose INNOVEITY ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(16,185,129,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Card wrapper */}
          <motion.div
            {...fadeUp(0)}
            className="bg-[#185D4610] rounded-[32px] border border-[#185D46]/20 p-8 sm:p-12 space-y-10 shadow-[0_8px_40px_rgba(12,74,65,0.06)]"
          >
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#185D46] tracking-tight">
                Why Leading Institutions Choose INNOVEITY
              </h3>
              <p className="text-slate-500 text-base font-semibold">
                Delivering excellence through recognized certifications and optimized training strategies.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {chooseItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#185D46] flex items-center justify-center text-white text-sm font-extrabold shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm sm:text-base leading-snug">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: Core Details Grid ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#185D4610] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(rgba(12,74,65,0.04) 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreDetails.map((col, idx) => (
              <motion.div
                key={idx}
                {...fadeUp(idx * 0.12)}
                whileHover={{ y: -6, boxShadow: "0 20px 40px -8px rgba(12,74,65,0.1)" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group bg-white rounded-[24px] border border-slate-100 p-8 flex flex-col gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] cursor-pointer"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${col.bg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <svg className="w-6 h-6" fill="none" stroke={col.color} strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={col.icon} />
                  </svg>
                </div>

                {/* Title */}
                <h4
                  className="text-lg sm:text-xl font-extrabold leading-snug tracking-tight"
                  style={{ color: col.color }}
                >
                  {col.title}
                </h4>

                {/* Accent line */}
                <div
                  className="h-[3px] w-12 rounded-full"
                  style={{ background: col.color }}
                />

                {/* Body */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  {col.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Contact CTA ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            {...fadeUp(0)}
            className="relative bg-gradient-to-br from-[#185D46] via-[#145c4e] to-[#185D46] rounded-[32px] p-8 sm:p-14 text-center space-y-6 overflow-hidden shadow-[0_20px_60px_rgba(12,74,65,0.25)]"
          >
            {/* Mesh shimmer */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 14px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Inner radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 70%)",
              }}
            />
            {/* Orange accent blob */}
            <div
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full blur-[80px] pointer-events-none"
              style={{ background: "rgba(245,158,11,0.18)" }}
            />

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="relative z-10 text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Contact INNOVEITY Today
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 text-emerald-100 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-medium"
            >
              Ready to transform your institution or organization? Contact INNOVEITY at{" "}
              <span className="text-[#F59E0B] font-black">+91 880 770 8818</span> or email{" "}
              <span className="text-[#F59E0B] font-black">admin@innoveity.com</span> for a free consultation.
              Our team of experts will assess your specific needs and design a customized training solution
              that delivers measurable results. Join 50+ leading Tamil Nadu institutions and 100+ corporate
              clients who trust INNOVEITY for their training and development requirements. Visit our office
              at No:11 Ritherdon Avenue, Ritherdon Road Vepery, Chennai 600007, or schedule a virtual
              consultation to discuss how we can help you achieve your educational and business objectives.
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
