import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Bookmark, 
  Clock, 
  Target, 
  CheckCircle, 
  Flame, 
  Layers, 
  Info,
  ListOrdered
} from 'lucide-react';
import WritingPrompt from './WritingPrompt';
import ReorderList from './ReorderList';
import IndexModal from './IndexModal';
import { FUTURE_WARMUPS } from '../data/authoringContent';

export default function FutureAuthoringView({ data, onChange, onNavigateToWallCards }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  // Setup Step Architecture matching PDF structure
  // Step 0: General Instructions & Quote
  // Step 1 - 8: Warmups 1.1 through 1.8
  // Step 9: Ideal Future Summary (15 min timer)
  // Step 10: Future to Avoid Summary (15 min timer)
  // Step 11: Stage 1 Review / Transition
  // Step 12: Stage 2 Overall Goal Title & Description
  // Step 13: Stage 2 Eight Specific Goals (1 to 8)
  // Step 14: Stage 2 Prioritizing Goals (2.3)
  // Step 15 - 22: Strategizing (2.4.1 to 2.4.5) for Goal 1 through 8 in prioritized order
  // Step 23: 2.5 Future Steps & Completion

  const updateWarmup = (id, text) => {
    onChange({
      ...data,
      warmups: {
        ...data.warmups,
        [id]: text
      }
    });
  };

  const updateGoalField = (goalId, field, val) => {
    const newGoals = data.goals.map(g => g.id === goalId ? { ...g, [field]: val } : g);
    onChange({
      ...data,
      goals: newGoals
    });
  };

  const updateGoalStrategy = (goalId, field, val) => {
    const existing = data.goalStrategies[goalId] || {};
    onChange({
      ...data,
      goalStrategies: {
        ...data.goalStrategies,
        [goalId]: {
          ...existing,
          [field]: val
        }
      }
    });
  };

  // Get prioritized goals list
  const getSortedGoals = () => {
    const goalsCopy = [...(data.goals || [])];
    return goalsCopy.sort((a, b) => {
      const pA = data.goalPriorities.indexOf(a.id);
      const pB = data.goalPriorities.indexOf(b.id);
      return (pA === -1 ? 99 : pA) - (pB === -1 ? 99 : pB);
    });
  };

  const sortedGoals = getSortedGoals();

  // Define Index Sections for fast jumping
  const indexSections = [
    { title: "Instructions & Peterson Quote", isCompleted: true, badge: "Intro" },
    ...FUTURE_WARMUPS.map(w => ({
      title: w.title,
      isCompleted: Boolean(data.warmups[w.id] && data.warmups[w.id].length > 20),
      badge: "Stage 1"
    })),
    {
      title: "The Ideal Future: Complete Summary (15 Mins)",
      isCompleted: Boolean(data.idealFutureEssay && data.idealFutureEssay.length > 50),
      badge: "Stage 1"
    },
    {
      title: "A Future to Avoid: Complete Summary (15 Mins)",
      isCompleted: Boolean(data.futureToAvoidEssay && data.futureToAvoidEssay.length > 50),
      badge: "Stage 1"
    },
    { title: "Stage 1 Review & Summary", isCompleted: true, badge: "Review" },
    {
      title: "Stage 2: Overall Life Plan Title & Description",
      isCompleted: Boolean(data.overallGoalTitle),
      badge: "Stage 2"
    },
    {
      title: "Stage 2: Define 8 Specific Goals",
      isCompleted: data.goals.filter(g => g.title).length >= 6,
      badge: "Stage 2"
    },
    {
      title: "2.3 Prioritizing Your Goals",
      isCompleted: true,
      badge: "Stage 2"
    },
    ...sortedGoals.map((g, idx) => ({
      title: `2.4 Strategy: Goal #${idx + 1} (${g.title || 'Untitled'})`,
      isCompleted: Boolean(data.goalStrategies[g.id]?.strategies),
      badge: `Goal #${idx + 1}`
    })),
    { title: "2.5 Future Steps & Completion", isCompleted: true, badge: "Done" }
  ];

  const totalSteps = indexSections.length;
  const progressPercent = Math.round((currentStep / (totalSteps - 1)) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      
      {/* Top Header & Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Future Authoring Program
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

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-amber-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
          <span>{progressPercent}% Complete</span>
          <span>Estimated Remaining: ~{Math.max(10, Math.round(150 * (1 - progressPercent / 100)))} mins</span>
        </div>
      </div>

      {/* STEP CONTENT SWITCHER */}
      
      {/* STEP 0: Instructions */}
      {currentStep === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <blockquote className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-l-4 border-indigo-600 font-serif italic text-sm md:text-base text-indigo-950 dark:text-indigo-200">
            "Sort yourself out. Marshal your arguments. Put yourself in order, so when someone pushes you farther than you should go, you can say no."
            <footer className="mt-2 text-xs font-sans not-italic font-semibold text-indigo-700 dark:text-indigo-400">
              — Dr. Jordan B. Peterson
            </footer>
          </blockquote>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              General Instructions
            </h3>
            <p>
              The full future authoring exercise has 2 different stages, each with a number of steps:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>In Stage 1</strong>, you will write generally about your goals, warm up your imagination with 8 targeted questions, and write 15-minute deep explorations of your <em>Ideal Future</em> and the <em>Future to Avoid</em>.</li>
              <li><strong>In Stage 2</strong>, you will specify and clarify 8 concrete goals, prioritize them, and map out complete daily, weekly, and monthly action blueprints.</li>
            </ul>
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
              <strong>Tip:</strong> Your answers are saved automatically every few seconds. When you are done, you can instantly print your complete report or generate <strong>Wall Cards</strong> to paste by your desk.
            </div>
          </div>
        </div>
      )}

      {/* STEPS 1 - 8: Warmups 1.1 to 1.8 */}
      {currentStep >= 1 && currentStep <= 8 && (() => {
        const warmup = FUTURE_WARMUPS[currentStep - 1];
        return (
          <WritingPrompt
            key={warmup.id}
            title={warmup.title}
            subtitle="Stage 1: Preliminary Notes & Imagination Warm-Up"
            prompt={warmup.prompt}
            guidance={warmup.guidance}
            value={data.warmups[warmup.id] || ""}
            onChange={(val) => updateWarmup(warmup.id, val)}
            timerSeconds={warmup.timerSeconds}
            timerLabel="2-Min Timer"
            recommendedChars={500}
            maxChars={2000}
            placeholder="Type your uncensored thoughts here... write freely without premature criticism."
          />
        );
      })()}

      {/* STEP 9: The Ideal Future Complete Summary (15 mins) */}
      {currentStep === 9 && (
        <WritingPrompt
          title="The Ideal Future: Complete Summary"
          subtitle="Stage 1: 15-Minute Continuous Reverie Writing"
          prompt={`Close your eyes. Daydream, if you can, and imagine your ideal future 3 to 5 (or 10) years down the road:\n
• Who do you want to be?
• What do you want to do?
• Where do you want to end up?
• Why do you want these things?
• How do you plan to achieve your goals?
• When will you put your plans into action?`}
          guidance="Write continuously for 15 minutes. Try not to stop while you are writing. Don't worry about spelling or grammar. Be ambitious! Imagine a life that you would regard as honorable, exciting, productive, creative, and decent."
          value={data.idealFutureEssay || ""}
          onChange={(val) => onChange({ ...data, idealFutureEssay: val })}
          timerSeconds={900}
          timerLabel="15-Min Timer"
          recommendedChars={1500}
          maxChars={5000}
          placeholder="Describe your ideal future in vivid detail..."
        />
      )}

      {/* STEP 10: A Future to Avoid Complete Summary (15 mins) */}
      {currentStep === 10 && (
        <WritingPrompt
          title="A Future to Avoid: Complete Summary (The Nightmare Scenario)"
          subtitle="Stage 1: 15-Minute Avoidance Writing"
          prompt={`Spend some time now thinking about what your life would be like if you failed to define or pursue your goals, if you let your bad habits get out of control, and if you ended up miserable, resentful, and bitter.\n
Imagine your life three to five years down the road if you betrayed yourself:\n
• What addictions or vices would consume you?
• What would your relationships, health, and finances look like?
• Where do you NOT want to be?`}
          guidance="Dream while you write, and don't stop. Let yourself form a very clear, visceral picture of the undesirable future so it motivates you to stay disciplined every day."
          value={data.futureToAvoidEssay || ""}
          onChange={(val) => onChange({ ...data, futureToAvoidEssay: val })}
          timerSeconds={900}
          timerLabel="15-Min Timer"
          recommendedChars={1500}
          maxChars={5000}
          placeholder="Describe your nightmare future to avoid at all costs..."
        />
      )}

      {/* STEP 11: Stage 1 Review */}
      {currentStep === 11 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
              Stage 1 Completed!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto">
              You have now articulated your broad vision of the ideal future and outlined the nightmare future to avoid. Next, in <strong>Stage 2</strong>, we will break down your vision into <strong>8 specific, prioritized goals</strong> with concrete daily and weekly strategies.
            </p>
          </div>
        </div>
      )}

      {/* STEP 12: Stage 2 Overall Goal Title & Description */}
      {currentStep === 12 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 block mb-1">
              Stage 2: Specific Goal Identification
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Overall Life Plan Title & Description
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Please specify a title and brief description for your ideal future as a whole (e.g. "The Purposeful Life" or "My Ideal Future"). Imagine that you are summarizing your highest ambitions.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Overall Plan Title:
              </label>
              <input
                type="text"
                value={data.overallGoalTitle || ""}
                onChange={(e) => onChange({ ...data, overallGoalTitle: e.target.value })}
                placeholder="e.g. The Purposeful Life"
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-semibold focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Overall Plan Description / Creed:
              </label>
              <textarea
                value={data.overallGoalDescription || ""}
                onChange={(e) => onChange({ ...data, overallGoalDescription: e.target.value })}
                placeholder="e.g. The life of courage, honor, truth, and purpose."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 13: Define 8 Specific Goals */}
      {currentStep === 13 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 block mb-1">
              Stage 2: Goal Formulation
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
              Break Down Your Future into 8 Specific Goals
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Define 8 specific goals from different life domains (Personal Health, Career, Family, Relationships, Discipline, Financial Abundance, Creative Pursuits, etc.).
            </p>
          </div>

          <div className="space-y-6">
            {data.goals.map((goal, idx) => (
              <div key={goal.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Goal #{idx + 1}
                  </h4>
                </div>

                <input
                  type="text"
                  value={goal.title}
                  onChange={(e) => updateGoalField(goal.id, 'title', e.target.value)}
                  placeholder={`Goal ${idx + 1} Title (e.g. Be more assertive and truthful)`}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white"
                />

                <textarea
                  value={goal.description}
                  onChange={(e) => updateGoalField(goal.id, 'description', e.target.value)}
                  placeholder={`Goal ${idx + 1} Brief Description / Summary`}
                  rows={2}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 14: Prioritizing Goals (2.3) */}
      {currentStep === 14 && (
        <ReorderList
          items={sortedGoals.map(g => ({
            id: g.id,
            title: g.title || `Goal ${g.id}`,
            description: g.description
          }))}
          onReorder={(reordered) => {
            const newPriorities = reordered.map(item => item.id);
            onChange({ ...data, goalPriorities: newPriorities });
          }}
          title="2.3 Prioritizing Your Goals"
          subtitle="Organize your goals in order of importance (Rank 1 is most critical). Use the arrows to re-order:"
        />
      )}

      {/* STEPS 15 - 22: Strategizing for each goal in ranked order (2.4.1 to 2.4.5) */}
      {currentStep >= 15 && currentStep <= 22 && (() => {
        const goalIndex = currentStep - 15;
        const currentGoal = sortedGoals[goalIndex] || data.goals[0];
        const strategy = data.goalStrategies[currentGoal.id] || {};

        return (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded bg-indigo-600 text-white font-mono text-xs font-bold">
                  Priority Rank #{goalIndex + 1}
                </span>
                <span className="text-xs text-slate-400">2.4 Strategizing About Your Goals</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                {currentGoal.title || `Goal ${goalIndex + 1}`}
              </h3>
              {currentGoal.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 italic mt-0.5">
                  {currentGoal.description}
                </p>
              )}
            </div>

            {/* 2.4.1 Evaluating Your Motives */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2.4.1 Evaluating Your Motives
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Do you truly believe that pursuing this goal is important? Would you feel ashamed or anxious if you didn't? Is it part of a deeply felt dream?
              </p>
              <textarea
                value={strategy.motives || ""}
                onChange={(e) => updateGoalStrategy(currentGoal.id, 'motives', e.target.value)}
                placeholder="Write your personal reasons for pursuing this goal..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* 2.4.2 Considering Broad Personal and Social Impact */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2.4.2 Considering Broad Personal and Social Impact
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                How would disciplined success change how you see yourself? How will it affect the people around you and your broader community?
              </p>
              <textarea
                value={strategy.socialImpact || ""}
                onChange={(e) => updateGoalStrategy(currentGoal.id, 'socialImpact', e.target.value)}
                placeholder="Describe how attaining this goal changes your life and others' lives..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* 2.4.3 Concrete Daily, Weekly, Monthly Strategies */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                2.4.3 Detailed Strategies for Goal Attainment (Daily / Weekly / Monthly)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Specify concrete actions. When are you going to work on your goal? Where? How often? (e.g. Daily: ..., Weekly: ..., Monthly: ...)
              </p>
              <textarea
                value={strategy.strategies || ""}
                onChange={(e) => updateGoalStrategy(currentGoal.id, 'strategies', e.target.value)}
                placeholder="• DAILY: ...&#10;• WEEKLY: ...&#10;• MONTHLY: ..."
                rows={4}
                className="w-full p-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50/20 dark:bg-emerald-950/20 text-xs md:text-sm text-slate-900 dark:text-white font-mono"
              />
            </div>

            {/* 2.4.4 Potential Obstacles and Solutions */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                2.4.4 Identifying Potential Obstacles and their Solutions
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                What could stand in your way (laziness, social pushback, distractions)? How will you specifically overcome each obstacle?
              </p>
              <textarea
                value={strategy.obstacles || ""}
                onChange={(e) => updateGoalStrategy(currentGoal.id, 'obstacles', e.target.value)}
                placeholder="• Obstacle: ... → Solution: ..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>

            {/* 2.4.5 Monitoring Progress Towards Desired Goals */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                2.4.5 Monitoring Progress Towards Desired Goals (Benchmarks)
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                What evidence will you accept that you are progressing? When will you achieve this? How often will you monitor your behavior?
              </p>
              <textarea
                value={strategy.benchmarks || ""}
                onChange={(e) => updateGoalStrategy(currentGoal.id, 'benchmarks', e.target.value)}
                placeholder="Define your concrete milestones, audit frequency, and metrics..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs md:text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>
        );
      })()}

      {/* STEP 23: 2.5 Future Steps & Completion */}
      {currentStep === 23 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">2.5 Future Steps</span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
              Future Authoring Project Completed!
            </h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
              Now that you have set goals, concentrate on a daily and weekly basis on implementing the strategies you have devised. Stick to the plan and review your progress weekly!
            </p>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToWallCards}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition"
            >
              <Layers className="w-5 h-5" />
              <span>Generate Wall Cards to Print & Paste</span>
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM NAVIGATION CONTROLS */}
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
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 disabled:opacity-30 disabled:pointer-events-none transition"
        >
          <span>Next Step</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Index Modal */}
      <IndexModal
        isOpen={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        sections={indexSections}
        currentStepIndex={currentStep}
        onSelectStep={(idx) => setCurrentStep(idx)}
        title="Future Authoring Index"
      />

    </div>
  );
}
