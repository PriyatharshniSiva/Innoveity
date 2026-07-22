"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useTestimonials } from "@/components/Admin/TestimonialsManagement/TestimonialsState";
import TestimonialsList from "@/components/Admin/TestimonialsManagement/TestimonialsList";
import TestimonialsDrawer from "@/components/Admin/TestimonialsManagement/TestimonialsDrawer";

export default function CaseStudiesTestimonials() {
  const { setEditingId, setIsDrawerOpen } = useTestimonials();

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            What Our Partners Say
          </h2>
          <p className="text-slate-500 font-medium">
            Hear from the leaders and innovators we've had the privilege to work with
          </p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setIsDrawerOpen(true); }}
          className="px-5 py-2.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </button>
      </div>

      <TestimonialsList />
      <TestimonialsDrawer />
    </div>
  );
}
