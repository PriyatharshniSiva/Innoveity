"use client";

import { useEffect, useState } from "react";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
      {/* Floating Phone Call Icon */}
      <a
        href="tel:+918807708818"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#185D46] text-white rounded-full shadow-lg hover:bg-[#124836] transition-all duration-200 flex items-center justify-center group hover:scale-110 cursor-pointer"
        title="Call Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-phone w-5 h-5 sm:w-6 sm:h-6"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>

      {/* Floating Message / WhatsApp Icon */}
      <a
        href="https://wa.me/918807708818"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20b858] transition-all duration-200 flex items-center justify-center group hover:scale-110 cursor-pointer"
        title="Chat with Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-message-circle w-5 h-5 sm:w-6 sm:h-6"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        </svg>
      </a>
    </div>
  );
}
