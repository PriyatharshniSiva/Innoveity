"use client";

import React from "react";
import { motion } from "framer-motion";
import { useServices } from "./ServicesState";
import * as Icons from "lucide-react";

export default function ServicesLivePreview() {
  const { services, categories } = useServices();
  const activeServices = services.filter(s => s.status === "Active").sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col h-[800px] sticky top-8">


      {/* Scaled Preview Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white relative custom-scrollbar">
        <div className="w-[133.33%] origin-top-left scale-75 pb-20">
          
          {/* Services Hero Simulation */}
          <section className="relative py-24 px-8 text-center bg-slate-50">
            <h1 className="text-5xl font-black text-[#0F172A] mb-8">Our <span className="text-[#185D46]">Services</span></h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">Live preview of your categorized services from the management grid.</p>
          </section>

          {/* Render Categories and their active services */}
          {categories.map((category, idx) => {
            const catServices = activeServices.filter(s => s.categoryId === category.id);
            if (catServices.length === 0) return null;

            const bgClass = idx % 2 === 0 ? "bg-white" : "bg-slate-50/50";

            return (
              <section key={category.id} className={`py-24 px-8 ${bgClass} relative overflow-hidden`}>
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-4xl font-extrabold text-center text-[#0F172A] mb-16 tracking-tight">
                    {category.name}
                  </h2>
                  
                  <div className={`grid grid-cols-1 md:grid-cols-2 ${catServices.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}>
                    {catServices.map((card) => {
                      // @ts-ignore
                      const IconComponent = Icons[card.iconName] || Icons.LayoutTemplate;
                      
                      return (
                        <div key={card.id} className="bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden h-auto min-h-[300px]">
                          <div className="absolute top-0 left-0 w-full h-1 bg-[#185D46] rounded-t-[20px]" />
                          
                          <div className="flex flex-col items-center w-full justify-start mt-2 mb-6">
                            <div className="w-20 h-20 rounded-full bg-[#185D4620] text-[#185D46] flex items-center justify-center mb-5 shadow-sm shrink-0">
                              <IconComponent className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-[#0F172A] min-h-[56px] flex items-center justify-center">{card.title}</h3>
                          </div>

                          <div className="w-full mt-auto">
                            <p className="text-gray-600 font-medium leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
