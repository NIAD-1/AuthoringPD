import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Award, 
  AlertTriangle, 
  Layers, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target, 
  Flame, 
  FileText,
  HelpCircle,
  Compass,
  ArrowDown
} from 'lucide-react';
import { MODULES_INFO } from '../data/authoringContent';

export default function Dashboard({ appData, setActiveTab, onLoadSample }) {
  const { past, virtues, faults, future, profile } = appData;

  // Calculate stats
  const totalGoalsDefined = (future.goals || []).filter(g => g.title).length;
  const totalVirtuesRanked = (virtues.virtueRankings || []).length;
  const totalFaultsRanked = (faults.faultRankings || []).length;
  const totalEpochsDefined = (past.epochs || []).filter(e => e.title).length;

  const getModuleProgress = (id) => {
    switch (id) {
      case 'past':
        return totalEpochsDefined >= 5 ? 100 : Math.round((totalEpochsDefined / 7) * 100);
      case 'present-virtues':
        return totalVirtuesRanked >= 6 ? 100 : Math.round((totalVirtuesRanked / 6) * 100);
      case 'present-faults':
        return totalFaultsRanked >= 6 ? 100 : Math.round((totalFaultsRanked / 6) * 100);
      case 'future':
        return totalGoalsDefined >= 6 && Boolean(future.idealFutureEssay) ? 100 : Math.round((totalGoalsDefined / 8) * 100);
      default:
        return 0;
    }
  };

  // Determine current active step in the sequential journey
  const pastProgress = getModuleProgress('past');
  const virtuesProgress = getModuleProgress('present-virtues');
  const faultsProgress = getModuleProgress('present-faults');
  const futureProgress = getModuleProgress('future');

  let nextStepId = 'past';
  let nextStepLabel = 'Begin Step 1: Past Authoring (Autobiography)';
  if (pastProgress === 100 && virtuesProgress < 100) {
    nextStepId = 'present-virtues';
    nextStepLabel = 'Continue Step 2: Present Authoring (Virtues)';
  } else if (pastProgress === 100 && virtuesProgress === 100 && faultsProgress < 100) {
    nextStepId = 'present-faults';
    nextStepLabel = 'Continue Step 2: Present Authoring (Faults)';
  } else if (pastProgress === 100 && virtuesProgress === 100 && faultsProgress === 100 && futureProgress < 100) {
    nextStepId = 'future';
    nextStepLabel = 'Continue Step 3: Future Authoring Program';
  } else if (futureProgress === 100) {
    nextStepId = 'wall-cards';
    nextStepLabel = 'All Complete! Print Wall Cards';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-10">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-8 md:p-12 border border-amber-900/50 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Complete 3-Stage Self-Authoring Pathway</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight leading-tight">
            Past → Present → Future
          </h1>

          <p className="text-sm md:text-base text-slate-300 mt-4 leading-relaxed font-serif italic">
            "Sort yourself out. Marshal your arguments. Put yourself in order, so when someone pushes you farther than you should go, you can say no."
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab(nextStepId)}
              className="flex items-center space-x-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-lg shadow-amber-600/30 transition hover:scale-105"
            >
              <span>{nextStepLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('wall-cards')}
              className="flex items-center space-x-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-slate-100 backdrop-blur border border-white/15 transition"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Wall Cards Studio</span>
            </button>

            <button
              onClick={onLoadSample}
              className="flex items-center space-x-2 px-4 py-3.5 rounded-xl font-semibold text-xs bg-black/30 hover:bg-black/50 text-slate-300 border border-white/10 transition"
            >
              <FileText className="w-4 h-4 text-indigo-300" />
              <span>Load Sample Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-amber-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-12 w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
      </div>

      {/* Sequential Journey Roadmap Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-2">
          Your Sequential Self-Authoring Journey
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Follow the psychological sequence: Untangle the past → understand current virtues & faults → strategize your future goals → print your wall cards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          
          {/* Step 1: Past */}
          <div 
            onClick={() => setActiveTab('past')}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
              pastProgress === 100 
                ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-500' 
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-amber-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {pastProgress === 100 ? '✓ Complete' : `${pastProgress}%`}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Past Authoring
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                7 Life Epochs & formative experience analysis.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-4 flex items-center space-x-1">
              <span>Start Past</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 2A: Virtues */}
          <div 
            onClick={() => setActiveTab('present-virtues')}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
              virtuesProgress === 100 
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500' 
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  2A
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {virtuesProgress === 100 ? '✓ Complete' : `${virtuesProgress}%`}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Present: Virtues
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Big Five strengths & capitalization rules.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-4 flex items-center space-x-1">
              <span>Analyze Virtues</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 2B: Faults */}
          <div 
            onClick={() => setActiveTab('present-faults')}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
              faultsProgress === 100 
                ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500' 
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-rose-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  2B
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  {faultsProgress === 100 ? '✓ Complete' : `${faultsProgress}%`}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Present: Faults
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Pinpoint blind spots & rectification habits.
              </p>
            </div>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 mt-4 flex items-center space-x-1">
              <span>Rectify Faults</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 3: Future */}
          <div 
            onClick={() => setActiveTab('future')}
            className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
              futureProgress === 100 
                ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500' 
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  {futureProgress === 100 ? '✓ Complete' : `${futureProgress}%`}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Future Authoring
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ideal future, nightmare avoid, 8 goals strategy.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-4 flex items-center space-x-1">
              <span>Formulate Future</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: "Epochs Recorded", val: `${totalEpochsDefined} / 7`, icon: BookOpen, color: "text-amber-600 dark:text-amber-400" },
          { label: "Virtues Analyzed", val: `${totalVirtuesRanked}`, icon: Award, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "Faults Rectified", val: `${totalFaultsRanked}`, icon: AlertTriangle, color: "text-rose-600 dark:text-rose-400" },
          { label: "Goals Specified", val: `${totalGoalsDefined} / 8`, icon: Target, color: "text-indigo-600 dark:text-indigo-400" }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                  {stat.label}
                </span>
                <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {stat.val}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Wall Card Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Printable Physical Artifacts
            </span>
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mt-0.5">
              Print Goal & Ritual Cards for Your Wall
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Turn your 8 goals, daily rituals, ideal future vision, and warning wake-up cards into crisp physical cards (with cut lines) to paste on your wall, mirror, or workspace.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('wall-cards')}
          className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30 flex-shrink-0 transition hover:scale-105"
        >
          <span>Open Wall Card Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* The 4 Core Programs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">
            Program Modules (Past → Present → Future)
          </h2>
          <span className="text-xs text-slate-500">Self-Authoring Suite</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULES_INFO.map((mod) => {
            const progress = getModuleProgress(mod.id);

            return (
              <div 
                key={mod.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-7 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {mod.badge}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{mod.estimate}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
                    {mod.tagline}
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">Completion Progress</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        mod.id === 'future' ? 'bg-indigo-600' :
                        mod.id === 'present-virtues' ? 'bg-emerald-600' :
                        mod.id === 'present-faults' ? 'bg-rose-600' : 'bg-amber-600'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <button
                    onClick={() => setActiveTab(mod.id)}
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-2 transition"
                  >
                    <span>{progress > 0 ? "Continue Program" : "Start Program"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
