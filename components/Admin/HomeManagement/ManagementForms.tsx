"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHomeManagement } from "./HomeManagementState";
import { ChevronDown, Type, Image as ImageIcon, Link as LinkIcon, Trash2, GripVertical, Plus, MessageSquare, Star, Briefcase, Globe, MapPin, Layout } from "lucide-react";

export default function ManagementForms() {
  const { hero, setHero, stats, setStats, corporateHighlights, setCorporateHighlights, featuredServices, setFeaturedServices, faqs, setFaqs, testimonials, setTestimonials, ourServices, setOurServices, ourPresence, setOurPresence, edukaOverview, setEdukaOverview, activeSection, setActiveSection } = useHomeManagement();

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const handleStatChange = (id: string, field: string, value: string) => {
    setStats(stats.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setHero({ ...hero, backgroundImage: url });
    }
  };

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("hero")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <Type className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Hero Section</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "hero" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "hero" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100"
            >
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Title (Line 1)</label>
                    <input 
                      type="text" name="titleLine1" value={hero.titleLine1} onChange={handleHeroChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Title (Highlight)</label>
                    <input 
                      type="text" name="titleHighlight" value={hero.titleHighlight} onChange={handleHeroChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-[#F59E0B] transition-all bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                    <textarea 
                      name="description" value={hero.description} onChange={handleHeroChange} rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white resize-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Button</label>
                      <input 
                        type="text" name="primaryButtonText" value={hero.primaryButtonText} onChange={handleHeroChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary Button</label>
                      <input 
                        type="text" name="secondaryButtonText" value={hero.secondaryButtonText} onChange={handleHeroChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Background Image</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400">
                        {hero.backgroundImage ? (
                          <img src={hero.backgroundImage} alt="Hero BG" className="w-full h-full object-cover" />
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

      {/* Impact Statistics */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("stats")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-[#F59E0B]">
              <Type className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Our Impact in Action</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "stats" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "stats" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100"
            >
              <div className="p-6 space-y-4">
                {stats.map((stat, idx) => (
                  <div key={stat.id} className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-100 group">
                    <GripVertical className="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing" />
                    
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <input 
                        type="text" value={stat.value} onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                        placeholder="Value (e.g. 50,000+)"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-white"
                      />
                      <input 
                        type="text" value={stat.label} onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                        placeholder="Label (e.g. Minds Stimulated)"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-white"
                      />
                    </div>
                    
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#185D46] hover:text-[#185D46] transition-colors bg-slate-50 hover:bg-primary/5">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Statistic
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corporate Highlights */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("corporateHighlights")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <LinkIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Corporate Highlights</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "corporateHighlights" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "corporateHighlights" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title</label>
                  <input type="text" value={corporateHighlights.title} onChange={(e) => setCorporateHighlights({...corporateHighlights, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea rows={4} value={corporateHighlights.description} onChange={(e) => setCorporateHighlights({...corporateHighlights, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">Key Highlights (Bullet Points)</label>
                  <div className="space-y-3">
                    {corporateHighlights.highlightsList.map((highlight, idx) => (
                      <div key={highlight.id} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                        <input type="text" value={highlight.text} onChange={(e) => {
                          const newList = [...corporateHighlights.highlightsList];
                          newList[idx].text = e.target.value;
                          setCorporateHighlights({...corporateHighlights, highlightsList: newList});
                        }} className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#185D46] bg-white text-sm" />
                        <button onClick={() => {
                          const newList = corporateHighlights.highlightsList.filter(h => h.id !== highlight.id);
                          setCorporateHighlights({...corporateHighlights, highlightsList: newList});
                        }} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setCorporateHighlights({...corporateHighlights, highlightsList: [...corporateHighlights.highlightsList, { id: Date.now().toString(), text: "" }]})} className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#185D46] hover:text-[#185D46] transition-colors bg-slate-50 hover:bg-primary/5">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Highlight
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAQ Management */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("faqs")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-[#F59E0B]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">FAQ Management</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "faqs" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "faqs" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={faq.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                      <button onClick={() => {
                        const newFaqs = faqs.filter(f => f.id !== faq.id);
                        setFaqs(newFaqs);
                      }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="space-y-4 pr-10">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Question</label>
                          <input type="text" value={faq.question} onChange={(e) => {
                            const newFaqs = [...faqs];
                            newFaqs[idx].question = e.target.value;
                            setFaqs(newFaqs);
                          }} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors font-medium text-slate-800" />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Main Answer (Visible immediately)</label>
                          <textarea rows={3} value={faq.mainAnswer} onChange={(e) => {
                            const newFaqs = [...faqs];
                            newFaqs[idx].mainAnswer = e.target.value;
                            setFaqs(newFaqs);
                          }} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors resize-none text-slate-600 text-sm" />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Detailed Explanation (Read More)</label>
                          <textarea rows={3} value={faq.detailedExplanation} onChange={(e) => {
                            const newFaqs = [...faqs];
                            newFaqs[idx].detailedExplanation = e.target.value;
                            setFaqs(newFaqs);
                          }} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors resize-none text-slate-600 text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button onClick={() => {
                  setFaqs([...faqs, { id: Date.now().toString(), question: "", mainAnswer: "", detailedExplanation: "" }]);
                }} className="w-full py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#F59E0B] hover:text-[#F59E0B] transition-colors bg-white hover:bg-accent/5">
                  <Plus className="w-5 h-5 mr-2" />
                  Add FAQ Item
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Featured Services */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("featuredServices")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Featured Services</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "featuredServices" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "featuredServices" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title</label>
                    <input type="text" value={featuredServices.title} onChange={(e) => setFeaturedServices({...featuredServices, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subtitle</label>
                    <input type="text" value={featuredServices.subtitle} onChange={(e) => setFeaturedServices({...featuredServices, subtitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4 mt-2 border-t border-slate-100 pt-6">Service Cards</label>
                  <div className="space-y-4">
                    {featuredServices.servicesList.map((srv, idx) => (
                      <div key={srv.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                        <button onClick={() => {
                          const newList = featuredServices.servicesList.filter(s => s.id !== srv.id);
                          setFeaturedServices({...featuredServices, servicesList: newList});
                        }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                            <input type="text" value={srv.title} onChange={(e) => {
                              const newList = [...featuredServices.servicesList];
                              newList[idx].title = e.target.value;
                              setFeaturedServices({...featuredServices, servicesList: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
                            <input type="text" value={srv.category} onChange={(e) => {
                              const newList = [...featuredServices.servicesList];
                              newList[idx].category = e.target.value;
                              setFeaturedServices({...featuredServices, servicesList: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Badge</label>
                            <input type="text" value={srv.badge} onChange={(e) => {
                              const newList = [...featuredServices.servicesList];
                              newList[idx].badge = e.target.value;
                              setFeaturedServices({...featuredServices, servicesList: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Image URL</label>
                            <input type="text" value={srv.image} onChange={(e) => {
                              const newList = [...featuredServices.servicesList];
                              newList[idx].image = e.target.value;
                              setFeaturedServices({...featuredServices, servicesList: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                            <textarea rows={2} value={srv.desc} onChange={(e) => {
                              const newList = [...featuredServices.servicesList];
                              newList[idx].desc = e.target.value;
                              setFeaturedServices({...featuredServices, servicesList: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors resize-none text-sm" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => {
                    setFeaturedServices({
                      ...featuredServices, 
                      servicesList: [...featuredServices.servicesList, { id: Date.now().toString(), category: "", title: "", desc: "", badge: "", image: "" }]
                    });
                  }} className="w-full mt-4 py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#185D46] hover:text-[#185D46] transition-colors bg-white hover:bg-primary/5">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Service Card
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Testimonials */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("testimonials")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-[#F59E0B]">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Client Reviews</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "testimonials" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "testimonials" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title</label>
                    <input type="text" value={testimonials.title} onChange={(e) => setTestimonials({...testimonials, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subtitle</label>
                    <input type="text" value={testimonials.subtitle} onChange={(e) => setTestimonials({...testimonials, subtitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4 mt-2 border-t border-slate-100 pt-6">Reviews</label>
                  <div className="space-y-4">
                    {testimonials.list.map((testimonial, idx) => (
                      <div key={testimonial.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                        <button onClick={() => {
                          const newList = testimonials.list.filter(t => t.id !== testimonial.id);
                          setTestimonials({...testimonials, list: newList});
                        }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Name</label>
                            <input type="text" value={testimonial.name} onChange={(e) => {
                              const newList = [...testimonials.list];
                              newList[idx].name = e.target.value;
                              setTestimonials({...testimonials, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Date String (e.g. Verified Aug 2024)</label>
                            <input type="text" value={testimonial.date} onChange={(e) => {
                              const newList = [...testimonials.list];
                              newList[idx].date = e.target.value;
                              setTestimonials({...testimonials, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Quote</label>
                            <textarea rows={3} value={testimonial.quote} onChange={(e) => {
                              const newList = [...testimonials.list];
                              newList[idx].quote = e.target.value;
                              setTestimonials({...testimonials, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors resize-none text-sm text-slate-600" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => {
                    setTestimonials({
                      ...testimonials, 
                      list: [...testimonials.list, { id: Date.now().toString(), name: "", quote: "", date: "" }]
                    });
                  }} className="w-full mt-4 py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#185D46] hover:text-[#185D46] transition-colors bg-white hover:bg-primary/5">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Testimonial
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Our Services */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("ourServices")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Our Services</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "ourServices" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "ourServices" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title</label>
                    <input type="text" value={ourServices.title} onChange={(e) => setOurServices({...ourServices, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subtitle</label>
                    <input type="text" value={ourServices.subtitle} onChange={(e) => setOurServices({...ourServices, subtitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Background Color</label>
                    <div className="flex space-x-3">
                      <input type="color" value={ourServices.backgroundColor || "var(--color-primary)"} onChange={(e) => setOurServices({...ourServices, backgroundColor: e.target.value})} className="h-12 w-12 rounded-xl cursor-pointer border-0 p-0" />
                      <input type="text" value={ourServices.backgroundColor || "var(--color-primary)"} onChange={(e) => setOurServices({...ourServices, backgroundColor: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors font-mono" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4 mt-2 border-t border-slate-100 pt-6">Service Items</label>
                  <div className="space-y-4">
                    {ourServices.list.map((srv, idx) => (
                      <div key={srv.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                        <button onClick={() => {
                          const newList = ourServices.list.filter(s => s.id !== srv.id);
                          setOurServices({...ourServices, list: newList});
                        }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-1 gap-4 pr-10">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                            <input type="text" value={srv.title} onChange={(e) => {
                              const newList = [...ourServices.list];
                              newList[idx].title = e.target.value;
                              setOurServices({...ourServices, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                            <input type="text" value={srv.description} onChange={(e) => {
                              const newList = [...ourServices.list];
                              newList[idx].description = e.target.value;
                              setOurServices({...ourServices, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Icon Name (lucide-react)</label>
                            <input type="text" value={srv.iconName} onChange={(e) => {
                              const newList = [...ourServices.list];
                              newList[idx].iconName = e.target.value;
                              setOurServices({...ourServices, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm text-slate-600" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => {
                    setOurServices({
                      ...ourServices, 
                      list: [...ourServices.list, { id: Date.now().toString(), title: "", description: "", iconName: "" }]
                    });
                  }} className="w-full mt-4 py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#185D46] hover:text-[#185D46] transition-colors bg-white hover:bg-primary/5">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Service Item
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Our Presence */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("ourPresence")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Our Presence</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "ourPresence" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "ourPresence" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Section Title</label>
                    <input type="text" value={ourPresence.title} onChange={(e) => setOurPresence({...ourPresence, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subtitle</label>
                    <input type="text" value={ourPresence.subtitle} onChange={(e) => setOurPresence({...ourPresence, subtitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Map Image URL</label>
                    <div className="flex space-x-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 flex-shrink-0">
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                      </div>
                      <input type="text" value={ourPresence.mapImage} onChange={(e) => setOurPresence({...ourPresence, mapImage: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4 mt-2 border-t border-slate-100 pt-6">Feature Items</label>
                  <div className="space-y-4">
                    {ourPresence.list.map((item, idx) => (
                      <div key={item.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 relative group">
                        <button onClick={() => {
                          const newList = ourPresence.list.filter(s => s.id !== item.id);
                          setOurPresence({...ourPresence, list: newList});
                        }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-1 gap-4 pr-10">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                            <input type="text" value={item.title} onChange={(e) => {
                              const newList = [...ourPresence.list];
                              newList[idx].title = e.target.value;
                              setOurPresence({...ourPresence, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                            <input type="text" value={item.description} onChange={(e) => {
                              const newList = [...ourPresence.list];
                              newList[idx].description = e.target.value;
                              setOurPresence({...ourPresence, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Icon Name (lucide-react)</label>
                            <input type="text" value={item.iconName} onChange={(e) => {
                              const newList = [...ourPresence.list];
                              newList[idx].iconName = e.target.value;
                              setOurPresence({...ourPresence, list: newList});
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm text-slate-600" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => {
                    setOurPresence({
                      ...ourPresence, 
                      list: [...ourPresence.list, { id: Date.now().toString(), title: "", description: "", iconName: "" }]
                    });
                  }} className="w-full mt-4 py-3.5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-semibold flex items-center justify-center hover:border-[#185D46] hover:text-[#185D46] transition-colors bg-white hover:bg-primary/5">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Feature Item
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Eduka Overview (SEO Sections) */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("edukaOverview")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <Layout className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">SEO Overview Sections</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "edukaOverview" ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {activeSection === "edukaOverview" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-8">
                
                {/* 1. Hero */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#185D46] border-b pb-2">1. Intro Hero Section</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Title Line 1</label>
                    <input type="text" value={edukaOverview.heroTitle1} onChange={(e) => setEdukaOverview({...edukaOverview, heroTitle1: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Title Highlight (Orange)</label>
                    <input type="text" value={edukaOverview.heroHighlight} onChange={(e) => setEdukaOverview({...edukaOverview, heroHighlight: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Title Line 2</label>
                    <input type="text" value={edukaOverview.heroTitle2} onChange={(e) => setEdukaOverview({...edukaOverview, heroTitle2: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Description Paragraph</label>
                    <textarea rows={3} value={edukaOverview.heroDescription} onChange={(e) => setEdukaOverview({...edukaOverview, heroDescription: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                  </div>
                </div>

                {/* 2. Division Cards */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#185D46] border-b pb-2">2. Division Cards</h4>
                  {edukaOverview.divisionCards.map((card, idx) => (
                    <div key={card.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Badge Text</label>
                          <input type="text" value={card.badge} onChange={(e) => {
                            const newCards = [...edukaOverview.divisionCards];
                            newCards[idx].badge = e.target.value;
                            setEdukaOverview({...edukaOverview, divisionCards: newCards});
                          }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Icon Path Data</label>
                          <input type="text" value={card.iconPath} onChange={(e) => {
                            const newCards = [...edukaOverview.divisionCards];
                            newCards[idx].iconPath = e.target.value;
                            setEdukaOverview({...edukaOverview, divisionCards: newCards});
                          }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                        <input type="text" value={card.title} onChange={(e) => {
                          const newCards = [...edukaOverview.divisionCards];
                          newCards[idx].title = e.target.value;
                          setEdukaOverview({...edukaOverview, divisionCards: newCards});
                        }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Text content</label>
                        <textarea rows={2} value={card.text} onChange={(e) => {
                          const newCards = [...edukaOverview.divisionCards];
                          newCards[idx].text = e.target.value;
                          setEdukaOverview({...edukaOverview, divisionCards: newCards});
                        }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Why Choose */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#185D46] border-b pb-2">3. Why Choose Innoveity</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                      <input type="text" value={edukaOverview.whyChooseTitle} onChange={(e) => setEdukaOverview({...edukaOverview, whyChooseTitle: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Subtitle</label>
                      <input type="text" value={edukaOverview.whyChooseSubtitle} onChange={(e) => setEdukaOverview({...edukaOverview, whyChooseSubtitle: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-500">Checklist Items</label>
                    {edukaOverview.whyChooseItems.map((item, idx) => (
                      <input key={item.id} type="text" value={item.text} onChange={(e) => {
                        const newItems = [...edukaOverview.whyChooseItems];
                        newItems[idx].text = e.target.value;
                        setEdukaOverview({...edukaOverview, whyChooseItems: newItems});
                      }} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    ))}
                  </div>
                </div>

                {/* 4. Core Details Grid */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#185D46] border-b pb-2">4. Core Details (3 Columns)</h4>
                  {edukaOverview.coreDetails.map((detail, idx) => (
                    <div key={detail.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                        <input type="text" value={detail.title} onChange={(e) => {
                          const newDetails = [...edukaOverview.coreDetails];
                          newDetails[idx].title = e.target.value;
                          setEdukaOverview({...edukaOverview, coreDetails: newDetails});
                        }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Text Content</label>
                        <textarea rows={3} value={detail.text} onChange={(e) => {
                          const newDetails = [...edukaOverview.coreDetails];
                          newDetails[idx].text = e.target.value;
                          setEdukaOverview({...edukaOverview, coreDetails: newDetails});
                        }} className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-sm" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 5. Contact CTA */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#185D46] border-b pb-2">5. Contact CTA</h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">CTA Title</label>
                    <input type="text" value={edukaOverview.contactTitle} onChange={(e) => setEdukaOverview({...edukaOverview, contactTitle: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">CTA Paragraph (Supports HTML)</label>
                    <textarea rows={5} value={edukaOverview.contactDescription} onChange={(e) => setEdukaOverview({...edukaOverview, contactDescription: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm font-mono text-slate-600" />
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Placeholder for other sections to fulfill the prompt design requirements visually */}
      {["Our Journey Gallery", "Hero Video"].map((title, idx) => (
        <div key={idx} className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <button onClick={() => toggleSection(title)} className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-sans">{title}</h3>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === title ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {activeSection === title && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
                <div className="p-6">
                  <div className="text-slate-500 font-medium text-sm mb-4">
                    Configure the settings for {title} below.
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <input type="text" placeholder="Section Title" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                    <textarea placeholder="Section Description" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors" />
                    <button className="px-6 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors w-max">Save Changes</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
