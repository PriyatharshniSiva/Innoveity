"use client";

import React from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

export default function ActivityLog() {
  const activities = [
    { title: "New course added", time: "2 hours ago", type: "course", details: "Added 'Advanced Web Development'" },
    { title: "User signed up", time: "5 hours ago", type: "user", details: "john.doe@example.com created an account" },
    { title: "Article updated", time: "1 day ago", type: "article", details: "Updated 'Future of AI'" },
    { title: "New case study published", time: "2 days ago", type: "case", details: "Published 'TechCorp Migration'" },
    { title: "Global Settings changed", time: "3 days ago", type: "system", details: "Updated WhatsApp contact number" },
    { title: "Course deleted", time: "4 days ago", type: "course", details: "Removed 'Intro to Basic HTML'" },
    { title: "Admin Login", time: "5 days ago", type: "system", details: "Successful login from IP 192.168.1.1" },
    { title: "New Article drafted", time: "1 week ago", type: "article", details: "Drafted 'Design Systems 101'" },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Activity Log</h1>
          <p className="text-slate-500 mt-2">A complete history of all actions performed on the platform.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {activities.map((activity, i) => (
            <div key={i} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#185D46]" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-800">{activity.title}</p>
                <p className="text-sm text-slate-500 mt-1">{activity.details}</p>
                <p className="text-xs font-semibold text-[#185D46] mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 text-center">
          <p className="text-sm text-slate-500">You've reached the end of the recent activity log.</p>
        </div>
      </div>
    </div>
  );
}
