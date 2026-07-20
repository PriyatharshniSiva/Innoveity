"use client";

import React, { useRef } from "react";
import { ImagePlus, Images } from "lucide-react";

export default function CsrGalleryManager() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`Selected ${e.target.files.length} images for upload. (Backend integration required)`);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm overflow-hidden mb-8 transition-colors duration-300">
      <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 transition-colors duration-300">
        <h3 className="font-bold text-slate-800 dark:text-white">Gallery & Media</h3>
        
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        
        <button 
          onClick={handleUploadClick}
          className="text-sm font-bold text-purple-500 hover:text-purple-700 flex items-center transition-colors"
        >
          <ImagePlus className="w-4 h-4 mr-1" /> Upload Images
        </button>
      </div>
      <div className="p-12 flex flex-col items-center justify-center text-slate-400 dark:text-neutral-500 transition-colors duration-300">
        <Images className="w-12 h-12 mb-4 opacity-50" />
        <p className="font-medium">Drag and drop gallery manager will be integrated here.</p>
      </div>
    </div>
  );
}
