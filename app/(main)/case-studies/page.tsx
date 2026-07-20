"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      style={{ background: "linear-gradient(135deg, #185D46 0%, #0f2d28 100%)" }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#185D46]/70 via-transparent to-transparent" />

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
   Main Page
───────────────────────────────────────────── */
export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [partnerQuotes, setPartnerQuotes] = useState<any[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/case-studies");
        if (res.ok) {
          const data = await res.json();
          setCaseStudies(data.caseStudies);
          setPartnerQuotes(data.partnerQuotes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
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

  if (loading) return <div className="min-h-screen bg-white" />;
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
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 pt-32 overflow-hidden">
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
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold tracking-widest uppercase bg-[#185D46]/5 text-[#185D46] border border-[#185D46]/20"
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
                <div className="lg:w-[48%] flex flex-col relative" style={{ background: "#185D46", minHeight: "420px" }}>
                  {/* Glow blobs */}
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(22,163,74,0.18)", filter: "blur(80px)" }} />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(245,158,11,0.12)", filter: "blur(60px)" }} />

                  {/* Key Results */}
                  <div className="p-8 sm:p-10 xl:p-12 flex-1" style={{ position: "relative", zIndex: 10 }}>
                    <h3 className="text-base font-extrabold uppercase tracking-widest mb-7 pb-4 border-b" style={{ color: "#6ee7b7", borderColor: "rgba(255,255,255,0.15)" }}>
                      Key Results
                    </h3>
                    <div className="space-y-4">
                      {cs.results.map((r, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 rounded-2xl px-5 py-4"
                          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                        >
                          <div
                            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: "#185D46", boxShadow: "0 0 16px rgba(22,163,74,0.5)" }}
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
                  background: i === activeIdx ? "#185D46" : "#CBD5E1",
                  opacity: i === activeIdx ? 1 : 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Testimonials ── */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight"
            >
              What Our Partners Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg font-medium"
            >
              Hear from the leaders and innovators we've had the privilege to work with
            </motion.p>
          </div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: false, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {partnerQuotes.map((q, idx) => (
              <motion.div
                key={idx}
                variants={fadeUpChild}
                className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_20px_50px_rgb(22,163,74,0.1)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#185D46] to-[#185D4620] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mb-6 opacity-20 text-[#185D46] group-hover:opacity-40 transition-opacity">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <blockquote className="text-[#0F172A] text-lg mb-8 leading-relaxed font-semibold relative z-10">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
