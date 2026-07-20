"use client";

import React, { useState } from "react";
import { Save, Phone, Mail, MapPin, Globe } from "lucide-react";

export default function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    whatsapp: "+91 9876543210",
    email: "contact@innoveity.com",
    phone: "+91 1234567890",
    address: "123 Innovation Drive, Tech Park",
    siteTitle: "INNOVEITY",
    siteDescription: "Empowering businesses through cutting-edge technology and design."
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call for now since there's no Settings table
    setTimeout(() => {
      setIsSaving(false);
      alert("Settings saved successfully! (Note: Database integration pending)");
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Global Settings</h1>
          <p className="text-slate-500 mt-2">Manage your website's contact info, links, and general configuration.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Contact Information</h2>
            <p className="text-sm text-slate-500 mt-1">These details power your floating contact widget and footer.</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> WhatsApp Number
                </label>
                <input 
                  type="text" 
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" /> Phone Number
                </label>
                <input 
                  type="text" 
                  value={settings.phone}
                  onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" /> Support Email
                </label>
                <input 
                  type="email" 
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" /> Office Address
                </label>
                <input 
                  type="text" 
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">SEO & Identity</h2>
            <p className="text-sm text-slate-500 mt-1">Manage how your site appears on search engines.</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" /> Site Title
              </label>
              <input 
                type="text" 
                value={settings.siteTitle}
                onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Description</label>
              <textarea 
                rows={4}
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all" 
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#185D46] hover:bg-[#124634] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-[#185D46]/20 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving Settings..." : "Save All Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
