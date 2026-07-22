"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContact, OfficeItem, EnquiryItem, ContactSettings } from "./ContactState";
import { X, Save, Mail, Phone, Calendar, Building, MapPin } from "lucide-react";

export default function ContactSideDrawer() {
  const { isDrawerOpen, closeDrawer, editingType, editingId, offices, setOffices, enquiries, setEnquiries, settings, setSettings } = useContact();
  
  const [officeData, setOfficeData] = useState<Partial<OfficeItem>>({});
  const [enquiryData, setEnquiryData] = useState<EnquiryItem | null>(null);
  const [settingsData, setSettingsData] = useState<ContactSettings>(settings);

  useEffect(() => {
    if (editingType === "office") {
      if (editingId) {
        setOfficeData(offices.find(o => o.id === editingId) || {});
      } else {
        setOfficeData({ name: "", address: "", city: "", pincode: "", branchType: "Branch", color: "#3b82f6" });
      }
    } else if (editingType === "enquiry" && editingId) {
      const enq = enquiries.find(e => e.id === editingId);
      if (enq) {
        setEnquiryData(enq);
        if (enq.status === "Unread") {
          // Auto mark as read
          setEnquiries(prev => prev.map(e => e.id === editingId ? { ...e, status: "Read" } : e));
        }
      }
    } else if (editingType === "settings") {
      setSettingsData(settings);
    }
  }, [editingType, editingId, offices, enquiries, settings, setEnquiries]);

  const handleOfficeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOfficeData(prev => ({ ...prev, [name]: value }));
    
    if (editingId) {
      setOffices(prev => prev.map(o => o.id === editingId ? { ...o, [name]: value } as OfficeItem : o));
    }
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettingsData(prev => ({ ...prev, [name]: value }));
    // Immediately update context for live preview
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingType === "office" && !editingId) {
      const newOffice = { ...officeData, id: Math.random().toString(36).substr(2, 9), order: offices.length + 1 } as OfficeItem;
      setOffices([...offices, newOffice]);
    }
    // settings are auto-saved via context
    closeDrawer();
  };

  const getTitle = () => {
    if (editingType === "office") return editingId ? "Edit Office" : "Add Office Location";
    if (editingType === "enquiry") return "View Enquiry";
    if (editingType === "settings") return "General Settings";
    return "";
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div key="drawer-overlay-wrapper" className="fixed inset-0 z-50 flex justify-end">
          <motion.div 
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div 
            key="drawer-content"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">{getTitle()}</h2>
              <button onClick={closeDrawer} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              
              {editingType === "office" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Office Name</label>
                    <input type="text" name="name" value={officeData.name || ""} onChange={handleOfficeChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Branch Type</label>
                      <select name="branchType" value={officeData.branchType || "Branch"} onChange={handleOfficeChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all bg-white">
                        <option value="Headquarters">Headquarters</option>
                        <option value="Branch">Branch</option>
                        <option value="Research">Research Center</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Accent Color</label>
                      <input type="color" name="color" value={officeData.color || "var(--color-primary)"} onChange={handleOfficeChange} className="w-full h-12 rounded-xl border border-slate-200 cursor-pointer p-1" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Address</label>
                    <textarea name="address" value={officeData.address || ""} onChange={handleOfficeChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                      <input type="text" name="city" value={officeData.city || ""} onChange={handleOfficeChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                      <input type="text" name="pincode" value={officeData.pincode || ""} onChange={handleOfficeChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                    </div>
                  </div>
                </>
              )}

              {editingType === "settings" && (
                <>
                  <div className="space-y-4">
                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Phone Numbers</h3>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Phone (Displayed everywhere)</label>
                      <input type="text" name="phonePrimary" value={settingsData.phonePrimary} onChange={handleSettingsChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Email Addresses</h3>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Email</label>
                      <input type="email" name="emailPrimary" value={settingsData.emailPrimary} onChange={handleSettingsChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Secondary / Support Email</label>
                      <input type="email" name="emailSecondary" value={settingsData.emailSecondary} onChange={handleSettingsChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Business Hours</h3>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Weekday Hours</label>
                      <input type="text" name="hoursWeekday" value={settingsData.hoursWeekday} onChange={handleSettingsChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Weekend Hours</label>
                      <input type="text" name="hoursWeekend" value={settingsData.hoursWeekend} onChange={handleSettingsChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#185D46] transition-all" />
                    </div>
                  </div>
                </>
              )}

              {editingType === "enquiry" && enquiryData && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg text-slate-400 shadow-sm"><Building className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Organization</p>
                        <p className="font-bold text-slate-800">{enquiryData.organization || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg text-slate-400 shadow-sm"><Mail className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email Address</p>
                        <p className="font-bold text-slate-800">{enquiryData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg text-slate-400 shadow-sm"><Phone className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Phone Number</p>
                        <p className="font-bold text-slate-800">{enquiryData.phone || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-white p-2 rounded-lg text-slate-400 shadow-sm"><Calendar className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Submitted On</p>
                        <p className="font-bold text-slate-800">{enquiryData.date}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-2">Message Content</h3>
                    <div className="bg-white border border-slate-200 p-4 rounded-xl text-slate-600 leading-relaxed text-sm">
                      We are interested in partnering with INNOVEITY for our upcoming faculty development program. Please provide more details about your corporate training modules.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {(editingType === "office" || editingType === "settings") && (
              <div className="p-6 border-t border-slate-100 bg-white">
                <button 
                  onClick={handleSave}
                  className="w-full py-3.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] hover:shadow-[0_6px_20px_rgba(24,93,70,0.23)] transition-all flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
            
            {editingType === "enquiry" && (
              <div className="p-6 border-t border-slate-100 bg-white grid grid-cols-2 gap-3">
                <a href={`mailto:${enquiryData?.email}`} className="w-full py-3.5 bg-[#185D46] hover:bg-[#154d3a] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(24,93,70,0.39)] transition-all flex items-center justify-center">
                  Reply Email
                </a>
                <button onClick={closeDrawer} className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all flex items-center justify-center">
                  Close View
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
