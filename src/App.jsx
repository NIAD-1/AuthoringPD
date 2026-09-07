import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PastAuthoringView from './components/PastAuthoringView';
import PresentVirtuesView from './components/PresentVirtuesView';
import PresentFaultsView from './components/PresentFaultsView';
import FutureAuthoringView from './components/FutureAuthoringView';
import WallCardsStudio from './components/WallCardsStudio';
import PrintReport from './components/PrintReport';
import LocalDBModal from './components/LocalDBModal';
import { 
  loadAllAppData, 
  saveAllAppData, 
  loadSampleWalkthroughData, 
  clearAllData, 
  exportBackupJSON,
  INITIAL_PAST_STATE,
  INITIAL_VIRTUES_STATE,
  INITIAL_FAULTS_STATE,
  INITIAL_FUTURE_STATE,
  INITIAL_PROFILE_STATE
} from './utils/storage';
import { saveToLocalDB, loadFromLocalDB, saveSnapshot } from './utils/localDB';

export default function App() {
  const [appData, setAppData] = useState(() => loadAllAppData());
  const [activeTab, setActiveTab] = useState('past'); // Default directly to Past Authoring (Step 1)
  const [theme, setTheme] = useState(() => appData.settings?.theme || 'light');
  const [lastSaved, setLastSaved] = useState(Date.now());
  const [isLocalDBOpen, setIsLocalDBOpen] = useState(false);

  // Initialize from LocalDB (IndexedDB) if present
  useEffect(() => {
    async function initFromLocalDB() {
      try {
        const storedInDB = await loadFromLocalDB("self_authoring_state");
        if (storedInDB && typeof storedInDB === 'object') {
          setAppData(prev => ({ ...prev, ...storedInDB }));
        }
      } catch (e) {
        console.warn("LocalDB init fallback to LocalStorage", e);
      }
    }
    initFromLocalDB();
  }, []);

  // Apply dark mode class to root HTML
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Dual Persistence: Auto-save to LocalStorage + LocalDB (IndexedDB)
  useEffect(() => {
    const fullState = { ...appData, settings: { theme } };
    saveAllAppData(fullState);
    saveToLocalDB("self_authoring_state", fullState);
    setLastSaved(Date.now());
  }, [appData, theme]);

  // Clear all data and start completely fresh from Past Authoring
  const handleResetData = () => {
    if (window.confirm("Clear all answers and start completely fresh from the beginning (Past Authoring)?")) {
      clearAllData();
      const freshState = {
        past: INITIAL_PAST_STATE,
        virtues: INITIAL_VIRTUES_STATE,
        faults: INITIAL_FAULTS_STATE,
        future: INITIAL_FUTURE_STATE,
        profile: INITIAL_PROFILE_STATE,
        settings: { theme }
      };
      setAppData(freshState);
      saveToLocalDB("self_authoring_state", freshState);
      saveSnapshot(freshState, "Cleared - Started Fresh from Beginning");
      setActiveTab('past');
    }
  };

  // Load sample walkthrough data (optional preview)
  const handleLoadSample = () => {
    if (window.confirm("Load sample walkthrough data (from Tommy Bo's Future Authoring & suite)? This is useful to preview how completed cards look.")) {
      const sample = loadSampleWalkthroughData();
      setAppData(sample);
      saveToLocalDB("self_authoring_state", sample);
      saveSnapshot(sample, "Loaded Sample Walkthrough");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  // Export JSON Backup to disk
  const handleExportBackup = () => {
    exportBackupJSON(appData);
  };

  // Import JSON Backup from disk
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        const restored = {
          past: parsed.past || INITIAL_PAST_STATE,
          virtues: parsed.virtues || INITIAL_VIRTUES_STATE,
          faults: parsed.faults || INITIAL_FAULTS_STATE,
          future: parsed.future || INITIAL_FUTURE_STATE,
          profile: parsed.profile || INITIAL_PROFILE_STATE,
          settings: parsed.settings || { theme }
        };
        setAppData(restored);
        saveToLocalDB("self_authoring_state", restored);
        saveSnapshot(restored, `Restored from file: ${file.name}`);
        alert("Backup restored into LocalDB successfully!");
      } catch (err) {
        alert("Invalid JSON backup file.");
      }
    };
    reader.readAsText(file);
  };

  const handleRestoreSnapshot = (snapshotData) => {
    setAppData(snapshotData);
    saveToLocalDB("self_authoring_state", snapshotData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        onLoadSample={handleLoadSample}
        onResetData={handleResetData}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onOpenLocalDB={() => setIsLocalDBOpen(true)}
        lastSaved={lastSaved}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'dashboard' && (
          <Dashboard
            appData={appData}
            setActiveTab={setActiveTab}
            onLoadSample={handleLoadSample}
          />
        )}

        {/* STEP 1: Past Authoring / Autobiography */}
        {activeTab === 'past' && (
          <PastAuthoringView
            data={appData.past}
            onChange={(newPast) => setAppData(prev => ({ ...prev, past: newPast }))}
            onNavigateToWallCards={() => setActiveTab('wall-cards')}
            onChangeStepTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* STEP 2A: Present Authoring: Virtues Analysis */}
        {activeTab === 'present-virtues' && (
          <PresentVirtuesView
            data={appData.virtues}
            onChange={(newVirtues) => setAppData(prev => ({ ...prev, virtues: newVirtues }))}
            onNavigateToWallCards={() => setActiveTab('wall-cards')}
            onChangeStepTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* STEP 2B: Present Authoring: Faults Analysis */}
        {activeTab === 'present-faults' && (
          <PresentFaultsView
            data={appData.faults}
            onChange={(newFaults) => setAppData(prev => ({ ...prev, faults: newFaults }))}
            onNavigateToWallCards={() => setActiveTab('wall-cards')}
            onChangeStepTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* STEP 3: Future Authoring Program */}
        {activeTab === 'future' && (
          <FutureAuthoringView
            data={appData.future}
            onChange={(newFuture) => setAppData(prev => ({ ...prev, future: newFuture }))}
            onNavigateToWallCards={() => setActiveTab('wall-cards')}
            onChangeStepTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* STEP 4: Wall Cards Studio (Print & Cut for Walls) */}
        {activeTab === 'wall-cards' && (
          <WallCardsStudio
            appData={appData}
          />
        )}

        {/* STEP 5: Full Consolidated Summary Report */}
        {activeTab === 'report' && (
          <PrintReport
            appData={appData}
            onNavigateToWallCards={() => setActiveTab('wall-cards')}
          />
        )}
      </main>

      {/* LocalDB Management Modal */}
      <LocalDBModal
        isOpen={isLocalDBOpen}
        onClose={() => setIsLocalDBOpen(false)}
        appData={appData}
        onRestoreSnapshot={handleRestoreSnapshot}
      />

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>LocalDB (IndexedDB) Active • 100% Offline & Private</span>
        </div>
        <p className="mt-1 opacity-75">All data is stored directly on your computer. No external servers or cloud calls.</p>
      </footer>

    </div>
  );
}
