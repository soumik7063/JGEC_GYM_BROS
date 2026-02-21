import React, { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const TemplateSaveModal = ({ isOpen, onClose, onSave, loading }) => {
  const [templateName, setTemplateName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Template name is required.");
      return;
    }
    onSave(templateName.trim());
    setTemplateName("");
  };

  const handleClose = () => {
    setTemplateName("");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-800 animate-[fadeIn_150ms_ease-out_forwards]">
        <h3 className="text-lg font-bold mb-2 dark:text-white">
          Save Custom Template
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          Name your custom template so you can quickly log these same exercises
          next time.
        </p>
        <input
          type="text"
          placeholder="Template Name (e.g. Push Day)"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-transparent text-slate-900 dark:text-gray-100 mb-5"
          autoFocus
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Template"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TemplateSaveModal;
