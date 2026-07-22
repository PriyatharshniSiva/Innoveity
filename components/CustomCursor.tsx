"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is a touch screen (coarse pointer)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsMobile(isTouch);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, select, input, textarea, [role='button'], .interactive-hover, iframe"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    // Listen to DOM mutations to catch newly added elements (like modals/filters)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Small inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#185D46] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Larger trailing circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#185D46] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
          backgroundColor: hovered ? "rgba(24, 93, 70, 0.15)" : "rgba(24, 93, 70, 0)",
          borderColor: hovered ? "var(--color-primary)" : "rgba(24, 93, 70, 0.6)",
        }}
        animate={{
          scale: hovered ? 1.25 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      />
    </>
  );
}
