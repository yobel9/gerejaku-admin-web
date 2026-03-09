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

const StorageService = {
    adapter: null,

    init() {
        if (!this.adapter) {
            this.adapter = new LocalStorageAdapter();
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
