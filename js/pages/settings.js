// ============================================
// Church Admin - Settings Page
// ============================================

const Settings = {
    render() {
        const isAdmin = Auth.isAdmin();
        const storageMode = StorageService.getMode();
        const dbConfig = StorageService.getDatabaseConfig();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Pengaturan</h1>
            </div>

            <div class="card" style="margin-bottom: 20px;">
                <div class="card-header">
                    <h3 class="card-title">Mode Penyimpanan</h3>
                </div>
                ${isAdmin ? `
                    <div class="form-group">
                        <label class="form-label">Pilih Mode</label>
                        <select id="storageModeSelect" class="form-select">
                            <option value="local" ${storageMode === 'local' ? 'selected' : ''}>Local (Stabil)</option>
                            <option value="database" ${storageMode === 'database' ? 'selected' : ''}>Database Ready (Persiapan)</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Provider</label>
                            <input id="dbProviderInput" type="text" class="form-input" value="${dbConfig.provider || 'supabase'}" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Table/Collection</label>
                            <input id="dbTableInput" type="text" class="form-input" value="${dbConfig.table || 'app_storage'}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Database URL (placeholder)</label>
                        <input id="dbUrlInput" type="text" class="form-input" value="${dbConfig.url || ''}" placeholder="https://xxxx.supabase.co">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Anon Key (placeholder)</label>
                        <input id="dbAnonKeyInput" type="password" class="form-input" value="${dbConfig.anonKey || ''}" placeholder="eyJ...">
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 14px;">
                        Catatan: mode Database masih tahap persiapan. Saat ini tetap menggunakan penyimpanan lokal agar aman selama development.
                    </p>
                    <button class="btn btn-primary" onclick="Settings.saveStorageSettings()">Simpan Pengaturan Storage</button>
                ` : `
                    <p style="color: var(--text-secondary); margin: 0;">
                        Pengaturan mode penyimpanan hanya tersedia untuk akun admin.
                    </p>
                `}
            </div>

            <div class="card" style="margin-bottom: 20px;">
                <div class="card-header">
                    <h3 class="card-title">Sinkronisasi Database (Manual)</h3>
                </div>
                ${isAdmin ? `
                    <p style="color: var(--text-secondary); margin-bottom: 14px;">
                        Gunakan fitur ini untuk uji koneksi dan sinkron data lokal dengan Supabase secara manual selama fase development.
                    </p>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="Settings.testDbConnection()">Test Koneksi DB</button>
                        <button class="btn btn-secondary" onclick="Settings.pushToDatabase()">Push Local ke DB</button>
                        <button class="btn btn-primary" onclick="Settings.pullFromDatabase()">Pull DB ke Local</button>
                    </div>
                    <p style="color: var(--text-muted); margin-top: 10px; font-size: 0.86rem;">
                        Catatan: tabel Supabase yang dipakai harus punya kolom: <code>id</code> (text, primary key), <code>payload</code> (jsonb), <code>updated_at</code> (timestamptz).
                    </p>
                ` : `
                    <p style="color: var(--text-secondary); margin: 0;">
                        Sinkronisasi database hanya tersedia untuk akun admin.
                    </p>
                `}
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Backup & Restore Data</h3>
                </div>
                ${isAdmin ? `
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">
                        Gunakan backup untuk menyimpan seluruh data aplikasi ke file JSON, dan restore untuk memulihkan data dari file backup.
                    </p>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <button class="btn btn-secondary" onclick="App.exportBackup()">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M12 16V3M12 16L7 11M12 16L17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 21H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                            Backup Data
                        </button>
                        <button class="btn btn-primary" onclick="App.triggerRestore()">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M12 3V16M12 16L7 11M12 16L17 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 21H3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                            Restore Data
                        </button>
                    </div>
                ` : `
                    <p style="color: var(--text-secondary); margin: 0;">
                        Fitur backup/restore hanya tersedia untuk akun admin.
                    </p>
                `}
            </div>
        `;
    },

    saveStorageSettings() {
        if (!Auth.isAdmin()) {
            Components.toast('Hanya admin yang dapat mengubah pengaturan storage.', 'warning');
            return;
        }

        const mode = document.getElementById('storageModeSelect')?.value || 'local';
        const url = (document.getElementById('dbUrlInput')?.value || '').trim();
        const anonKey = (document.getElementById('dbAnonKeyInput')?.value || '').trim();
        const table = (document.getElementById('dbTableInput')?.value || '').trim() || 'app_storage';

        StorageService.setDatabaseConfig({
            provider: 'supabase',
            url,
            anonKey,
            table
        });
        StorageService.setMode(mode);

        Components.toast('Pengaturan storage disimpan.', 'success');
        this.render();
    },

    async testDbConnection() {
        try {
            await StorageService.testDatabaseConnection();
            Components.toast('Koneksi database berhasil.', 'success');
        } catch (error) {
            Components.toast(`Koneksi database gagal: ${error.message}`, 'error');
        }
    },

    async pushToDatabase() {
        try {
            await StorageService.pushLocalDataToDatabase('churchAdminData');
            Components.toast('Push data lokal ke database berhasil.', 'success');
        } catch (error) {
            Components.toast(`Push gagal: ${error.message}`, 'error');
        }
    },

    async pullFromDatabase() {
        try {
            await StorageService.pullDatabaseDataToLocal('churchAdminData');
            AppData.init();
            Components.toast('Pull data dari database berhasil. Halaman akan dimuat ulang.', 'success');
            setTimeout(() => window.location.reload(), 500);
        } catch (error) {
            Components.toast(`Pull gagal: ${error.message}`, 'error');
        }
    }
};
