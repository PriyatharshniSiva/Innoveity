"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Save, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    quote: "", author: ""
  });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNewDrawer = () => {
    setEditingId(null);
    setFormData({ quote: "", author: "" });
    setIsDrawerOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      quote: item.quote,
      author: item.author
    });
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
      const method = editingId ? "PUT" : "POST";
      
      const payload = {
        quote: formData.quote,
        author: formData.author,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsDrawerOpen(false);
        setEditingId(null);
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 relative animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white transition-colors duration-300">Client Feedback</h1>
          <p className="text-slate-500 dark:text-neutral-400 mt-2 transition-colors duration-300">Manage all your client testimonials in one place.</p>
        </div>
        <button 
          onClick={openNewDrawer}
          className="flex items-center gap-2 bg-[#185D46] dark:bg-white hover:bg-[#124634] dark:hover:bg-neutral-200 text-white dark:text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#185D46]/20 dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
        >
          <Plus className="w-5 h-5" />
          Add Feedback
        </button>
      </div>

      <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-slate-100 dark:border-white/5 overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 transition-colors duration-300">
          <div className="relative w-96">
            <Search className="w-5 h-5 text-slate-400 dark:text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search feedback..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 dark:focus:ring-white/20 focus:border-[#185D46] dark:focus:border-white transition-all placeholder-slate-400 dark:placeholder-neutral-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/5 text-slate-500 dark:text-neutral-400 text-xs uppercase tracking-wider bg-slate-50 dark:bg-[#050505] transition-colors duration-300">
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold w-1/2">Quote</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 dark:text-neutral-500">Loading feedback...</td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-400 dark:text-neutral-500">No client feedback found.</td>
                </tr>
              ) : (
                testimonials.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 dark:text-neutral-200 line-clamp-1">{item.author}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-500 dark:text-neutral-400 line-clamp-2">"{item.quote}"</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="p-2 rounded-lg text-slate-400 dark:text-neutral-500 hover:text-[#185D46] dark:hover:text-white hover:bg-[#185D46]/10 dark:hover:bg-white/10 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-slate-400 dark:text-neutral-500 hover:text-rose-600 dark:hover:text-red-400 hover:bg-rose-50 dark:hover:bg-red-500/10 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side Drawer for Add/Edit */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-[#0a0a0a] shadow-[-10px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[-10px_0_40px_rgba(0,0,0,0.5)] z-50 flex flex-col border-l border-slate-100 dark:border-white/10"
            >
              <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {editingId ? "Edit Feedback" : "Add Feedback"}
                </h2>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-neutral-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 dark:text-neutral-300">Client / Author Name</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="e.g. John Doe, CEO of Example Corp" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#185D46]/30 dark:focus:ring-white/20 transition-all" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 dark:text-neutral-300">Feedback Quote</label>
                  <textarea rows={5} value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} placeholder="Write the testimonial here..." className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#185D46]/30 dark:focus:ring-white/20 transition-all resize-none"></textarea>
                </div>

              </div>

              <div className="p-6 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-500 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-[#185D46] dark:bg-white text-white dark:text-black hover:bg-[#124634] dark:hover:bg-neutral-200 transition-colors shadow-lg shadow-[#185D46]/20 dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : "Save Feedback"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
