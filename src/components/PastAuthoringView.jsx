import React, { useState } from 'react';
import { BookOpen, ArrowLeft, ArrowRight, Plus, Trash2, Bookmark, CheckCircle, Layers, HelpCircle } from 'lucide-react';
import WritingPrompt from './WritingPrompt';
import IndexModal from './IndexModal';

export default function PastAuthoringView({ data, onChange, onNavigateToWallCards, onChangeStepTab }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  // Update an epoch title / description
  const updateEpoch = (id, field, value) => {
    const newEpochs = data.epochs.map(ep => ep.id === id ? { ...ep, [field]: value } : ep);
    onChange({ ...data, epochs: newEpochs });
  };

  // Add an experience to an epoch
  const addExperience = (epochId) => {
    const newExp = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      epochId,
      title: "",
      description: "",
      impact: ""
    };
    onChange({
      ...data,
      experiences: [...(data.experiences || []), newExp]
    });
  };

  const updateExperience = (expId, field, value) => {
    const updated = (data.experiences || []).map(e => e.id === expId ? { ...e, [field]: value } : e);
    onChange({ ...data, experiences: updated });
  };

  const deleteExperience = (expId) => {
    const updated = (data.experiences || []).filter(e => e.id !== expId);
    onChange({ ...data, experiences: updated });
  };

  // Toggle experience in Part IV (10 Most Critical Life Experiences)
  const toggleCriticalExperience = (exp) => {
    const current = data.criticalExperiences || [];
    const exists = current.find(c => c.id === exp.id || c.title === exp.title);
    
    let updated;
    if (exists) {
      updated = current.filter(c => c.id !== exp.id && c.title !== exp.title);
    } else {
      if (current.length >= 10) return; // max 10
      updated = [...current, { id: exp.id, title: exp.title, partA: "", partB: "" }];
    }

    onChange({ ...data, criticalExperiences: updated });
  };

  const updateCriticalAnalysis = (id, field, value) => {
    const updated = (data.criticalExperiences || []).map(c => c.id === id ? { ...c, [field]: value } : c);
    onChange({ ...data, criticalExperiences: updated });
  };

  // Build index sections
  const indexSections = [
    { title: "Introduction & Memory, Stress & Reverie", isCompleted: true, badge: "Intro" },
    { title: "Part IIa: Define 7 Epochs", isCompleted: data.epochs.filter(e => e.title).length >= 5, badge: "Epochs" },
    { title: "Part IIb: Significant Formative Experiences", isCompleted: (data.experiences || []).length >= 3, badge: "Events" },
    { title: "Part III: Impact & Effects Analysis", isCompleted: (data.experiences || []).some(e => e.impact), badge: "Impact" },
    { title: "Part IV: Select 10 Critical Experiences", isCompleted: (data.criticalExperiences || []).length > 0, badge: "Select 10" },
    ...((data.criticalExperiences || []).map((c, i) => ({
      title: `Part IV Deep Dive: #${i + 1} (${c.title || 'Untitled'})`,
      isCompleted: Boolean(c.partA && c.partB),
      badge: `Crit #${i + 1}`
    }))),
    { title: "Conclusion & Autobiography Summary", isCompleted: true, badge: "Done" }
  ];

  const totalSteps = indexSections.length;
  const progressPercent = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      
      {/* Top Header & Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Past Authoring / Autobiography
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
            className="bg-gradient-to-r from-amber-600 to-orange-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
          <span>{progressPercent}% Complete</span>
          <span>Estimated: ~{Math.max(10, Math.round(240 * (1 - progressPercent / 100)))} mins</span>
        </div>
      </div>

      {/* STEP 0: Intro, Reverie & Psychology */}
      {currentStep === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-600 block mb-1">
              Part I: Memory, Emotion and Stress
            </span>
            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              Why Write Your Autobiography?
            </h3>
          </div>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            <p>
              Your mind is always trying to determine the level of danger presented by your environment. If something bad has happened to you in the past, your mind cannot be at peace until you have figured out how to avoid having the same thing happen again in the future.
            </p>
            <p>
              If you recall memories that make you feel ashamed, guilty, angry, or hurt, and these memories are more than a year and a half old, your mind is not at peace, and you are still carrying the weight of your past.
            </p>
            <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2">
              <h4 className="font-bold text-amber-950 dark:text-amber-200">Writing in a Reverie State:</h4>
              <p className="text-xs text-amber-900 dark:text-amber-300">
                It is best to do the writing associated with this exercise by entering into a reverie—a state of contemplation, like a daydream. Let thoughts and images come to you instead of controlling them. Voluntarily facing the remembered things you fear is the best way of integrating them.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 1: Part IIa: Define 7 Epochs */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-600 block mb-1">
              Part II: Epochs (IIa)
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Division of Your Life into Seven Epochs
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Please divide your life so far into seven distinct time periods or "epochs" (e.g., "Early Childhood", "Grade School", "High School", "First Job", etc.).
            </p>
          </div>

          <div className="space-y-4">
            {data.epochs.map((ep, idx) => (
              <div key={ep.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-md bg-amber-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Epoch #{idx + 1}
                  </h4>
                </div>

                <input
                  type="text"
                  value={ep.title}
                  onChange={(e) => updateEpoch(ep.id, 'title', e.target.value)}
                  placeholder={`Epoch ${idx + 1} Title (e.g. Grade School / Ages 6-12)`}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
                />

                <textarea
                  value={ep.description}
                  onChange={(e) => updateEpoch(ep.id, 'description', e.target.value)}
                  placeholder="Brief description of this epoch..."
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Part IIb: Significant Formative Experiences */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-600 block mb-1">
              Part II: Epochs (IIb)
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Significant Experiences from Each Epoch
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Describe in detail significant formative experiences that happened during each epoch (positive or negative). Limit description to the event itself (~1,000 characters).
            </p>
          </div>

          <div className="space-y-6">
            {data.epochs.map((ep, idx) => {
              const epochExps = (data.experiences || []).filter(e => e.epochId === ep.id);

              return (
                <div key={ep.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-850">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-600">Epoch #{idx + 1}</span>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                        {ep.title || `Epoch ${idx + 1}`}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => addExperience(ep.id)}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {epochExps.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">
                      No experiences added yet for this epoch. Click "+ Add Experience" to record a memory.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {epochExps.map((exp, eIdx) => (
                        <div key={exp.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500">Event #{eIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => deleteExperience(exp.id)}
                              className="text-rose-500 hover:text-rose-700 p-1"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                            placeholder="Title of this experience..."
                            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white"
                          />

                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Describe what happened (~1,000 chars)..."
                            rows={3}
                            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Part III: Impact of Experiences */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-600 block mb-1">
              Part III: Impact of Experiences
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Analysis of Effects of Experiences
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              For each experience recorded in Part IIb, outline how this experience has shaped your life and contributed to making you who you are today. How has it changed your view of other people and the world?
            </p>
          </div>

          {(data.experiences || []).length === 0 ? (
            <p className="text-sm text-slate-500 italic p-6 text-center border border-dashed rounded-2xl">
              Please go back to Step 3 and add formative experiences first.
            </p>
          ) : (
            <div className="space-y-6">
              {(data.experiences || []).map((exp) => (
                <div key={exp.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-3">
                  <div>
                    <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {exp.title || "Untitled Experience"}
                    </h4>
                    {exp.description && (
                      <p className="text-xs text-slate-500 italic mt-0.5 line-clamp-2">
                        {exp.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Impact on Your Life & Worldview (~1,000 characters):
                    </label>
                    <textarea
                      value={exp.impact || ""}
                      onChange={(e) => updateExperience(exp.id, 'impact', e.target.value)}
                      placeholder="Explain how this shaped who you are today..."
                      rows={3}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs md:text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STEP 4: Part IV: Select 10 Most Critical Life Experiences */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-600 block mb-1">
              Part IV: Select for Analysis
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Ten Most Critical Life Experiences
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Choose the ten experiences that were most important in shaping your life. Each of these will be subjected to further in-depth psychological analysis.
            </p>
          </div>

          <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
            <span>Selected for Deep Dive: <strong>{(data.criticalExperiences || []).length} / 10</strong></span>
          </div>

          {(data.experiences || []).length === 0 ? (
            <p className="text-sm text-slate-500 italic p-6 text-center border border-dashed rounded-2xl">
              Please go back to Step 3 and record your formative experiences first.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(data.experiences || []).map((exp) => {
                const isSelected = (data.criticalExperiences || []).some(c => c.id === exp.id || c.title === exp.title);

                return (
                  <label
                    key={exp.id}
                    className={`flex items-start space-x-3 p-4 rounded-xl border text-sm cursor-pointer transition ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-100 font-semibold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCriticalExperience(exp)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <div>
                      <span className="leading-snug block font-bold">{exp.title || "Untitled"}</span>
                      {exp.description && (
                        <span className="text-xs opacity-75 line-clamp-2 mt-0.5">{exp.description}</span>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* STEP 5+: Deep Dive for each critical experience (a & b) */}
      {currentStep >= 5 && currentStep < 5 + (data.criticalExperiences || []).length && (() => {
        const critIndex = currentStep - 5;
        const critExp = (data.criticalExperiences || [])[critIndex];
        if (!critExp) return null;

        return (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-600 text-white font-mono text-xs font-bold">
                  Critical Experience #{critIndex + 1}
                </span>
                <span className="text-xs text-slate-400">Part IV Deep Dive Analysis</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                {critExp.title}
              </h3>
            </div>

            {/* (a) How did events come about */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                (a) Origins, Personal Agency & Lessons (~1,000 chars)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                How did the events come about? Were they primarily positive or negative? Were you helped or hurt? What role did you play? Were there things you should have done differently, or occurrences out of your control?
              </p>
              <textarea
                value={critExp.partA || ""}
                onChange={(e) => updateCriticalAnalysis(critExp.id, 'partA', e.target.value)}
                placeholder="Write your analysis of the event's origin and your role..."
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* (b) Effect on trust, hopes, value */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                (b) Long-Term Effects on Trust, Self-Worth & Personality (~1,000 chars)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                What effect did this experience have on your trust in people? On your hopes for the future? On your belief in your own value and the value of life? On your personality?
              </p>
              <textarea
                value={critExp.partB || ""}
                onChange={(e) => updateCriticalAnalysis(critExp.id, 'partB', e.target.value)}
                placeholder="Write your analysis of how it impacted your trust and worldview..."
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>
        );
      })()}

      {/* LAST STEP: Conclusion & Transition to Present Authoring */}
      {currentStep === totalSteps - 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <BookOpen className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Step 1 of 3 Complete</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
              Past Authoring Completed!
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              You have successfully written your life's defining epochs, formative experiences, and deep reflections. Now, proceed to <strong>Present Authoring (Virtues Analysis)</strong> to identify and rank your core strengths.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onChangeStepTab ? onChangeStepTab('present-virtues') : onNavigateToWallCards()}
              className="flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-600 to-emerald-600 text-white shadow-xl shadow-emerald-600/20 hover:scale-105 transition"
            >
              <span>Proceed to Present Authoring: Virtues (Step 2)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onNavigateToWallCards}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
            >
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Preview Timeline Wall Cards</span>
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
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30 disabled:opacity-30 disabled:pointer-events-none transition"
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
        title="Past Authoring Index"
      />

    </div>
  );
}
