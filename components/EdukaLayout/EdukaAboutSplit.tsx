"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface EdukaAboutSplitProps {
  badge?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image1: string;
  image2?: string;
  experienceYears?: string;
  experienceText?: string;
  listItems?: { icon: React.ReactNode; title: string; desc: string }[];
  quote?: string;
  buttonText?: string;
  buttonLink?: string;
  phone?: string;
}

export default function EdukaAboutSplit({
  badge,
  title,
  description,
  image1,
  image2,
  experienceYears,
  experienceText,
  listItems,
  quote,
  buttonText,
  buttonLink,
  phone
}: EdukaAboutSplitProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Images */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square"
        >
          {image2 ? (
            <>
              <div className="absolute top-0 left-0 w-[70%] h-[75%] rounded-2xl overflow-hidden shadow-xl">
                <img src={image1} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="About Main" />
              </div>
              <div className="absolute bottom-[5%] right-0 w-[55%] h-[55%] rounded-2xl overflow-hidden shadow-2xl border-[10px] border-white z-10">
                <img src={image2} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="About Secondary" />
              </div>
            </>
          ) : (
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
              <img src={image1} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="About Main" />
            </div>
          )}
          
          {experienceYears && experienceText && (
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-x-full lg:left-[10%] bg-[#185D46] text-white p-6 rounded-full shadow-2xl w-40 h-40 flex flex-col items-center justify-center text-center border-4 border-white z-20"
            >
              <span className="text-4xl font-black">{experienceYears}</span>
              <span className="text-sm font-bold mt-1 uppercase tracking-wider">{experienceText}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Right Text */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {badge && (
            <div className="inline-flex items-center space-x-2">
              <span className="w-8 h-[2px] bg-[#F59E0B]"></span>
              <span className="text-[#185D46] font-bold tracking-widest text-sm uppercase">{badge}</span>
            </div>
          )}
          
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            {title}
          </h2>
          
          <div className="text-slate-600 leading-relaxed text-lg space-y-4">
            {description}
          </div>

          {listItems && listItems.length > 0 && (
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2"
            >
              {listItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex items-start space-x-4 p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 hover:shadow-md transition-all duration-300"
                >
                   <div className="w-12 h-12 rounded bg-slate-50 text-[#185D46] flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 transition-transform duration-300">
                      {item.icon}
                   </div>
                   <div>
                      <h4 className="font-bold text-[#0F172A] mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                   </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {quote && (
            <div className="bg-slate-50 border-l-4 border-[#185D46] p-6 rounded-r-lg">
               <p className="text-slate-700 font-medium italic text-sm">
                 &quot;{quote}&quot;
               </p>
            </div>
          )}

          {(buttonText && buttonLink) || phone ? (
            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-slate-100">
              {buttonText && buttonLink && (
                <Link href={buttonLink}>
                  <motion.button 
                    whileHover={{ y: -4, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(24, 93, 70, 0.3), 0 10px 10px -5px rgba(24, 93, 70, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="eduka-btn-primary shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    {buttonText}
                  </motion.button>
                </Link>
              )}
              
              {phone && (
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-[#185D46]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                   </div>
                   <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Call For Support</p>
                      <p className="text-lg font-bold text-[#0F172A]">{phone}</p>
                   </div>
                </div>
              )}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
