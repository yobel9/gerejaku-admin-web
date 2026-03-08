// ============================================
// Church Admin - Attendance Page
// ============================================

const Attendance = {
    members: [],
    attendanceRecords: [],
    selectedDate: new Date().toISOString().split('T')[0],
    selectedService: 'Sunday Service',
    selectedMembers: [],

    render() {
        this.members = AppData.getMembers().filter(m => m.status === 'active');
        this.attendanceRecords = AppData.getAttendance();
        
        const today = new Date();
        const weekStart = this.getWeekStart(today);
        
        // Check if there's attendance for this week
        const thisWeekRecord = this.attendanceRecords.find(a => a.date === weekStart);
        this.selectedMembers = thisWeekRecord ? thisWeekRecord.presentMembers : [];
        
        const stats = this.getStats();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Kehadiran Jemaat</h1>
            </div>

            <!-- Summary Cards -->
            <div class="summary-grid">
                <div class="summary-card">
                    <div class="summary-label">Total Jemaat Aktif</div>
                    <div class="summary-value">${this.members.length}</div>
                </div>
                <div class="summary-card">
                    <div class="summary-label">Hadir Minggu Ini</div>
                    <div class="summary-value">${this.selectedMembers.length}</div>
                </div>
                <div class="summary-card">
                    <div class="summary-label">Persentase Kehadiran</div>
                    <div class="summary-value">${this.members.length > 0 ? Math.round((this.selectedMembers.length / this.members.length) * 100) : 0}%</div>
                </div>
            </div>

            <div class="attendance-grid">
                <!-- Check-in Form -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Input Kehadiran</h3>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Tanggal</label>
                        <input type="date" class="form-input" value="${this.selectedDate}" 
                               onchange="Attendance.handleDateChange(this.value)">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Layanan</label>
                        <select class="form-select" onchange="Attendance.handleServiceChange(this.value)">
                            <option value="Sunday Service" ${this.selectedService === 'Sunday Service' ? 'selected' : ''}>Sunday Service</option>
                            <option value="Youth Fellowship" ${this.selectedService === 'Youth Fellowship' ? 'selected' : ''}>Youth Fellowship</option>
                            <option value="Bible Study" ${this.selectedService === 'Bible Study' ? 'selected' : ''}>Bible Study</option>
                            <option value="Prayer Meeting" ${this.selectedService === 'Prayer Meeting' ? 'selected' : ''}>Prayer Meeting</option>
                        </select>
                    </div>

                    <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                        <button class="btn btn-sm btn-secondary" onclick="Attendance.markAllPresent()">Pilih Semua</button>
                        <button class="btn btn-sm btn-secondary" onclick="Attendance.clearAll()">Hapus Semua</button>
                    </div>

                    <div class="member-checklist">
                        ${this.members.map(member => `
                            <label class="checkbox-item">
                                <input type="checkbox" 
                                       ${this.selectedMembers.includes(member.id) ? 'checked' : ''} 
                                       onchange="Attendance.toggleMember('${member.id}')">
                                <div class="member-avatar" style="width: 32px; height: 32px; font-size: 0.786rem;">
                                    ${Components.getInitials(member.name)}
                                </div>
                                <span class="member-name">${member.name}</span>
                            </label>
                        `).join('')}
                    </div>

                    <button class="btn btn-primary mt-2" style="width: 100%;" onclick="Attendance.saveAttendance()">
                        Simpan Kehadiran
                    </button>
                </div>

                <!-- Attendance History -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Riwayat Kehadiran</h3>
                    </div>
                    
                    <div class="filters">
                        <div class="filter-group">
                            <label>Layanan:</label>
                            <select class="form-select" id="historyServiceFilter" onchange="Attendance.renderHistory()">
                                <option value="">Semua</option>
                                <option value="Sunday Service">Sunday Service</option>
                                <option value="Youth Fellowship">Youth Fellowship</option>
                                <option value="Bible Study">Bible Study</option>
                                <option value="Prayer Meeting">Prayer Meeting</option>
                            </select>
                        </div>
                    </div>

                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Layanan</th>
                                    <th>Jumlah Hadir</th>
                                    <th>Persentase</th>
                                </tr>
                            </thead>
                            <tbody id="historyTableBody">
                                ${this.renderHistoryRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },

    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day;
        d.setDate(diff);
        return d.toISOString().split('T')[0];
    },

    getStats() {
        const totalMembers = this.members.length;
        const presentCount = this.selectedMembers.length;
        
        return {
            totalMembers,
            presentCount,
            percentage: totalMembers > 0 ? Math.round((presentCount / totalMembers) * 100) : 0
        };
    },

    handleDateChange(value) {
        this.selectedDate = value;
        
        // Check if there's existing record for this date
        const existingRecord = this.attendanceRecords.find(
            a => a.date === value && a.service === this.selectedService
        );
        
        if (existingRecord) {
            this.selectedMembers = existingRecord.presentMembers;
        } else {
            this.selectedMembers = [];
        }
        
        this.render();
    },

    handleServiceChange(value) {
        this.selectedService = value;
        
        // Check if there's existing record for this date and service
        const existingRecord = this.attendanceRecords.find(
            a => a.date === this.selectedDate && a.service === value
        );
        
        if (existingRecord) {
            this.selectedMembers = existingRecord.presentMembers;
        } else {
            this.selectedMembers = [];
        }
        
        this.render();
    },

    toggleMember(memberId) {
        const index = this.selectedMembers.indexOf(memberId);
        if (index === -1) {
            this.selectedMembers.push(memberId);
        } else {
            this.selectedMembers.splice(index, 1);
        }
    },

    markAllPresent() {
        this.selectedMembers = this.members.map(m => m.id);
        this.render();
    },

    clearAll() {
        this.selectedMembers = [];
        this.render();
    },

    saveAttendance() {
        const record = {
            date: this.selectedDate,
            service: this.selectedService,
            presentMembers: this.selectedMembers
        };

        // Check if record already exists
        const existingIndex = this.attendanceRecords.findIndex(
            a => a.date === record.date && a.service === record.service
        );

        if (existingIndex !== -1) {
            // Update existing
            record.id = this.attendanceRecords[existingIndex].id;
            this.attendanceRecords[existingIndex] = record;
        } else {
            // Add new
            record.id = AppData.generateId();
            this.attendanceRecords.push(record);
        }

        // Save to data store
        const data = AppData.getData();
        data.attendance = this.attendanceRecords;
        AppData.saveData(data);

        Components.toast('Kehadiran berhasil disimpan', 'success');
        this.render();
    },

    renderHistory() {
        const serviceFilter = document.getElementById('historyServiceFilter')?.value || '';
        this.render();
        
        if (serviceFilter) {
            document.getElementById('historyServiceFilter').value = serviceFilter;
            this.renderHistoryRows(serviceFilter);
        }
    },

    renderHistoryRows(serviceFilter = '') {
        const filtered = serviceFilter 
            ? this.attendanceRecords.filter(a => a.service === serviceFilter)
            : this.attendanceRecords;

        const sorted = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (sorted.length === 0) {
            return `
                <tr>
                    <td colspan="4">
                        <div class="empty-state" style="padding: 24px;">
                            <p style="color: var(--text-secondary);">Belum ada data kehadiran</p>
                        </div>
                    </td>
                </tr>
            `;
        }

        return sorted.map(record => {
            const percentage = this.members.length > 0 
                ? Math.round((record.presentMembers.length / this.members.length) * 100) 
                : 0;
            
            return `
                <tr>
                    <td>${Components.formatDate(record.date)}</td>
                    <td>${record.service}</td>
                    <td>${record.presentMembers.length} / ${this.members.length}</td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="flex: 1; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden;">
                                <div style="width: ${percentage}%; height: 100%; background: var(--accent); border-radius: 4px;"></div>
                            </div>
                            <span style="font-size: 0.857rem; color: var(--text-secondary);">${percentage}%</span>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
};
