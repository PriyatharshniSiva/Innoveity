"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Quote, AlertCircle } from "lucide-react";
import { useTestimonials } from "./TestimonialsState";
import { useToast } from "@/components/Admin/Toast";

export default function TestimonialsList() {
  const { testimonials, isLoading, setIsDrawerOpen, setEditingId, refreshTestimonials } = useTestimonials();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { success, error } = useToast();

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setDeletingId(id);
      try {
        const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
        if (res.ok) {
          refreshTestimonials();
          success("Testimonial deleted successfully.");
        } else {
          error("Failed to delete testimonial.");
        }
      } catch (err) {
        console.error(err);
        error("An error occurred.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-slate-500 font-medium">Loading testimonials...</div>;
  }

  if (testimonials.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Quote className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Testimonials Found</h3>
        <p className="text-slate-500 mb-6 max-w-sm mx-auto">There are currently no testimonials to display. Click the button above to add your first one.</p>
        <button 
          onClick={() => { setEditingId(null); setIsDrawerOpen(true); }}
          className="px-6 py-2.5 bg-[#185D46] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all"
        >
          Add Testimonial
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence>
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between group hover:border-[#185D46]/30 transition-all duration-300"
          >
            <div>
              <div className="mb-6 opacity-20 text-[#185D46] group-hover:opacity-40 transition-opacity">
                <Quote className="w-10 h-10" />
              </div>
              <blockquote className="text-slate-700 text-lg mb-6 leading-relaxed font-medium">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="font-bold text-slate-800">
                {t.author}
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => { setEditingId(t.id); setIsDrawerOpen(true); }}
                  className="p-2 text-slate-400 hover:text-[#185D46] hover:bg-[#185D46]/10 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  disabled={deletingId === t.id}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
