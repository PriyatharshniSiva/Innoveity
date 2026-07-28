"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Globe, Image as ImageIcon, Link as LinkIcon, Settings, Save, AlertCircle, Eye, Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/components/Admin/Toast";
import Image from "next/image";
import Link from "next/link";

const PAGES = [
  { id: "home", name: "Home Page" },
  { id: "about", name: "About Us" },
  { id: "services", name: "Services" },
  { id: "case-studies", name: "Case Studies" },
  { id: "knowledge-hub", name: "Knowledge Hub" },
  { id: "courses", name: "Courses" },
  { id: "csr", name: "CSR" },
  { id: "contact", name: "Contact" }
];

export default function SeoClient() {
  const [activeTab, setActiveTab] = useState<"pages" | "global" | "technical">("pages");
  const [selectedPage, setSelectedPage] = useState("home");
  
  // Page SEO State
  const [pageSeo, setPageSeo] = useState({
    title: "",
    description: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    indexPage: true,
    followLinks: true
  });

  // Global SEO State
  const [globalSeo, setGlobalSeo] = useState({
    websiteName: "",
    defaultTitle: "",
    defaultDescription: "",
    defaultOgImage: "",
    organizationLogo: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    fetchGlobalSeo();
  }, []);

  useEffect(() => {
    if (activeTab === "pages") {
      fetchPageSeo(selectedPage);
    }
  }, [selectedPage, activeTab]);

  const fetchGlobalSeo = async () => {
    try {
      const res = await fetch("/api/seo/global");
      const data = await res.json();
      if (data.globalSeo) {
        setGlobalSeo({
          websiteName: data.globalSeo.websiteName || "",
          defaultTitle: data.globalSeo.defaultTitle || "",
          defaultDescription: data.globalSeo.defaultDescription || "",
          defaultOgImage: data.globalSeo.defaultOgImage || "",
          organizationLogo: data.globalSeo.organizationLogo || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPageSeo = async (page: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/seo?page=${page}`);
      const data = await res.json();
      if (data.seoSettings) {
        setPageSeo({
          title: data.seoSettings.title || "",
          description: data.seoSettings.description || "",
          canonicalUrl: data.seoSettings.canonicalUrl || "",
          ogTitle: data.seoSettings.ogTitle || "",
          ogDescription: data.seoSettings.ogDescription || "",
          ogImage: data.seoSettings.ogImage || "",
          indexPage: data.seoSettings.indexPage ?? true,
          followLinks: data.seoSettings.followLinks ?? true
        });
      } else {
        setPageSeo({
          title: "", description: "", canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "", indexPage: true, followLinks: true
        });
      }
    } catch (err) {
      console.error(err);
      error("Failed to load SEO settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePage = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: selectedPage, ...pageSeo })
      });
      if (res.ok) success("SEO settings saved successfully");
      else error("Failed to save settings");
    } catch (err) {
      error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveGlobal = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/seo/global", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(globalSeo)
      });
      if (res.ok) success("Global settings saved successfully");
      else error("Failed to save global settings");
    } catch (err) {
      error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, isGlobal = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        if (isGlobal) setGlobalSeo({ ...globalSeo, [field]: data.url });
        else setPageSeo({ ...pageSeo, [field]: data.url });
        success("Image uploaded successfully");
      } else {
        error("Image upload failed");
      }
    } catch (err) {
      error("Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">SEO Management</h1>
          <p className="text-slate-500 mt-2">Manage search engine settings for all website pages from one place.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl w-fit">
        {[
          { id: "pages", label: "Page SEO", icon: Search },
          { id: "global", label: "Global Settings", icon: Globe },
          { id: "technical", label: "Technical SEO", icon: Settings }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all ${
              activeTab === t.id ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "pages" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Page Selector */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <label className="block text-sm font-bold text-slate-700 mb-3">Select Page to Edit</label>
              <select 
                value={selectedPage}
                onChange={e => setSelectedPage(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 font-medium"
              >
                {PAGES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            {isLoading ? (
              <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Basic SEO */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" /> Basic SEO Settings
                  </h2>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex justify-between">
                      SEO Title <span className="text-xs text-slate-400 font-normal">{pageSeo.title.length}/60</span>
                    </label>
                    <input 
                      type="text" 
                      value={pageSeo.title}
                      onChange={e => setPageSeo({...pageSeo, title: e.target.value})}
                      placeholder={globalSeo.defaultTitle || "Enter page title"}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex justify-between">
                      Meta Description <span className="text-xs text-slate-400 font-normal">{pageSeo.description.length}/160</span>
                    </label>
                    <textarea 
                      rows={3}
                      value={pageSeo.description}
                      onChange={e => setPageSeo({...pageSeo, description: e.target.value})}
                      placeholder={globalSeo.defaultDescription || "Enter meta description"}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Canonical URL (Optional)</label>
                    <input 
                      type="text" 
                      value={pageSeo.canonicalUrl}
                      onChange={e => setPageSeo({...pageSeo, canonicalUrl: e.target.value})}
                      placeholder="https://innoveity.com/your-page"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
                    />
                  </div>
                </div>

                {/* Social Media / Open Graph */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" /> Social Media Settings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">OG Title</label>
                        <input 
                          type="text" 
                          value={pageSeo.ogTitle}
                          onChange={e => setPageSeo({...pageSeo, ogTitle: e.target.value})}
                          placeholder={pageSeo.title || "Social title"}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">OG Description</label>
                        <textarea 
                          rows={4}
                          value={pageSeo.ogDescription}
                          onChange={e => setPageSeo({...pageSeo, ogDescription: e.target.value})}
                          placeholder={pageSeo.description || "Social description"}
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 resize-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">OG Image</label>
                      <div className="w-full aspect-video rounded-xl border-2 border-dashed border-slate-200 overflow-hidden relative group bg-slate-50 flex items-center justify-center">
                        {pageSeo.ogImage ? (
                          <>
                            <Image src={pageSeo.ogImage} alt="OG" fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <label className="px-4 py-2 bg-white text-slate-800 rounded-lg font-medium cursor-pointer flex items-center gap-2 hover:bg-slate-50">
                                <Upload className="w-4 h-4" /> Replace
                                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "ogImage")} />
                              </label>
                              <button onClick={() => setPageSeo({...pageSeo, ogImage: ""})} className="p-2 bg-rose-500 text-white rounded-lg ml-2 hover:bg-rose-600">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <label className="flex flex-col items-center justify-center text-slate-400 cursor-pointer w-full h-full hover:bg-slate-100 transition-colors">
                            {isUploading ? <Loader2 className="w-8 h-8 animate-spin text-primary" /> : <ImageIcon className="w-8 h-8 mb-2 text-slate-300" />}
                            <span className="text-sm font-medium">Upload Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "ogImage")} />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Engine Settings */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5 text-primary" /> Search Engine Directives
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" checked={pageSeo.indexPage} onChange={e => setPageSeo({...pageSeo, indexPage: e.target.checked})} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Index Page (Allow indexing)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" checked={pageSeo.followLinks} onChange={e => setPageSeo({...pageSeo, followLinks: e.target.checked})} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                      <span className="text-sm font-semibold text-slate-700">Follow Links</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSavePage}
                    disabled={isSaving}
                    className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70"
                  >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Eye className="w-4 h-4 text-primary" /> Google Search Preview
              </h3>
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                    {globalSeo.organizationLogo ? <Image src={globalSeo.organizationLogo} alt="Logo" width={24} height={24} className="object-cover" /> : "I"}
                  </div>
                  <div>
                    <p className="text-xs text-slate-800 leading-tight">{globalSeo.websiteName || "INNOVEITY"}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">https://innoveity.com/{selectedPage === "home" ? "" : selectedPage}</p>
                  </div>
                </div>
                <h4 className="text-[#1a0dab] text-[18px] font-medium leading-tight mb-1 hover:underline cursor-pointer truncate">
                  {pageSeo.title || globalSeo.defaultTitle || "Page Title"}
                </h4>
                <p className="text-[#4d5156] text-sm leading-snug line-clamp-2">
                  {pageSeo.description || globalSeo.defaultDescription || "No meta description provided. Search engines will generate a snippet from the page content."}
                </p>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center italic">This is an approximate preview of how your page might appear in Google Search.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "global" && (
        <div className="max-w-3xl bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> Global SEO Settings
          </h2>
          <p className="text-slate-500 text-sm">These settings act as fallbacks if a specific page is missing its own SEO information.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Website Name</label>
              <input 
                type="text" 
                value={globalSeo.websiteName}
                onChange={e => setGlobalSeo({...globalSeo, websiteName: e.target.value})}
                placeholder="e.g. INNOVEITY"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Default SEO Title</label>
              <input 
                type="text" 
                value={globalSeo.defaultTitle}
                onChange={e => setGlobalSeo({...globalSeo, defaultTitle: e.target.value})}
                placeholder="e.g. INNOVEITY | Corporate Training & Skill Development"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Default Meta Description</label>
              <textarea 
                rows={3}
                value={globalSeo.defaultDescription}
                onChange={e => setGlobalSeo({...globalSeo, defaultDescription: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-slate-700 resize-none"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Organization Logo (Microdata)</label>
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group bg-slate-50 flex items-center justify-center">
                  {globalSeo.organizationLogo ? (
                    <>
                      <Image src={globalSeo.organizationLogo} alt="Logo" fill className="object-contain p-2" />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="text-white text-xs font-bold cursor-pointer hover:underline mb-1">
                          Replace <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "organizationLogo", true)} />
                        </label>
                        <button onClick={() => setGlobalSeo({...globalSeo, organizationLogo: ""})} className="text-rose-400 text-xs font-bold hover:underline">Remove</button>
                      </div>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center text-slate-400 cursor-pointer w-full h-full hover:bg-slate-100">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <Upload className="w-5 h-5 mb-1 text-slate-300" />}
                      <span className="text-[10px] font-bold uppercase">Upload</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "organizationLogo", true)} />
                    </label>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Default OG Image</label>
                <div className="w-full h-24 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group bg-slate-50 flex items-center justify-center">
                  {globalSeo.defaultOgImage ? (
                    <>
                      <Image src={globalSeo.defaultOgImage} alt="OG" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="px-3 py-1 bg-white text-slate-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-slate-50">
                          Replace <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "defaultOgImage", true)} />
                        </label>
                      </div>
                    </>
                  ) : (
                    <label className="flex flex-col items-center justify-center text-slate-400 cursor-pointer w-full h-full hover:bg-slate-100">
                      <ImageIcon className="w-5 h-5 mb-1 text-slate-300" />
                      <span className="text-xs font-medium">Upload Image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "defaultOgImage", true)} />
                    </label>
                  )}
                </div>
              </div>
            </div>
            
            <div className="pt-6 flex justify-end">
              <button
                onClick={handleSaveGlobal}
                disabled={isSaving}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Global Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "technical" && (
        <div className="max-w-3xl space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-primary" /> Technical SEO
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800">Sitemap</h3>
                    <p className="text-sm text-slate-500 mt-1">sitemap.xml</p>
                  </div>
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md uppercase tracking-wider">Generated</span>
                </div>
                <Link href="/sitemap.xml" target="_blank" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
                  View Sitemap <Globe className="w-3 h-3" />
                </Link>
              </div>
              
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800">Robots.txt</h3>
                    <p className="text-sm text-slate-500 mt-1">robots.txt</p>
                  </div>
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md uppercase tracking-wider">Active</span>
                </div>
                <Link href="/robots.txt" target="_blank" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1">
                  View Robots.txt <Globe className="w-3 h-3" />
                </Link>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-amber-800">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">These files are automatically generated based on the Page Settings (Index Page, Follow Links). Any changes you make will be instantly reflected in the sitemap and robots.txt.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
