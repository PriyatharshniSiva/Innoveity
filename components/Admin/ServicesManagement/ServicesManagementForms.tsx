"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useServices } from "./ServicesState";
import { ChevronDown, AlignLeft, FolderKanban, Briefcase, Trash2, Plus, GripVertical, Image as ImageIcon, ToggleLeft, ToggleRight, MessageSquare, Flag } from "lucide-react";

export default function ServicesManagementForms() {
  const { 
    overview, setOverview,
    categories, setCategories,
    services, setServices,
    faqs, setFaqs,
    cta, setCta
  } = useServices();

  const [activeSection, setActiveSection] = useState<string>("overview");

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  return (
    <div className="space-y-4">
      
      {/* Overview Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("overview")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <AlignLeft className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Services Overview</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "overview" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "overview" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Main Title</label>
                  <input type="text" value={overview.mainTitle} onChange={e => setOverview({...overview, mainTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea rows={4} value={overview.description} onChange={e => setOverview({...overview, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white resize-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Key Highlights</label>
                  <div className="space-y-3">
                    {overview.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 group">
                        <GripVertical className="w-5 h-5 text-slate-300 cursor-grab active:cursor-grabbing" />
                        <input 
                          type="text" 
                          value={item} 
                          onChange={(e) => {
                            const newHighlights = [...overview.highlights];
                            newHighlights[idx] = e.target.value;
                            setOverview({...overview, highlights: newHighlights});
                          }} 
                          className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm bg-slate-50" 
                        />
                        <button 
                          onClick={() => {
                            const newHighlights = overview.highlights.filter((_, i) => i !== idx);
                            setOverview({...overview, highlights: newHighlights});
                          }}
                          className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setOverview({...overview, highlights: [...overview.highlights, ""]})}
                    className="w-full mt-4 py-3 border-2 border-dashed border-primary/20 text-[#185D46] rounded-xl font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Highlight
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category Management Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("categories")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <FolderKanban className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Category Management</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "categories" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "categories" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                
                {categories.map((cat, idx) => (
                  <div key={cat.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 relative group">
                    <button 
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => setCategories(categories.filter(c => c.id !== cat.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center space-x-3">
                      <GripVertical className="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing" />
                      <div className="flex-grow">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Category Name</label>
                        <input type="text" value={cat.name} onChange={(e) => {
                          const newCats = [...categories];
                          newCats[idx].name = e.target.value;
                          setCategories(newCats);
                        }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setCategories([...categories, { id: Date.now().toString(), name: "New Category", order: categories.length + 1 }])}
                  className="w-full py-3 border-2 border-dashed border-primary/20 text-[#185D46] rounded-xl font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Category
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Services List Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("services")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Service List</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "services" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "services" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                
                {services.map((svc, idx) => (
                  <div key={svc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 relative group">
                    <div className="absolute top-4 right-4 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          const newSvcs = [...services];
                          newSvcs[idx].status = svc.status === "Active" ? "Hidden" : "Active";
                          setServices(newSvcs);
                        }}
                        className={`p-2 rounded-lg flex items-center text-sm font-medium transition-colors ${svc.status === 'Active' ? 'text-[#185D46] hover:bg-primary/10' : 'text-slate-400 hover:bg-white'}`}
                      >
                        {svc.status === 'Active' ? <ToggleRight className="w-5 h-5 mr-1" /> : <ToggleLeft className="w-5 h-5 mr-1" />}
                        {svc.status}
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-colors"
                        onClick={() => setServices(services.filter(s => s.id !== svc.id))}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="pt-8">
                        <GripVertical className="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing" />
                      </div>
                      <div className="flex-grow space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Service Title</label>
                            <input type="text" value={svc.title} onChange={(e) => {
                              const newSvcs = [...services];
                              newSvcs[idx].title = e.target.value;
                              setServices(newSvcs);
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Category</label>
                            <select value={svc.categoryId} onChange={(e) => {
                              const newSvcs = [...services];
                              newSvcs[idx].categoryId = e.target.value;
                              setServices(newSvcs);
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm bg-white">
                              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                          <textarea rows={2} value={svc.description} onChange={(e) => {
                            const newSvcs = [...services];
                            newSvcs[idx].description = e.target.value;
                            setServices(newSvcs);
                          }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Icon Name (Lucide)</label>
                            <input type="text" value={svc.iconName} onChange={(e) => {
                              const newSvcs = [...services];
                              newSvcs[idx].iconName = e.target.value;
                              setServices(newSvcs);
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Service Image</label>
                            <div className="flex items-center space-x-2">
                              <input type="text" value={svc.image} placeholder="Image URL" onChange={(e) => {
                                const newSvcs = [...services];
                                newSvcs[idx].image = e.target.value;
                                setServices(newSvcs);
                              }} className="flex-grow px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                              <button className="p-2 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors">
                                <ImageIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Button Text</label>
                            <input type="text" value={svc.buttonText} onChange={(e) => {
                              const newSvcs = [...services];
                              newSvcs[idx].buttonText = e.target.value;
                              setServices(newSvcs);
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1">Button Link</label>
                            <input type="text" value={svc.buttonLink} onChange={(e) => {
                              const newSvcs = [...services];
                              newSvcs[idx].buttonLink = e.target.value;
                              setServices(newSvcs);
                            }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setServices([...services, { id: Date.now().toString(), title: "New Service", description: "", categoryId: categories[0]?.id || "edu", iconName: "Star", image: "", status: "Active", featured: false, order: services.length + 1, buttonText: "Learn More", buttonLink: "/services" }])}
                  className="w-full py-3 border-2 border-dashed border-primary/20 text-[#185D46] rounded-xl font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Service
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAQ Management Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("faqs")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
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
                
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 relative group">
                    <button 
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => setFaqs(faqs.filter(f => f.id !== faq.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start space-x-3">
                      <div className="pt-8">
                        <GripVertical className="w-5 h-5 text-slate-400 cursor-grab active:cursor-grabbing" />
                      </div>
                      <div className="flex-grow space-y-4 pr-8">
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Question</label>
                          <input type="text" value={faq.question} onChange={(e) => {
                            const newFaqs = [...faqs];
                            newFaqs[idx].question = e.target.value;
                            setFaqs(newFaqs);
                          }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Answer</label>
                          <textarea rows={3} value={faq.answer} onChange={(e) => {
                            const newFaqs = [...faqs];
                            newFaqs[idx].answer = e.target.value;
                            setFaqs(newFaqs);
                          }} className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:bg-white focus:outline-none focus:border-[#185D46] transition-colors text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setFaqs([...faqs, { id: Date.now().toString(), question: "New Question?", answer: "New Answer", order: faqs.length + 1 }])}
                  className="w-full py-3 border-2 border-dashed border-primary/20 text-[#185D46] rounded-xl font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add FAQ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Call to Action Section */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <button 
          onClick={() => toggleSection("cta")}
          className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-[#185D46]">
              <Flag className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-sans">Call to Action (CTA)</h3>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeSection === "cta" ? "rotate-180" : ""}`} />
        </button>
        
        <AnimatePresence>
          {activeSection === "cta" && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-slate-100">
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">CTA Title</label>
                  <input type="text" value={cta.title} onChange={e => setCta({...cta, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea rows={3} value={cta.description} onChange={e => setCta({...cta, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white resize-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Button Text</label>
                    <input type="text" value={cta.buttonText} onChange={e => setCta({...cta, buttonText: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Button Link</label>
                    <input type="text" value={cta.buttonLink} onChange={e => setCta({...cta, buttonLink: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
