"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "What makes INNOVEITY different from other training providers in Tamil Nadu?",
    highlight:
      "INNOVEITY delivers measurable results with an 85% average placement improvement rate across 50+ partner institutions. We combine AICTE-recognized programs, ISO-certified trainers, and flexible bilingual delivery (Tamil and English) with outcome-based pricing models that guarantee ROI.",
    text: "Our comprehensive approach includes pre-training assessments, customized curriculum design, hands-on delivery, post-training support, and transparent ROI tracking using Kirkpatrick's evaluation model. We maintain local presence across Chennai, Coimbatore, and Madurai for rapid deployment within 48-72 hours.",
  },
  {
    question: "How does INNOVEITY improve college placement rates?",
    highlight:
      "We provide end-to-end placement enhancement including aptitude coaching, technical upskilling, soft skills development, mock interviews, resume building, and direct industry connections. Our programs have achieved 60-85% placement improvement across engineering colleges in Tamil Nadu.",
    text: "Each program includes baseline assessment, gap analysis, customized training modules, regular progress tracking, industry exposure through guest lectures and company visits, and post-placement support. Our success rate is backed by verifiable data from 50+ partner institutions.",
  },
  {
    question: "What corporate training services does INNOVEITY offer in Chennai?",
    highlight:
      "INNOVEITY offers comprehensive L&D solutions including leadership development, behavioral training, technical skills enhancement, ESG consulting, digital transformation programs, and customized workshops. All programs include ROI measurement, post-training support, and flexible delivery options.",
    text: "We serve manufacturing, IT, healthcare, BFSI, and other sectors across Tamil Nadu. Programs can be delivered on-site at your Chennai, Coimbatore, or Madurai offices, online via virtual sessions, or through hybrid formats. Enterprise discounts available for annual partnerships and bulk bookings.",
  },
];

export default function EdukaFAQList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden border-t border-slate-100">
      {/* Soft dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(12,74,65,0.045) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 space-y-12">
        {/* Section header */}
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

        {/* Accordion items */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                  delay: idx * 0.08,
                }}
                whileHover={!isOpen ? { y: -3, boxShadow: "0 12px 32px -6px rgba(12,74,65,0.10)" } : {}}
                className="rounded-[20px] border transition-all duration-300 overflow-hidden"
                style={{
                  background: "white",
                  borderColor: isOpen ? "var(--color-primary)" : "#e2e8f0",
                  boxShadow: isOpen
                    ? "0 0 0 3px rgba(22,163,74,0.10), 0 16px 40px -8px rgba(12,74,65,0.13)"
                    : "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                {/* Question row — clickable */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base sm:text-lg font-bold leading-snug transition-colors duration-200"
                    style={{ color: isOpen ? "var(--color-primary)" : "#1e293b" }}
                  >
                    {item.question}
                  </span>

                  {/* +/− icon */}
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 5v14M5 12h14"
                      />
                    </svg>
                  </motion.span>
                </button>

                {/* Answer — animated slide-down */}
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
                      <div className="px-6 pb-7 space-y-4 border-t border-primary/20/80">
                        {/* Highlight block */}
                        <div className="mt-5 bg-[#185D4610] border-l-[4px] border-[#185D46] rounded-r-xl px-5 py-4">
                          <p className="text-slate-800 font-semibold leading-relaxed text-sm sm:text-base">
                            {item.highlight}
                          </p>
                        </div>
                        {/* Extended text */}
                        {item.text && (
                          <p className="text-slate-500 leading-relaxed font-medium text-sm sm:text-base">
                            {item.text}
                          </p>
                        )}
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
  );
}
