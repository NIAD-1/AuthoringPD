import React, { useState, useEffect } from 'react';
import { Database, X, History, Save, RotateCcw, Check, HardDrive, ShieldCheck, Download } from 'lucide-react';
import { getSnapshots, saveSnapshot } from '../utils/localDB';
import { exportBackupJSON } from '../utils/storage';

export default function LocalDBModal({ isOpen, onClose, appData, onRestoreSnapshot }) {
  const [snapshots, setSnapshots] = useState([]);
  const [snapshotLabel, setSnapshotLabel] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  const fetchSnapshots = async () => {
    const list = await getSnapshots();
    setSnapshots(list.reverse()); // most recent first
  };

  useEffect(() => {
    if (isOpen) {
      fetchSnapshots();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateSnapshot = async () => {
    const label = snapshotLabel.trim() || `Manual Snapshot (${new Date().toLocaleTimeString()})`;
    await saveSnapshot(appData, label);
    setSnapshotLabel('');
    setJustSaved(true);
    fetchSnapshots();
    setTimeout(() => setJustSaved(false), 2500);
  };

  const handleRestore = (snap) => {
    if (window.confirm(`Restore snapshot "${snap.label}" created on ${snap.dateFormatted}? Current changes will be replaced.`)) {
      onRestoreSnapshot(snap.data);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <span>LocalDB Storage & Offline History</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
                  100% Offline
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your data is stored securely in your browser's native IndexedDB & LocalStorage.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Storage Status Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Status</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Active & Persistent</p>
              <p className="text-[11px] text-slate-500 mt-0.5">No internet connection needed</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-1">
                <HardDrive className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Engine</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">IndexedDB + Local</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Dual redundant offline storage</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 mb-1">
                <History className="w-4 h-4" />
                <span className="text-xs font-bold uppercase">Snapshots</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{snapshots.length} Revisions</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Saved in local database</p>
            </div>
          </div>

          {/* Create Manual Snapshot */}
          <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/40 dark:bg-indigo-950/30 space-y-3">
            <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200 flex items-center space-x-2">
              <Save className="w-4 h-4 text-indigo-600" />
              <span>Create Timestamped Snapshot in LocalDB</span>
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={snapshotLabel}
                onChange={(e) => setSnapshotLabel(e.target.value)}
                placeholder="Snapshot label (e.g. Finished Stage 1, Prior to Goal Edits)..."
                className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
              />
              <button
                onClick={handleCreateSnapshot}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow transition flex items-center space-x-1.5 flex-shrink-0"
              >
                {justSaved ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
                <span>{justSaved ? 'Snapshot Saved!' : 'Save Snapshot'}</span>
              </button>
            </div>
          </div>

          {/* Snapshot History List */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center space-x-2">
              <History className="w-4 h-4 text-slate-500" />
              <span>Revision History in LocalDB</span>
            </h4>

            {snapshots.length === 0 ? (
              <p className="text-xs text-slate-400 italic p-4 text-center border border-dashed rounded-xl">
                No manual snapshots yet. Click 'Save Snapshot' above to create one.
              </p>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {snapshots.map((snap) => (
                  <div
                    key={snap.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                  >
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{snap.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{snap.dateFormatted}</p>
                    </div>

                    <button
                      onClick={() => handleRestore(snap)}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold transition flex items-center space-x-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => exportBackupJSON(appData)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Local JSON File</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
