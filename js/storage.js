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
    getItem(_key) {
        throw new Error('DatabaseAdapter belum diimplementasikan.');
    }

    setItem(_key, _value) {
        throw new Error('DatabaseAdapter belum diimplementasikan.');
    }

    removeItem(_key) {
        throw new Error('DatabaseAdapter belum diimplementasikan.');
    }
}

const StorageService = {
    adapter: null,
    modeKey: 'storageMode',
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

    createAdapter() {
        const mode = this.getMode();
        const AdapterClass = this.availableModes[mode] || LocalStorageAdapter;
        try {
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
