"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Home, Info, Briefcase, FileText, BookOpen, GraduationCap, 
  Heart, Mail, Image as ImageIcon, MessageSquare, HelpCircle, BarChart2, 
  Send, Users, Shield, HardDrive, Activity, Settings, User, LogOut,
  ChevronLeft, ChevronRight, Search
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("admin@innoveity.com");
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedName) setAdminName(storedName);
    if (storedEmail) setAdminEmail(storedEmail);
  }, []);

  const menuGroups = [

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
        { name: "Contact", href: "/admin/contact", icon: Mail },
        { name: "SEO Management", href: "/admin/seo", icon: Search },
        { name: "Theme Settings", href: "/admin/theme-settings", icon: Settings },
      ]
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push('/admin/login');
      router.refresh(); // Ensure state is cleared on the client
    }
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="bg-white dark:bg-[#0A0E39]/80 backdrop-blur-xl text-slate-800 dark:text-white flex flex-col h-screen sticky top-0 shadow-2xl z-50 border-r border-slate-200 dark:border-white/10 shrink-0 transition-colors duration-300"
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-200 dark:border-white/10 justify-between shrink-0 transition-colors duration-300">
        <div className="flex items-center transition-all duration-300">
          <div className="h-[44px] flex items-center justify-center shrink-0">
            <img src="/iinvlogo.png" alt="Logo Icon" className="w-auto h-full object-contain scale-[1.3]" />
          </div>
          {!isCollapsed && (
            <div className="h-[44px] flex items-center justify-center shrink-0 -ml-4">
              <img src="/innvlog2.png" alt="INNOVEITY Text" className="w-auto h-full object-contain scale-[1.8] origin-left" />
            </div>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 dark:text-white/50 hover:text-primary dark:hover:text-primary transition-colors shrink-0"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 space-y-8 hide-scrollbar">
        {menuGroups.map((group, i) => (
          <div key={i} className="px-4">
            {!isCollapsed && (
              <p className="text-[10px] font-extrabold text-slate-500 dark:text-white/40 uppercase tracking-widest mb-3 px-3 transition-colors duration-300">
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
                        ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-white font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)]' 
                        : 'hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white text-slate-600 dark:text-white/60 font-medium'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 w-[3px] h-6 bg-primary rounded-r-full transition-colors duration-300"
                      />
                    )}
                    <item.icon className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-white/40 group-hover:text-primary'}`} />
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
      <div className="p-4 border-t border-slate-200 dark:border-white/10 shrink-0 bg-slate-50 dark:bg-white/5 transition-colors duration-300">
        <Link 
          href="/admin/profile" 
          className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 hover:shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all ${isCollapsed ? 'justify-center' : ''}`}
        >
          <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 transition-colors duration-300">
            <User className="w-4 h-4 text-primary transition-colors duration-300" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate transition-colors duration-300">{adminName}</p>
              <p className="text-xs text-slate-500 dark:text-white/50 truncate font-medium transition-colors duration-300">{adminEmail}</p>
            </div>
          )}
        </Link>
        <button 
          onClick={handleLogout}
          className={`mt-2 flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-400 text-slate-500 dark:text-white/50 transition-colors group font-medium ${isCollapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 shrink-0 text-slate-400 dark:text-white/40 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap tracking-wide">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}
