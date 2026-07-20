"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  number: string;
  title: string;
  text: string;
}

interface NumberedStepsProps {
  title: string;
  description?: string;
  steps: Step[];
  images: string[]; // Expecting exactly 3 images for the collage
}

export default function NumberedSteps({ title, description, steps, images }: NumberedStepsProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        {/* Left Side: Steps */}
        <div className="w-full lg:w-1/2 space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="text-gray-500 text-lg font-medium">
                {description}
              </p>
            )}
          </div>

          <div className="space-y-8 relative">
            {/* Vertical connector line bg */}
            <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-gray-200/50 -z-10 hidden sm:block"></div>
            {/* Animated drawing line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              className="absolute left-6 top-8 bottom-8 w-[2px] bg-[#185D46] -z-10 hidden sm:block origin-top"
            />
            
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
                className="flex items-start gap-6 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, borderColor: "#185D46", backgroundColor: "#185D4610" }}
                  className="flex-shrink-0 w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm transition-all duration-300 relative z-10"
                >
                  <span className="text-xl font-bold text-gray-900 group-hover:text-[#185D46] transition-colors">
                    {step.number}
                  </span>
                </motion.div>
                <div className="pt-2 space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#185D46] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Masonry Collage (3 images) */}
        <div className="w-full lg:w-1/2 h-full">
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            {/* Image 1: Tall */}
            <div className="col-span-1 row-span-2 overflow-hidden rounded-2xl shadow-lg relative group">
              <img 
                src={images[0] || "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"} 
                alt="Collage 1" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#185D46]/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            {/* Image 2: Top Right */}
            <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-lg relative group">
              <img 
                src={images[1] || "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"} 
                alt="Collage 2" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#185D46]/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Image 3: Bottom Right */}
            <div className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-lg relative group">
              <img 
                src={images[2] || "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg"} 
                alt="Collage 3" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[#185D46]/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
