"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface EdukaStatsParallaxProps {
  stats: StatItem[];
  backgroundImage: string;
}

function AnimatedCounter({ value }: { value: string }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Regex to extract prefix, number (with decimals/commas), and suffix
  const match = value.match(/^([^0-9\.]*)([0-9\.,]+)([^0-9\.]*)$/);
  if (!match) return <span>{value}</span>;

  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3];

  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  const numericValue = parseFloat(numStr);

  return (
    <span ref={ref}>
      {prefix}
      {inView ? (
        <CountUp
          start={0}
          end={numericValue}
          duration={2.2}
          decimals={decimals}
          separator=","
        />
      ) : (
        "0"
      )}
      {suffix}
    </span>
  );
}

export default function EdukaStatsParallax({ stats, backgroundImage }: EdukaStatsParallaxProps) {
  return (
    <section className="relative pt-[50px] pb-24 overflow-hidden flex items-center justify-center min-h-[400px]">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      
      {/* Teal Overlay */}
      <div className="absolute inset-0 z-10 bg-[#185D46]/90 mix-blend-multiply" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-extrabold !text-white tracking-tight">
            Our Impact
          </h2>
          <p className="text-white/80 text-lg font-medium">
            Measurable results across education and industry partnerships
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center p-4 group"
            >
              {stat.icon && (
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                  className="mb-6 text-white opacity-90 transition-transform duration-300 group-hover:scale-110"
                >
                  {stat.icon}
                </motion.div>
              )}
              <div className="text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-[#F59E0B] font-bold tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
