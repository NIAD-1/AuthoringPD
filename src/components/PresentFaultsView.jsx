import React, { useState } from 'react';
import { AlertTriangle, ArrowLeft, ArrowRight, Bookmark, CheckCircle, ShieldAlert, Layers } from 'lucide-react';
import WritingPrompt from './WritingPrompt';
import TraitSelector from './TraitSelector';
import ReorderList from './ReorderList';
import IndexModal from './IndexModal';
import { BIG_FIVE_FAULTS } from '../data/authoringContent';

export default function PresentFaultsView({ data, onChange, onNavigateToWallCards, onChangeStepTab }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  const handleToggleTrait = (category, trait) => {
    const currentList = data.selectedTraits[category] || [];
    const exists = currentList.includes(trait);
    const updated = exists ? currentList.filter(t => t !== trait) : [...currentList, trait];
    
    onChange({
      ...data,
      selectedTraits: {
        ...data.selectedTraits,
        [category]: updated
      }
    });
  };

  const handleToggleFocus = (trait) => {
    const current = data.focusedFaults || [];
    const exists = current.includes(trait);
    const updated = exists ? current.filter(t => t !== trait) : [...current, trait];
    
    let newRankings = [...(data.faultRankings || [])];
    if (exists) {
      newRankings = newRankings.filter(t => t !== trait);
    } else {
      newRankings.push(trait);
    }

    onChange({
      ...data,
      focusedFaults: updated,
      faultRankings: newRankings
    });
  };

  const handleUpdateAnalysis = (trait, field, val) => {
    const existing = data.analyses[trait] || {};
    onChange({
      ...data,
      analyses: {
        ...data.analyses,
        [trait]: {
          ...existing,
          [field]: val
        }
      }
    });
  };

  const allSelectedFromPart2 = Object.values(data.selectedTraits || {}).flat();
  const rankedFaults = data.faultRankings && data.faultRankings.length > 0 ? data.faultRankings : (data.focusedFaults || []);

  const deepDiveSteps = rankedFaults.map((f, i) => ({
    title: `Part V: Fault #${i + 1} (${f})`,
    isCompleted: Boolean(data.analyses[f]?.experience),
    badge: `Rank #${i + 1}`
  }));

  const indexSections = [
    { title: "Introduction & Emotional Readiness Advisory", isCompleted: true, badge: "Intro" },
    { title: "Part II: Big Five Faults Selection", isCompleted: allSelectedFromPart2.length >= 10, badge: "Select" },
    { title: "Part III: Focus Selection (Top 6–9)", isCompleted: (data.focusedFaults || []).length >= 6, badge: "Focus" },
    { title: "Part IV: Prioritize Your Selection", isCompleted: rankedFaults.length > 0, badge: "Rank" },
    ...deepDiveSteps,
    { title: "Part VI: Conclusion & Synthesis", isCompleted: true, badge: "Done" }
  ];

  const totalSteps = indexSections.length;
  const progressPercent = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      
      {/* Top Header & Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Present Authoring: Faults Analysis
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Step {currentStep + 1} of {totalSteps}: {indexSections[currentStep]?.title}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsIndexOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Index</span>
            </button>
            <button
              onClick={onNavigateToWallCards}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 transition"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Wall Cards</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-rose-600 to-amber-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
          <span>{progressPercent}% Complete</span>
          <span>Estimated: ~{Math.max(10, Math.round(90 * (1 - progressPercent / 100)))} mins</span>
        </div>
      </div>

      {/* STEP 0: Intro & Safety Advisory */}
      {currentStep === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border-l-4 border-rose-600 text-rose-950 dark:text-rose-200 text-sm leading-relaxed">
            <h4 className="font-bold flex items-center space-x-1.5 mb-1 text-rose-800 dark:text-rose-300">
              <ShieldAlert className="w-4 h-4" />
              <span>Psychological Advisory & Mood Check</span>
            </h4>
            <p>
              It is probably best to complete this exercise if you are in a normal to good mood, so that you can tolerate the self-criticism. If you are feeling sad, lonely, or depressed, you should probably do the <strong>Virtues Analysis</strong> instead.
            </p>
          </div>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Why Analyze Your Personality Faults?
            </h3>
            <p>
              This program has been designed to allow you to do an in-depth analysis of some of the negative aspects or faults of your personality. It is the partner program to the virtues analysis section.
            </p>
            <p>
              Constructing a clearer picture of your faults will help you understand where you stumble, how your personality traits have interfered with your life in the past, and how you can establish concrete rectification habits to prevent recurring suffering in the future.
            </p>
          </div>
        </div>
      )}

      {/* STEP 1: Big 5 Checklists (Part II) */}
      {currentStep === 1 && (
        <TraitSelector
          traitsData={BIG_FIVE_FAULTS}
          selectedTraits={data.selectedTraits}
          onToggleTrait={handleToggleTrait}
          minPerTrait={2}
          maxPerTrait={10}
          title="Part II: Select Relevant Items"
          description="Please select the bad habits or faults that apply to you. You can select up to 10 traits, and are required to select at least 2 from each category. Be over-inclusive."
        />
      )}

      {/* STEP 2: Focus Selection (Part III) */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-rose-600 block mb-1">
              Part III: Habit Selection
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Choose 6 to 9 Core Faults to Work On Improving
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Take a complete listing of your selected faults and select a focused set that you believe are most typical of you or have most interfered with your life.
            </p>
          </div>

          <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
            <span>Selected for Deep Dive: <strong>{(data.focusedFaults || []).length}</strong></span>
            <span>Recommended: 6 to 9 faults</span>
          </div>

          {allSelectedFromPart2.length === 0 ? (
            <p className="text-sm text-slate-500 italic p-6 text-center border border-dashed rounded-2xl">
              Please go back to Step 2 and select faults from the Big Five categories first.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {allSelectedFromPart2.map((trait, idx) => {
                const isFocused = (data.focusedFaults || []).includes(trait);
                return (
                  <label
                    key={idx}
                    className={`flex items-start space-x-3 p-3.5 rounded-xl border text-sm cursor-pointer transition ${
                      isFocused
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 font-semibold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isFocused}
                      onChange={() => handleToggleFocus(trait)}
                      className="mt-0.5 rounded text-rose-600 focus:ring-rose-500 h-4 w-4"
                    />
                    <span className="leading-snug select-none">{trait}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Prioritize / Rank Selection (Part IV) */}
      {currentStep === 3 && (
        <ReorderList
          items={rankedFaults}
          onReorder={(reordered) => {
            onChange({ ...data, faultRankings: reordered });
          }}
          title="Part IV: Rank Selection"
          subtitle="Take the list of your most typical or important faults, and rank order them from most to least relevant or troublesome (Rank 1 is highest priority):"
        />
      )}

      {/* STEP 4+: Deep Analysis for each fault in ranked order (Part V) */}
      {currentStep >= 4 && currentStep < 4 + rankedFaults.length && (() => {
        const faultIndex = currentStep - 4;
        const faultName = rankedFaults[faultIndex];
        const analysis = data.analyses[faultName] || {};

        return (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-rose-600 text-white font-mono text-xs font-bold">
                  Fault Rank #{faultIndex + 1}
                </span>
                <span className="text-xs text-slate-400">Part V: Analysis of Traits</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                {faultName}
              </h3>
            </div>

            {/* (a) Describe an Experience */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                (a) Describe an Experience (~1,000 chars, max 2000)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Please write a short story about a time in your life when this fault created a situation that had a negative impact on your life.
              </p>
              <textarea
                value={analysis.experience || ""}
                onChange={(e) => handleUpdateAnalysis(faultName, 'experience', e.target.value)}
                placeholder="Write your story here..."
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* (b) Alternative Outcome */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                (b) Alternative Outcome (~1,000 chars, max 2000)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Write a short paragraph about what you might have done differently in that situation, to minimize the effect of this fault.
              </p>
              <textarea
                value={analysis.alternative || ""}
                onChange={(e) => handleUpdateAnalysis(faultName, 'alternative', e.target.value)}
                placeholder="Write what you should have done differently..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* (c) Guidelines for general improvement */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                (c) Guidelines for General Improvement & Rectification (~1,000 chars, max 2000)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                How could you work on improving this fault in general, so that such situations do not repeat themselves?
              </p>
              <textarea
                value={analysis.improvement || ""}
                onChange={(e) => handleUpdateAnalysis(faultName, 'improvement', e.target.value)}
                placeholder="Write your concrete rectification rule and habit..."
                rows={4}
                className="w-full p-3 rounded-xl border border-rose-300 dark:border-rose-700 bg-rose-50/20 dark:bg-rose-950/20 text-xs md:text-sm text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        );
      })()}

      {/* LAST STEP: Conclusion & Transition to Future Authoring */}
      {currentStep === totalSteps - 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">Present Authoring Complete</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
              Faults Analysis Completed!
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              You have understood both your virtues and your faults in the present. Now, begin the crown jewel of the suite: <strong>The Future Authoring Program</strong> to define your ideal future, avoid the nightmare path, and map out your 8 prioritized life goals.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onChangeStepTab ? onChangeStepTab('future') : onNavigateToWallCards()}
              className="flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition"
            >
              <span>Proceed to Future Authoring Program (Final Step)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onNavigateToWallCards}
              className="flex items-center space-x-1.5 px-5 py-3 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            >
              <Layers className="w-4 h-4 text-rose-600" />
              <span>Preview Faults Watchlist Cards</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          {currentStep + 1} / {totalSteps}
        </span>

        <button
          type="button"
          onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={currentStep === totalSteps - 1}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <span>Next Step</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <IndexModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        sections={indexSections}
        currentStepIndex={currentStep}
        onSelectStep={(idx) => setCurrentStep(idx)}
        title="Faults Analysis Index"
      />

    </div>
  );
}
