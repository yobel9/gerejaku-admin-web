// ============================================
// Church Admin - Storage Adapter
// ============================================

class LocalStorageAdapter {
    getItem(key) {
        return localStorage.getItem(key);
    }

    setItem(key, value) {
        localStorage.setItem(key, value);
    }

    removeItem(key) {
        localStorage.removeItem(key);
    }
}

// Placeholder for future cloud database integration (Supabase/Firebase/etc.).
// Keep same synchronous interface for now so app behavior does not change.
class DatabaseAdapter {
    constructor(config = {}) {
        this.config = config;
    }

    getItem(_key) {
        // Temporary safe fallback in dev stage: still read from localStorage
        // while keeping adapter contract ready for cloud implementation.
        return localStorage.getItem(_key);
    }

    setItem(_key, _value) {
        localStorage.setItem(_key, _value);
    }

    removeItem(_key) {
        localStorage.removeItem(_key);
    }
}

const StorageService = {
    adapter: null,
    modeKey: 'storageMode',
    configKey: 'databaseConfig',
    defaultMode: 'local',
    availableModes: {
        local: LocalStorageAdapter,
        database: DatabaseAdapter
    },

    getMode() {
        const mode = localStorage.getItem(this.modeKey) || this.defaultMode;
        return this.availableModes[mode] ? mode : this.defaultMode;
    },

    setMode(mode) {
        if (!this.availableModes[mode]) return false;
        localStorage.setItem(this.modeKey, mode);
        this.adapter = null;
        return true;
    },

    getDatabaseConfig() {
        const raw = localStorage.getItem(this.configKey);
        if (!raw) {
            return {
                provider: 'supabase',
                url: '',
                anonKey: '',
                table: 'app_storage'
            };
        }
        try {
            return {
                provider: 'supabase',
                table: 'app_storage',
                ...JSON.parse(raw)
            };
        } catch (error) {
            return {
                provider: 'supabase',
                url: '',
                anonKey: '',
                table: 'app_storage'
            };
        }
    },

    setDatabaseConfig(config) {
        const current = this.getDatabaseConfig();
        const next = {
            ...current,
            ...config
        };
        localStorage.setItem(this.configKey, JSON.stringify(next));
        this.adapter = null;
        return next;
    },

    createAdapter() {
        const mode = this.getMode();
        const AdapterClass = this.availableModes[mode] || LocalStorageAdapter;
        try {
            if (mode === 'database') {
                return new AdapterClass(this.getDatabaseConfig());
            }
            return new AdapterClass();
        } catch (error) {
            // Safety fallback: never block app startup in dev.
            return new LocalStorageAdapter();
        }
    },

    init() {
        if (!this.adapter) {
            this.adapter = this.createAdapter();
        }
    },

    setAdapter(adapter) {
        this.adapter = adapter;
    },

    has(key) {
        this.init();
        return this.adapter.getItem(key) !== null;
    },

    getJSON(key, fallback = null) {
        this.init();
        const raw = this.adapter.getItem(key);
        if (!raw) return fallback;
        try {
            return JSON.parse(raw);
        } catch (error) {
            return fallback;
        }
    },

    setJSON(key, value) {
        this.init();
        this.adapter.setItem(key, JSON.stringify(value));
    },

    remove(key) {
        this.init();
        this.adapter.removeItem(key);
    }
};
