"use client";

import React from "react";
import { useContact } from "./ContactState";
import { Eye, Search, Filter } from "lucide-react";

export default function ContactEnquiriesTable() {
  const { enquiries, openDrawer } = useContact();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Recent Enquiries</h3>
        <div className="flex gap-2">
          <button className="p-2 bg-white text-slate-500 rounded-lg border border-slate-200 hover:text-slate-800 shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46]" />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Inquiry Type</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-800">{enq.name}</div>
                  <div className="text-xs text-slate-400">{enq.email}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold capitalize">
                    {enq.type.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4">{enq.date}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    enq.status === 'Unread' ? 'bg-red-100 text-red-600' :
                    enq.status === 'Read' ? 'bg-blue-100 text-blue-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {enq.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => openDrawer("enquiry", enq.id)} className="p-1.5 text-slate-400 hover:text-[#185D46] hover:bg-[#185D46]/10 rounded-lg transition-colors inline-flex">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
