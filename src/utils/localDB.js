/**
 * IndexedDB (LocalDB) Manager for 100% Offline Data Persistence
 * Uses browser's native IndexedDB API with safe LocalStorage fallback.
 */

const DB_NAME = "SelfAuthoringLocalDB";
const DB_VERSION = 1;
const STORE_NAME = "authoring_data";
const SNAPSHOT_STORE = "history_snapshots";

// Initialize and upgrade IndexedDB safely
export function openLocalDB() {
  return new Promise((resolve) => {
    try {
      if (typeof window === "undefined" || !window.indexedDB) {
        resolve(null);
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        try {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "key" });
          }
          if (!db.objectStoreNames.contains(SNAPSHOT_STORE)) {
            const snapStore = db.createObjectStore(SNAPSHOT_STORE, { keyPath: "id", autoIncrement: true });
            snapStore.createIndex("timestamp", "timestamp", { unique: false });
          }
        } catch (e) {
          console.warn("IndexedDB upgrade warning:", e);
        }
      };

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        console.warn("IndexedDB not available, fallback to localStorage:", event?.target?.error);
        resolve(null);
      };
    } catch (err) {
      console.warn("IndexedDB open exception, fallback to localStorage:", err);
      resolve(null);
    }
  });
}

// Save complete state to IndexedDB
export async function saveToLocalDB(key, data) {
  try {
    const db = await openLocalDB();
    if (!db) return false;

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({ key, data, updatedAt: new Date().toISOString() });

        request.onsuccess = () => resolve(true);
        request.onerror = () => resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  } catch (err) {
    return false;
  }
}

// Load state from IndexedDB
export async function loadFromLocalDB(key) {
  try {
    const db = await openLocalDB();
    if (!db) return null;

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);

        request.onsuccess = (e) => {
          const result = e.target.result;
          resolve(result ? result.data : null);
        };

        request.onerror = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
  } catch (err) {
    return null;
  }
}

// Save snapshot history
export async function saveSnapshot(appData, label = "Auto-save snapshot") {
  try {
    const db = await openLocalDB();
    if (!db) return false;

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction([SNAPSHOT_STORE], "readwrite");
        const store = transaction.objectStore(SNAPSHOT_STORE);
        const record = {
          label,
          timestamp: Date.now(),
          dateFormatted: new Date().toLocaleString(),
          data: appData
        };
        const request = store.add(record);

        request.onsuccess = () => resolve(true);
        request.onerror = () => resolve(false);
      } catch (err) {
        resolve(false);
      }
    });
  } catch (err) {
    return false;
  }
}

// Get all snapshots
export async function getSnapshots() {
  try {
    const db = await openLocalDB();
    if (!db) return [];

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction([SNAPSHOT_STORE], "readonly");
        const store = transaction.objectStore(SNAPSHOT_STORE);
        const request = store.getAll();

        request.onsuccess = (e) => {
          resolve(e.target.result || []);
        };
        request.onerror = () => resolve([]);
      } catch (err) {
        resolve([]);
      }
    });
  } catch (err) {
    return [];
  }
}
