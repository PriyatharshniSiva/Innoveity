"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EdukaTestimonials from "@/components/EdukaLayout/EdukaTestimonials";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const fadeUpChild = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" as const } },
};

/* ─────────────────────────────────────────────
   NavArrow component
───────────────────────────────────────────── */
function NavArrow({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.08, boxShadow: "0 8px 32px rgba(12,74,65,0.18)" } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
        disabled
          ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
          : "border-[#185D46] text-[#185D46] bg-white hover:bg-[#185D46] hover:text-white shadow-md"
      }`}
      aria-label={direction === "prev" ? "Previous case study" : "Next case study"}
    >
      {direction === "prev" ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   VideoPlayer component
───────────────────────────────────────────── */
function VideoPlayer({ videoId, isPlaying, onPlay }: { videoId: string; isPlaying: boolean; onPlay: () => void }) {
  return (
    <div
      className="relative w-full aspect-video rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18)] cursor-pointer group border border-white/10"
      onClick={onPlay}
      style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, #0f2d28 100%)" }}
    >
      {isPlaying ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="INNOVEITY Case Study Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          {/* YouTube thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Case study video thumbnail"
            className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-70 transition-opacity duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              whileHover={{ scale: 1.12 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-20 h-20 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
            >
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-15" style={{ animationDuration: "3s" }} />
              <svg className="w-9 h-9 text-[#185D46] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
              </svg>
            </motion.div>
          </div>

          {/* Bottom label */}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg">
              <div className="w-2 h-2 rounded-full bg-[#185D46] animate-pulse" />
              <span className="text-[#0F172A] font-bold text-sm tracking-wide">Case Study Video</span>
            </div>
            <span className="text-white/70 text-xs font-semibold bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              Watch Full Story →
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CaseStudiesClient component
───────────────────────────────────────────── */
export default function CaseStudiesClient({ caseStudies, testimonials }: { caseStudies: any[], testimonials: any[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const prevIdxRef = useRef(0);

  const goTo = useCallback(
    (newIdx: number) => {
      if (newIdx === activeIdx) return;
      setDirection(newIdx > activeIdx ? "next" : "prev");
      setIsPlaying(false); // pause current video
      prevIdxRef.current = activeIdx;
      setActiveIdx(newIdx);
    },
    [activeIdx]
  );

  const goNext = () => goTo(Math.min(activeIdx + 1, caseStudies.length - 1));
  const goPrev = () => goTo(Math.max(activeIdx - 1, 0));

  if (caseStudies.length === 0) return null;

  const cs = caseStudies[activeIdx];

  // Slide animation variants based on direction
  const slideVariants = {
    enter: (dir: "next" | "prev") => ({
      opacity: 0,
      x: dir === "next" ? 40 : -40,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: "next" | "prev") => ({
      opacity: 0,
      x: dir === "next" ? -40 : 40,
    }),
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#185D46] selection:text-white">

      {/* ── 1. Hero ── */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#185D4620] rounded-full blur-[120px] opacity-70 -z-10 translate-x-1/3 -translate-y-1/3 animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#185D46] rounded-full blur-[150px] opacity-10 -z-10 animate-pulse" style={{ animationDuration: "10s" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tight"
          >
            Case <span className="text-[#185D46]">Studies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Real stories of transformation, growth, and measurable success from our partnerships across educational institutions, corporations, and communities.
          </motion.p>
        </div>
      </section>

      {/* ── 2. Premium Carousel ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-28 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.04) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(rgba(12,74,65,0.04) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }} />

        <div className="max-w-7xl mx-auto relative z-10">

          {/* ── Nav top row ── */}
          <div className="flex items-center justify-end mb-10">
            <div className="flex items-center gap-3">
              <NavArrow direction="prev" onClick={goPrev} disabled={activeIdx === 0} />
              <NavArrow direction="next" onClick={goNext} disabled={activeIdx === caseStudies.length - 1} />
            </div>
          </div>

          {/* ── Main slide card ── */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-[32px] border border-slate-100 shadow-[0_24px_60px_rgba(12,74,65,0.08)]"
              style={{ overflow: "hidden" }}
            >
              <div className="lg:flex">
                {/* ── LEFT: Story column ── */}
                <div className="lg:w-[52%] p-8 sm:p-10 xl:p-14 flex flex-col gap-8">
                  {/* Type badge + title */}
                  <div className="space-y-4">
                    <motion.span
                      {...fadeUp(0)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-primary/5 text-[#185D46] border border-primary/20"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#185D46] inline-block" />
                      {cs.type}
                    </motion.span>
                    <motion.h2 {...fadeUp(0.06)} className="text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-[1.2]">
                      {cs.title}
                    </motion.h2>
                  </div>

                  {/* Challenge + Solution */}
                  <div className="space-y-6">
                    <motion.div {...fadeUp(0.12)}>
                      <p className="text-xs font-extrabold text-[#185D46] uppercase tracking-widest mb-2">The Challenge</p>
                      <p className="text-slate-600 leading-relaxed font-medium">{cs.challenge}</p>
                    </motion.div>
                    <motion.div {...fadeUp(0.18)}>
                      <p className="text-xs font-extrabold text-[#185D46] uppercase tracking-widest mb-2">Our Solution</p>
                      <p className="text-slate-600 leading-relaxed font-medium">{cs.solution}</p>
                    </motion.div>
                  </div>

                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                    className="border-l-4 border-[#F59E0B] pl-6 py-3 bg-gradient-to-r from-amber-50/60 to-transparent rounded-r-2xl"
                  >
                    <p className="italic text-slate-700 text-base sm:text-lg font-semibold leading-relaxed">
                      &ldquo;{cs.quote}&rdquo;
                    </p>
                  </motion.div>
                </div>

                {/* ── RIGHT: Results + video ── */}
                <div className="lg:w-[48%] flex flex-col relative" style={{ background: "var(--color-primary)", minHeight: "420px" }}>
                  {/* Glow blobs */}
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(22,163,74,0.18)", filter: "blur(80px)" }} />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(245,158,11,0.12)", filter: "blur(60px)" }} />

                  {/* Key Results */}
                  <div className="p-8 sm:p-10 xl:p-12 flex-1" style={{ position: "relative", zIndex: 10 }}>
                    <h3 className="text-base font-extrabold uppercase tracking-widest mb-7 pb-4 border-b" style={{ color: "#6ee7b7", borderColor: "rgba(255,255,255,0.15)" }}>
                      Key Results
                    </h3>
                    <div className="space-y-4">
                      {cs.results.map((r: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 rounded-2xl px-5 py-4"
                          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                        >
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: "var(--color-primary)", boxShadow: "0 0 16px rgba(22,163,74,0.5)" }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-2xl font-black tracking-tight leading-none" style={{ color: "white" }}>{r.stat}</div>
                            <div className="text-sm font-medium leading-snug mt-0.5" style={{ color: "#a7f3d0" }}>{r.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video player */}
                  <motion.div {...fadeRight(0.28)} className="px-6 sm:px-8 xl:px-10 pb-8 sm:pb-10 xl:pb-12 relative z-10">
                    <VideoPlayer
                      videoId={cs.videoId}
                      isPlaying={isPlaying}
                      onPlay={() => setIsPlaying(true)}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Pagination dots ── */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {caseStudies.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="cursor-pointer transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIdx ? "32px" : "10px",
                  height: "10px",
                  background: i === activeIdx ? "var(--color-primary)" : "#CBD5E1",
                  opacity: i === activeIdx ? 1 : 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Testimonials ── */}
      <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-brand-primary, #0F172A)] mb-6">
              <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>What Our </span>Partners Say
            </h2>
            <p className="text-xl text-primary/80 max-w-3xl mx-auto">Hear from the leaders and innovators we've had the privilege to work with</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
              <p className="text-primary/90 italic text-lg leading-relaxed">
                "INNOVEITY's comprehensive faculty development program revolutionized our teaching methodologies. Our students are now industry-ready from day one."
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
              <p className="text-primary/90 italic text-lg leading-relaxed">
                "The ESG consulting provided by INNOVEITY helped us achieve carbon neutrality ahead of schedule while improving employee satisfaction scores."
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
              <p className="text-primary/90 italic text-lg leading-relaxed">
                "This program transformed our team's capabilities and significantly improved our productivity and innovation metrics."
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
