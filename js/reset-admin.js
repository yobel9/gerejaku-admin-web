tolong// ============================================
// Reset Admin User - Jalankan di Console Browser
// ============================================

(function() {
    // Reset data
    localStorage.removeItem('churchAdminData');
    localStorage.removeItem('churchAdminSession');
    localStorage.removeItem('storageMode');
    localStorage.removeItem('databaseConfig');
    
    console.log('Data berhasil di-reset!');
    
    // Buat user admin baru
    const defaultData = {
        users: [
            {
                id: 'u1',
                name: 'Administrator',
                username: 'admin',
                password: 'admin123',
                role: 'admin',
                status: 'active'
            }
        ],
        members: [
            {
                id: '1',
                name: 'John Doe',
                gender: 'Male',
                birthDate: '1985-03-15',
                birthPlace: 'Jakarta',
                phone: '081234567890',
                email: 'john.doe@email.com',
                address: 'Jl. Merdeka No. 10',
                city: 'Jakarta Pusat',
                postalCode: '10110',
                joinDate: '2020-01-15',
                status: 'active',
                photo: null,
                notes: 'Active member of worship team'
            },
            {
                id: '2',
                name: 'Jane Smith',
                gender: 'Female',
                birthDate: '1990-07-22',
                birthPlace: 'Bandung',
                phone: '081234567891',
                email: 'jane.smith@email.com',
                address: 'Jl. Asia Afrika No. 25',
                city: 'Bandung',
                postalCode: '40111',
                joinDate: '2019-06-20',
                status: 'active',
                photo: null,
                notes: 'Sunday school teacher'
            }
        ],
        attendance: [
            {
                id: '1',
                date: new Date().toISOString().split('T')[0],
                service: 'Sunday Service',
                presentMembers: ['1', '2']
            }
        ],
        donations: [],
        expenses: [],
        structure: [
            { id: 's1', role: 'Gembala Sidang', name: 'Pdt. Andreas Simanjuntak', periodeJabatan: '2024-2028', phone: '0812-1111-2222', email: 'andreas@gerejaku.id', notes: '' },
            { id: 's2', role: 'Hamba Tuhan', name: 'Pdt. Maria Lestari', periodeJabatan: '2024-2028', phone: '0812-3333-4444', email: 'maria@gerejaku.id', notes: '' },
            { id: 's3', role: 'Ketua Majelis', name: 'Bpk. Yohanes Lim', periodeJabatan: '2025-2029', phone: '0812-5555-6666', email: 'yohanes@gerejaku.id', notes: '' },
            { id: 's4', role: 'Wakil Ketua Majelis', name: 'Bpk. Daniel Santoso', periodeJabatan: '2025-2029', phone: '0813-1234-5678', email: 'daniel@gerejaku.id', notes: '' },
            { id: 's5', role: 'Sekretaris', name: 'Ibu Deborah', periodeJabatan: '2025-2029', phone: '0812-7777-8888', email: 'deborah@gerejaku.id', notes: '' },
            { id: 's6', role: 'Bendahara', name: 'Ibu Ruth', periodeJabatan: '2025-2029', phone: '0812-8888-3434', email: 'ruth@gerejaku.id', notes: '' }
        ],
        worshipSchedules: [
            { id: 'ws1', name: 'Ibadah Raya', category: 'routine', dayOfWeek: 'Sunday', date: '', startTime: '07:00', endTime: '09:00', location: 'Gedung Gereja', recurrenceNote: '', invitationNote: '', serviceDetails: '', notes: '' },
            { id: 'ws2', name: 'Sekolah Minggu', category: 'routine', dayOfWeek: 'Sunday', date: '', startTime: '09:30', endTime: '10:45', location: 'Ruang Sekolah Minggu', recurrenceNote: '', invitationNote: '', serviceDetails: '', notes: '' },
            { id: 'ws3', name: 'Ibadah Pemuda Remaja', category: 'routine', dayOfWeek: 'Friday', date: '', startTime: '18:30', endTime: '20:00', location: 'Aula Pemuda', recurrenceNote: '', invitationNote: '', serviceDetails: '', notes: '' },
            { id: 'ws4', name: 'Ibadah Rumah Tangga', category: 'flexible', dayOfWeek: '', date: '', startTime: '19:00', endTime: '20:30', location: 'Rumah Jemaat', recurrenceNote: 'Jadwal fleksibel, ditentukan per wilayah.', invitationNote: '', serviceDetails: '', notes: '' }
        ],
        churchAnnouncements: [
            {
                id: 'ca1',
                title: 'Doa Puasa Bersama',
                date: new Date().toISOString().split('T')[0],
                type: 'general',
                status: 'published',
                content: 'Seluruh jemaat diundang mengikuti doa puasa bersama di gedung gereja pukul 18.00 WITA.'
            },
            {
                id: 'ca2',
                title: 'Pendaftaran Baptisan',
                date: new Date().toISOString().split('T')[0],
                type: 'general',
                status: 'draft',
                content: 'Pendaftaran kelas katekisasi dan baptisan dibuka sampai tanggal 5 April 2026.'
            }
        ],
        inventory: [
            {
                id: 'inv1',
                name: 'Keyboard Roland',
                category: 'music',
                quantity: 1,
                unit: 'unit',
                condition: 'good',
                location: 'Ruang Musik',
                acquiredDate: '2025-06-10',
                value: 8500000,
                photo: '',
                notes: 'Digunakan untuk ibadah raya'
            },
            {
                id: 'inv2',
                name: 'Kursi Plastik',
                category: 'furniture',
                quantity: 60,
                unit: 'buah',
                condition: 'minor_damage',
                location: 'Gudang Gereja',
                acquiredDate: '2024-01-15',
                value: 5400000,
                photo: '',
                notes: 'Sebagian perlu perbaikan kaki kursi'
            },
            {
                id: 'inv3',
                name: 'Mikrofon Wireless',
                category: 'electronic',
                quantity: 4,
                unit: 'unit',
                condition: 'good',
                location: 'Booth Operator',
                acquiredDate: '2025-11-20',
                value: 3200000,
                photo: '',
                notes: ''
            }
        ],
        events: [
            {
                id: '1',
                name: 'Sunday Service',
                date: new Date().toISOString().split('T')[0],
                time: '07:00',
                endTime: '09:00',
                location: 'Main Hall',
                category: 'service',
                priority: 'high',
                status: 'upcoming',
                description: 'Weekly Sunday worship service',
                attendees: ['1', '2']
            }
        ],
        activities: []
    };
    
    // Simpan data
    localStorage.setItem('churchAdminData', JSON.stringify(defaultData));
    
    console.log('✅ Data berhasil di-reset!');
    console.log('✅ User admin baru dibuat:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('   ');
    console.log('Silakan refresh halaman dan login dengan kredensial di atas.');
    
    // Reload halaman
    setTimeout(() => {
        window.location.reload();
    }, 1000);
})();
