"use client";

import React from "react";
import { Search, Bell, Clock, MessageSquare, ChevronDown, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAdminTheme } from "./AdminThemeProvider";

export default function AdminTopbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useAdminTheme();

  // Format breadcrumb from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const currentPage = pathParts.length > 1 
    ? pathParts[pathParts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Dashboard Overview';

  // Format current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="h-20 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-8 shrink-0 z-40 sticky top-0 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight transition-colors duration-300">{currentPage}</h2>
          <div className="flex items-center gap-2 mt-1 text-xs font-bold text-slate-500 dark:text-neutral-500 uppercase tracking-widest transition-colors duration-300">
            <span className="text-slate-400 dark:text-neutral-600">Admin</span>
            <span className="text-slate-300 dark:text-neutral-800">/</span>
            <span className="text-[#185D46] dark:text-white">{currentPage}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center bg-slate-50 dark:bg-white/5 rounded-2xl px-4 py-2.5 w-80 border border-slate-100 dark:border-white/5 focus-within:border-[#185D46]/30 dark:focus-within:border-white/20 focus-within:bg-white dark:focus-within:bg-white/10 focus-within:ring-4 dark:focus-within:ring-0 focus-within:ring-[#185D46]/5 transition-all shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]">
          <Search className="w-4 h-4 text-slate-400 dark:text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none text-sm font-semibold ml-3 w-full text-slate-700 dark:text-neutral-200 placeholder-slate-400 dark:placeholder-neutral-500"
          />
          <div className="flex items-center gap-1 opacity-60">
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded text-slate-500 dark:text-neutral-400 shadow-sm dark:shadow-none">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded text-slate-500 dark:text-neutral-400 shadow-sm dark:shadow-none">K</kbd>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-neutral-400 bg-white dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:shadow-none transition-colors duration-300">
          <Clock className="w-4 h-4 text-[#F59E0B] dark:text-neutral-500" />
          {currentDate}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="relative p-2.5 rounded-xl text-slate-400 dark:text-neutral-500 hover:text-[#185D46] dark:hover:text-white hover:bg-[#185D46]/10 dark:hover:bg-white/10 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Quick Actions */}
          <button className="relative p-2.5 rounded-xl text-slate-400 dark:text-neutral-500 hover:text-[#F59E0B] dark:hover:text-white hover:bg-[#F59E0B]/10 dark:hover:bg-white/10 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#F59E0B] dark:bg-white rounded-full"></span>
          </button>
          
          <button className="relative p-2.5 rounded-xl text-slate-400 dark:text-neutral-500 hover:text-[#185D46] dark:hover:text-white hover:bg-[#185D46]/10 dark:hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#185D46] dark:bg-white rounded-full border-2 border-white dark:border-[#0a0a0a]"></span>
          </button>
          
          <div className="w-px h-8 bg-slate-100 dark:bg-white/10 mx-2 transition-colors duration-300"></div>
          
          <div className="flex items-center gap-3 pl-2 cursor-pointer group hover:bg-slate-50 dark:hover:bg-white/5 p-1.5 rounded-2xl transition-colors border border-transparent hover:border-slate-100 dark:hover:border-white/5">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700 dark:text-neutral-200 leading-none group-hover:text-[#185D46] dark:group-hover:text-white transition-colors tracking-wide">Admin User</p>
              <p className="text-xs font-semibold text-slate-400 dark:text-neutral-500 mt-1">Superadmin</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#185D46]/10 dark:bg-white/10 p-0.5 shadow-sm dark:shadow-none group-hover:shadow group-hover:bg-white/20 transition-all group-hover:scale-105">
                <div className="w-full h-full rounded-[10px] bg-white dark:bg-black overflow-hidden flex items-center justify-center">
                  <img src={theme === 'dark' ? "https://ui-avatars.com/api/?name=Admin&background=000&color=fff&bold=true" : "https://ui-avatars.com/api/?name=Admin&background=185D46&color=fff&bold=true"} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 dark:text-neutral-500 group-hover:text-slate-600 dark:group-hover:text-neutral-300 transition-colors hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
