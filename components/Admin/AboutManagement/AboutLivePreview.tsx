"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAboutManagement } from "./AboutManagementState";
import { Flag, Users, MonitorPlay, Building2, MapPin, Leaf, Lightbulb, Star, Shield, Eye, Heart, Award, Globe } from "lucide-react";
import EdukaTestimonials from "@/components/EdukaLayout/EdukaTestimonials";

const getIcon = (name: string) => {
  switch (name) {
    case "Flag": return <Flag className="w-6 h-6" />;
    case "Users": return <Users className="w-6 h-6" />;
    case "MonitorPlay": return <MonitorPlay className="w-6 h-6" />;
    case "Building2": return <Building2 className="w-6 h-6" />;
    case "MapPin": return <MapPin className="w-6 h-6" />;
    case "Leaf": return <Leaf className="w-6 h-6" />;
    case "Lightbulb": return <Lightbulb className="w-6 h-6" />;
    case "Award": return <Award className="w-6 h-6" />;
    case "Globe": return <Globe className="w-6 h-6" />;
    default: return <Flag className="w-6 h-6" />;
  }
};

export default function AboutLivePreview() {
  const { overview, journey, missionVision, statistics, strengths, team, gallery, certifications, clientFeedback } = useAboutManagement();

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col h-[800px] sticky top-8">


      {/* Scaled Preview Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white relative custom-scrollbar">
        {/* We use scale-75 to fit more content in the preview pane */}
        <div className="w-[133.33%] origin-top-left scale-75 pb-20">
          
          {/* About Hero Simulation */}
          <section className="relative pt-32 pb-24 overflow-hidden px-8">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#185D4620] rounded-full blur-[120px] opacity-50 -z-10 translate-x-1/3 -translate-y-1/3" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl font-black text-[#0F172A] tracking-tight leading-[1.1]">
                  {overview.titleLine1} <span className="text-[#185D46]">{overview.titleHighlight}</span>
                </h1>
                <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                  {overview.description.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="relative rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgb(22,163,74,0.15)] aspect-[4/3] bg-slate-100 flex items-center justify-center">
                {overview.featuredImage ? (
                  <img src={overview.featuredImage} alt="About" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-400 font-medium">No Featured Image</div>
                )}
              </div>
            </div>
          </section>

          {/* Timeline Simulation */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl font-extrabold text-[#0F172A] tracking-tight">Our Journey</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">Key milestones in our mission to transform education.</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#185D46]/20 -translate-x-1/2 rounded-full" />
              <div className="space-y-16">
                {journey.map((step, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div key={step.id} className={`relative flex items-center ${isEven ? 'flex-row-reverse' : ''}`}>
                      <div className="absolute left-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#185D46] -translate-x-1/2 z-20" />
                      <div className="w-1/2" />
                      <div className={`w-1/2 px-12 ${isEven ? 'text-left' : 'text-right'}`}>
                        <div className={`bg-white rounded-[20px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="w-14 h-14 rounded-[16px] bg-[#185D4620] text-[#185D46] flex items-center justify-center">
                              {getIcon(step.iconName)}
                            </div>
                            <h4 className="text-3xl font-black text-[#185D46]">{step.year}</h4>
                          </div>
                          <h3 className="text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                          <p className="text-gray-600 font-medium leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* Mission & Vision Simulation */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#1F5F46] p-10 rounded-[16px] shadow-sm">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#14233D] mb-4">Our Mission</h3>
                  <p className="text-base text-white/90 leading-relaxed font-medium">{missionVision.mission}</p>
                </div>
                <div className="bg-[#1F5F46] p-10 rounded-[16px] shadow-sm">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#14233D] mb-4">Our Vision</h3>
                  <p className="text-base text-white/90 leading-relaxed font-medium">{missionVision.vision}</p>
                </div>
                <div className="bg-[#1F5F46] p-10 rounded-[16px] shadow-sm">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#14233D] mb-4">Our Values</h3>
                  <p className="text-base text-white/90 leading-relaxed font-medium">{missionVision.values}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics Simulation */}
          <section className="py-24 bg-[#185D46] text-white">
            <div className="max-w-6xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {statistics.map((stat) => (
                  <div key={stat.id}>
                    <div className="text-5xl font-black mb-2">{stat.value}</div>
                    <div className="text-lg text-emerald-100 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Simulation */}
          <EdukaTestimonials 
            title="Client Feedback"
            badge="Reviews"
            testimonials={clientFeedback}
          />

          {/* Strengths Simulation */}
          <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
                  Our Strengths
                </h2>
                <p className="text-gray-500 text-lg md:text-xl font-medium">
                  What makes INNOVEITY the preferred partner for educational transformation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {strengths.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[20px] p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgb(22,163,74,0.12)] transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center group relative overflow-hidden h-[260px]"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#185D46] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-[20px]" />
                    
                    <div className="flex flex-col items-center h-full w-full justify-center transform transition-transform duration-500 group-hover:-translate-y-6">
                      <div className="w-16 h-16 rounded-full bg-[#185D46]/5 flex items-center justify-center text-[#185D46] mb-6 group-hover:scale-110 transition-transform duration-500">
                        {getIcon(item.iconName)}
                      </div>
                      <h3 className="text-xl font-bold text-[#185D46]">
                        {item.title}
                      </h3>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 pt-4 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-white">
                      <p className="text-[#185D46]/70 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Simulation */}
          <section className="py-24 bg-slate-50">
            <div className="max-w-6xl mx-auto px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Leadership Team</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {team.map((member) => (
                  <div key={member.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    <div className="aspect-square bg-slate-200">
                      {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover" /> : null}
                    </div>
                    <div className="p-6 text-center">
                      <h4 className="text-lg font-bold text-slate-800 mb-1">{member.name}</h4>
                      <p className="text-sm font-medium text-[#185D46]">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Simulation */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Gallery</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((img) => (
                  <div key={img.id} className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 group">
                    {img.imageUrl ? <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white font-medium">{img.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}
