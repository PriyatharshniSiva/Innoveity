import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKnowledgeHub, KnowledgeArticle } from "./KnowledgeHubState";
import { X, Save, Eye, LayoutTemplate, Settings, Image as ImageIcon, Plus, Trash2, Globe, Clock, Tag } from "lucide-react";
import { useToast } from "@/components/Admin/Toast";

export default function KnowledgeHubDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, editingArticleId, articles, setArticles } = useKnowledgeHub();
  
  const [activeTab, setActiveTab] = useState<"content" | "media" | "seo">("content");
  
  // Local state for the form
  const [localData, setLocalData] = useState<KnowledgeArticle>({
    id: "", title: "", desc: "", content: "", image: "", level: "SKILLS",
    nextBatch: new Date().toLocaleDateString(), instructor: "", tags: [],
    readTime: "5 min read", seoTitle: "", seoDescription: "", slug: "", status: "Draft", views: 0
  });

  useEffect(() => {
    if (isDrawerOpen) {
      if (editingArticleId) {
        const found = articles.find(a => a.id === editingArticleId);
        if (found) setLocalData(found);
      } else {
        setLocalData({
          id: Date.now().toString(),
          title: "", desc: "", content: "", image: "", level: "SKILLS",
          nextBatch: new Date().toLocaleDateString(), instructor: "", tags: [],
          readTime: "5 min read", seoTitle: "", seoDescription: "", slug: "", status: "Draft", views: 0
        });
      }
      setActiveTab("content");
    }
  }, [isDrawerOpen, editingArticleId, articles]);

  const { success } = useToast();

  const handleSave = (publish: boolean = false) => {
    const finalData = { ...localData, status: publish ? "Published" : localData.status } as KnowledgeArticle;
    
    if (editingArticleId) {
      setArticles(articles.map(a => a.id === editingArticleId ? finalData : a));
    } else {
      setArticles([finalData, ...articles]);
    }
    
    success(`Article ${publish ? 'Published' : 'Saved'} Successfully!`);
    setIsDrawerOpen(false);
  };

  const handleAddTag = () => {
    setLocalData({ ...localData, tags: [...localData.tags, ""] });
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-3xl bg-white shadow-2xl z-[110] flex flex-col border-l border-slate-200"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-xl font-black text-slate-800">
                  {editingArticleId ? "Edit Article" : "New Article"}
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-1">Manage article content and settings.</p>
              </div>
              <div className="flex items-center gap-4">
                {/* Status Toggle */}
                <button
                  onClick={() => setLocalData({ ...localData, status: localData.status === "Published" ? "Draft" : "Published" })}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${localData.status === "Published" ? "bg-emerald-500" : "bg-slate-200"}`}
                >
                  <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${localData.status === "Published" ? "translate-x-6" : "translate-x-1"}`} />
                </button>
                <span className={`text-sm font-bold ${localData.status === "Published" ? "text-emerald-600" : "text-slate-500"}`}>
                  {localData.status}
                </span>

                <div className="w-px h-6 bg-slate-200 mx-2"></div>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 px-8 bg-slate-50/50">
              <button
                onClick={() => setActiveTab("content")}
                className={`py-4 px-2 mr-8 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "content" ? "border-[#185D46] text-[#185D46]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              >
                <LayoutTemplate className="w-4 h-4" /> Content
              </button>
              <button
                onClick={() => setActiveTab("media")}
                className={`py-4 px-2 mr-8 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "media" ? "border-[#185D46] text-[#185D46]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              >
                <ImageIcon className="w-4 h-4" /> Media
              </button>
              <button
                onClick={() => setActiveTab("seo")}
                className={`py-4 px-2 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === "seo" ? "border-[#185D46] text-[#185D46]" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              >
                <Settings className="w-4 h-4" /> SEO & Settings
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              
              {/* Content Tab */}
              {activeTab === "content" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Article Title</label>
                    <input type="text" value={localData.title} onChange={e => setLocalData({...localData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-white transition-all text-sm font-medium" placeholder="e.g. The Future of EdTech" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Short Description</label>
                    <textarea rows={3} value={localData.desc} onChange={e => setLocalData({...localData, desc: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-white transition-all text-sm font-medium resize-none" placeholder="A brief impactful summary..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Article Content</label>
                    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-[#185D46] transition-all">
                      <div className="bg-slate-50 border-b border-slate-100 p-2 flex gap-2">
                        <button className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded">B</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded italic">I</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded underline">U</button>
                        <div className="w-px h-6 bg-slate-200 mx-1"></div>
                        <button className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded">H1</button>
                        <button className="px-3 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded">H2</button>
                      </div>
                      <textarea rows={12} value={localData.content} onChange={e => setLocalData({...localData, content: e.target.value})} className="w-full px-4 py-4 focus:outline-none text-sm font-medium resize-none bg-transparent" placeholder="Start writing your article..." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Author Name</label>
                      <input type="text" value={localData.instructor} onChange={e => setLocalData({...localData, instructor: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-white transition-all text-sm font-medium" placeholder="e.g. John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Category Dropdown</label>
                      <select value={localData.level} onChange={e => setLocalData({...localData, level: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-white transition-all text-sm font-medium">
                        <option value="SKILLS">Skills</option>
                        <option value="TECHNOLOGY">Technology</option>
                        <option value="SUSTAINABILITY">Sustainability</option>
                        <option value="INDUSTRY">Industry</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Media Tab */}
              {activeTab === "media" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Featured Image Upload</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-white hover:bg-slate-50 transition-colors cursor-pointer group mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-8 h-8 text-[#185D46]" />
                      </div>
                      <p className="text-sm font-bold text-slate-700 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                    
                    <label className="block text-sm font-semibold text-slate-700 mb-2 mt-6">Or provide Image URL</label>
                    <input type="text" value={localData.image} onChange={e => setLocalData({...localData, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-white transition-all text-sm font-medium" placeholder="https://..." />
                    
                    {/* Live Image Preview */}
                    {localData.image && (
                      <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-100 relative">
                        <img src={localData.image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white font-bold text-sm">Image Preview</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SEO & Settings Tab */}
              {activeTab === "seo" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-slate-400" /> Search Engine Optimization</h3>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">SEO Meta Title</label>
                      <input type="text" value={localData.seoTitle} onChange={e => setLocalData({...localData, seoTitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 transition-all text-sm font-medium" placeholder="Optimal length is 50-60 chars" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">SEO Meta Description</label>
                      <textarea rows={3} value={localData.seoDescription} onChange={e => setLocalData({...localData, seoDescription: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 transition-all text-sm font-medium resize-none" placeholder="Optimal length is 150-160 chars" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">URL Slug</label>
                      <div className="flex">
                        <span className="px-4 py-3 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-500 text-sm font-medium">/knowledge-hub/</span>
                        <input type="text" value={localData.slug} onChange={e => setLocalData({...localData, slug: e.target.value})} className="flex-1 px-4 py-3 rounded-r-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 transition-all text-sm font-medium" placeholder="article-url-slug" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-slate-400" /> Meta Data & Tags</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Read Time</label>
                        <input type="text" value={localData.readTime} onChange={e => setLocalData({...localData, readTime: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 transition-all text-sm font-medium" placeholder="e.g. 5 min read" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Publish Date</label>
                        <input type="text" value={localData.nextBatch} onChange={e => setLocalData({...localData, nextBatch: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] bg-slate-50 transition-all text-sm font-medium" placeholder="MM/DD/YYYY" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tags</label>
                      <div className="space-y-2 mb-3">
                        {localData.tags.map((tag, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <input type="text" value={tag} onChange={e => {
                              const newTags = [...localData.tags];
                              newTags[idx] = e.target.value;
                              setLocalData({...localData, tags: newTags});
                            }} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#185D46] bg-slate-50 text-sm font-medium" placeholder="e.g. EdTech" />
                            <button onClick={() => {
                              const newTags = localData.tags.filter((_, i) => i !== idx);
                              setLocalData({...localData, tags: newTags});
                            }} className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button onClick={handleAddTag} className="text-sm font-bold text-[#185D46] flex items-center hover:underline">
                        <Plus className="w-4 h-4 mr-1" /> Add Tag
                      </button>
                    </div>
                  </div>
                  
                </div>
              )}

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {editingArticleId && (
                  <button className="px-5 py-2.5 rounded-xl font-bold text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                )}
                <button className="px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Preview
                </button>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleSave(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex-1 sm:flex-none"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSave(true)}
                  className="flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl font-bold bg-[#185D46] text-white hover:bg-[#124634] transition-colors shadow-lg shadow-primary/20 flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4" />
                  {editingArticleId ? "Update" : "Publish"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
