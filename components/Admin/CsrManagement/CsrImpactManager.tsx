"use client";

import React from "react";
import { BarChart as LucideBarChart, UploadCloud, Edit2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useCsr } from "./CsrState";

export default function CsrImpactManager() {
  const { chartData, openDrawer } = useCsr();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Impact Over Time Chart</h3>
        <button onClick={() => openDrawer("chart")} className="text-sm font-bold text-blue-500 hover:text-blue-700 flex items-center">
          <Edit2 className="w-4 h-4 mr-1" /> Edit Data
        </button>
      </div>
      <div className="p-6 h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} />
            <Tooltip
              cursor={{ fill: '#F1F5F9' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />
            <Bar dataKey="co2Value" name="CO2 Reduction (Tons)" fill="#185D46" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="jobsValue" name="Jobs Created" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
