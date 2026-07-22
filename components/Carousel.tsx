"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  { src: "/inv1.jpg", alt: "INNOVEITY Gallery Image 1" },
  { src: "/inv2.jpg", alt: "INNOVEITY Gallery Image 2" },
  { src: "/inv3.jpg", alt: "INNOVEITY Gallery Image 3" },
  { src: "/inv5.jpg", alt: "INNOVEITY Gallery Image 5" },
  { src: "/inv6.jpg", alt: "INNOVEITY Gallery Image 6" },
];

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // Custom navigation refs
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  // Progress bar logic - smooth 60fps update over 5 seconds
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + (100 / 50))); // 50 updates/sec
    }, 100);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="relative w-full overflow-hidden bg-white py-16 rounded-[40px] group mb-12">
      {/* 1. Graphics: Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 rounded-[40px]">
        {/* Soft mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 opacity-90" />
        
        {/* Light dotted grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-70" />
        
        {/* Animated aurora glow behind active area */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-gradient-to-r from-primary/10 to-primary/10 rounded-full blur-[120px]"
        />
        
        {/* Morphing gradient blob */}
        <motion.div 
          animate={{ 
            scale: [1, 1.4, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] -right-[10%] w-[50%] h-[80%] bg-gradient-to-bl from-[#3b82f6]/10 to-primary/10 rounded-[40%_60%_70%_30%] blur-[100px]"
        />
        
        {/* Subtle floating abstract circles */}
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-full"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/3 w-48 h-48 border border-slate-300 rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Indicators: Progress Bar & Slide Counter */}
        <div className="flex justify-between items-center mb-10 px-4 md:px-8">
          <div className="flex-1 max-w-[240px]">
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#185D46] to-[#185D46]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>
          <div className="text-sm font-black tracking-widest flex items-center gap-3">
            <AnimatePresence mode="popLayout">
              <motion.span 
                key={activeIndex}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="text-[#0F172A] text-xl"
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="text-slate-300 font-light text-xl">/</span> 
            <span className="text-slate-400 text-lg">{String(IMAGES.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Swiper Carousel Container */}
        <div className="relative group/carousel">
          
          {/* Soft radial glow behind the current image */}
          <div className="absolute inset-0 bg-primary/10 blur-[120px] scale-90 z-0 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-700" />
          
          <Swiper
            modules={[Autoplay, EffectCreative, Navigation, Pagination]}
            effect="creative"
            creativeEffect={{
              limitProgress: 2,
              prev: {
                translate: ["-18%", 0, -200],
                scale: 0.85,
                opacity: 0.3,
              },
              next: {
                translate: ["18%", 0, -200],
                scale: 0.85,
                opacity: 0.3,
              },
            }}
            loop={true}
            speed={1200} // Smooth slide transition speed
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl,
              nextEl,
            }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
              bulletClass: 'swiper-custom-bullet',
              bulletActiveClass: 'swiper-custom-bullet-active',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full rounded-[40px] overflow-visible pb-16 pt-4"
          >
            {IMAGES.map((img, idx) => (
              <SwiperSlide key={idx} className="swiper-slide-custom">
                {({ isActive }) => (
                  <div className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-[40px] overflow-hidden group/slide transition-all duration-[1200ms] ease-out ${isActive ? 'shadow-[0_40px_80px_rgba(0,0,0,0.15)] z-20 translate-y-0' : 'shadow-none z-10 translate-y-2'}`}>
                    
                    {/* Elegant glass reflection effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover/slide:opacity-100 transform -translate-x-[150%] group-hover/slide:translate-x-[150%] transition-all duration-[1500ms] ease-in-out z-20 pointer-events-none mix-blend-overlay" />

                    {/* Image with Ken Burns Effect */}
                    <div className={`w-full h-full bg-slate-100 transition-all duration-[1200ms] ${!isActive ? 'blur-[8px]' : 'blur-0'}`}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={`w-full h-full object-cover transform transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-105 group-hover/slide:scale-110' : 'scale-100'}`}
                      />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Glassmorphism circular arrow buttons */}
          <button 
            ref={setPrevEl}
            className="absolute left-0 lg:-left-6 top-[45%] -translate-y-1/2 w-16 h-16 bg-white/70 hover:bg-white backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center z-30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(22,163,74,0.3)] text-[#0F172A] hover:text-[#185D46] opacity-0 group-hover/carousel:opacity-100 -translate-x-8 group-hover/carousel:translate-x-0 cursor-pointer disabled:opacity-0"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          
          <button 
            ref={setNextEl}
            className="absolute right-0 lg:-right-6 top-[45%] -translate-y-1/2 w-16 h-16 bg-white/70 hover:bg-white backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] rounded-full flex items-center justify-center z-30 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(22,163,74,0.3)] text-[#0F172A] hover:text-[#185D46] opacity-0 group-hover/carousel:opacity-100 translate-x-8 group-hover/carousel:translate-x-0 cursor-pointer disabled:opacity-0"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Animated Pagination Dots */}
          <div className="custom-pagination absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 z-30 w-full h-8"></div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .swiper-custom-bullet {
          width: 10px;
          height: 10px;
          background-color: #cbd5e1;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.6;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .swiper-custom-bullet:hover {
          background-color: #94a3b8;
          transform: scale(1.3);
        }
        .swiper-custom-bullet-active {
          width: 40px;
          border-radius: 6px;
          background-color: var(--color-primary);
          opacity: 1;
          box-shadow: 0 0 15px rgba(22,163,74,0.4);
        }
        .swiper-slide-custom {
          overflow: visible !important;
        }
      `}} />
    </div>
  );
}
