"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function PremiumServices({ data }: { data?: any }) {
  const services = data?.services || [
    {
      category: "Change Management Classes",
      title: "Change Management Classes",
      desc: "Empowering organizations to navigate transformation effectively",
      badge: "Leadership",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      gradient: "from-emerald-500/20 via-teal-400/10 to-green-600/20",
      glowColor: "rgba(16, 185, 129, 0.18)",
      iconName: "ChartBar",
    },
    {
      category: "Faculty Development",
      title: "Faculty Development",
      desc: "Enhancing teaching capabilities with modern methodologies and industry insights",
      badge: "Education",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
      gradient: "from-green-500/20 via-emerald-400/10 to-teal-500/20",
      glowColor: "rgba(24, 93, 70, 0.18)",
      iconName: "AcademicCap",
    },
    {
      category: "Corporate Training",
      title: "Corporate Training",
      desc: "Comprehensive skill development programs for industry professionals",
      badge: "Enterprise",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
      gradient: "from-teal-500/20 via-green-400/10 to-emerald-600/20",
      glowColor: "rgba(20, 184, 166, 0.18)",
      iconName: "Briefcase",
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'ChartBar': return (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      );
      case 'AcademicCap': return (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      );
      case 'Briefcase': return (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"></path>
        </svg>
      );
      default: return null;
    }
  };

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.08 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative pt-[50px] pb-0 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">

      {/* Dotted grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(24, 93, 70, 0.045) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial glow behind cards */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(16,185,129,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Animated top-left ambient blob */}
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none z-0"
        style={{ background: "rgba(16,185,129,0.10)" }}
      />
      {/* Animated bottom-right ambient blob */}
      <motion.div
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none z-0"
        style={{ background: "rgba(245,158,11,0.07)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-brand-primary, #185D46)] tracking-tight">
            {(() => {
              const text = data?.title || "Our Impact in Action";
              if (text.includes("Our Impact")) {
                const parts = text.split("Our Impact");
                return (
                  <>
                    {parts[0]}
                    <span style={{ color: "var(--color-brand-accent, #F59E0B)" }}>Our Impact</span>
                    {parts.slice(1).join("Our Impact")}
                  </>
                );
              }
              return text;
            })()}
          </h2>
          <p className="text-gray-500 text-lg mt-4 font-medium">
            {data?.subtitle || "Witness the transformation we bring to educational institutions and industries"}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((srv: any, idx: number) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.012,
                boxShadow: `0 32px 64px -12px ${srv.glowColor}, 0 0 0 1.5px rgba(16,185,129,0.18)`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative bg-white rounded-[24px] border border-slate-100/80 overflow-hidden flex flex-col cursor-pointer"
              style={{
                boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
              }}
            >
              {/* ── Premium Image Header ── */}
              <div
                className="relative py-14 flex flex-col items-center justify-center overflow-hidden bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url(${srv.image})`,
                }}
              >
                {/* Dark Overlay for readability */}
                <div className="absolute inset-0 bg-[#0F172A]/55 group-hover:bg-[#0F172A]/40 transition-colors duration-500"></div>

                {/* Category badge */}
                <span className="relative z-10 mb-5 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-white/15 text-white/90 backdrop-blur-sm border border-white/20 shadow-sm">
                  {srv.badge}
                </span>

                {/* Glassmorphism icon circle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.13)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1.5px solid rgba(255,255,255,0.22)",
                    boxShadow: `0 8px 32px -4px ${srv.glowColor}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                  }}
                >
                  {getIcon(srv.iconName)}
                  {/* Inner glow ring on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 24px 6px ${srv.glowColor}` }} />
                </motion.div>

                {/* Category label */}
                <span className="relative z-10 mt-5 text-sm font-extrabold text-white/90 tracking-wide text-center px-6">
                  {srv.category}
                </span>
              </div>

              {/* ── Content ── */}
              <div className="p-8 flex flex-col flex-grow text-left bg-white">
                <h3 className="text-xl font-bold text-[#185D46] mb-3 group-hover:text-[#185D46] transition-colors duration-300">
                  {srv.title}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-6 flex-grow font-medium">
                  {srv.desc}
                </p>

                {/* Learn More link with animated arrow */}
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-[#185D46] font-bold text-sm tracking-wide hover:text-[#185D46] transition-colors group/link"
                >
                  <span>Learn More</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>

              {/* Bottom glowing border on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[24px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${srv.glowColor}, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
