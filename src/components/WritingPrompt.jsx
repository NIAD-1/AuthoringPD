import React, { useState } from 'react';
import { Maximize2, Minimize2, Sparkles, HelpCircle, Check, AlertCircle, Copy } from 'lucide-react';
import Timer from './Timer';

export default function WritingPrompt({
  title,
  subtitle,
  prompt,
  guidance,
  value = "",
  onChange,
  placeholder = "Write your thoughts and reflections here...",
  minChars = 0,
  maxChars = 2000,
  recommendedChars = 1000,
  timerSeconds,
  timerLabel = "Recommended Time",
  helperNotes
}) {
  const [isZenMode, setIsZenMode] = useState(false);
  const [showGuidance, setShowGuidance] = useState(true);
  const [copied, setCopied] = useState(false);

  const charCount = value ? value.length : 0;
  const wordCount = value && value.trim() ? value.trim().split(/\s+/).length : 0;
  const isOverLimit = maxChars > 0 && charCount > maxChars;
  const isMinMet = charCount >= minChars;

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`transition-all duration-300 ${
      isZenMode 
        ? 'fixed inset-0 z-50 bg-slate-900/95 p-6 md:p-12 flex flex-col justify-center max-w-4xl mx-auto'
        : 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6'
    }`}>
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          {title && (
            <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {timerSeconds && (
            <Timer initialSeconds={timerSeconds} label={timerLabel} />
          )}

          <button
            type="button"
            onClick={handleCopy}
            title="Copy Text"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsZenMode(!isZenMode)}
            title={isZenMode ? "Exit Zen Mode" : "Fullscreen Focus Mode"}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isZenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Prompt Text */}
      {prompt && (
        <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-4 border-indigo-500 text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-sm md:text-base whitespace-pre-line">
          {prompt}
        </div>
      )}

      {/* Guidance Dropdown / Note */}
      {guidance && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowGuidance(!showGuidance)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showGuidance ? "Hide writing guidelines" : "Show writing guidelines"}</span>
          </button>
          {showGuidance && (
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-lg border border-amber-200/80 dark:border-amber-800/50 leading-normal">
              {guidance}
            </div>
          )}
        </div>
      )}

      {/* Character & Word Indicator matching original PDF */}
      <div className="flex items-center justify-between py-2 text-xs font-medium">
        <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
          <span>Words: <strong className="text-slate-700 dark:text-slate-200">{wordCount}</strong></span>
          {recommendedChars && (
            <span className="hidden sm:inline">Target: ~{recommendedChars} chars</span>
          )}
        </div>

        <div className={`font-mono px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
          isOverLimit
            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
            : isMinMet
              ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
        }`}>
          [{charCount} / {maxChars > 0 ? maxChars : '∞'}] {isOverLimit ? '⚠️ Exceeds Limit' : ''}
        </div>
      </div>

      {/* Writing Area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={isZenMode ? 14 : 7}
        className={`w-full p-4 rounded-xl border font-sans text-sm md:text-base leading-relaxed transition-all resize-y focus:outline-none focus:ring-2 ${
          isOverLimit
            ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30 dark:bg-rose-950/20'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 focus:ring-indigo-500 text-slate-900 dark:text-slate-100'
        }`}
      />

      {helperNotes && (
        <div className="mt-2 text-xs text-slate-400 italic">
          {helperNotes}
        </div>
      )}
    </div>
  );
}
