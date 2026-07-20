"use client";

import React, { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", desc: "", image: "", level: "Beginner", duration: "4 Weeks", mode: "Online", instructor: ""
  });

  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data);
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

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingCourseId ? `/api/courses/${editingCourseId}` : "/api/courses";
      const method = editingCourseId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setEditingCourseId(null);
        setFormData({ title: "", desc: "", image: "", level: "Beginner", duration: "4 Weeks", mode: "Online", instructor: "" });
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (course: any) => {
    setEditingCourseId(course.id);
    setFormData({
      title: course.title,
      desc: course.desc,
      image: course.image,
      level: course.level,
      duration: course.duration,
      mode: course.mode,
      instructor: course.instructor
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openNewCourseModal = () => {
    setEditingCourseId(null);
    setFormData({ title: "", desc: "", image: "", level: "Beginner", duration: "4 Weeks", mode: "Online", instructor: "" });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-800">Courses</h1>
          <p className="text-slate-500 mt-2">Manage all degree programs and training courses.</p>
        </div>
        <button 
          onClick={openNewCourseModal}
          className="flex items-center gap-2 bg-[#185D46] hover:bg-[#124634] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-[#185D46]/20"
        >
          <Plus className="w-5 h-5" />
          Add New Course
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider bg-slate-50">
                <th className="px-6 py-4 font-semibold">Course Title</th>
                <th className="px-6 py-4 font-semibold">Level</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Instructor</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading courses...</td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No courses found.</td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={course.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-800 line-clamp-1">{course.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{course.mode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-600">
                        {course.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{course.duration}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{course.instructor}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(course)} className="p-2 rounded-lg text-slate-400 hover:text-[#185D46] hover:bg-[#185D46]/10 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(course.id)} className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors">
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
        
        {/* Pagination placeholder */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <p>Showing 1 to {courses.length} of {courses.length} entries</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-md hover:bg-slate-100 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1.5 rounded-md bg-[#185D46] text-white">1</button>
            <button className="px-3 py-1.5 rounded-md hover:bg-slate-100 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Add New Course</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46]" placeholder="Course Title" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea required value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46]" rows={3} placeholder="Course description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Level</label>
                  <select required value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46] bg-white">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
                  <input required value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46]" placeholder="e.g. 4 Weeks" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Mode</label>
                  <input required value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46]" placeholder="e.g. Online" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Instructor</label>
                  <input required value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#185D46]/20 focus:border-[#185D46]" placeholder="Instructor Name" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-medium bg-[#185D46] hover:bg-[#124634] text-white transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isSubmitting ? "Saving..." : "Save Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
