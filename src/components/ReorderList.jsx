import React from 'react';
import { ArrowUp, ArrowDown, MoveUp, MoveDown, CheckCircle2 } from 'lucide-react';

export default function ReorderList({
  items = [],
  onReorder,
  title = "Prioritize Your Selection",
  subtitle = "Please rank order them from most to least relevant or important (Rank 1 is most important):"
}) {
  const moveItem = (index, direction) => {
    const newItems = [...items];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    onReorder(newItems);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {subtitle}
        </p>
      </div>

      <div className="space-y-2.5">
        {items.map((item, index) => {
          const itemLabel = typeof item === 'string' ? item : (item.title || item.name || `Item ${index + 1}`);
          const itemSub = typeof item === 'object' && item.description ? item.description : null;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 hover:border-indigo-300 dark:hover:border-indigo-700 transition"
            >
              <div className="flex items-center space-x-3.5 min-w-0 pr-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {itemLabel}
                  </p>
                  {itemSub && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {itemSub}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none transition"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
