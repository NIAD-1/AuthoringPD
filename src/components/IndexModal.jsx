import React from 'react';
import { X, CheckCircle, Circle, Bookmark, ChevronRight } from 'lucide-react';

export default function IndexModal({
  isOpen,
  onClose,
  sections = [],
  currentStepIndex,
  onSelectStep,
  title = "Exercise Index"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <Bookmark className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Index Sections List */}
        <div className="p-6 overflow-y-auto space-y-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400 pb-2">
            You may use the Index to jump to any page in this exercise. Data entered is automatically saved.
          </p>

          {sections.map((sec, idx) => {
            const isCurrent = idx === currentStepIndex;
            const isCompleted = sec.isCompleted;

            return (
              <button
                key={idx}
                onClick={() => {
                  onSelectStep(idx);
                  onClose();
                }}
                className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition pt-3 ${
                  isCurrent
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-100 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                  )}
                  <span className="text-sm truncate">{sec.title}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  {sec.badge && (
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {sec.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            Close Index
          </button>
        </div>

      </div>
    </div>
  );
}
