"use client";

import { useEffect, useRef } from "react";

export default function FuturisticBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden theme-bg-gradient"
    >
      {/* Premium animated coordinate line-grid overlay */}
      <div 
        className="absolute inset-0 bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-scroll"
        style={{
          backgroundImage: "linear-gradient(to right, var(--grid-color, rgba(16,185,129,0.02)) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color, rgba(16,185,129,0.02)) 1px, transparent 1px)"
        }}
      ></div>
      
      {/* Glowing Mesh Orbits - Higher Blur Radii for Luxurious Glow */}
      <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] rounded-full blur-[165px] ambient-sphere-1 animate-orbit-one"></div>
      <div className="absolute top-[40%] right-1/4 w-[400px] h-[400px] rounded-full blur-[145px] ambient-sphere-2 animate-orbit-two"></div>
      <div className="absolute bottom-[20%] left-1/3 w-[600px] h-[600px] rounded-full blur-[185px] ambient-sphere-3 animate-orbit-three"></div>
      <div className="absolute bottom-[5%] right-1/3 w-[350px] h-[350px] rounded-full blur-[125px] ambient-sphere-4 animate-orbit-four"></div>

      {/* Gentle dark overlay to balance background glow brightness and optimize content readability */}
      <div 
        className="absolute inset-0 backdrop-blur-[1.5px] z-10 pointer-events-none"
        style={{ backgroundColor: "var(--overlay-bg, rgba(11, 15, 25, 0.4))" }}
      ></div>

      {/* Twinkling Star Particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="star absolute top-[15%] left-[20%] w-1 h-1 rounded-full animate-pulse"></div>
        <div className="star absolute top-[35%] right-[15%] w-1.5 h-1.5 rounded-full animate-ping [animation-duration:3.2s]"></div>
        <div className="star absolute top-[65%] left-[10%] w-1 h-1 rounded-full animate-pulse [animation-duration:2.5s]"></div>
        <div className="star absolute top-[80%] right-[30%] w-1 h-1 rounded-full animate-pulse [animation-duration:4s]"></div>
        <div className="star absolute top-[50%] left-[80%] w-1.5 h-1.5 rounded-full animate-ping [animation-duration:3.5s]"></div>
        <div className="star absolute top-[90%] left-[45%] w-1.5 h-1.5 rounded-full animate-pulse [animation-duration:1.8s]"></div>
      </div>
    </div>
  );
}
