import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Award, 
  AlertTriangle, 
  Printer, 
  Layers, 
  Download, 
  Upload, 
  RotateCcw, 
  Moon, 
  Sun, 
  Check, 
  Menu, 
  X,
  FileText,
  Database,
  Trash2
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  theme, 
  setTheme, 
  onLoadSample, 
  onResetData, 
  onExportBackup, 
  onImportBackup,
  onOpenLocalDB,
  lastSaved
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'past', label: '1. Past Authoring', icon: BookOpen },
    { id: 'present-virtues', label: '2. Virtues', icon: Award },
    { id: 'present-faults', label: '3. Faults', icon: AlertTriangle },
    { id: 'future', label: '4. Future Authoring', icon: Sparkles },
    { id: 'wall-cards', label: 'Wall Cards Studio', icon: Layers, highlight: true },
    { id: 'report', label: 'Full Report', icon: Printer }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white block leading-tight">
                Self-Authoring Suite
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                Past → Present → Future
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive 
                      ? item.highlight 
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                        : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : item.highlight
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 hover:bg-amber-200'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden md:flex items-center space-x-2">
            
            {/* LocalDB Offline Status Button */}
            <button
              onClick={onOpenLocalDB}
              title="LocalDB (IndexedDB) Status & Snapshots"
              className="flex items-center space-x-1 px-2.5 py-1 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-full border border-emerald-300 dark:border-emerald-700 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Database className="w-3.5 h-3.5" />
              <span className="font-semibold">LocalDB</span>
            </button>

            {/* Clear & Start Fresh Button */}
            <button
              onClick={onResetData}
              title="Clear all fields and start fresh from Step 1 (Past Authoring)"
              className="px-2.5 py-1.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-lg border border-rose-200 dark:border-rose-800 transition flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Start Fresh</span>
            </button>

            {/* Load Sample Button */}
            <button
              onClick={onLoadSample}
              title="Load Tommy Bo Walkthrough Sample Data"
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 transition flex items-center space-x-1"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sample</span>
            </button>

            {/* Backup / Export */}
            <button
              onClick={onExportBackup}
              title="Download JSON File to Local Disk"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Import Backup */}
            <label 
              title="Restore from JSON Backup"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={onImportBackup} className="hidden" />
            </label>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onResetData}
              className="p-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg"
            >
              Start Fresh
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive 
                    ? item.highlight ? 'bg-amber-600 text-white' : 'bg-indigo-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onResetData();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg"
            >
              Clear & Start Fresh
            </button>
            <button
              onClick={() => {
                onLoadSample();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-lg"
            >
              Load Sample
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
