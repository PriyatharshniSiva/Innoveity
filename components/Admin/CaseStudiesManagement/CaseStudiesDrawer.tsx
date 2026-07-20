"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCaseStudies, CaseStudy } from "./CaseStudiesState";
import { X, Save, Eye, LayoutTemplate, Settings, Image as ImageIcon, Video, Plus, Trash2, Play } from "lucide-react";

export default function CaseStudiesDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, editingCaseStudyId, caseStudies, setCaseStudies } = useCaseStudies();
  
  const [activeTab, setActiveTab] = useState<"content" | "media" | "results" | "seo">("content");
  const [localData, setLocalData] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (isDrawerOpen && editingCaseStudyId) {
      const study = caseStudies.find(s => s.id === editingCaseStudyId);
      if (study) setLocalData(JSON.parse(JSON.stringify(study))); // Deep copy
    } else if (isDrawerOpen && !editingCaseStudyId) {
      // New study
      setLocalData({
        id: Date.now().toString(),
        categoryBadge: "",
        title: "",
        challenge: "",
        solution: "",
        thumbnail: "",
        video: "",
        youtubeUrl: "",
        keyResults: [{ label: "", value: "", suffix: "" }],
        statistics: [],
        clientLogo: "",
        gallery: [],
        testimonial: { quote: "", author: "", role: "" },
        tags: [],
        seoTitle: "",
        seoDescription: "",
        status: "Draft",
        featured: false,
        institutionType: "Corporate",
        year: new Date().getFullYear().toString(),
        publishedDate: new Date().toISOString(),
        views: 0,
        category: "Corporate Training"
      });
    }
  }, [isDrawerOpen, editingCaseStudyId, caseStudies]);

  if (!isDrawerOpen || !localData) return null;

  const handleSave = () => {
    if (editingCaseStudyId) {
      setCaseStudies(caseStudies.map(s => s.id === editingCaseStudyId ? localData : s));
    } else {
      setCaseStudies([...caseStudies, localData]);
    }
    setIsDrawerOpen(false);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[95vw] lg:max-w-[1200px] bg-[#F8FAFC] h-full shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
              <div className="flex items-center space-x-4">
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {editingCaseStudyId ? "Edit Case Study" : "New Case Study"}
                  </h2>
                  <p className="text-xs font-medium text-slate-500">
                    {localData.status === "Published" ? "Currently Live" : "Draft Mode"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 mr-4 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setLocalData({...localData, status: "Draft"})} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${localData.status === 'Draft' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}>Draft</button>
                  <button onClick={() => setLocalData({...localData, status: "Published"})} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${localData.status === 'Published' ? 'bg-[#185D46] shadow-sm text-white' : 'text-slate-500 hover:text-slate-700'}`}>Published</button>
                </div>
                <button onClick={handleSave} className="px-6 py-2.5 bg-[#185D46] hover:bg-[#124836] text-white font-bold rounded-xl shadow-lg shadow-[#185D46]/20 transition-all flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Split Content */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Column - Editor */}
              <div className="w-1/2 flex flex-col border-r border-slate-200 bg-white z-10 overflow-hidden shadow-[10px_0_15px_-3px_rgba(0,0,0,0.02)]">
                {/* Tabs */}
                <div className="flex px-4 border-b border-slate-100 bg-slate-50/50">
                  {[
                    { id: "content", label: "Content", icon: LayoutTemplate },
                    { id: "media", label: "Media", icon: ImageIcon },
                    { id: "results", label: "Results & Stats", icon: Eye },
                    { id: "seo", label: "Settings & SEO", icon: Settings }
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center px-4 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id ? 'border-[#185D46] text-[#185D46]' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Content Tab */}
                  {activeTab === "content" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Category Badge</label>
                        <input type="text" value={localData.categoryBadge} onChange={e => setLocalData({...localData, categoryBadge: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium uppercase" placeholder="e.g. EDUCATIONAL INSTITUTION" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                        <input type="text" value={localData.title} onChange={e => setLocalData({...localData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium" placeholder="e.g. Transforming Engineering Education..." />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">The Challenge</label>
                        <textarea rows={4} value={localData.challenge} onChange={e => setLocalData({...localData, challenge: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium resize-none" placeholder="Describe the challenge..." />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Our Solution</label>
                        <textarea rows={4} value={localData.solution} onChange={e => setLocalData({...localData, solution: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium resize-none" placeholder="Describe the solution..." />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Testimonial Quote</label>
                        <textarea rows={3} value={localData.testimonial.quote} onChange={e => setLocalData({...localData, testimonial: {...localData.testimonial, quote: e.target.value}})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium resize-none italic" placeholder='"Quote..."' />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Category (Filter)</label>
                          <select value={localData.category} onChange={e => setLocalData({...localData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium">
                            <option value="Faculty Development">Faculty Development</option>
                            <option value="Corporate Training">Corporate Training</option>
                            <option value="ESG Consulting">ESG Consulting</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Institution Type</label>
                          <select value={localData.institutionType} onChange={e => setLocalData({...localData, institutionType: e.target.value as "Academic" | "Corporate"})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium">
                            <option value="Academic">Academic</option>
                            <option value="Corporate">Corporate</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Media Tab */}
                  {activeTab === "media" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Thumbnail URL</label>
                        <div className="flex space-x-2">
                          <input type="text" value={localData.thumbnail} onChange={e => setLocalData({...localData, thumbnail: e.target.value})} className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm" />
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200 flex-shrink-0">
                            {localData.thumbnail ? <img src={localData.thumbnail} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-slate-400" />}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">YouTube Video URL</label>
                        <input type="text" value={localData.youtubeUrl} onChange={e => setLocalData({...localData, youtubeUrl: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm" placeholder="https://youtube.com/watch?..." />
                      </div>
                    </div>
                  )}

                  {/* Results Tab */}
                  {activeTab === "results" && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-4">Key Results Cards</label>
                        <div className="space-y-4">
                          {localData.keyResults.map((kr, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xs font-bold text-slate-500 uppercase">Key Result {idx + 1}</h4>
                                <button onClick={() => {
                                  const newKr = localData.keyResults.filter((_, i) => i !== idx);
                                  setLocalData({...localData, keyResults: newKr});
                                }} className="text-rose-500 hover:underline text-xs font-semibold">Remove</button>
                              </div>
                              <div className="flex space-x-2">
                                <input type="text" value={kr.value} onChange={e => {
                                  const newKr = [...localData.keyResults];
                                  newKr[idx].value = e.target.value;
                                  setLocalData({...localData, keyResults: newKr});
                                }} className="flex-grow px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#185D46] text-sm font-bold text-slate-800" placeholder="Value (e.g. 85)" />
                                <input type="text" value={kr.suffix || ""} onChange={e => {
                                  const newKr = [...localData.keyResults];
                                  newKr[idx].suffix = e.target.value;
                                  setLocalData({...localData, keyResults: newKr});
                                }} className="w-16 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#185D46] text-sm font-bold text-slate-800" placeholder="%" />
                              </div>
                              <input type="text" value={kr.label} onChange={e => {
                                const newKr = [...localData.keyResults];
                                newKr[idx].label = e.target.value;
                                setLocalData({...localData, keyResults: newKr});
                              }} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#185D46] text-sm text-slate-600" placeholder="Label (e.g. increase in placement rates)" />
                            </div>
                          ))}
                          <button onClick={() => setLocalData({...localData, keyResults: [...localData.keyResults, { label: "", value: "" }]})} className="w-full py-3 border-2 border-dashed border-[#185D46]/20 text-[#185D46] rounded-xl font-semibold hover:bg-[#185D46]/5 transition-colors flex items-center justify-center text-sm">
                            <Plus className="w-4 h-4 mr-2" /> Add Key Result
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SEO Tab */}
                  {activeTab === "seo" && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="p-4 bg-[#185D46]/5 border border-[#185D46]/10 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">Featured Case Study</p>
                          <p className="text-xs text-slate-500 mt-0.5">Show this on the homepage</p>
                        </div>
                        <button 
                          onClick={() => setLocalData({...localData, featured: !localData.featured})}
                          className={`w-12 h-6 rounded-full transition-colors relative ${localData.featured ? 'bg-[#185D46]' : 'bg-slate-300'}`}
                        >
                          <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${localData.featured ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      <hr className="border-slate-100" />
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">SEO Title</label>
                        <input type="text" value={localData.seoTitle} onChange={e => setLocalData({...localData, seoTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium" />
                        <p className="text-xs text-slate-400 mt-1">Recommended length: 50-60 characters</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">SEO Description</label>
                        <textarea rows={3} value={localData.seoDescription} onChange={e => setLocalData({...localData, seoDescription: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-slate-50 focus:bg-white transition-all text-sm font-medium resize-none" />
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column - Live Preview */}
              <div className="w-1/2 bg-slate-50 flex flex-col items-center justify-center p-8 overflow-y-auto relative">
                
                {/* Simulated Browser Frame */}
                <div className="w-full max-w-2xl bg-white rounded-t-xl rounded-b-lg shadow-2xl overflow-hidden border border-slate-200">
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-grow bg-white mx-4 rounded-md py-1 px-3 text-xs text-slate-400 text-center font-medium shadow-sm border border-slate-200/60 truncate">
                      innoveity.com/case-studies/{localData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    </div>
                  </div>
                  
                  {/* Website Preview Content (Matching Screenshots exactly) */}
                  <div className="relative pointer-events-none select-none max-h-[70vh] overflow-y-auto overflow-x-hidden p-6 sm:p-10 flex flex-col md:flex-row gap-8 bg-white">
                    
                    {/* Left Side: Content */}
                    <div className="md:w-1/2">
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#185D46]"></span>
                        <span className="text-[10px] font-black text-[#185D46] tracking-widest uppercase">{localData.categoryBadge || "CATEGORY"}</span>
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-8 leading-[1.1]">{localData.title || "Untitled Case Study"}</h1>
                      
                      <div className="mb-6">
                        <h4 className="text-[10px] font-black text-[#185D46] tracking-widest uppercase mb-3">THE CHALLENGE</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {localData.challenge || "Description of the challenge goes here..."}
                        </p>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-[10px] font-black text-[#185D46] tracking-widest uppercase mb-3">OUR SOLUTION</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          {localData.solution || "Description of the solution goes here..."}
                        </p>
                      </div>

                      {localData.testimonial?.quote && (
                        <div className="border-l-[3px] border-amber-500 pl-4 py-1">
                          <p className="text-sm text-slate-600 italic font-medium leading-relaxed">
                            "{localData.testimonial.quote}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Side: Results & Video */}
                    <div className="md:w-1/2 bg-[#185D46] rounded-xl p-6 sm:p-8 flex flex-col text-white">
                      <h4 className="text-[10px] font-black text-emerald-300 tracking-widest uppercase mb-6">KEY RESULTS</h4>
                      
                      <div className="space-y-4 mb-8">
                        {localData.keyResults.map((kr, i) => (
                          <div key={i} className="flex items-center space-x-4 bg-white/10 rounded-xl p-4 border border-white/5">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center flex-shrink-0">
                              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-xl font-black leading-none mb-1">{kr.value}{kr.suffix}</p>
                              <p className="text-[11px] font-medium text-emerald-100/90 leading-tight">{kr.label}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-white/10">
                        {localData.thumbnail && (
                          <img src={localData.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-[#185D46] ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Status Badge floating */}
                <div className="absolute bottom-6 right-6">
                  <div className={`px-4 py-2 rounded-full shadow-lg text-xs font-bold flex items-center backdrop-blur-md ${localData.status === 'Published' ? 'bg-[#185D46]/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                    <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse" />
                    Preview: {localData.status}
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
