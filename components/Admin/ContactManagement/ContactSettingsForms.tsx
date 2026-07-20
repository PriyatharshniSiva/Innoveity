"use client";

import React from "react";
import { useContact } from "./ContactState";
import { Settings, Phone, Mail, Clock, Map } from "lucide-react";

export default function ContactSettingsForms() {
  const { openDrawer } = useContact();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-800">Quick Settings</h3>
        <button onClick={() => openDrawer("settings")} className="text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center">
          <Settings className="w-4 h-4 mr-1" /> View All Settings
        </button>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="border border-slate-100 rounded-xl p-4 flex items-start gap-4 hover:border-[#185D46]/30 transition-colors cursor-pointer group" onClick={() => openDrawer("settings")}>
          <div className="bg-slate-50 p-3 rounded-lg text-slate-400 group-hover:text-[#185D46] transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Phone Numbers</h4>
            <p className="text-sm text-slate-500">Manage primary and secondary contact numbers.</p>
          </div>
        </div>

        <div className="border border-slate-100 rounded-xl p-4 flex items-start gap-4 hover:border-[#f97316]/30 transition-colors cursor-pointer group" onClick={() => openDrawer("settings")}>
          <div className="bg-slate-50 p-3 rounded-lg text-slate-400 group-hover:text-[#f97316] transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Email Addresses</h4>
            <p className="text-sm text-slate-500">Manage support and admin email addresses.</p>
          </div>
        </div>

        <div className="border border-slate-100 rounded-xl p-4 flex items-start gap-4 hover:border-[#185D46]/30 transition-colors cursor-pointer group" onClick={() => openDrawer("settings")}>
          <div className="bg-slate-50 p-3 rounded-lg text-slate-400 group-hover:text-[#185D46] transition-colors">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Working Hours</h4>
            <p className="text-sm text-slate-500">Set business hours for weekdays and weekends.</p>
          </div>
        </div>

        <div className="border border-slate-100 rounded-xl p-4 flex items-start gap-4 hover:border-blue-500/30 transition-colors cursor-pointer group" onClick={() => openDrawer("settings")}>
          <div className="bg-slate-50 p-3 rounded-lg text-slate-400 group-hover:text-blue-500 transition-colors">
            <Map className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Map Settings</h4>
            <p className="text-sm text-slate-500">Update Google Maps embed URL and coordinates.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
