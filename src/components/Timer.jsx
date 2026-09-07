import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Bell } from 'lucide-react';

export default function Timer({ initialSeconds = 120, autoStart = false, label = "Reflection Timer" }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(autoStart);
  const [hasFinished, setHasFinished] = useState(false);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
    setIsActive(autoStart);
    setHasFinished(false);
  }, [initialSeconds, autoStart]);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setHasFinished(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (hasFinished) setHasFinished(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(initialSeconds);
    setHasFinished(false);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = ((initialSeconds - secondsLeft) / initialSeconds) * 100;

  return (
    <div className="inline-flex items-center space-x-3 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center space-x-1.5">
        <Clock className={`w-4 h-4 ${hasFinished ? 'text-emerald-500 animate-bounce' : isActive ? 'text-indigo-500 animate-pulse' : 'text-slate-400'}`} />
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
          {label}:
        </span>
      </div>

      <div className="font-mono text-sm font-bold tracking-wider text-slate-800 dark:text-slate-100 min-w-[48px]">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={toggleTimer}
          className={`p-1 rounded-md transition ${
            isActive 
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-200'
          }`}
          title={isActive ? 'Pause' : 'Start Timer'}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={resetTimer}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition"
          title="Reset"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {hasFinished && (
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
          <Bell className="w-3 h-3" />
          <span>Time is up!</span>
        </span>
      )}
    </div>
  );
}
