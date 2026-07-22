"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQAccordion({ data }: { data?: any }) {
  const faqs = data?.faqs || [
    {
      question: "What makes INNOVEITY different from other training providers in Tamil Nadu?",
      mainAnswer: "INNOVEITY delivers measurable results with an 85% average placement improvement rate across 50+ partner institutions. We combine AICTE-recognized programs, ISO-certified trainers, and flexible bilingual delivery (Tamil and English) with outcome-based pricing models that guarantee ROI.",
      detailedExplanation: "Our comprehensive approach includes pre-training assessments, customized curriculum design, hands-on delivery, post-training support, and transparent ROI tracking using Kirkpatrick's evaluation model. We maintain local presence across Chennai, Coimbatore, and Madurai for rapid deployment within 48-72 hours."
    },
    {
      question: "How does INNOVEITY improve college placement rates?",
      mainAnswer: "We provide end-to-end placement enhancement including aptitude coaching, technical upskilling, soft skills development, mock interviews, resume building, and direct industry connections. Our programs have achieved 60-85% placement improvement across engineering colleges in Tamil Nadu.",
      detailedExplanation: "Each program includes baseline assessment, gap analysis, customized training modules, regular progress tracking, industry exposure through guest lectures and company visits, and post-placement support. Our success rate is backed by verifiable data from 50+ partner institutions."
    },
    {
      question: "What corporate training services does INNOVEITY offer in Chennai?",
      mainAnswer: "INNOVEITY offers comprehensive L&D solutions including leadership development, behavioral training, technical skills enhancement, ESG consulting, digital transformation programs, and customized workshops. All programs include ROI measurement, post-training support, and flexible delivery options.",
      detailedExplanation: "We serve manufacturing, IT, healthcare, BFSI, and other sectors across Tamil Nadu. Programs can be delivered on-site at your Chennai, Coimbatore, or Madurai offices, online via virtual sessions, or through hybrid formats. Enterprise discounts available for annual partnerships and bulk bookings."
    }
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [readMoreIndex, setReadMoreIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
      setReadMoreIndex(null); // Close read more when closing FAQ
    } else {
      setOpenIndex(index);
      setReadMoreIndex(null); // Reset read more when opening a new FAQ
    }
  };

  const toggleReadMore = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling the whole FAQ accordion
    if (readMoreIndex === index) {
      setReadMoreIndex(null);
    } else {
      setReadMoreIndex(index);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const isReadMore = readMoreIndex === index;

          return (
            <div 
              key={index}
              className={`bg-white rounded-[20px] transition-all duration-300 overflow-hidden 
                ${isOpen 
                  ? 'border border-primary/30 shadow-[0_4px_25px_rgba(12,74,65,0.12)] -translate-y-1' 
                  : 'border border-slate-200 shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5'
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex items-center justify-between p-6 sm:p-8 cursor-pointer focus:outline-none group"
              >
                <h3 className={`text-lg md:text-xl font-bold pr-8 transition-colors duration-300 ${isOpen ? 'text-[#185D46]' : 'text-slate-800 group-hover:text-[#185D46]'}`}>
                  {faq.question}
                </h3>
                
                <div 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#185D46] text-white rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-[#e6f4ea] group-hover:text-[#185D46]'
                  }`}
                >
                  {isOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                      <p className="text-slate-600 leading-relaxed text-base">
                        {faq.mainAnswer}
                      </p>
                      
                      <AnimatePresence>
                        {isReadMore && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, y: -10 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-4"
                          >
                            <p className="text-slate-600 leading-relaxed text-base border-l-2 border-primary/30 pl-4 ml-1">
                              {faq.detailedExplanation}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button 
                        onClick={(e) => toggleReadMore(index, e)}
                        className="mt-4 text-[#185D46] font-semibold text-sm flex items-center group cursor-pointer"
                      >
                        {isReadMore ? "Read Less" : "Read More"}
                        <svg 
                          className={`w-4 h-4 ml-1 transition-transform duration-300 ${isReadMore ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
