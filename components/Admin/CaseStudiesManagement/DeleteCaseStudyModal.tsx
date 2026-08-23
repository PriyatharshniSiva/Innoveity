"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCaseStudies } from "./CaseStudiesState";
import { AlertTriangle } from "lucide-react";

export default function DeleteCaseStudyModal() {
  const { deletingCaseStudyId, setDeletingCaseStudyId, caseStudies, setCaseStudies } = useCaseStudies();

  const handleConfirm = () => {
    if (deletingCaseStudyId) {
      setCaseStudies(caseStudies.filter((s) => s.id !== deletingCaseStudyId));
    }
    setDeletingCaseStudyId(null);
  };

  const handleCancel = () => {
    setDeletingCaseStudyId(null);
  };

  return (
    <AnimatePresence>
      {deletingCaseStudyId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-100"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Delete Case Study</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Are you sure you want to delete this case study? This action cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/20 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
