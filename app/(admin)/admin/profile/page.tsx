"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Camera, Shield, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileManagement() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem('adminName') || "Admin User");
    setEmail(localStorage.getItem('adminEmail') || "admin@innoveity.com");
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('adminName', name);
      localStorage.setItem('adminEmail', email);
      
      // Dispatch custom event to update topbar/sidebar if needed
      window.dispatchEvent(new Event('storage'));
      
      setIsSaving(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        // Force a reload to reflect changes in other components since they read on mount
        window.location.reload();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Profile Settings</h1>
          <p className="text-slate-500 dark:text-neutral-400 mt-1 font-medium">Manage your personal information and security preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-3xl p-8 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary to-[#0f3d2e] dark:from-white/10 dark:to-white/5 z-0" />
            
            <div className="relative z-10 w-32 h-32 rounded-full p-1 bg-white dark:bg-[#0a0a0a] shadow-lg mt-8 mb-4 group cursor-pointer">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=185D46&color=fff&bold=true&size=200`} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-slate-800 dark:text-white relative z-10">{name}</h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-neutral-400 mb-6 relative z-10">Admin</p>
            
            <div className="w-full pt-6 border-t border-slate-100 dark:border-white/10 relative z-10 flex justify-between text-sm">
              <span className="font-bold text-slate-400 dark:text-neutral-500">Status</span>
              <span className="font-bold text-primary dark:text-primary/90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary/100 animate-pulse" /> Active
              </span>
            </div>
          </motion.div>

          <div className="bg-gradient-to-br from-primary to-[#0f3d2e] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
            <Shield className="w-8 h-8 mb-4 text-white/80" />
            <h3 className="font-bold text-lg mb-1 text-white">Two-Factor Auth</h3>
            <p className="text-white/80 text-sm font-medium mb-4">Enhance your account security by enabling 2FA.</p>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-xl text-sm transition-colors w-full border border-white/20">
              Enable Now
            </button>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-8">
          <form onSubmit={handleSave} className="bg-white dark:bg-[#0a0a0a] rounded-3xl p-8 md:p-10 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary dark:text-neutral-400" /> Personal Information
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-400 dark:text-neutral-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 dark:focus:ring-white/5 focus:border-primary dark:focus:border-white/20 text-slate-700 dark:text-neutral-200 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400 dark:text-neutral-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 dark:focus:ring-white/5 focus:border-primary dark:focus:border-white/20 text-slate-700 dark:text-neutral-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-100 dark:border-white/10" />

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary dark:text-neutral-400" /> Change Password
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">Current Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 dark:text-neutral-500" />
                  </div>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 dark:focus:ring-white/5 focus:border-primary dark:focus:border-white/20 text-slate-700 dark:text-neutral-200 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-neutral-300 mb-2">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 dark:text-neutral-500" />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 dark:focus:ring-white/5 focus:border-primary dark:focus:border-white/20 text-slate-700 dark:text-neutral-200 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-4">
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Profile Updated!
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                type="submit"
                disabled={isSaving}
                className="bg-primary hover:bg-[#124634] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
