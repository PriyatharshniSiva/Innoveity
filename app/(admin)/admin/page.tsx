"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, BookOpen, GraduationCap, Briefcase, Heart, MessageSquare, Mail, 
  TrendingUp, Plus, Image as ImageIcon, FileText, HelpCircle, ArrowRight,
  Monitor, Smartphone, Tablet, Activity
} from "lucide-react";
import Link from "next/link";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useAdminTheme } from "@/components/Admin/AdminThemeProvider";

// --- REALISTIC MOCK DATA ---
const trafficData = [
  { name: 'Jan', visitors: 4000, enquiries: 240 },
  { name: 'Feb', visitors: 4200, enquiries: 139 },
  { name: 'Mar', visitors: 5000, enquiries: 380 },
  { name: 'Apr', visitors: 4780, enquiries: 390 },
  { name: 'May', visitors: 5890, enquiries: 480 },
  { name: 'Jun', visitors: 6390, enquiries: 580 },
  { name: 'Jul', visitors: 7490, enquiries: 630 },
];

const sourceData = [
  { name: 'Organic Search', value: 45 },
  { name: 'Direct Traffic', value: 30 },
  { name: 'Social Media', value: 15 },
  { name: 'Referrals', value: 10 },
];

const deviceData = [
  { name: 'Desktop', icon: Monitor, value: 65 },
  { name: 'Mobile', icon: Smartphone, value: 30 },
  { name: 'Tablet', icon: Tablet, value: 5 },
];

const recentActivity = [
  { title: "New CSR Initiative added", time: "2 hours ago", icon: Heart },
  { title: "5 new student inquiries", time: "4 hours ago", icon: Mail },
  { title: "Updated Home Page Gallery", time: "Yesterday", icon: ImageIcon },
  { title: "New Case Study published", time: "2 days ago", icon: Briefcase },
];

const StatCard = ({ title, value, increase, icon: Icon, delay, isPrimary }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`rounded-3xl p-6 transition-all group relative overflow-hidden ${
      isPrimary 
        ? 'bg-[#185D46] dark:bg-white text-white dark:text-black shadow-[0_8px_30px_rgba(24,93,70,0.3)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_rgba(24,93,70,0.4)] dark:hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]' 
        : 'bg-white dark:bg-[#0a0a0a] text-slate-800 dark:text-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 hover:shadow-[0_20px_40px_rgba(24,93,70,0.08)] dark:hover:border-white/20'
    }`}
  >
    {isPrimary && (
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-black/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
    )}
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className={`text-sm font-bold ${isPrimary ? 'text-emerald-100 dark:text-neutral-500' : 'text-slate-500 dark:text-neutral-400'}`}>{title}</p>
        <h3 className={`text-3xl font-sans font-black mt-2 tracking-tight ${isPrimary ? 'text-white dark:text-black' : 'text-slate-800 dark:text-white'}`}>{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${
        isPrimary ? 'bg-white/10 dark:bg-black/5 text-white dark:text-black' : 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-white group-hover:bg-[#185D46]/10 dark:group-hover:bg-white group-hover:text-[#185D46] dark:group-hover:text-black'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 relative z-10">
      <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${
        isPrimary ? 'bg-white/20 dark:bg-black/10 text-white dark:text-black' : 'text-emerald-600 dark:text-white bg-emerald-50 dark:bg-white/10'
      }`}>
        <TrendingUp className="w-3 h-3" /> {increase}
      </span>
      <span className={`text-xs font-medium ${isPrimary ? 'text-emerald-100 dark:text-neutral-500' : 'text-slate-400 dark:text-neutral-500'}`}>vs last month</span>
    </div>
  </motion.div>
);

const QuickAction = ({ title, icon: Icon, href }: any) => (
  <Link href={href} className="group block">
    <div className="bg-white dark:bg-[#0a0a0a] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:border-[#185D46]/20 dark:hover:border-white/30 transition-all flex flex-col items-center justify-center text-center gap-3 h-[140px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-bl-[100px] group-hover:scale-150 transition-transform duration-500 -z-0" />
      <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center transition-colors relative z-10 bg-slate-50 text-slate-400 group-hover:bg-[#185D46]/10 group-hover:text-[#185D46] dark:bg-white/5 dark:text-neutral-300 dark:group-hover:bg-white dark:group-hover:text-black`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm font-extrabold text-slate-700 dark:text-neutral-400 group-hover:text-[#185D46] dark:group-hover:text-white transition-colors relative z-10">{title}</span>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const { theme } = useAdminTheme();
  
  const isDark = theme === 'dark';
  const color1 = isDark ? '#ffffff' : '#185D46';
  const color2 = isDark ? '#a3a3a3' : '#F59E0B';
  const PIE_COLORS = isDark 
    ? ['#ffffff', '#a3a3a3', '#525252', '#262626']
    : ['#185D46', '#F59E0B', '#3b82f6', '#10b981'];

  return (
    <div className="space-y-8">
      
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Visitors" value="0" increase="0%" icon={Users} delay={0.1} isPrimary />
        <StatCard title="New Enquiries" value="0" increase="0%" icon={Mail} delay={0.2} />
        <StatCard title="Active CSR" value="0" increase="0%" icon={Heart} delay={0.3} />
        <StatCard title="Case Studies" value="0" increase="0%" icon={Briefcase} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Large Analytics Chart */}
        <div className="xl:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 transition-colors duration-300"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-black text-slate-800 dark:text-white">Traffic & Enquiries</h2>
                <p className="text-sm font-semibold text-slate-400 dark:text-neutral-500 mt-1 tracking-wide">Monthly unique visitors and submissions.</p>
              </div>
              <select className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#185D46]/20 dark:focus:ring-white/20 cursor-pointer shadow-sm transition-colors duration-300">
                <option className="dark:bg-[#0a0a0a] dark:text-white">Last 7 Months</option>
                <option className="dark:bg-[#0a0a0a] dark:text-white">This Year</option>
              </select>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color1} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={color1} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color2} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={color2} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#262626" : "#f1f5f9"} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDark ? '#737373' : '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? '#737373' : '#94a3b8', fontSize: 12, fontWeight: 700}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#0a0a0a' : '#fff', 
                      borderColor: isDark ? '#262626' : '#f1f5f9', 
                      borderRadius: '16px', 
                      boxShadow: isDark ? '0 20px 40px -10px rgba(0, 0, 0, 0.5)' : '0 20px 40px -10px rgba(0, 0, 0, 0.15)', 
                      fontWeight: 'bold', 
                      color: isDark ? '#fff' : '#0f172a' 
                    }}
                    itemStyle={{ fontWeight: 700 }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke={color1} strokeWidth={4} fillOpacity={1} fill="url(#colorVisitors)" />
                  <Area type="monotone" dataKey="enquiries" stroke={color2} strokeWidth={4} fillOpacity={1} fill="url(#colorEnquiries)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Actions Row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="text-lg font-black text-slate-800 dark:text-white mb-4 px-2 uppercase tracking-widest">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <QuickAction title="New Service" icon={Briefcase} href="/admin/services" />
              <QuickAction title="Upload Gallery" icon={ImageIcon} href="/admin/gallery" />
              <QuickAction title="Add Article" icon={BookOpen} href="/admin/knowledge-hub" />
              <QuickAction title="Update CSR" icon={Heart} href="/admin/csr" />
              <QuickAction title="Reply Messages" icon={Mail} href="/admin/messages" />
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Traffic Sources Pie */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 transition-colors duration-300"
          >
            <h2 className="text-xl font-black text-slate-800 dark:text-white mb-6">Traffic Sources</h2>
            <div className="h-[200px] w-full flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-black text-slate-800 dark:text-white">100%</span>
                <span className="text-xs font-bold text-slate-400 dark:text-neutral-500">Total Traffic</span>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: isDark ? '#0a0a0a' : '#fff', borderColor: isDark ? '#262626' : '#f1f5f9', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)', fontWeight: 'bold', color: isDark ? '#fff' : '#0f172a' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {sourceData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }} />
                  <span className="text-xs font-bold text-slate-600 dark:text-neutral-400">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 relative overflow-hidden transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 dark:bg-white/5 rounded-bl-[100px] -z-10 transition-colors duration-300" />
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-800 dark:text-white">Recent Activity</h2>
              <Link href="/admin/activity" className="text-sm font-bold text-[#185D46] dark:text-neutral-400 hover:text-[#0f3d2e] dark:hover:text-white flex items-center gap-1 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100 dark:before:bg-white/10">
              {recentActivity.map((activity: any, i: number) => (
                <div key={i} className="relative flex items-center gap-4 group">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl border-[3px] border-white dark:border-[#0a0a0a] bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-neutral-300 shadow-sm shrink-0 z-10 transition-colors group-hover:bg-[#185D46] group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:scale-110`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 bg-slate-50/50 dark:bg-white/5 p-4 rounded-[20px] border border-slate-100 dark:border-white/5 group-hover:border-[#185D46]/20 dark:group-hover:border-white/20 transition-colors">
                    <h3 className="font-bold text-slate-800 dark:text-neutral-200 text-sm mb-1">{activity.title}</h3>
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-neutral-500">
                      <Activity className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
