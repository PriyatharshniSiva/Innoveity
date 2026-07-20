"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const contactOptions = [
    {
      id: "location",
      label: "Location",
      href: "https://maps.google.com/?q=Chennai,+Tamil+Nadu",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "bg-blue-600",
    },
    {
      id: "email",
      label: "Email Us",
      href: "mailto:contact@innoveity.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-[#F59E0B]", // Accent Orange
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/919876543210", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 0C5.394 0 0 5.394 0 12.031c0 2.12.553 4.184 1.597 6L.51 23.511l5.626-1.477c1.761.946 3.743 1.442 5.895 1.442 6.637 0 12.031-5.394 12.031-12.031S18.668 0 12.031 0zm0 21.674c-1.802 0-3.56-.484-5.1-1.396l-.366-.217-3.791.995.998-3.696-.237-.378a10.231 10.231 0 0 1-1.57-5.503c0-5.638 4.588-10.226 10.226-10.226 5.637 0 10.225 4.588 10.225 10.226 0 5.638-4.588 10.226-10.226 10.226zM17.65 14.15c-.308-.154-1.824-.9-2.106-1.002-.283-.103-.49-.154-.695.154-.205.308-.795 1.002-.975 1.206-.18.204-.36.23-.668.077-1.637-.81-2.736-1.503-3.805-3.32-.218-.364.22-.34.815-1.52.077-.154.038-.283-.001-.437-.116-.308-.695-1.675-.951-2.29-.25-.596-.503-.516-.695-.526-.18-.01-.387-.01-.592-.01-.205 0-.54.077-.822.385-.283.308-1.08 1.054-1.08 2.571 0 1.517 1.105 2.983 1.26 3.187.154.205 2.17 3.313 5.257 4.646.735.317 1.31.507 1.761.649.739.234 1.411.2 1.94.122.593-.087 1.824-.746 2.08-1.467.257-.72.257-1.337.18-1.467-.077-.13-.283-.205-.592-.36z" />
        </svg>
      ),
      color: "bg-[#25D366]", // WhatsApp Green
    },
    {
      id: "call",
      label: "Call Us",
      href: "tel:+919876543210", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: "bg-[#0B6B57]", // Primary Green
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[999] md:bottom-8 md:right-8 flex flex-col items-end" ref={widgetRef}>
      
      {/* Menu Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-end gap-3 mb-4"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.id}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 * index, duration: 0.2 }}
                className="group flex items-center gap-3 relative"
              >
                {/* Tooltip */}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-full mr-3 whitespace-nowrap bg-white text-gray-800 text-[13px] font-semibold py-1.5 px-3 rounded-lg shadow-lg border border-gray-100 pointer-events-none">
                  {option.label}
                </span>

                {/* Button */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white shadow-lg ${option.color} hover:scale-110 active:scale-95 transition-transform duration-200 overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  {option.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Button */}
      <div className="relative">
        {/* Pulse Effect */}
        <div className="absolute inset-0 bg-[#0B6B57] rounded-full animate-ping opacity-60" style={{ animationDuration: '3s' }}></div>
        
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0B6B57] hover:bg-[#095746] text-white shadow-[0_8px_30px_rgba(11,107,87,0.4)] backdrop-blur-md border border-white/20 transition-colors z-10"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </motion.button>
      </div>

    </div>
  );
}
