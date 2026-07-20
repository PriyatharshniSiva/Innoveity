"use client";

import React from "react";
import { useContact } from "./ContactState";
import { Phone, Mail, Clock, MapPin, Building, User, ChevronDown } from "lucide-react";

export default function ContactLivePreview() {
  const { offices, settings } = useContact();

  return (
    <div className="bg-slate-50 h-[800px] rounded-3xl border-4 border-slate-200 overflow-y-auto custom-scrollbar relative shadow-2xl">


      <div className="origin-top scale-[0.8] w-[125%] mb-[-20%] selection:bg-[#185D46] selection:text-white pb-20">
        
        {/* Header Preview */}
        <section className="relative py-20 px-4 overflow-hidden bg-white border-b border-slate-100 text-center">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#185D4620] rounded-full blur-[100px] opacity-70 -z-10 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#f9731620] rounded-full blur-[100px] opacity-70 -z-10 -translate-x-1/3 translate-y-1/3" />
          
          <h1 className="text-4xl sm:text-[56px] font-black text-[#0F172A] tracking-tight mb-6 leading-[1.1]">
            Corporate Training & College Development<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#185D46] to-[#185D46]">Chennai Tamil Nadu</span>
          </h1>
          <p className="text-[#475569] text-[19px] max-w-3xl mx-auto font-medium">
            Transform your institution with INNOVEITY's proven solutions. Contact us for a free consultation.
          </p>
        </section>

        {/* Form and Contact Info */}
        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          
          {/* Mock Form */}
          <div className="lg:col-span-3 bg-white p-8 md:p-12 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-3xl font-black text-[#0F172A] mb-2">Get Free Consultation</h2>
            <p className="text-gray-500 mb-10 font-medium">We usually respond within 24 hours.</p>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <User className="w-5 h-5 absolute left-4 top-[18px] text-gray-400" />
                  <input type="text" placeholder="Full Name *" disabled className="w-full bg-slate-50 border-2 border-transparent rounded-[16px] py-4 pl-12 pr-5 placeholder:text-gray-400 text-sm font-semibold" />
                </div>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-4 top-[18px] text-gray-400" />
                  <input type="email" placeholder="Email *" disabled className="w-full bg-slate-50 border-2 border-transparent rounded-[16px] py-4 pl-12 pr-5 placeholder:text-gray-400 text-sm font-semibold" />
                </div>
              </div>
              <div className="relative">
                <select disabled className="w-full bg-slate-50 border-2 border-transparent rounded-[16px] py-4 px-5 text-gray-400 text-sm font-semibold appearance-none">
                  <option>Inquiry Type *</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-[18px] text-gray-400" />
              </div>
              <textarea rows={4} placeholder="Message *" disabled className="w-full bg-slate-50 border-2 border-transparent rounded-[20px] py-4 px-5 placeholder:text-gray-400 text-sm font-semibold resize-none"></textarea>
              <button disabled className="w-full bg-[#185D46] text-white font-black text-[17px] py-5 rounded-[20px] shadow-[0_8px_20px_rgba(22,163,74,0.2)]">Submit Request</button>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white p-7 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-6">
              <div className="bg-[#185D46]/10 p-4 rounded-[16px] text-[#185D46]">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</h3>
                <p className="text-xl font-black text-[#0F172A]">{settings.phonePrimary}</p>
              </div>
            </div>
            
            <div className="bg-white p-7 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-6">
              <div className="bg-[#f97316]/10 p-4 rounded-[16px] text-[#f97316]">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</h3>
                <p className="text-[17px] font-bold text-[#0F172A] mb-0.5">{settings.emailPrimary}</p>
                <p className="text-[17px] font-bold text-[#0F172A]">{settings.emailSecondary}</p>
              </div>
            </div>

            <div className="bg-white p-7 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 flex items-center gap-6">
              <div className="bg-[#185D46]/10 p-4 rounded-[16px] text-[#185D46]">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Working Hours</h3>
                <p className="text-[16px] font-bold text-[#0F172A] mb-0.5">{settings.hoursWeekday}</p>
                <p className="text-[16px] font-bold text-[#0F172A]">{settings.hoursWeekend}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map Mock */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-white p-4 rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-slate-100 relative h-[450px]">
            <div className="w-full h-full bg-slate-200 rounded-[32px] overflow-hidden relative flex items-center justify-center">
              <span className="text-slate-400 font-bold bg-white px-4 py-2 rounded-xl">Map Preview</span>
            </div>
          </div>
        </section>

        {/* Office Locations Mock */}
        <section className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {offices.map(office => (
            <div key={office.id} className="bg-white p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-slate-100 border-t-4 transition-all" style={{ borderTopColor: office.color }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${office.color}15`, color: office.color }}>
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-[#0F172A] mb-2 flex items-center gap-2">
                {office.name} <span className="w-2 h-2 rounded-full" style={{ backgroundColor: office.color }}></span>
              </h3>
              <div className="text-gray-500 font-medium space-y-1 mb-4 whitespace-pre-line">
                {office.address}
                <p>{office.city} {office.pincode ? `- ${office.pincode}` : ''}</p>
              </div>
              <p className="font-bold text-sm tracking-wide uppercase mt-6" style={{ color: office.color }}>{office.branchType}</p>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
