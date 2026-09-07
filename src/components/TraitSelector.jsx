import React from 'react';
import { Check, Info, AlertCircle, ShieldCheck } from 'lucide-react';

export default function TraitSelector({
  traitsData,
  selectedTraits = {},
  onToggleTrait,
  minPerTrait = 2,
  maxPerTrait = 10,
  title = "Select Relevant Items",
  description = "Please select the traits that apply to you. You can select up to 10 traits, and are required to select at least 2. Be over-inclusive."
}) {
  const traitKeys = Object.keys(traitsData);

  return (
    <div className="space-y-8">
      {/* Header instructions */}
      <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center space-x-2">
          <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>{title}</span>
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Trait Sections */}
      {traitKeys.map((key) => {
        const trait = traitsData[key];
        const selectedList = selectedTraits[key] || [];
        const count = selectedList.length;
        const isValid = count >= minPerTrait && count <= maxPerTrait;

        return (
          <div 
            key={key}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"
          >
            {/* Trait Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    {trait.name}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                    {trait.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {trait.description}
                </p>
              </div>

              {/* Counter Badge */}
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1 ${
                  isValid 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                    : count < minPerTrait
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                }`}>
                  {isValid ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  <span>Selected: {count} / {maxPerTrait} (Min {minPerTrait})</span>
                </span>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-5">
              {trait.items.map((item, idx) => {
                const isSelected = selectedList.includes(item);
                const canSelectMore = count < maxPerTrait;

                return (
                  <label
                    key={idx}
                    className={`flex items-start space-x-3 p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-500 text-indigo-950 dark:text-indigo-100 font-medium shadow-sm'
                        : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={!isSelected && !canSelectMore}
                      onChange={() => onToggleTrait(key, item)}
                      className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="leading-snug select-none">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
