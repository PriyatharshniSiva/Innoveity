"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAboutManagement } from "./AboutManagementState";
import { ChevronDown, Type, Image as ImageIcon, Link as LinkIcon, Trash2, GripVertical, Plus, AlignLeft, Flag, MessageSquare, Award } from "lucide-react";

export default function AboutManagementForms() {
  const { 
    overview, setOverview, 
    journey, setJourney, 
    activeSection, setActiveSection,
    missionVision, setMissionVision,
    strengths, setStrengths,
    statistics, setStatistics,
    team, setTeam,
    gallery, setGallery,
    certifications, setCertifications,
    clientFeedback, setClientFeedback
  } = useAboutManagement();

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const handleOverviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOverview({ ...overview, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDesc = [...overview.description];
    newDesc[index] = value;
    setOverview({ ...overview, description: newDesc });
  };

  const handleJourneyChange = (id: string, field: string, value: string) => {
    setJourney(journey.map(j => j.id === id ? { ...j, [field]: value } : j));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setOverview({ ...overview, featuredImage: url });
    }
  };

  return (
    <div className="space-y-4">
      {/* Company Overview Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("overview")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#185D46]/10 flex items-center justify-center text-[#185D46]">
              <AlignLeft className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Company Overview</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "overview" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "overview" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100"
            >
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Title (Line 1)</label>
                    <input 
                      type="text" name="titleLine1" value={overview.titleLine1} onChange={handleOverviewChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Title (Highlight)</label>
                    <input 
                      type="text" name="titleHighlight" value={overview.titleHighlight} onChange={handleOverviewChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description Paragraphs</label>
                    <div className="space-y-4">
                      {overview.description.map((paragraph, index) => (
                        <textarea 
                          key={index}
                          value={paragraph} 
                          onChange={(e) => handleDescriptionChange(index, e.target.value)} 
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white resize-none"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Featured Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400">
                        {overview.featuredImage ? (
                          <img src={overview.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-8 h-8 opacity-50" />
                        )}
                      </div>
                      <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-semibold rounded-xl flex items-center transition-colors cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Replace Image
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Journey Timeline Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("journey")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
              <Flag className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Journey Timeline</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "journey" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "journey" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100"
            >
              <div className="p-6 space-y-4">
                {journey.map((step) => (
                  <div key={step.id} className="flex items-start space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100 group">
                    <GripVertical className="w-5 h-5 text-slate-400 mt-2 cursor-grab active:cursor-grabbing flex-shrink-0" />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex gap-4">
                        <input 
                          type="text" value={step.year} onChange={(e) => handleJourneyChange(step.id, "year", e.target.value)}
                          placeholder="Year (e.g. 2018)"
                          className="w-32 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                        />
                        <input 
                          type="text" value={step.title} onChange={(e) => handleJourneyChange(step.id, "title", e.target.value)}
                          placeholder="Title"
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                        />
                      </div>
                      <textarea
                        value={step.description} onChange={(e) => handleJourneyChange(step.id, "description", e.target.value)}
                        placeholder="Description" rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white resize-none"
                      />
                    </div>
                    
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors bg-slate-50 hover:bg-[#F59E0B]/5">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Milestone
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Our Foundation Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("Our Foundation")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <LinkIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Our Foundation</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "Our Foundation" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "Our Foundation" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Our Mission</label>
                  <textarea rows={3} value={missionVision.mission} onChange={e => setMissionVision({...missionVision, mission: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Our Vision</label>
                  <textarea rows={3} value={missionVision.vision} onChange={e => setMissionVision({...missionVision, vision: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Our Values</label>
                  <textarea rows={3} value={missionVision.values} onChange={e => setMissionVision({...missionVision, values: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white resize-none" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Client Feedback Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("clientFeedback")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#185D46]/10 flex items-center justify-center text-[#185D46]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Client Feedback</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "clientFeedback" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "clientFeedback" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                
                {clientFeedback.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative group">
                    <button 
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => setClientFeedback(clientFeedback.filter(cf => cf.id !== item.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Quote</label>
                      <textarea rows={3} value={item.quote} onChange={(e) => {
                        const newFeedback = [...clientFeedback];
                        newFeedback[idx].quote = e.target.value;
                        setClientFeedback(newFeedback);
                      }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Author Name</label>
                        <input type="text" value={item.name} onChange={(e) => {
                          const newFeedback = [...clientFeedback];
                          newFeedback[idx].name = e.target.value;
                          setClientFeedback(newFeedback);
                        }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Date/Verification</label>
                        <input type="text" value={item.date} onChange={(e) => {
                          const newFeedback = [...clientFeedback];
                          newFeedback[idx].date = e.target.value;
                          setClientFeedback(newFeedback);
                        }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setClientFeedback([...clientFeedback, { id: Date.now().toString(), quote: "", name: "", date: "Verified" }])}
                  className="w-full py-3 border-2 border-dashed border-[#185D46]/20 text-[#185D46] rounded-xl font-semibold hover:bg-[#185D46]/5 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Testimonial
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Our Strengths Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("Our Strengths")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Our Strengths</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "Our Strengths" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "Our Strengths" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                
                {strengths.map((item, idx) => (
                  <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative group">
                    <button 
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => setStrengths(strengths.filter(s => s.id !== item.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                        <input type="text" value={item.title} onChange={(e) => {
                          const newStrengths = [...strengths];
                          newStrengths[idx].title = e.target.value;
                          setStrengths(newStrengths);
                        }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Icon Name</label>
                        <input type="text" value={item.iconName} onChange={(e) => {
                          const newStrengths = [...strengths];
                          newStrengths[idx].iconName = e.target.value;
                          setStrengths(newStrengths);
                        }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                      <textarea rows={2} value={item.description} onChange={(e) => {
                        const newStrengths = [...strengths];
                        newStrengths[idx].description = e.target.value;
                        setStrengths(newStrengths);
                      }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setStrengths([...strengths, { id: Date.now().toString(), title: "", description: "", iconName: "Star" }])}
                  className="w-full py-3 border-2 border-dashed border-[#185D46]/20 text-[#185D46] rounded-xl font-semibold hover:bg-[#185D46]/5 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Strength
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
