"use client";

import React from "react";
import { Plus } from "lucide-react";
import { TestimonialsProvider, useTestimonials } from "@/components/Admin/TestimonialsManagement/TestimonialsState";
import TestimonialsList from "@/components/Admin/TestimonialsManagement/TestimonialsList";
import TestimonialsDrawer from "@/components/Admin/TestimonialsManagement/TestimonialsDrawer";

function TestimonialsContent() {
  const { setIsDrawerOpen, setEditingId } = useTestimonials();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Testimonials Management</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Manage all partner quotes and client testimonials dynamically.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => { setEditingId(null); setIsDrawerOpen(true); }}
              className="px-6 py-2.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all flex items-center"
            >
              <Plus className="w-5 h-5 mr-1" />
              Add Testimonial
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <TestimonialsList />
      </div>
      
      <TestimonialsDrawer />

    </div>
  );
}

export default function AdminTestimonials() {
  return (
    <TestimonialsProvider>
      <TestimonialsContent />
    </TestimonialsProvider>
  );
}
