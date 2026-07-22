"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Quote, User } from "lucide-react";
import { useTestimonials } from "./TestimonialsState";
import { useToast } from "@/components/Admin/Toast";

export default function TestimonialsDrawer() {
  const { isDrawerOpen, setIsDrawerOpen, editingId, testimonials, refreshTestimonials } = useTestimonials();
  
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    if (isDrawerOpen) {
      if (editingId) {
        const t = testimonials.find(x => x.id === editingId);
        if (t) {
          setQuote(t.quote);
          setAuthor(t.author);
        }
      } else {
        setQuote("");
        setAuthor("");
      }
    }
  }, [isDrawerOpen, editingId, testimonials]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote || !author) return;

    setIsSaving(true);
    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote, author })
      });

      if (res.ok) {
        refreshTestimonials();
        setIsDrawerOpen(false);
        success(editingId ? "Testimonial updated successfully!" : "Testimonial added successfully!");
      } else {
        error("Failed to save testimonial.");
      }
    } catch (err) {
      console.error(err);
      error("An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%", boxShadow: "-20px 0 40px rgba(0,0,0,0)" }}
            animate={{ x: 0, boxShadow: "-20px 0 40px rgba(0,0,0,0.1)" }}
            exit={{ x: "100%", boxShadow: "-20px 0 40px rgba(0,0,0,0)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full max-w-lg h-full bg-white z-[101] flex flex-col border-l border-slate-100"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="testimonial-form" onSubmit={handleSave} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Quote className="w-4 h-4 text-slate-400" />
                    Quote Content
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Enter the testimonial quote here..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] outline-none transition-all resize-none text-slate-700"
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe, CEO at TechCorp"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] outline-none transition-all text-slate-700"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                  />
                </div>

              </form>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-200/50 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                form="testimonial-form"
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all flex items-center disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Testimonial
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
