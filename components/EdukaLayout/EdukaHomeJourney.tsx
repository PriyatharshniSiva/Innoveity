"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const AUTO_SLIDE_INTERVAL = 5000;

/* ──────────────────────────────────────────────────────────
   Arrow Button Component (Glassmorphism + Hover Glow)
────────────────────────────────────────────────────────── */
function ArrowBtn({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={`
        absolute top-1/2 -translate-y-1/2 z-30 
        w-12 h-12 sm:w-14 sm:h-14
        rounded-full flex items-center justify-center
        focus:outline-none
        transition-all duration-300
        ${direction === "prev" ? "left-4 sm:left-6" : "right-4 sm:right-6"}
      `}
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.7)",
        boxShadow: "0 8px 32px rgba(12,74,65,0.12)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 0 2px rgba(22,163,74,0.4), 0 12px 40px rgba(22,163,74,0.2)";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.97)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(12,74,65,0.12)";
        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.85)";
      }}
    >
      <motion.div
        whileHover={{ x: direction === "next" ? 2 : -2 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#185D46]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          {direction === "prev" ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          )}
        </svg>
      </motion.div>
    </motion.button>
  );
}

/* ──────────────────────────────────────────────────────────
   Progress Dot (Active has animated fill bar)
────────────────────────────────────────────────────────── */
function ProgressDot({
  isActive,
  isHovered,
  onClick,
}: {
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      animate={{
        width: isActive ? 36 : 10,
        height: 10,
        backgroundColor: isActive ? "var(--color-primary)" : "#CBD5E1",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="rounded-full relative overflow-hidden focus:outline-none flex-shrink-0"
      style={{
        boxShadow: isActive ? "0 0 14px rgba(22,163,74,0.5)" : "none",
      }}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Progress bar inside active dot */}
      {isActive && !isHovered && (
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: "rgba(255,255,255,0.5)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: AUTO_SLIDE_INTERVAL / 1000, ease: "linear" }}
          key="progress"
        />
      )}
    </motion.button>
  );
}

/* ──────────────────────────────────────────────────────────
   Floating Blob (Abstract Background Shape)
────────────────────────────────────────────────────────── */
function FloatingBlob({
  color,
  size,
  x,
  y,
  delay,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        filter: "blur(80px)",
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 10 + delay * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ──────────────────────────────────────────────────────────
   Main Carousel Component
────────────────────────────────────────────────────────── */
export default function EdukaHomeJourney({ data }: { data?: any }) {
  const images = data?.images || [
    "/inv2.jpg",
    "/inv3.jpg",
    "/inv5.jpg",
    "/inv6.jpg",
    "/inv1.jpg",
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isHovered, setIsHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartX = useRef<number>(0);

  /* Navigation */
  const goNext = useCallback(() => {
    setDirection("next");
    setActiveIdx((p) => (p + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setDirection("prev");
    setActiveIdx((p) => (p - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === activeIdx) return;
      setDirection(idx > activeIdx ? "next" : "prev");
      setActiveIdx(idx);
    },
    [activeIdx]
  );

  /* Keyboard */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  /* Auto-play — restarts when slide changes or hover changes */
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (!isHovered) {
      autoPlayRef.current = setInterval(goNext, AUTO_SLIDE_INTERVAL);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, activeIdx, goNext]);

  /* Drag / Swipe */
  const handleDragEnd = (_e: any, { offset, velocity }: any) => {
    if (offset.x < -60 || velocity.x < -400) goNext();
    else if (offset.x > 60 || velocity.x > 400) goPrev();
  };

  /* Slide animation variants */
  const variants = {
    enter: (dir: "next" | "prev") => ({
      x: dir === "next" ? "60%" : "-60%",
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1,
    },
    exit: (dir: "next" | "prev") => ({
      x: dir === "next" ? "-60%" : "60%",
      opacity: 0,
      scale: 0.92,
    }),
  };

  return (
    <section className="pt-[50px] pb-20 sm:pb-28 bg-white relative overflow-hidden">
      {/* ── Dotted Grid Background ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(12,74,65,0.055) 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Floating Blobs ── */}
      <FloatingBlob color="rgba(22,163,74,0.06)" size={600} x="60%" y="-10%" delay={0} />
      <FloatingBlob color="rgba(245,158,11,0.05)" size={400} x="-5%" y="60%" delay={3} />
      <FloatingBlob color="rgba(12,74,65,0.04)" size={500} x="20%" y="70%" delay={6} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-brand-primary, #0F172A)] tracking-tight">
            <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Our</span> Journey
          </h2>
        </div>

        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ── Radial Glow behind active image ── */}
          <div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(22,163,74,0.1) 0%, transparent 70%)",
            }}
          />

          {/* ── Main Image Stage ── */}
          <div
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            style={{
              borderRadius: "24px",
              aspectRatio: "3 / 2",
              boxShadow: imageHovered
                ? "0 40px 100px rgba(12,74,65,0.18), 0 0 0 2px rgba(22,163,74,0.25)"
                : "0 24px 70px rgba(12,74,65,0.12)",
              transition: "box-shadow 0.5s ease",
              background: "var(--color-primary)10",
            }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full"
              >
                {/* Image with Ken Burns zoom */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={{ scale: imageHovered ? 1.03 : 1.05 }}
                  transition={{
                    scale: {
                      duration: imageHovered ? 0.5 : AUTO_SLIDE_INTERVAL / 1000,
                      ease: imageHovered ? [0.16, 1, 0.3, 1] : "linear",
                    },
                  }}
                >
                  <img
                    src={images[activeIdx]}
                    alt={`Gallery image ${activeIdx + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.div>

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 45%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Glass inner border */}
            <div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            />
          </div>

          {/* ── Left Arrow ── */}
          <ArrowBtn direction="prev" onClick={goPrev} />

          {/* ── Right Arrow ── */}
          <ArrowBtn direction="next" onClick={goNext} />
        </div>

        {/* ── Pagination Dots ── */}
        <div className="flex justify-center items-center gap-2.5 mt-8">
          {images.map((_: any, idx: number) => (
            <ProgressDot
              key={idx}
              isActive={idx === activeIdx}
              isHovered={isHovered}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
