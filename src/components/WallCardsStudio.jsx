import React, { useState } from 'react';
import { 
  Printer, 
  Layers, 
  Sparkles, 
  Target, 
  Clock, 
  ShieldAlert, 
  Award, 
  BookOpen, 
  CheckSquare, 
  Square, 
  Sliders, 
  LayoutGrid, 
  FileText,
  Copy,
  Check,
  Flame,
  Sunrise,
  Compass
} from 'lucide-react';

export default function WallCardsStudio({ appData }) {
  const { past, virtues, faults, future, profile } = appData;

  // Selected categories to display / print
  const [selectedTypes, setSelectedTypes] = useState({
    goals: true,
    rituals: true,
    idealVision: true,
    futureAvoid: true,
    virtues: true,
    faults: true,
    epochs: false
  });

  // Card Layout Settings
  const [layoutMode, setLayoutMode] = useState('grid-4'); // 'grid-4' (4 per page), 'grid-2' (2 per page), 'single' (1 per page)
  const [cardTheme, setCardTheme] = useState('classic'); // 'classic', 'navy', 'parchment', 'dark'
  const [showCutLines, setShowCutLines] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const toggleType = (key) => {
    setSelectedTypes(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAll = (val) => {
    setSelectedTypes({
      goals: val,
      rituals: val,
      idealVision: val,
      futureAvoid: val,
      virtues: val,
      faults: val,
      epochs: val
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCard = (cardId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(cardId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Compile individual cards to render
  const cards = [];

  // 1. Ideal Future Vision Card / Poster
  if (selectedTypes.idealVision && (future.overallGoalTitle || future.idealFutureEssay)) {
    cards.push({
      id: 'card-ideal-vision',
      category: 'Vision Poster',
      icon: Sparkles,
      accentColor: 'indigo',
      badge: 'IDEAL FUTURE & CREED',
      title: future.overallGoalTitle || "My Ideal Future Vision",
      subtitle: future.overallGoalDescription || "The Life of Courage, Honor, Truth, and Purpose",
      body: future.idealFutureEssay,
      quote: '"Sort yourself out. Marshal your arguments. Put yourself in order, so when someone pushes you farther than you should go, you can say no."',
      footer: `Author: ${profile.name || 'Self-Author'}`
    });
  }

  // 2. Future to Avoid / Warning Reminder Card
  if (selectedTypes.futureAvoid && future.futureToAvoidEssay) {
    cards.push({
      id: 'card-future-avoid',
      category: 'Warning & Vigilance',
      icon: Flame,
      accentColor: 'rose',
      badge: 'THE FUTURE TO AVOID (HELL)',
      title: "Warning: The Path of Betrayal",
      subtitle: "The Nightmare State to Avoid at All Costs",
      body: future.futureToAvoidEssay,
      quote: '"If you let your bad habits get out of control, and you end up miserable, resentful and bitter... where do you NOT want to be?"',
      footer: "Daily Vigilance Card • Paste on Desk or Mirror"
    });
  }

  // 3. Daily & Weekly Ritual Command Cards
  if (selectedTypes.rituals) {
    // Extract rituals if present in warmup 1.3 or goal strategies
    const warmupHabits = future.warmups["1.3"] || "";
    cards.push({
      id: 'card-rituals-daily',
      category: 'Rituals & Habits',
      icon: Sunrise,
      accentColor: 'amber',
      badge: 'DAILY COMMANDMENTS',
      title: "Morning & Night Rituals",
      subtitle: "Small Daily Wins That Snowball into Ripple Effects",
      sections: [
        {
          label: "MORNING RITUAL (Wake Up & Win)",
          content: "• 05:00 AM: Wake up early\n• Hydrate & Tea\n• Morning Reflection & Journal\n• Walk & Mindful Breathing\n• 5–20 Mins Meditation\n• Healthy Breakfast & Clean Fuel\n• Review Daily Big 3 Goals"
        },
        {
          label: "EVENING RITUAL (Decompress & Prepare)",
          content: "• Digital Sunset & Reflection\n• Put out Tomorrow's Journal & Clothes\n• Prepare Work & Study Supplies\n• Read 25 Pages of Deep Book\n• Deep Restorative Sleep"
        }
      ],
      customText: warmupHabits,
      footer: "Consistency Over Intensity • Wall Checklist"
    });

    cards.push({
      id: 'card-rituals-weekly',
      category: 'Weekly Strategy',
      icon: Clock,
      accentColor: 'emerald',
      badge: 'WEEKLY & MONTHLY CADENCE',
      title: "Sunday Life Calibration",
      subtitle: "Weekly Alignment & Monthly Challenges",
      sections: [
        {
          label: "EVERY SUNDAY AUDIT (15 Mins)",
          content: "• Review weekly habit consistency and streaks\n• Measure progress on 8 prioritized goals\n• Plan top weekly milestones and schedule video/work blocks\n• Reconnect with one friend or family member"
        },
        {
          label: "MONTHLY DISCOMFORT CHALLENGE",
          content: "• Undertake one new challenge that stretches competence\n• Financial budget review and expense audit\n• Ask: 'Am I living a life that is true and authentic to me?'"
        }
      ],
      footer: "Sunday Command Card"
    });
  }

  // 4. All 8 Specific Goal Action Cards (in prioritized rank order!)
  if (selectedTypes.goals && future.goals && future.goals.length > 0) {
    const sortedGoals = [...future.goals].sort((a, b) => {
      const pA = future.goalPriorities.indexOf(a.id);
      const pB = future.goalPriorities.indexOf(b.id);
      return (pA === -1 ? 99 : pA) - (pB === -1 ? 99 : pB);
    });

    sortedGoals.forEach((goal, idx) => {
      if (!goal.title && !goal.description) return;
      const strategy = future.goalStrategies[goal.id] || {};

      cards.push({
        id: `card-goal-${goal.id}`,
        category: `Goal #${idx + 1}`,
        icon: Target,
        accentColor: 'indigo',
        badge: `PRIORITY RANK #${idx + 1}`,
        title: goal.title || `Goal ${idx + 1}`,
        subtitle: goal.description,
        sections: [
          strategy.motives && {
            label: "CORE MOTIVE (Why this matters)",
            content: strategy.motives
          },
          strategy.strategies && {
            label: "CONCRETE STRATEGIES (Daily / Weekly / Monthly)",
            content: strategy.strategies
          },
          strategy.obstacles && {
            label: "OBSTACLES & COUNTERMEASURES",
            content: strategy.obstacles
          },
          strategy.benchmarks && {
            label: "PROGRESS BENCHMARKS",
            content: strategy.benchmarks
          }
        ].filter(Boolean),
        footer: `Goal ${idx + 1} Action Blueprint • Paste by Workspace`
      });
    });
  }

  // 5. Virtues Cards
  if (selectedTypes.virtues && virtues.virtueRankings && virtues.virtueRankings.length > 0) {
    virtues.virtueRankings.forEach((vName, idx) => {
      const analysis = virtues.analyses[vName] || {};
      cards.push({
        id: `card-virtue-${idx}`,
        category: 'Core Virtue',
        icon: Award,
        accentColor: 'emerald',
        badge: `VIRTUE STRENGTH #${idx + 1}`,
        title: vName,
        subtitle: "Capitalizing on Natural Strengths",
        sections: [
          analysis.experience && {
            label: "FORMATIVE EXPERIENCE",
            content: analysis.experience
          },
          analysis.improvement && {
            label: "CAPITALIZATION & MASTERY RULE",
            content: analysis.improvement
          }
        ].filter(Boolean),
        footer: `Strength Blueprint • Rank #${idx + 1}`
      });
    });
  }

  // 6. Faults Cards
  if (selectedTypes.faults && faults.faultRankings && faults.faultRankings.length > 0) {
    faults.faultRankings.forEach((fName, idx) => {
      const analysis = faults.analyses[fName] || {};
      cards.push({
        id: `card-fault-${idx}`,
        category: 'Fault Rectification',
        icon: ShieldAlert,
        accentColor: 'rose',
        badge: `WATCHLIST FAULT #${idx + 1}`,
        title: fName,
        subtitle: "Awareness & Elimination Protocol",
        sections: [
          analysis.experience && {
            label: "PAST TRIGGER / MISTAKE",
            content: analysis.experience
          },
          analysis.improvement && {
            label: "RECTIFICATION STRATEGY",
            content: analysis.improvement
          }
        ].filter(Boolean),
        footer: `Rectification Card • Rank #${idx + 1}`
      });
    });
  }

  // 7. Life Epochs Timeline Cards
  if (selectedTypes.epochs && past.epochs && past.epochs.length > 0) {
    past.epochs.forEach((ep, idx) => {
      if (!ep.title) return;
      const epochExps = (past.experiences || []).filter(e => e.epochId === ep.id);

      cards.push({
        id: `card-epoch-${ep.id}`,
        category: 'Life Epoch',
        icon: BookOpen,
        accentColor: 'amber',
        badge: `EPOCH ${idx + 1} OF 7`,
        title: ep.title,
        subtitle: ep.description,
        sections: epochExps.map(exp => ({
          label: exp.title,
          content: `${exp.description}\nImpact: ${exp.impact || ''}`
        })),
        footer: "Autobiography Timeline Card"
      });
    });
  }

  // Card Theme Styling Classes
  const getThemeClasses = () => {
    switch (cardTheme) {
      case 'navy':
        return {
          card: 'bg-slate-900 text-slate-100 border-2 border-amber-500/80 shadow-lg',
          header: 'bg-slate-950/80 border-b border-amber-500/40 text-amber-300',
          badge: 'bg-amber-500 text-slate-950 font-bold',
          sectionLabel: 'text-amber-400 border-l-2 border-amber-400 pl-2',
          footer: 'border-t border-slate-800 text-slate-400'
        };
      case 'parchment':
        return {
          card: 'bg-[#faf6ee] text-[#2c2416] border-2 border-[#d8c7a7] shadow-md',
          header: 'bg-[#f0e7d5] border-b border-[#d8c7a7] text-[#6b4c1b]',
          badge: 'bg-[#7e5726] text-white font-bold',
          sectionLabel: 'text-[#6b4c1b] border-l-2 border-[#6b4c1b] pl-2',
          footer: 'border-t border-[#d8c7a7] text-[#7a6a53]'
        };
      case 'dark':
        return {
          card: 'bg-black text-white border-2 border-slate-800 shadow-xl',
          header: 'bg-slate-950 border-b border-slate-800 text-slate-200',
          badge: 'bg-white text-black font-bold',
          sectionLabel: 'text-indigo-400 border-l-2 border-indigo-500 pl-2',
          footer: 'border-t border-slate-900 text-slate-400'
        };
      case 'classic':
      default:
        return {
          card: 'bg-white text-slate-900 border-2 border-slate-900 shadow-md print:shadow-none',
          header: 'bg-slate-100 border-b-2 border-slate-900 text-slate-900',
          badge: 'bg-slate-900 text-white font-bold',
          sectionLabel: 'text-slate-900 font-bold border-l-2 border-slate-900 pl-2',
          footer: 'border-t border-slate-300 text-slate-500'
        };
    }
  };

  const themeStyles = getThemeClasses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Studio Header (hidden on print) */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Wall Cards Studio & Printable Cutouts</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
              Wall Cards & Daily Command Center
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Transform your answers, goals, daily rituals, and core rules into beautifully formatted index cards and posters to print, cut out, and paste on your walls, desk, or bedside.
            </p>
          </div>

          {/* Quick Print Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-5 h-5" />
              <span>Print All Cards Now</span>
            </button>
          </div>

        </div>

        {/* Studio Controls Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Selection Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                1. Select Cards to Print
              </span>
              <div className="flex space-x-2">
                <button onClick={() => selectAll(true)} className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">All</button>
                <span className="text-xs text-slate-300">|</span>
                <button onClick={() => selectAll(false)} className="text-xs text-slate-500 hover:underline">None</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { key: 'goals', label: '8 Goal Action Cards' },
                { key: 'rituals', label: 'Daily Ritual Cards' },
                { key: 'idealVision', label: 'Ideal Vision Card' },
                { key: 'futureAvoid', label: 'Avoidance (Hell) Card' },
                { key: 'virtues', label: 'Virtues & Strengths' },
                { key: 'faults', label: 'Faults & Watchlist' },
                { key: 'epochs', label: 'Autobiography Epochs' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => toggleType(opt.key)}
                  className={`flex items-center space-x-2 p-2 rounded-lg border text-left transition ${
                    selectedTypes[opt.key]
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  {selectedTypes[opt.key] ? <CheckSquare className="w-3.5 h-3.5 text-indigo-600" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="truncate">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Print Layout Format */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              2. Print Layout Format
            </span>
            <div className="space-y-2 text-xs">
              {[
                { id: 'grid-4', label: '4 Cards per Page (2x2 Grid with Cutlines)', desc: 'Standard 3x5 index card size, best for wall mosaics' },
                { id: 'grid-2', label: '2 Cards per Page (Half Sheet)', desc: 'Larger 4x6 postcard format, comfortable reading' },
                { id: 'single', label: '1 Large Card / Poster per Page', desc: 'Full-page focus posters for desk or frame' }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setLayoutMode(mode.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition ${
                    layoutMode === mode.id
                      ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-950 dark:text-amber-200 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="font-semibold">{mode.label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">{mode.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic Card Theme */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
              3. Visual Styling
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'classic', label: 'Classic Minimalist', bg: 'bg-white text-black border-slate-900' },
                { id: 'navy', label: 'Navy & Gold Accent', bg: 'bg-slate-900 text-amber-300 border-amber-500' },
                { id: 'parchment', label: 'Warm Parchment', bg: 'bg-[#faf6ee] text-[#55473a] border-[#cbbda0]' },
                { id: 'dark', label: 'Modern Obsidian', bg: 'bg-black text-white border-slate-700' }
              ].map(th => (
                <button
                  key={th.id}
                  onClick={() => setCardTheme(th.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    cardTheme === th.id
                      ? 'ring-2 ring-indigo-500 font-bold'
                      : 'opacity-80 hover:opacity-100'
                  } ${th.bg}`}
                >
                  <span className="block">{th.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCutLines}
                  onChange={(e) => setShowCutLines(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>Show Scissors Cut Guides (✂️)</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {cards.length} Cards Total
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Cards Render Area (Optimized for Screen & Print) */}
      <div className={`
        ${layoutMode === 'grid-4' ? 'grid grid-cols-1 md:grid-cols-2 gap-6 grid-print-4' : ''}
        ${layoutMode === 'grid-2' ? 'grid grid-cols-1 md:grid-cols-2 gap-8 grid-print-2' : ''}
        ${layoutMode === 'single' ? 'space-y-10 grid-print-1' : ''}
      `}>
        {cards.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-slate-200">
              No Cards Selected
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Select card categories above or fill out your Future, Virtues, and Goals to generate printable cards.
            </p>
          </div>
        ) : (
          cards.map((card, idx) => {
            const Icon = card.icon || Target;
            const fullCardText = `${card.badge}\n${card.title}\n${card.subtitle || ''}\n\n${
              card.body || (card.sections || []).map(s => `[${s.label}]\n${s.content}`).join('\n\n')
            }`;

            return (
              <div
                key={card.id}
                className={`card-page-break-inside-avoid relative rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all ${themeStyles.card} ${
                  showCutLines ? 'border-dashed' : 'border-solid'
                }`}
                style={{ minHeight: layoutMode === 'single' ? '480px' : '360px' }}
              >
                {/* Scissors Cut Mark on screen and print */}
                {showCutLines && (
                  <div className="absolute -top-3.5 left-6 px-2 bg-inherit text-[10px] font-mono tracking-widest text-slate-400 flex items-center space-x-1">
                    <span>✂️ CUT LINE</span>
                  </div>
                )}

                {/* Card Top / Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 pb-3.5 mb-4 border-b border-inherit">
                    <div>
                      <span className={`inline-block text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5 ${themeStyles.badge}`}>
                        {card.badge}
                      </span>
                      <h3 className="font-display font-extrabold text-lg md:text-xl leading-tight">
                        {card.title}
                      </h3>
                      {card.subtitle && (
                        <p className="text-xs opacity-80 mt-1 font-serif italic">
                          {card.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleCopyCard(card.id, fullCardText)}
                        className="no-print p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-slate-200/50 transition"
                        title="Copy Card Text"
                      >
                        {copiedId === card.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-inherit">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  {card.body && (
                    <div className="text-xs md:text-sm font-serif leading-relaxed whitespace-pre-line opacity-95 mb-4 max-h-[380px] overflow-y-auto pr-1">
                      {card.body}
                    </div>
                  )}

                  {/* Structured Sections (Motives, Strategies, Obstacles, Rituals) */}
                  {card.sections && card.sections.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {card.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="text-xs space-y-1">
                          <h4 className={`font-mono text-[11px] font-bold uppercase tracking-wider ${themeStyles.sectionLabel}`}>
                            {sec.label}
                          </h4>
                          <div className="font-sans leading-relaxed whitespace-pre-line opacity-90 pl-3">
                            {sec.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Core Quote */}
                  {card.quote && (
                    <blockquote className="my-3 p-3 rounded-lg bg-black/5 dark:bg-white/5 border-l-2 border-amber-500 text-xs italic font-serif opacity-90">
                      {card.quote}
                    </blockquote>
                  )}
                </div>

                {/* Card Footer / Metadata */}
                <div className={`pt-3 mt-4 text-[10px] font-mono flex items-center justify-between ${themeStyles.footer}`}>
                  <span>{card.footer || 'Self-Authoring Suite'}</span>
                  <span>CARD #{idx + 1}</span>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Print Friendly Trigger at Bottom */}
      <div className="no-print mt-12 text-center">
        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl font-bold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/30 transition hover:scale-105"
        >
          <Printer className="w-5 h-5" />
          <span>Print These Cards for Your Wall</span>
        </button>
        <p className="text-xs text-slate-500 mt-2">
          Tip: Set printer orientation to Landscape and margins to 'Minimum' for best 2x2 or 1x2 card cutouts.
        </p>
      </div>

    </div>
  );
}
