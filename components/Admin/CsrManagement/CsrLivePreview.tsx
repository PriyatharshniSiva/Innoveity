"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCsr } from "./CsrState";

export default function CsrLivePreview() {
  const { initiatives, sdgs } = useCsr();

  const activeInitiatives = initiatives.filter(i => i.status === "Active").sort((a, b) => a.order - b.order);
  const activeSdgs = sdgs.filter(s => s.status === "Active").sort((a, b) => a.order - b.order);

  return (
    <div className="bg-slate-50 h-[800px] rounded-3xl border-4 border-slate-200 overflow-y-auto custom-scrollbar relative shadow-2xl">


      <div className="origin-top scale-[0.8] w-[125%] mb-[-20%] selection:bg-[#185D46] selection:text-white">
        
        {/* Header Preview */}
        <section className="relative py-20 px-4 overflow-hidden bg-white border-b border-slate-100">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#185D4620] rounded-full blur-[100px] opacity-70 -z-10 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#185D46] rounded-full blur-[100px] opacity-10 -z-10 -translate-x-1/3 translate-y-1/3" />
          
          <div className="text-center space-y-4 max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              CSR & ESG <span className="text-[#185D46]">Impact</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed font-medium max-w-2xl mx-auto">
              Our commitment to creating positive social and environmental impact through sustainable business practices.
            </p>
          </div>
        </section>

        {/* Initiatives Timeline Preview */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">Key Initiatives</h2>
            <p className="text-lg text-gray-500 font-medium">Driving change where it matters most.</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-[#185D46] to-[#185D4620] -translate-x-1/2 rounded-full hidden md:block" />

            <div className="space-y-12">
              {activeInitiatives.map((ini, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={ini.id} className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block w-[45%]" />
                    
                    <div className="hidden md:flex w-10 h-10 absolute left-1/2 -translate-x-1/2 items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-[#185D46] ring-4 ring-[#185D4620] shadow-lg z-10" />
                    </div>

                    <div className="w-full md:w-[45%]">
                      <div className="bg-white border border-slate-100 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors" />
                        <h3 className="text-xl font-extrabold text-[#0F172A] tracking-tight mb-2">{ini.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium mb-4">{ini.description}</p>
                        
                        <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-[#185D46]">
                          <span className="text-[#185D46] block text-[10px] font-bold uppercase tracking-[0.15em] mb-1">Key Impact</span>
                          <div className="text-gray-900 font-bold text-sm">{ini.impact}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SDGs Grid Preview */}
        <section className="max-w-6xl mx-auto px-4 py-16 bg-white">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-3xl font-black text-[#0F172A] tracking-tight">UN SDG Alignment</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activeSdgs.map((sdg) => (
              <div key={sdg.id} className="bg-white border border-slate-100 rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white font-black text-xl" style={{ backgroundColor: sdg.color }}>
                    {sdg.number < 10 ? `0${sdg.number}` : sdg.number}
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">{sdg.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{sdg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
