"use client";

import React from "react";
import { Search, Bell, Clock, MessageSquare, ChevronDown, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAdminTheme } from "./AdminThemeProvider";
import { useToast } from "@/components/Admin/Toast";

export default function AdminTopbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useAdminTheme();
  const { toast } = useToast();

  const [adminName, setAdminName] = React.useState("Admin User");
  
  React.useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

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
    <header className="h-20 bg-white/80 dark:bg-black/20 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-8 shrink-0 z-40 sticky top-0 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-300">{currentPage}</h2>
          <div className="flex items-center gap-2 mt-1 text-xs font-bold text-slate-500 dark:text-white/50 uppercase tracking-widest transition-colors duration-300">
            <span className="text-slate-400 dark:text-white/40">Admin</span>
            <span className="text-slate-300 dark:text-white/30">/</span>
            <span className="text-primary">{currentPage}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-white/5 rounded-2xl px-4 py-2.5 w-80 border border-slate-200 dark:border-white/5 focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-white/10 focus-within:ring-4 focus-within:ring-primary/20 transition-all shadow-inner">
          <Search className="w-4 h-4 text-slate-400 dark:text-white/40" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none text-sm font-semibold ml-3 w-full text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-white/40"
          />
          <div className="flex items-center gap-1 opacity-60">
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/10 rounded text-slate-500 dark:text-white/50 shadow-sm">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/10 rounded text-slate-500 dark:text-white/50 shadow-sm">K</kbd>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-white/60 bg-slate-100 dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 transition-colors duration-300">
          <Clock className="w-4 h-4 text-primary" />
          {currentDate}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="relative p-2.5 rounded-xl text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Quick Actions */}
          <button onClick={() => toast("No new messages at this time.", "info")} className="relative p-2.5 rounded-xl text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(245,158,11,0.6)]"></span>
          </button>
          
          <button onClick={() => toast("You're all caught up! No new notifications.", "info")} className="relative p-2.5 rounded-xl text-slate-500 dark:text-white/50 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)] border border-white dark:border-[#0A0E39]"></span>
          </button>

          
          <div className="flex items-center gap-3 pl-2 cursor-pointer group hover:bg-slate-100 dark:hover:bg-white/10 p-1.5 rounded-2xl transition-colors border border-transparent dark:hover:border-white/10">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-none group-hover:text-primary transition-colors tracking-wide">{adminName}</p>
              <p className="text-xs font-semibold text-slate-500 dark:text-white/50 mt-1">Admin</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/10 p-0.5 group-hover:shadow group-hover:bg-slate-300 dark:group-hover:bg-white/20 transition-all group-hover:scale-105">
                <div className="w-full h-full rounded-[10px] bg-black overflow-hidden flex items-center justify-center">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(adminName)}&background=000&color=fff&bold=true`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
