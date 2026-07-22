"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, CheckCircle, Smartphone, Mail, MapPin, Palette, RefreshCcw, X, Plus } from "lucide-react";
import Wheel from '@uiw/react-color-wheel';
import ShadeSlider from '@uiw/react-color-shade-slider';
import { hsvaToHex, hexToHsva } from '@uiw/color-convert';

import { useToast } from "@/components/Admin/Toast";

const defaultColors = {
  primary: "#185D46",
  secondary: "#0F172A",
  accent: "#F59E0B",
  success: "#10B981",
  warning: "#F59E0B",
  background: "#FFFFFF",
  foreground: "#334155",
};

const brandPresets = ["#185D46", "#F59E0B", "#2563EB", "#DC2626", "#000000", "#FFFFFF"];

export default function ThemeManagementClient({ initialData }: { initialData: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const { success, error } = useToast();

  const [colors, setColors] = useState(initialData?.colors || defaultColors);
  const [activeColorKey, setActiveColorKey] = useState<keyof typeof defaultColors | null>(null);
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  // Default values for Floating Contact Widget
  const [contactOptions, setContactOptions] = useState(initialData?.floatingContactWidget || [
    {
      id: "location",
      label: "Location",
      href: "https://maps.google.com/?q=Chennai,+Tamil+Nadu",
      color: "bg-blue-600",
      iconType: "MapPin"
    },
    {
      id: "email",
      label: "Email Us",
      href: "mailto:contact@innoveity.com",
      color: "bg-[#F59E0B]",
      iconType: "Mail"
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/919876543210",
      color: "bg-[#25D366]",
      iconType: "WhatsApp"
    },
    {
      id: "call",
      label: "Call Us",
      href: "tel:+919876543210",
      color: "bg-[#0B6B57]",
      iconType: "Phone"
    }
  ]);

  const handleOptionChange = (idx: number, field: string, value: string) => {
    const newOptions = [...contactOptions];
    newOptions[idx][field] = value;
    setContactOptions(newOptions);
  };

  // Apply colors live to the document root
  useEffect(() => {
    document.documentElement.style.setProperty("--color-brand-primary", colors.primary);
    document.documentElement.style.setProperty("--color-brand-secondary", colors.secondary);
    document.documentElement.style.setProperty("--color-brand-accent", colors.accent);
    document.documentElement.style.setProperty("--color-success", colors.success);
    document.documentElement.style.setProperty("--color-warning", colors.warning);
    document.documentElement.style.setProperty("--background", colors.background);
    document.documentElement.style.setProperty("--foreground", colors.foreground);
  }, [colors]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...initialData,
          colors,
          floatingContactWidget: contactOptions
        })
      });

      if (res.ok) {
        success("Theme settings saved successfully!");
      } else {
        error("Failed to save theme settings.");
      }
    } catch (err) {
      console.error("Failed to save theme settings:", err);
      error("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setColors(defaultColors);
    success("Theme colors reset to defaults. Don't forget to save!");
  };

  const openPicker = (key: keyof typeof defaultColors) => {
    setActiveColorKey(key);
    setHsva(hexToHsva(colors[key] || "#000"));
  };

  const closePicker = () => {
    if (activeColorKey) {
      const hex = hsvaToHex(hsva);
      if (!recentlyUsed.includes(hex)) {
        setRecentlyUsed(prev => [hex, ...prev].slice(0, 6));
      }
    }
    setActiveColorKey(null);
  };

  const handleColorChange = (newHsva: any) => {
    setHsva(newHsva);
    if (activeColorKey) {
      setColors(prev => ({ ...prev, [activeColorKey]: hsvaToHex(newHsva) }));
    }
  };

  const handlePresetSelect = (hex: string) => {
    if (activeColorKey) {
      setHsva(hexToHsva(hex));
      setColors(prev => ({ ...prev, [activeColorKey]: hex }));
    }
  };

  return (
    <div className="space-y-6 max-w-6xl pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0a0a0a] p-6 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-white/5 relative z-20">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            <Palette className="w-6 h-6 text-[#185D46]" />
            Theme Settings
          </h1>
          <p className="text-sm font-semibold text-slate-500 mt-1">Manage global site appearance and visual theme colors.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
          >
            <RefreshCcw className="w-5 h-5" />
            Reset Colors
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#185D46] hover:bg-[#0f3d2e] text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70"
          >
            {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "Saving..." : "Save Theme"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colors Selection Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 font-sans mb-6">Global Colors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(colors).map(([key, val]) => (
                <div 
                  key={key} 
                  onClick={() => openPicker(key as any)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer group flex items-center gap-4 ${activeColorKey === key ? 'border-[#185D46] bg-slate-50 shadow-md' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  <div 
                    className="w-12 h-12 rounded-full border border-slate-200 shadow-inner group-hover:scale-105 transition-transform" 
                    style={{ backgroundColor: val }}
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800 capitalize">{key}</p>
                    <p className="text-xs text-slate-500 font-mono uppercase mt-0.5">{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Contact Widget Settings */}
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 font-sans mb-4">Floating Contact Widget</h2>
            <div className="space-y-4">
              {contactOptions.map((opt: any, idx: number) => (
                <div key={opt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Label</label>
                      <input
                        type="text"
                        value={opt.label}
                        onChange={(e) => handleOptionChange(idx, "label", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Link / Action</label>
                      <input
                        type="text"
                        value={opt.href}
                        onChange={(e) => handleOptionChange(idx, "href", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Background Color (Tailwind Class)</label>
                      <input
                        type="text"
                        value={opt.color}
                        onChange={(e) => handleOptionChange(idx, "color", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden sticky top-24">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#185D46]" />
                Live Preview
              </h2>
            </div>
            <div className="p-6 space-y-6 transition-colors duration-300" style={{ backgroundColor: colors.background }}>
              {/* Hero Mockup */}
              <div className="space-y-4">
                <h3 style={{ color: colors.foreground }} className="text-xl font-bold font-serif leading-tight transition-colors duration-300">
                  Transforming Learning Experiences
                </h3>
                <p style={{ color: colors.foreground, opacity: 0.8 }} className="text-xs leading-relaxed transition-colors duration-300">
                  The ultimate platform for faculty development and student success.
                </p>
                <div className="flex gap-2">
                  <div style={{ backgroundColor: colors.primary, color: '#fff' }} className="px-4 py-2 rounded-md text-xs font-bold text-center transition-colors duration-300 shadow-md">
                    Get Started
                  </div>
                  <div style={{ backgroundColor: colors.secondary, color: '#fff' }} className="px-4 py-2 rounded-md text-xs font-bold text-center transition-colors duration-300 shadow-md">
                    Learn More
                  </div>
                </div>
              </div>

              {/* Elements Mockup */}
              <div className="pt-4 border-t border-slate-200/50 space-y-3">
                <div style={{ backgroundColor: colors.accent, color: '#000' }} className="p-3 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors duration-300 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-black/30" /> Accent Highlight
                </div>
                <div style={{ backgroundColor: colors.success + '20', color: colors.success, borderColor: colors.success }} className="p-3 rounded-md text-xs font-semibold border flex items-center gap-2 transition-colors duration-300">
                  <CheckCircle className="w-4 h-4" /> Success Message
                </div>
                <div style={{ backgroundColor: colors.warning + '20', color: colors.warning, borderColor: colors.warning }} className="p-3 rounded-md text-xs font-semibold border flex items-center gap-2 transition-colors duration-300">
                  <MapPin className="w-4 h-4" /> Warning Notification
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Picker Modal */}
      <AnimatePresence>
        {activeColorKey && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePicker}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] bg-white rounded-[32px] shadow-2xl p-8 w-full max-w-[340px] border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-800 capitalize tracking-tight">{activeColorKey} Color</h3>
                  <p className="text-sm text-slate-500 font-mono mt-1 font-semibold">{colors[activeColorKey]}</p>
                </div>
                <button onClick={closePicker} className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center space-y-8">
                <Wheel 
                  color={hsva}
                  onChange={(color) => handleColorChange({ ...hsva, ...color.hsva })} 
                  width={260}
                  height={260}
                />
                
                <div className="w-full px-2">
                  <ShadeSlider
                    hsva={hsva}
                    style={{ width: '100%', borderRadius: 12, height: 16 }}
                    onChange={(newShade) => handleColorChange({ ...hsva, ...newShade })}
                  />
                </div>
              </div>

              {/* Brand Presets */}
              <div className="mt-10">
                <p className="text-[11px] font-black text-slate-400 mb-4 uppercase tracking-widest">Brand Presets</p>
                <div className="flex justify-between gap-2">
                  {brandPresets.map(preset => (
                    <button
                      key={preset}
                      onClick={() => handlePresetSelect(preset)}
                      className="w-10 h-10 rounded-full shadow-sm hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-slate-200"
                      style={{ backgroundColor: preset, border: preset === '#FFFFFF' ? '2px solid #e2e8f0' : 'none' }}
                    />
                  ))}
                </div>
              </div>

              {/* Recently Used */}
              {recentlyUsed.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-[11px] font-black text-slate-400 mb-4 uppercase tracking-widest">Recently Used</p>
                  <div className="flex gap-3">
                    {recentlyUsed.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePresetSelect(color)}
                        className="w-10 h-10 rounded-full shadow-sm hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-slate-200"
                        style={{ backgroundColor: color, border: color === '#FFFFFF' ? '2px solid #e2e8f0' : 'none' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
