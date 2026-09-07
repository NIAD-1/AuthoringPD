import React, { useState } from 'react';
import { Award, ArrowLeft, ArrowRight, Bookmark, CheckCircle, ShieldCheck, Layers } from 'lucide-react';
import WritingPrompt from './WritingPrompt';
import TraitSelector from './TraitSelector';
import ReorderList from './ReorderList';
import IndexModal from './IndexModal';
import { BIG_FIVE_VIRTUES } from '../data/authoringContent';

export default function PresentVirtuesView({ data, onChange, onNavigateToWallCards, onChangeStepTab }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  // Toggle trait in selected list
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

  // Toggle trait in focus list (Part III)
  const handleToggleFocus = (trait) => {
    const current = data.focusedVirtues || [];
    const exists = current.includes(trait);
    const updated = exists ? current.filter(t => t !== trait) : [...current, trait];
    
    // Also sync rankings
    let newRankings = [...(data.virtueRankings || [])];
    if (exists) {
      newRankings = newRankings.filter(t => t !== trait);
    } else {
      newRankings.push(trait);
    }

    onChange({
      ...data,
      focusedVirtues: updated,
      virtueRankings: newRankings
    });
  };

  // Update deep dive analysis
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

  // All selected traits across Big Five
  const allSelectedFromPart2 = Object.values(data.selectedTraits || {}).flat();
  const rankedVirtues = data.virtueRankings && data.virtueRankings.length > 0 ? data.virtueRankings : (data.focusedVirtues || []);

  // Define steps
  // 0: Intro & Theory
  // 1: Big 5 Checklists (Part II)
  // 2: Focus Habit Selection (Part III)
  // 3: Prioritization / Ranking (Part IV)
  // 4 to (4 + N - 1): Deep analysis for each virtue
  // Last: Conclusion
  const deepDiveSteps = rankedVirtues.map((v, i) => ({
    title: `Part V: Virtue #${i + 1} (${v})`,
    isCompleted: Boolean(data.analyses[v]?.experience),
    badge: `Rank #${i + 1}`
  }));

  const indexSections = [
    { title: "Introduction & Personality Theory", isCompleted: true, badge: "Theory" },
    { title: "Part II: Big Five Virtues Selection", isCompleted: allSelectedFromPart2.length >= 10, badge: "Select" },
    { title: "Part III: Habit Selection (Top 6–9)", isCompleted: (data.focusedVirtues || []).length >= 6, badge: "Focus" },
    { title: "Part IV: Prioritize Your Selection", isCompleted: rankedVirtues.length > 0, badge: "Rank" },
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
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Present Authoring: Virtues Analysis
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
            className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
          <span>{progressPercent}% Complete</span>
          <span>Estimated: ~{Math.max(10, Math.round(90 * (1 - progressPercent / 100)))} mins</span>
        </div>
      </div>

      {/* STEP 0: Intro & Theory */}
      {currentStep === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 block mb-1">
              Introduction: Virtues Analysis
            </span>
            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Understanding Your Personality Strengths
            </h3>
          </div>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            <p>
              This exercise has been designed to allow you to do an in-depth analysis of some of the positive aspects or virtues of your personality. It is our hope that constructing a clearer picture of your virtues will help you understand the impact of your personality traits on your life in the past, present, and future.
            </p>
            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white">The Higher-Order Traits:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Plasticity:</strong> Tendency to be flexible, exploratory, curious and quick to adapt (Sub-traits: <em>Extraversion</em> and <em>Openness</em>).</li>
                <li><strong>Stability:</strong> Tendency to be structured, organized, emotionally stable and focused (Sub-traits: <em>Conscientiousness</em>, <em>Emotional Stability</em>, and <em>Agreeableness</em>).</li>
              </ul>
            </div>
            <p>
              You will first select 2–10 virtues from each of the five Big Five lists, select 6–9 core habits, rank them in order of importance, and write in-depth reflections on how each virtue has strengthened you in the past, and how you can capitalize on it for the future.
            </p>
          </div>
        </div>
      )}

      {/* STEP 1: Big 5 Checklists (Part II) */}
      {currentStep === 1 && (
        <TraitSelector
          traitsData={BIG_FIVE_VIRTUES}
          selectedTraits={data.selectedTraits}
          onToggleTrait={handleToggleTrait}
          minPerTrait={2}
          maxPerTrait={10}
          title="Part II: Select Relevant Items"
          description="Please select the positive traits or virtues that apply to you. You can select up to 10 traits, and are required to select at least 2 from each category. Be over-inclusive."
        />
      )}

      {/* STEP 2: Focus Habit Selection (Part III) */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 block mb-1">
              Part III: Habit Selection
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Choose 6 to 9 Core Virtues to Capitalize On
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Below are all the virtues you selected across the Big Five traits. Please select a smaller, focused set of traits (we recommend 6 to 9 items) that characterize you most accurately.
            </p>
          </div>

          <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
            <span>Selected for Deep Dive: <strong>{(data.focusedVirtues || []).length}</strong></span>
            <span>Recommended: 6 to 9 virtues</span>
          </div>

          {allSelectedFromPart2.length === 0 ? (
            <p className="text-sm text-slate-500 italic p-6 text-center border border-dashed rounded-2xl">
              Please go back to Step 2 and select virtues from the Big Five categories first.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {allSelectedFromPart2.map((trait, idx) => {
                const isFocused = (data.focusedVirtues || []).includes(trait);
                return (
                  <label
                    key={idx}
                    className={`flex items-start space-x-3 p-3.5 rounded-xl border text-sm cursor-pointer transition ${
                      isFocused
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-semibold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isFocused}
                      onChange={() => handleToggleFocus(trait)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
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
          items={rankedVirtues}
          onReorder={(reordered) => {
            onChange({ ...data, virtueRankings: reordered });
          }}
          title="Part IV: Prioritize Your Selection"
          subtitle="Here is a column containing your most typical or important positive traits or virtues. Please rank order them from most to least relevant or important:"
        />
      )}

      {/* STEP 4+: Deep Analysis for each virtue in ranked order (Part V) */}
      {currentStep >= 4 && currentStep < 4 + rankedVirtues.length && (() => {
        const virtueIndex = currentStep - 4;
        const virtueName = rankedVirtues[virtueIndex];
        const analysis = data.analyses[virtueName] || {};

        return (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white font-mono text-xs font-bold">
                  Virtue Rank #{virtueIndex + 1}
                </span>
                <span className="text-xs text-slate-400">Part V: In-Depth Analysis</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                {virtueName}
              </h3>
            </div>

            {/* (a) Describe an Experience */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                (a) Describe an Experience (~1,000 chars, max 2000)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Please write a short story about a time in your life when this positive trait or virtue contributed to or created a situation that had a positive impact on your life.
              </p>
              <textarea
                value={analysis.experience || ""}
                onChange={(e) => handleUpdateAnalysis(virtueName, 'experience', e.target.value)}
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
                Write a short paragraph about what you might have done differently in that situation, so that it might have turned out even better.
              </p>
              <textarea
                value={analysis.alternative || ""}
                onChange={(e) => handleUpdateAnalysis(virtueName, 'alternative', e.target.value)}
                placeholder="Write what could have been improved..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* (c) Guidelines for general improvement */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                (c) Guidelines for General Improvement & Capitalization (~1,000 chars, max 2000)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                How could you work on capitalizing on this positive trait in general, so that you or others that you care about benefit as much as possible?
              </p>
              <textarea
                value={analysis.improvement || ""}
                onChange={(e) => handleUpdateAnalysis(virtueName, 'improvement', e.target.value)}
                placeholder="Write your capitalization rule and guidelines..."
                rows={4}
                className="w-full p-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50/20 dark:bg-emerald-950/20 text-xs md:text-sm text-slate-900 dark:text-white font-mono"
              />
            </div>
          </div>
        );
      })()}

      {/* LAST STEP: Conclusion & Transition to Faults Analysis */}
      {currentStep === totalSteps - 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Virtues Analysis Complete</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
              Virtues Analysis Completed!
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              You have now identified, ranked, and mapped out rules to capitalize on your positive personality virtues. Now, continue to <strong>Present Authoring (Faults Analysis)</strong> to pinpoint and rectify your blind spots.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onChangeStepTab ? onChangeStepTab('present-faults') : onNavigateToWallCards()}
              className="flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-rose-600 text-white shadow-xl shadow-rose-600/20 hover:scale-105 transition"
            >
              <span>Proceed to Present Authoring: Faults Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onNavigateToWallCards}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Preview Virtues Wall Cards</span>
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
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 disabled:opacity-30 disabled:pointer-events-none transition"
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
        title="Virtues Analysis Index"
      />

    </div>
  );
}
