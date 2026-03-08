// ============================================
// Church Admin - Events Page
// ============================================

const Events = {
    events: [],
    filteredEvents: [],
    currentPage: 1,
    itemsPerPage: 10,
    filters: {
        status: '',
        category: ''
    },

    render() {
        this.events = AppData.getEvents();
        this.applyFilters();

        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="page-header">
                <h1 class="page-title">Kelola Acara</h1>
                <button class="btn btn-primary" onclick="Events.showAddModal()">
                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    Buat Acara
                </button>
            </div>

            <div class="card">
                <div class="filters">
                    <div class="filter-group">
                        <label>Status:</label>
                        <select class="form-select" onchange="Events.handleStatusFilter(this.value)">
                            <option value="">Semua</option>
                            <option value="upcoming" ${this.filters.status === 'upcoming' ? 'selected' : ''}>Akan Datang</option>
                            <option value="ongoing" ${this.filters.status === 'ongoing' ? 'selected' : ''}>Sedang Berlangsung</option>
                            <option value="completed" ${this.filters.status === 'completed' ? 'selected' : ''}>Selesai</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Kategori:</label>
                        <select class="form-select" onchange="Events.handleCategoryFilter(this.value)">
                            <option value="">Semua</option>
                            <option value="service" ${this.filters.category === 'service' ? 'selected' : ''}>Ibadah</option>
                            <option value="fellowship" ${this.filters.category === 'fellowship' ? 'selected' : ''}>Persekutuan</option>
                            <option value="study" ${this.filters.category === 'study' ? 'selected' : ''}>Pendidikan</option>
                            <option value="practice" ${this.filters.category === 'practice' ? 'selected' : ''}>Latihan</option>
                            <option value="celebration" ${this.filters.category === 'celebration' ? 'selected' : ''}>Perayaan</option>
                        </select>
                    </div>
                </div>

                <div class="table-container">
                    <table class="table events-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Acara</th>
                                <th>Tanggal & Waktu</th>
                                <th>Lokasi</th>
                                <th>Kategori</th>
                                <th>Status</th>
                                <th>Peserta</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderTableRows()}
                        </tbody>
                    </table>
                </div>

                ${this.renderPagination()}
            </div>
        `;
    },

    applyFilters() {
        this.filteredEvents = this.events.filter(event => {
            const matchStatus = !this.filters.status || event.status === this.filters.status;
            const matchCategory = !this.filters.category || event.category === this.filters.category;
            
            return matchStatus && matchCategory;
        });

        // Sort by date ascending
        this.filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        this.currentPage = 1;
    },

    renderTableRows() {
        if (this.filteredEvents.length === 0) {
            return `
                <tr>
                    <td colspan="8">
                        ${Components.emptyState(
                            '<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/><line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/></svg>',
                            'Tidak Ada Data',
                            'Belum ada acara. Buat acara pertama Anda.',
                            'Buat Acara',
                            'Events.showAddModal()'
                        )}
                    </td>
                </tr>
            `;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const pageEvents = this.filteredEvents.slice(startIndex, startIndex + this.itemsPerPage);

        const categoryLabels = {
            service: 'Ibadah',
            fellowship: 'Persekutuan',
            study: 'Pendidikan',
            practice: 'Latihan',
            celebration: 'Perayaan'
        };

        const categoryClasses = {
            service: 'badge-info',
            fellowship: 'badge-success',
            study: 'badge-warning',
            practice: 'badge-danger',
            celebration: 'badge-info'
        };

        const statusLabels = {
            upcoming: 'Akan Datang',
            ongoing: 'Sedang Berlangsung',
            completed: 'Selesai'
        };

        const statusClasses = {
            upcoming: 'badge-info',
            ongoing: 'badge-success',
            completed: 'badge-danger'
        };

        const isMobile = window.innerWidth <= 900;
        
        if (isMobile) {
            return pageEvents.map((event, index) => `
                <tr>
                    <td colspan="8" style="padding: 0;">
                        <div style="padding: 16px; border-bottom: 1px solid var(--border);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <span style="font-weight: 600;">${event.name}</span>
                                <span class="badge ${statusClasses[event.status]}">${statusLabels[event.status]}</span>
                            </div>
                            <div style="font-size: 0.857rem; color: var(--text-secondary); margin-bottom: 8px;">
                                <div>📅 ${Components.formatDate(event.date)} ${event.time} - ${event.endTime}</div>
                                <div>📍 ${event.location}</div>
                                <div>👥 ${event.attendees?.length || 0} peserta</div>
                            </div>
                            <div style="display: flex; justify-content: flex-end; gap: 8px;">
                                <button class="btn btn-sm btn-secondary" onclick="Events.viewEvent('${event.id}')">Lihat</button>
                                <button class="btn btn-sm btn-primary" onclick="Events.editEvent('${event.id}')">Edit</button>
                            </div>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        return pageEvents.map((event, index) => `
            <tr>
                <td>${startIndex + index + 1}</td>
                <td><strong>${event.name}</strong></td>
                <td>
                    <div>${Components.formatDate(event.date)}</div>
                    <div style="font-size: 0.857rem; color: var(--text-secondary);">${event.time} - ${event.endTime}</div>
                </td>
                <td>${event.location}</td>
                <td><span class="badge ${categoryClasses[event.category]}">${categoryLabels[event.category]}</span></td>
                <td><span class="badge ${statusClasses[event.status]}">${statusLabels[event.status]}</span></td>
                <td>${event.attendees?.length || 0} orang</td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn view" onclick="Events.viewEvent('${event.id}')" title="Lihat">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg>
                        </button>
                        <button class="action-btn edit" onclick="Events.editEvent('${event.id}')" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/></svg>
                        </button>
                        <button class="action-btn delete" onclick="Events.deleteEvent('${event.id}')" title="Hapus">
                            <svg viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    renderPagination() {
        const totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
        return Components.pagination(this.currentPage, totalPages, 'Events.changePage');
    },

    changePage(page) {
        this.currentPage = page;
        this.render();
    },

    handleStatusFilter(value) {
        this.filters.status = value;
        this.applyFilters();
        this.render();
    },

    handleCategoryFilter(value) {
        this.filters.category = value;
        this.applyFilters();
        this.render();
    },

    showAddModal() {
        const bodyHtml = `
            <form id="eventForm">
                <div class="form-group">
                    <label class="form-label required">Nama Acara</label>
                    <input type="text" class="form-input" name="name" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Tanggal</label>
                        <input type="date" class="form-input" name="date" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Kategori</label>
                        <select class="form-select" name="category" required>
                            <option value="">Pilih...</option>
                            <option value="service">Ibadah</option>
                            <option value="fellowship">Persekutuan</option>
                            <option value="study">Pendidikan</option>
                            <option value="practice">Latihan</option>
                            <option value="celebration">Perayaan</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Waktu Mulai</label>
                        <input type="time" class="form-input" name="time" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Waktu Selesai</label>
                        <input type="time" class="form-input" name="endTime" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label required">Lokasi</label>
                    <input type="text" class="form-input" name="location" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Deskripsi</label>
                    <textarea class="form-textarea" name="description" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select class="form-select" name="status">
                        <option value="upcoming">Akan Datang</option>
                        <option value="ongoing">Sedang Berlangsung</option>
                        <option value="completed">Selesai</option>
                    </select>
                </div>
            </form>
        `;

        const footerHtml = `
            <button class="btn btn-secondary" onclick="Components.closeModal()">Batal</button>
            <button class="btn btn-primary" onclick="Events.saveEvent()">Simpan</button>
        `;

        Components.modal('Buat Acara', bodyHtml, footerHtml);
    },

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (!event) return;

        const bodyHtml = `
            <form id="eventForm">
                <input type="hidden" name="id" value="${event.id}">
                <div class="form-group">
                    <label class="form-label required">Nama Acara</label>
                    <input type="text" class="form-input" name="name" value="${event.name}" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Tanggal</label>
                        <input type="date" class="form-input" name="date" value="${event.date}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Kategori</label>
                        <select class="form-select" name="category" required>
                            <option value="service" ${event.category === 'service' ? 'selected' : ''}>Ibadah</option>
                            <option value="fellowship" ${event.category === 'fellowship' ? 'selected' : ''}>Persekutuan</option>
                            <option value="study" ${event.category === 'study' ? 'selected' : ''}>Pendidikan</option>
                            <option value="practice" ${event.category === 'practice' ? 'selected' : ''}>Latihan</option>
                            <option value="celebration" ${event.category === 'celebration' ? 'selected' : ''}>Perayaan</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label required">Waktu Mulai</label>
                        <input type="time" class="form-input" name="time" value="${event.time}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label required">Waktu Selesai</label>
                        <input type="time" class="form-input" name="endTime" value="${event.endTime}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label required">Lokasi</label>
                    <input type="text" class="form-input" name="location" value="${event.location}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Deskripsi</label>
                    <textarea class="form-textarea" name="description" rows="3">${event.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select class="form-select" name="status">
                        <option value="upcoming" ${event.status === 'upcoming' ? 'selected' : ''}>Akan Datang</option>
                        <option value="ongoing" ${event.status === 'ongoing' ? 'selected' : ''}>Sedang Berlangsung</option>
                        <option value="completed" ${event.status === 'completed' ? 'selected' : ''}>Selesai</option>
                    </select>
                </div>
            </form>
        `;

        const footerHtml = `
            <button class="btn btn-secondary" onclick="Components.closeModal()">Batal</button>
            <button class="btn btn-primary" onclick="Events.saveEvent()">Simpan Perubahan</button>
        `;

        Components.modal('Edit Acara', bodyHtml, footerHtml);
    },

    viewEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (!event) return;

        const members = AppData.getMembers();
        const attendees = event.attendees || [];
        const attendeeNames = attendees.map(aid => {
            const member = members.find(m => m.id === aid);
            return member ? member.name : '';
        }).filter(n => n);

        const categoryLabels = {
            service: 'Ibadah',
            fellowship: 'Persekutuan',
            study: 'Pendidikan',
            practice: 'Latihan',
            celebration: 'Perayaan'
        };

        const statusLabels = {
            upcoming: 'Akan Datang',
            ongoing: 'Sedang Berlangsung',
            completed: 'Selesai'
        };

        const bodyHtml = `
            <div style="margin-bottom: 20px;">
                <h3 style="margin-bottom: 4px;">${event.name}</h3>
                <span class="badge badge-info">${categoryLabels[event.category]}</span>
                <span class="badge ${event.status === 'upcoming' ? 'badge-warning' : event.status === 'ongoing' ? 'badge-success' : 'badge-danger'}">${statusLabels[event.status]}</span>
            </div>
            
            <div style="display: grid; gap: 12px;">
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--background); border-radius: var(--radius);">
                    <span style="color: var(--text-secondary);">Tanggal</span>
                    <span>${Components.formatDate(event.date)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--background); border-radius: var(--radius);">
                    <span style="color: var(--text-secondary);">Waktu</span>
                    <span>${event.time} - ${event.endTime}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--background); border-radius: var(--radius);">
                    <span style="color: var(--text-secondary);">Lokasi</span>
                    <span>${event.location}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--background); border-radius: var(--radius);">
                    <span style="color: var(--text-secondary);">Jumlah Peserta</span>
                    <span>${attendees.length} orang</span>
                </div>
                ${event.description ? `
                <div style="padding: 12px; background: var(--background); border-radius: var(--radius);">
                    <span style="color: var(--text-secondary); display: block; margin-bottom: 4px;">Deskripsi</span>
                    <span>${event.description}</span>
                </div>
                ` : ''}
                ${attendeeNames.length > 0 ? `
                <div style="padding: 12px; background: var(--background); border-radius: var(--radius);">
                    <span style="color: var(--text-secondary); display: block; margin-bottom: 8px;">Daftar Peserta:</span>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${attendeeNames.map(name => `
                            <span class="badge badge-info">${name}</span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        const footerHtml = `
            <button class="btn btn-secondary" onclick="Components.closeModal()">Tutup</button>
            <button class="btn btn-primary" onclick="Components.closeModal(); Events.editEvent('${event.id}')">Edit</button>
        `;

        Components.modal('Detail Acara', bodyHtml, footerHtml);
    },

    saveEvent() {
        const form = document.getElementById('eventForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Validation
        if (!data.name || !data.date || !data.time || !data.endTime || !data.location || !data.category) {
            Components.toast('Mohon lengkapi data yang wajib diisi', 'error');
            return;
        }

        const id = data.id;
        
        if (id) {
            // Update existing
            const existingEvent = this.events.find(e => e.id === id);
            AppData.updateEvent(id, { ...existingEvent, ...data });
            Components.toast('Acara berhasil diperbarui', 'success');
        } else {
            // Add new
            AppData.addEvent(data);
            Components.toast('Acara berhasil dibuat', 'success');
        }

        Components.closeModal();
        this.render();
    },

    deleteEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (!event) return;

        Components.confirm(
            'Hapus Acara',
            `Apakah Anda yakin ingin menghapus "${event.name}"? Tindakan ini tidak dapat dibatalkan.`,
            () => {
                AppData.deleteEvent(id);
                Components.toast('Acara berhasil dihapus', 'success');
                this.render();
            }
        );
    }
};
