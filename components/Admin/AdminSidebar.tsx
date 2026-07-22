"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Home, Info, Briefcase, FileText, BookOpen, GraduationCap, 
  Heart, Mail, Image as ImageIcon, MessageSquare, HelpCircle, BarChart2, 
  Send, Users, Shield, HardDrive, Activity, Settings, User, LogOut,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard }
      ]
    },
    {
      title: "Website Management",
      items: [
        { name: "Home", href: "/admin/home", icon: Home },
        { name: "About Us", href: "/admin/about", icon: Info },
        { name: "Services", href: "/admin/services", icon: Briefcase },
        { name: "Case Studies", href: "/admin/case-studies", icon: FileText },
        { name: "Knowledge Hub", href: "/admin/knowledge-hub", icon: BookOpen },
        { name: "Our Courses", href: "/admin/courses", icon: GraduationCap },
        { name: "CSR", href: "/admin/csr", icon: Heart },
        { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
        { name: "Contact", href: "/admin/contact", icon: Mail },
        { name: "Theme Settings", href: "/admin/theme-settings", icon: Settings },
      ]
    },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-white dark:bg-[#050505] text-slate-800 dark:text-neutral-300 flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-50 border-r border-slate-100 dark:border-white/5 shrink-0 transition-colors duration-300"
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-white/5 justify-between shrink-0 transition-colors duration-300">
        <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'} transition-all duration-300`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#185D46] to-[#0f3d2e] dark:from-white dark:to-white flex items-center justify-center shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0 transition-all duration-300">
            <span className="text-white dark:text-black font-black text-lg transition-colors duration-300">I</span>
          </div>
          <span className="text-slate-800 dark:text-white font-bold text-lg tracking-tight whitespace-nowrap transition-colors duration-300">Admin<span className="text-[#185D46] dark:text-neutral-500 transition-colors duration-300">Panel</span></span>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 dark:text-neutral-500 hover:text-[#185D46] dark:hover:text-white transition-colors shrink-0"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 space-y-8 hide-scrollbar">
        {menuGroups.map((group, i) => (
          <div key={i} className="px-4">
            {!isCollapsed && (
              <p className="text-[10px] font-extrabold text-slate-400 dark:text-neutral-600 uppercase tracking-widest mb-3 px-3 transition-colors duration-300">
                {group.title}
              </p>
            )}
            <nav className="space-y-1">
              {group.items.map((item, j) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link 
                    key={j} 
                    href={item.href} 
                    title={isCollapsed ? item.name : ""}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                      isActive 
                        ? 'bg-primary/5 dark:bg-white text-[#185D46] dark:text-black font-bold dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                        : 'hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#0F172A] dark:hover:text-white text-slate-500 dark:text-neutral-400 font-medium'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 w-[3px] h-6 bg-[#185D46] dark:bg-black rounded-r-full transition-colors duration-300"
                      />
                    )}
                    <item.icon className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#185D46] dark:text-black' : 'text-slate-400 dark:text-neutral-500 group-hover:text-[#F59E0B] dark:group-hover:text-white'}`} />
                    {!isCollapsed && (
                      <span className="text-sm whitespace-nowrap tracking-wide">{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom Profile */}
      <div className="p-4 border-t border-slate-100 dark:border-white/5 shrink-0 bg-slate-50/50 dark:bg-white/[0.02] transition-colors duration-300">
        <Link 
          href="/admin/profile" 
          className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white dark:hover:bg-white/5 hover:shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-transparent transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-white flex items-center justify-center shrink-0 transition-colors duration-300">
            <User className="w-4 h-4 text-[#185D46] dark:text-black transition-colors duration-300" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate transition-colors duration-300">Superadmin</p>
              <p className="text-xs text-slate-500 dark:text-neutral-500 truncate font-medium transition-colors duration-300">admin@innoveity.com</p>
            </div>
          )}
        </Link>
        <button 
          className={`mt-2 flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-rose-50 dark:hover:bg-red-500/10 hover:text-rose-600 dark:hover:text-red-500 text-slate-500 dark:text-neutral-500 transition-colors group font-medium ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 shrink-0 text-slate-400 dark:text-neutral-600 group-hover:text-rose-500 dark:group-hover:text-red-500 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap tracking-wide">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
