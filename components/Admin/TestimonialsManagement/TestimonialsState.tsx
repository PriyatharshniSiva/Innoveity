"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TestimonialsContextType {
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  refreshTestimonials: () => void;
  isLoading: boolean;
  pageContext: string;
}

const TestimonialsContext = createContext<TestimonialsContextType | undefined>(undefined);

export function TestimonialsProvider({ children, pageContext = "case-studies" }: { children: React.ReactNode, pageContext?: string }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTestimonials = () => {
    setIsLoading(true);
    fetch(`/api/testimonials?page=${pageContext}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.testimonials) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(err => console.error("Failed to load testimonials", err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refreshTestimonials();
  }, [pageContext]);

  return (
    <TestimonialsContext.Provider value={{
      testimonials, setTestimonials,
      isDrawerOpen, setIsDrawerOpen,
      editingId, setEditingId,
      refreshTestimonials, isLoading,
      pageContext
    }}>
      {children}
    </TestimonialsContext.Provider>
  );
}

export function useTestimonials() {
  const context = useContext(TestimonialsContext);
  if (context === undefined) {
    throw new Error("useTestimonials must be used within a TestimonialsProvider");
  }
  return context;
}
