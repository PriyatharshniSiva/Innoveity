"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AnimatedSection({ 
  children, 
  className = "",
  animationClass = "animate-fade-in-up" 
}: { 
  children: React.ReactNode; 
  className?: string;
  animationClass?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${isVisible ? animationClass : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
