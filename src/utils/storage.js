/**
 * Storage and state persistence manager for Self-Authoring Suite
 */

import { SAMPLE_DATA } from "../data/sampleData";

const STORAGE_KEYS = {
  PAST: "authoring_past_v1",
  VIRTUES: "authoring_virtues_v1",
  FAULTS: "authoring_faults_v1",
  FUTURE: "authoring_future_v1",
  PROFILE: "authoring_profile_v1",
  SETTINGS: "authoring_settings_v1"
};

export const INITIAL_PAST_STATE = {
  epochs: [
    { id: 1, title: "", description: "" },
    { id: 2, title: "", description: "" },
    { id: 3, title: "", description: "" },
    { id: 4, title: "", description: "" },
    { id: 5, title: "", description: "" },
    { id: 6, title: "", description: "" },
    { id: 7, title: "", description: "" }
  ],
  experiences: [], // array of { id, epochId, title, description, impact }
  criticalExperiences: [] // array of { id, title, partA, partB }
};

export const INITIAL_VIRTUES_STATE = {
  selectedTraits: {
    extraversion: [],
    openness: [],
    conscientiousness: [],
    emotional_stability: [],
    agreeableness: []
  },
  focusedVirtues: [],
  virtueRankings: [],
  analyses: {} // { [virtue]: { experience: '', alternative: '', improvement: '' } }
};

export const INITIAL_FAULTS_STATE = {
  selectedTraits: {
    extraversion: [],
    openness: [],
    conscientiousness: [],
    emotional_stability: [],
    agreeableness: []
  },
  focusedFaults: [],
  faultRankings: [],
  analyses: {} // { [fault]: { experience: '', alternative: '', improvement: '' } }
};

export const INITIAL_FUTURE_STATE = {
  warmups: {
    "1.1": "",
    "1.2": "",
    "1.3": "",
    "1.4": "",
    "1.5": "",
    "1.6": "",
    "1.7": "",
    "1.8": ""
  },
  idealFutureEssay: "",
  futureToAvoidEssay: "",
  overallGoalTitle: "",
  overallGoalDescription: "",
  goals: [
    { id: 1, title: "", description: "" },
    { id: 2, title: "", description: "" },
    { id: 3, title: "", description: "" },
    { id: 4, title: "", description: "" },
    { id: 5, title: "", description: "" },
    { id: 6, title: "", description: "" },
    { id: 7, title: "", description: "" },
    { id: 8, title: "", description: "" }
  ],
  goalPriorities: [1, 2, 3, 4, 5, 6, 7, 8],
  goalStrategies: {} // { [goalId]: { motives: '', socialImpact: '', strategies: '', obstacles: '', benchmarks: '' } }
};

export const INITIAL_PROFILE_STATE = {
  name: "",
  email: "",
  dateStarted: new Date().toISOString().split("T")[0]
};

// Safe LocalStorage getters and setters
export function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error loading key "${key}" from localStorage:`, err);
    return fallback;
  }
}

export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving key "${key}" to localStorage:`, err);
  }
}

export function loadAllAppData() {
  return {
    past: loadFromStorage(STORAGE_KEYS.PAST, INITIAL_PAST_STATE),
    virtues: loadFromStorage(STORAGE_KEYS.VIRTUES, INITIAL_VIRTUES_STATE),
    faults: loadFromStorage(STORAGE_KEYS.FAULTS, INITIAL_FAULTS_STATE),
    future: loadFromStorage(STORAGE_KEYS.FUTURE, INITIAL_FUTURE_STATE),
    profile: loadFromStorage(STORAGE_KEYS.PROFILE, INITIAL_PROFILE_STATE),
    settings: loadFromStorage(STORAGE_KEYS.SETTINGS, { theme: "light" })
  };
}

export function saveAllAppData(appData) {
  if (appData.past) saveToStorage(STORAGE_KEYS.PAST, appData.past);
  if (appData.virtues) saveToStorage(STORAGE_KEYS.VIRTUES, appData.virtues);
  if (appData.faults) saveToStorage(STORAGE_KEYS.FAULTS, appData.faults);
  if (appData.future) saveToStorage(STORAGE_KEYS.FUTURE, appData.future);
  if (appData.profile) saveToStorage(STORAGE_KEYS.PROFILE, appData.profile);
  if (appData.settings) saveToStorage(STORAGE_KEYS.SETTINGS, appData.settings);
}

export function exportBackupJSON(appData) {
  const exportObject = {
    version: "1.0",
    exportDate: new Date().toISOString(),
    ...appData
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Self_Authoring_Backup_${new Date().toISOString().split("T")[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function loadSampleWalkthroughData() {
  const sample = {
    past: SAMPLE_DATA.past,
    virtues: SAMPLE_DATA.presentVirtues,
    faults: SAMPLE_DATA.presentFaults,
    future: SAMPLE_DATA.future,
    profile: {
      name: "Tommy Bo",
      email: "author@selfauthoring.example",
      dateStarted: "2018-12-27"
    }
  };
  saveAllAppData(sample);
  return sample;
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.PAST);
  localStorage.removeItem(STORAGE_KEYS.VIRTUES);
  localStorage.removeItem(STORAGE_KEYS.FAULTS);
  localStorage.removeItem(STORAGE_KEYS.FUTURE);
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
}
