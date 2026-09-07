import React, { useState } from 'react';
import { Printer, Download, Copy, Check, FileText, Sparkles, BookOpen, Award, AlertTriangle, Layers } from 'lucide-react';

export default function PrintReport({ appData, onNavigateToWallCards }) {
  const { past, virtues, faults, future, profile } = appData;
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const reportText = document.getElementById('printable-report-area')?.innerText || '';
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Top Action Bar (hidden on print) */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
            Complete Self-Authoring Summary Report
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Print-friendly consolidated report of your Past, Present, and Future Authoring.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onNavigateToWallCards}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:hover:bg-amber-900 dark:text-amber-200 border border-amber-300 transition"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Open Wall Cards Mode</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy All Text'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document */}
      <div 
        id="printable-report-area"
        className="bg-white text-slate-900 rounded-3xl border border-slate-200 p-8 md:p-14 shadow-md font-serif leading-relaxed"
      >
        
        {/* Document Cover / Header */}
        <div className="border-b-2 border-slate-900 pb-8 mb-10 text-center">
          <span className="text-xs uppercase tracking-widest font-sans font-bold text-indigo-700 block mb-2">
            The Self-Authoring Suite
          </span>
          <h1 className="font-display font-black text-3xl md:text-4xl text-slate-950 tracking-tight">
            Personal Autobiography, Character Analysis & Strategic Future Blueprint
          </h1>
          
          <div className="mt-6 font-sans text-xs text-slate-600 flex items-center justify-center space-x-6">
            <span><strong>Author:</strong> {profile.name || "Self-Author"}</span>
            <span><strong>Date:</strong> {profile.dateStarted || new Date().toLocaleDateString()}</span>
            <span><strong>Status:</strong> Completed Suite</span>
          </div>
        </div>

        {/* SECTION 1: FUTURE AUTHORING */}
        <section className="mb-14 card-page-break-after">
          <div className="flex items-center space-x-2 pb-2 border-b border-indigo-200 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-wide">
              I. Future Authoring Program
            </h2>
          </div>

          {/* Overall Goal */}
          <div className="bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100 mb-8 font-sans">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">Overall Future Plan</span>
            <h3 className="font-display font-bold text-xl text-indigo-950 mt-1">
              {future.overallGoalTitle || "The Purposeful Life"}
            </h3>
            <p className="text-sm text-indigo-900/80 mt-1 italic">
              {future.overallGoalDescription || "The life of courage, honor, truth, and purpose."}
            </p>
          </div>

          {/* Stage 1 Warmups */}
          <div className="mb-10 space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900 border-b pb-2">
              Stage 1: Preliminary Notes and Thoughts
            </h3>

            {[
              { id: "1.1", label: "1.1 One Thing You Could Do Better" },
              { id: "1.2", label: "1.2 Things to Learn About" },
              { id: "1.3", label: "1.3 Improve Your Habits" },
              { id: "1.4", label: "1.4 Your Social Life in the Future" },
              { id: "1.5", label: "1.5 Your Leisure Activity in the Future" },
              { id: "1.6", label: "1.6 Your Family Life in the Future" },
              { id: "1.7", label: "1.7 Your Career in the Future" },
              { id: "1.8", label: "1.8 Qualities You Admire" }
            ].map(item => (
              <div key={item.id} className="text-sm space-y-1">
                <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-600">
                  {item.label}
                </h4>
                <p className="text-slate-800 whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {future.warmups[item.id] || "—"}
                </p>
              </div>
            ))}
          </div>

          {/* Ideal Future Essay */}
          <div className="mb-10 card-page-break-inside-avoid">
            <h3 className="font-display font-bold text-xl text-slate-900 pb-2 mb-3 border-b">
              The Ideal Future: Complete Summary
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-800 whitespace-pre-line leading-relaxed text-sm md:text-base">
              {future.idealFutureEssay || "—"}
            </div>
          </div>

          {/* Future to Avoid Essay */}
          <div className="mb-10 card-page-break-inside-avoid">
            <h3 className="font-display font-bold text-xl text-rose-950 pb-2 mb-3 border-b border-rose-200">
              A Future to Avoid: Complete Summary (The Nightmare State)
            </h3>
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200 text-slate-800 whitespace-pre-line leading-relaxed text-sm md:text-base">
              {future.futureToAvoidEssay || "—"}
            </div>
          </div>

          {/* Stage 2 Goals Breakdown */}
          <div className="mb-10">
            <h3 className="font-display font-bold text-xl text-slate-900 pb-2 mb-6 border-b">
              Stage 2: Eight Prioritized Specific Goals & Execution Strategies
            </h3>

            <div className="space-y-8">
              {(future.goals || []).map((goal, idx) => {
                const strat = future.goalStrategies[goal.id] || {};
                if (!goal.title && !goal.description) return null;

                return (
                  <div key={goal.id} className="p-6 rounded-2xl border-2 border-slate-900 bg-white card-page-break-inside-avoid shadow-sm">
                    <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 mb-4">
                      <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-lg text-slate-900">
                          {goal.title || `Goal ${idx + 1}`}
                        </h4>
                        <p className="text-xs text-slate-600 font-sans mt-0.5">
                          {goal.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      {strat.motives && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="font-bold text-[11px] text-indigo-700 uppercase tracking-wider block mb-1">
                            1. Motives & Why
                          </span>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed">{strat.motives}</p>
                        </div>
                      )}

                      {strat.socialImpact && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="font-bold text-[11px] text-indigo-700 uppercase tracking-wider block mb-1">
                            2. Broad Social Impact
                          </span>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed">{strat.socialImpact}</p>
                        </div>
                      )}

                      {strat.strategies && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 md:col-span-2">
                          <span className="font-bold text-[11px] text-emerald-700 uppercase tracking-wider block mb-1">
                            3. Concrete Daily, Weekly & Monthly Strategies
                          </span>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed">{strat.strategies}</p>
                        </div>
                      )}

                      {strat.obstacles && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="font-bold text-[11px] text-rose-700 uppercase tracking-wider block mb-1">
                            4. Obstacles & Solutions
                          </span>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed">{strat.obstacles}</p>
                        </div>
                      )}

                      {strat.benchmarks && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="font-bold text-[11px] text-indigo-700 uppercase tracking-wider block mb-1">
                            5. Benchmarks & Progress Monitoring
                          </span>
                          <p className="text-slate-700 whitespace-pre-line leading-relaxed">{strat.benchmarks}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: PRESENT AUTHORING: VIRTUES */}
        <section className="mb-14 card-page-break-after">
          <div className="flex items-center space-x-2 pb-2 border-b border-emerald-200 mb-6">
            <Award className="w-5 h-5 text-emerald-600" />
            <h2 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-wide">
              II. Present Authoring: Virtues Analysis
            </h2>
          </div>

          <div className="space-y-6">
            {(virtues.virtueRankings || []).map((vName, idx) => {
              const analysis = virtues.analyses[vName] || {};
              return (
                <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 card-page-break-inside-avoid">
                  <div className="flex items-center space-x-2 pb-2 mb-3 border-b border-slate-200">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-600 text-white font-mono text-xs font-bold">
                      Virtue #{idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-base text-slate-900">
                      {vName}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    {analysis.experience && (
                      <div>
                        <strong className="text-slate-700 block">Formative Experience:</strong>
                        <p className="text-slate-600 whitespace-pre-line mt-0.5">{analysis.experience}</p>
                      </div>
                    )}
                    {analysis.alternative && (
                      <div>
                        <strong className="text-slate-700 block">Alternative Outcome:</strong>
                        <p className="text-slate-600 whitespace-pre-line mt-0.5">{analysis.alternative}</p>
                      </div>
                    )}
                    {analysis.improvement && (
                      <div>
                        <strong className="text-emerald-800 block">Capitalization & Improvement Guidelines:</strong>
                        <p className="text-slate-600 whitespace-pre-line mt-0.5">{analysis.improvement}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: PRESENT AUTHORING: FAULTS */}
        <section className="mb-14 card-page-break-after">
          <div className="flex items-center space-x-2 pb-2 border-b border-rose-200 mb-6">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h2 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-wide">
              III. Present Authoring: Faults Analysis
            </h2>
          </div>

          <div className="space-y-6">
            {(faults.faultRankings || []).map((fName, idx) => {
              const analysis = faults.analyses[fName] || {};
              return (
                <div key={idx} className="p-6 rounded-2xl border border-rose-200 bg-rose-50/30 card-page-break-inside-avoid">
                  <div className="flex items-center space-x-2 pb-2 mb-3 border-b border-rose-200">
                    <span className="px-2.5 py-0.5 rounded bg-rose-600 text-white font-mono text-xs font-bold">
                      Fault #{idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-base text-slate-900">
                      {fName}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    {analysis.experience && (
                      <div>
                        <strong className="text-slate-700 block">Negative Impact Experience:</strong>
                        <p className="text-slate-600 whitespace-pre-line mt-0.5">{analysis.experience}</p>
                      </div>
                    )}
                    {analysis.alternative && (
                      <div>
                        <strong className="text-slate-700 block">Alternative Action:</strong>
                        <p className="text-slate-600 whitespace-pre-line mt-0.5">{analysis.alternative}</p>
                      </div>
                    )}
                    {analysis.improvement && (
                      <div>
                        <strong className="text-rose-800 block">Rectification & Elimination Protocol:</strong>
                        <p className="text-slate-600 whitespace-pre-line mt-0.5">{analysis.improvement}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: PAST AUTHORING / AUTOBIOGRAPHY */}
        <section className="mb-14">
          <div className="flex items-center space-x-2 pb-2 border-b border-amber-200 mb-6">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <h2 className="font-display font-extrabold text-2xl text-slate-900 uppercase tracking-wide">
              IV. Past Authoring: Life Epochs & Formative Narrative
            </h2>
          </div>

          <div className="space-y-8">
            {(past.epochs || []).map((ep, idx) => {
              const epochExps = (past.experiences || []).filter(e => e.epochId === ep.id);
              if (!ep.title && epochExps.length === 0) return null;

              return (
                <div key={ep.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 card-page-break-inside-avoid">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-800 block">
                    Epoch {idx + 1} of 7
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 mt-1">
                    {ep.title || `Epoch ${idx + 1}`}
                  </h3>
                  {ep.description && (
                    <p className="text-xs text-slate-600 font-sans italic mt-1 pb-3 border-b border-slate-200">
                      {ep.description}
                    </p>
                  )}

                  {epochExps.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {epochExps.map((exp, eIdx) => (
                        <div key={eIdx} className="bg-white p-4 rounded-xl border border-slate-200 text-xs font-sans">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {exp.title}
                          </h4>
                          <p className="text-slate-700 whitespace-pre-line mt-1">
                            {exp.description}
                          </p>
                          {exp.impact && (
                            <div className="mt-2 pt-2 border-t border-slate-100 text-slate-600">
                              <strong>Impact on Life:</strong> {exp.impact}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t-2 border-slate-900 text-center font-sans text-xs text-slate-500">
          <p>Generated by the Self-Authoring Suite Interactive System</p>
          <p className="mt-1">“Sort yourself out. Marshal your arguments. Put yourself in order.”</p>
        </div>

      </div>

    </div>
  );
}
