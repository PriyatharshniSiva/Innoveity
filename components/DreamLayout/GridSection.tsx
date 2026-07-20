"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CardItem {
  image: string;
  badge?: string;
  title: string;
  description: string;
  footer?: string;
}

interface GridSectionProps {
  title: string;
  subtitle?: string;
  items: CardItem[];
}

export default function GridSection({ title, subtitle, items }: GridSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50/50">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 group hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col"
          >
            {/* Image Area */}
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {item.badge && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                  {item.badge}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#185D46] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>
              
              {item.footer && (
                <div className="pt-4 border-t border-gray-100 flex items-center text-sm font-medium text-gray-700">
                  <span className="text-[#f59e0b] mr-2">✦</span>
                  {item.footer}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
