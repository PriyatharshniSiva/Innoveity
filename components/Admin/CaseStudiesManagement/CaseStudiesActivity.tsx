"use client";

import React from "react";
import { Clock, CheckCircle2, Video, Edit3, Image as ImageIcon } from "lucide-react";

export default function CaseStudiesActivity() {
  const activities = [
    {
      id: 1,
      type: "published",
      message: 'Published "Corporate L&D Overhaul at Tech Mahindra"',
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-[#185D46]",
      bg: "bg-primary/10"
    },
    {
      id: 2,
      type: "video",
      message: 'Uploaded new video to "ESG Compliance"',
      time: "4 hours ago",
      icon: Video,
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      id: 3,
      type: "edit",
      message: 'Updated statistics for "Anna University"',
      time: "Yesterday, 2:30 PM",
      icon: Edit3,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      id: 4,
      type: "image",
      message: 'Added 3 gallery images to "Tech Mahindra"',
      time: "Yesterday, 10:15 AM",
      icon: ImageIcon,
      color: "text-amber-500",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-slate-400" />
        <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
      </div>
      
      <div className="space-y-6">
        {activities.map((activity, idx) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start relative">
              {idx !== activities.length - 1 && (
                <div className="absolute top-10 left-5 w-0.5 h-full bg-slate-100 -ml-px" />
              )}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${activity.bg}`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              <div className="ml-4 pt-2">
                <p className="text-sm font-semibold text-slate-700">{activity.message}</p>
                <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
