// System zarządzania wydarzeniami dla gminy
class EventsManager {
    constructor() {
        this.isLoggedIn = false;
        this.events = this.loadEvents();
        this.content = this.loadContent();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderEvents();
        this.loadPageContent();
        this.initImageAnimations();
    }

    // Domyślne dane
    getDefaultEvents() {
        return [
            {
                id: 1,
                title: "Festival Jesieni Hugonówka 2025 - Dzień Pierwszy",
                date: "2025-10-03",
                time: "10:00",
                location: "Plac Centralny Hugonówka",
                description: "Pierwszy dzień wielkiego festiwalu jesiennego! Program obejmuje: koncerty lokalnych artystów, targi rękodzieła, degustacja lokalnych produktów, warsztaty dla dzieci i dorosłych. Wydarzenie organizowane po raz pierwszy w naszej gminie!",
                category: "kultura"
            },
            {
                id: 2,
                title: "Festival Jesieni Hugonówka 2025 - Dzień Drugi",
                date: "2025-10-04",
                time: "10:00",
                location: "Plac Centralny Hugonówka",
                description: "Drugi dzień festiwalu jesiennego z jeszcze bogatszym programem! W programie: konkurs najpiękniejszej dekoracji jesiennej, pokazy kulinarne, koncert gwiazdy wieczoru, pokaz sztucznych ogni. Zakończenie pierwszego wielkiego wydarzenia w Hugonówce!",
                category: "kultura"
            },
            {
                id: 3,
                title: "Warsztaty garncarskie dla dzieci",
                date: "2025-10-03",
                time: "14:00",
                location: "Dom Kultury Hugonówka",
                description: "W ramach Festivalu Jesieni - zajęcia kreatywne dla dzieci w wieku 6-12 lat. Nauka podstaw garncarstwa i tworzenie własnych ceramicznych dzieł o tematyce jesiennej.",
                category: "edukacja"
            },
            {
                id: 4,
                title: "Koncert zespołu folkowego 'Jesienne Echo'",
                date: "2025-10-04",
                time: "19:00",
                location: "Amfiteatr Hugonówka",
                description: "Koncert finałowy Festivalu Jesieni w wykonaniu renomowanego zespołu folkowego. Repertuar obejmuje tradycyjne pieśni ludowe oraz współczesne interpretacje o tematyce jesiennej i przyrody.",
                category: "kultura"
            },
            {
                id: 5,
                title: "Klub Książki - spotkanie inauguracyjne",
                date: "2025-10-03",
                time: "16:00",
                location: "Biblioteka Hugonówka",
                description: "Pierwsze spotkanie nowo utworzonego Klubu Książki w ramach Festivalu Jesieni. Omówienie planów na przyszłość i dyskusja o literaturze związanej z naturą i zmianami pór roku.",
                category: "kultura"
            },
            {
                id: 6,
                title: "Warsztaty ekologiczne - 'Zielona Hugonówka'",
                date: "2025-10-04",
                time: "11:00",
                location: "Park Hugonówka",
                description: "W ramach Festivalu Jesieni - edukacja ekologiczna dla całych rodzin. Sadzenie drzew, nauka segregacji odpadów i tworzenie hoteli dla owadów. Specjalny program o jesiennej przyrodzie.",
                category: "edukacja"
            }
        ];
    }

    getDefaultContent() {
        return {
            heroTitle: "Festival Jesieni Hugonówka 2025",
            heroDescription: "Po raz pierwszy w historii naszej gminy organizujemy wielki Festival Jesieni! 3-4 października 2025 roku zapraszamy na dwudniowe święto kultury, natury i lokalnej społeczności. Bądź częścią tego wyjątkowego wydarzenia!",
            aboutTitle: "O nas",
            aboutDescription: "Hugonówka to miejsce, gdzie tradycja spotyka się z nowoczesnością, a natura z kulturą. Pierwszy Festival Jesieni w październiku 2025 roku to początek nowej tradycji - wielkiego wydarzenia łączącego mieszkańców w świętowaniu jesiennej przyrody i lokalnego dziedzictwa.",
            contactAddress: "ul. Główna 1, 32-760 Hugonówka",
            contactPhone: "+48 123 456 789",
            contactEmail: "kontakt@hugonowka.pl",
            programTitle: "Program i Agenda",
            speakersTitle: "Prelegenci",
            partnersTitle: "Partnerzy",
            contactTitle: "Kontakt"
        };
    }

    // Local Storage Management
    loadEvents() {
        const saved = localStorage.getItem('gminaEvents');
        return saved ? JSON.parse(saved) : this.getDefaultEvents();
    }

    saveEvents() {
        localStorage.setItem('gminaEvents', JSON.stringify(this.events));
    }

    loadContent() {
        const saved = localStorage.getItem('gminaContent');
        return saved ? JSON.parse(saved) : this.getDefaultContent();
    }

    saveContent() {
        localStorage.setItem('gminaContent', JSON.stringify(this.content));
    }

    // Event Listeners
    setupEventListeners() {
        // Login modal
        document.getElementById('adminLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginModal();
        });

        document.querySelector('.close').addEventListener('click', () => {
            this.hideLoginModal();
        });

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Admin panel
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });

        // Content management
        document.getElementById('saveContentBtn').addEventListener('click', () => {
            this.savePageContent();
        });

        // Events management
        document.getElementById('addEventBtn').addEventListener('click', () => {
            this.showEventForm();
        });

        document.getElementById('eventEditForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEvent();
        });

        document.getElementById('cancelEventBtn').addEventListener('click', () => {
            this.hideEventForm();
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Program tabs
        document.querySelectorAll('.program-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchProgramTab(tab.dataset.day);
            });
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm();
        });

        // Dropdown menu - improved handling
        document.addEventListener('click', (e) => {
            const dropdownToggle = e.target.closest('.dropdown-toggle');
            const dropdown = e.target.closest('.dropdown');
            
            if (dropdownToggle) {
                e.preventDefault();
                e.stopPropagation();
                const parentDropdown = dropdownToggle.closest('.dropdown');
                if (parentDropdown) {
                    console.log('Toggling dropdown:', parentDropdown); // Debug log
                    parentDropdown.classList.toggle('active');
                }
            } else if (!dropdown) {
                // Close all dropdowns when clicking outside
                document.querySelectorAll('.dropdown.active').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });

        // Additional fallback for dropdown toggle
        document.addEventListener('DOMContentLoaded', () => {
            const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
            console.log('Found dropdown toggles:', dropdownToggles.length); // Debug
            dropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const parentDropdown = toggle.closest('.dropdown');
                    if (parentDropdown) {
                        // Close other dropdowns first
                        document.querySelectorAll('.dropdown.active').forEach(d => {
                            if (d !== parentDropdown) {
                                d.classList.remove('active');
                            }
                        });
                        parentDropdown.classList.toggle('active');
                        console.log('Dropdown toggled:', parentDropdown.classList.contains('active')); // Debug
                    }
                });
            });
        });

        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    // Authentication
    showLoginModal() {
        document.getElementById('loginModal').style.display = 'block';
    }

    hideLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Proste uwierzytelnienie (w rzeczywistej aplikacji używaj bezpieczniejszych metod)
        if (username === 'Admin' && password === 'Admin') {
            this.isLoggedIn = true;
            this.hideLoginModal();
            this.showAdminPanel();
            this.loadAdminData();
        } else {
            alert('Nieprawidłowa nazwa użytkownika lub hasło!');
        }

        // Wyczyść formularz
        document.getElementById('loginForm').reset();
    }

    logout() {
        this.isLoggedIn = false;
        this.hideAdminPanel();
    }

    showAdminPanel() {
        document.getElementById('adminPanel').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hideAdminPanel() {
        document.getElementById('adminPanel').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Tab Management
    switchTab(tabName) {
        // Remove active from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));

        // Add active to clicked tab and corresponding content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    // Content Management
    loadPageContent() {
        document.getElementById('heroTitle').textContent = this.content.heroTitle;
        document.getElementById('heroDescription').textContent = this.content.heroDescription;
        document.getElementById('aboutTitle').textContent = this.content.aboutTitle;
        document.getElementById('aboutDescription').textContent = this.content.aboutDescription;
        document.getElementById('contactAddress').textContent = this.content.contactAddress;
        document.getElementById('contactPhone').textContent = this.content.contactPhone;
        document.getElementById('contactEmail').textContent = this.content.contactEmail;
        document.getElementById('programTitle').textContent = this.content.programTitle;
        document.getElementById('speakersTitle').textContent = this.content.speakersTitle;
        document.getElementById('partnersTitle').textContent = this.content.partnersTitle;
        document.getElementById('contactTitle').textContent = this.content.contactTitle;
    }

    loadAdminData() {
        // Load content for editing
        document.getElementById('editHeroTitle').value = this.content.heroTitle;
        document.getElementById('editHeroDescription').value = this.content.heroDescription;
        document.getElementById('editAboutTitle').value = this.content.aboutTitle;
        document.getElementById('editAboutDescription').value = this.content.aboutDescription;
        document.getElementById('editContactAddress').value = this.content.contactAddress;
        document.getElementById('editContactPhone').value = this.content.contactPhone;
        document.getElementById('editContactEmail').value = this.content.contactEmail;
        document.getElementById('editProgramTitle').value = this.content.programTitle;
        document.getElementById('editSpeakersTitle').value = this.content.speakersTitle;
        document.getElementById('editPartnersTitle').value = this.content.partnersTitle;
        document.getElementById('editContactTitle').value = this.content.contactTitle;

        // Load events for admin
        this.renderAdminEvents();
    }

    savePageContent() {
        this.content = {
            heroTitle: document.getElementById('editHeroTitle').value,
            heroDescription: document.getElementById('editHeroDescription').value,
            aboutTitle: document.getElementById('editAboutTitle').value,
            aboutDescription: document.getElementById('editAboutDescription').value,
            contactAddress: document.getElementById('editContactAddress').value,
            contactPhone: document.getElementById('editContactPhone').value,
            contactEmail: document.getElementById('editContactEmail').value,
            programTitle: document.getElementById('editProgramTitle').value,
            speakersTitle: document.getElementById('editSpeakersTitle').value,
            partnersTitle: document.getElementById('editPartnersTitle').value,
            contactTitle: document.getElementById('editContactTitle').value
        };

        this.saveContent();
        this.loadPageContent();
        alert('Treść strony została zaktualizowana!');
    }

    // Events Management
    renderEvents() {
        const container = document.getElementById('eventsContainer');
        const sortedEvents = this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        container.innerHTML = sortedEvents.map(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const categoryIcons = {
                kultura: 'fas fa-theater-masks',
                edukacja: 'fas fa-graduation-cap',
                sport: 'fas fa-trophy',
                spoleczne: 'fas fa-users',
                inne: 'fas fa-calendar'
            };

            return `
                <div class="event-card">
                    <div class="event-header">
                        <div class="event-category ${event.category}">
                            <i class="${categoryIcons[event.category]}"></i>
                            <span>${this.getCategoryName(event.category)}</span>
                        </div>
                        <div class="event-date">
                            <div class="day">${eventDate.getDate()}</div>
                            <div class="month">${eventDate.toLocaleDateString('pl-PL', { month: 'short' })}</div>
                        </div>
                    </div>
                    <div class="event-content">
                        <h3>${event.title}</h3>
                        <div class="event-details">
                            <div class="detail">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${formattedDate}</span>
                            </div>
                            <div class="detail">
                                <i class="fas fa-clock"></i>
                                <span>${event.time}</span>
                            </div>
                            <div class="detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                        <p>${event.description}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAdminEvents() {
        const container = document.getElementById('adminEventsList');
        const sortedEvents = this.events.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        container.innerHTML = sortedEvents.map(event => `
            <div class="admin-event-item">
                <div class="event-info">
                    <h4>${event.title}</h4>
                    <p>Data: ${new Date(event.date).toLocaleDateString('pl-PL')} | Godzina: ${event.time}</p>
                    <p>Miejsce: ${event.location}</p>
                </div>
                <div class="event-actions">
                    <button class="edit-btn" onclick="eventsManager.editEvent(${event.id})">
                        <i class="fas fa-edit"></i> Edytuj
                    </button>
                    <button class="delete-btn" onclick="eventsManager.deleteEvent(${event.id})">
                        <i class="fas fa-trash"></i> Usuń
                    </button>
                </div>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        const names = {
            kultura: 'Kultura',
            edukacja: 'Edukacja',
            sport: 'Sport',
            spoleczne: 'Społeczne',
            inne: 'Inne'
        };
        return names[category] || category;
    }

    showEventForm(event = null) {
        const form = document.getElementById('eventForm');
        const title = document.getElementById('eventFormTitle');
        
        if (event) {
            title.textContent = 'Edytuj wydarzenie';
            document.getElementById('eventId').value = event.id;
            document.getElementById('eventTitle').value = event.title;
            document.getElementById('eventDate').value = event.date;
            document.getElementById('eventTime').value = event.time;
            document.getElementById('eventLocation').value = event.location;
            document.getElementById('eventDescription').value = event.description;
            document.getElementById('eventCategory').value = event.category;
        } else {
            title.textContent = 'Dodaj nowe wydarzenie';
            document.getElementById('eventEditForm').reset();
            document.getElementById('eventId').value = '';
        }
        
        form.style.display = 'block';
    }

    hideEventForm() {
        document.getElementById('eventForm').style.display = 'none';
    }

    saveEvent() {
        const id = document.getElementById('eventId').value;
        const eventData = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            category: document.getElementById('eventCategory').value
        };

        if (id) {
            // Edit existing event
            const index = this.events.findIndex(e => e.id == id);
            if (index !== -1) {
                this.events[index] = { ...this.events[index], ...eventData };
            }
        } else {
            // Add new event
            const newId = Math.max(...this.events.map(e => e.id), 0) + 1;
            this.events.push({ id: newId, ...eventData });
        }

        this.saveEvents();
        this.renderEvents();
        this.renderAdminEvents();
        this.hideEventForm();
        alert('Wydarzenie zostało zapisane!');
    }

    editEvent(id) {
        const event = this.events.find(e => e.id === id);
        if (event) {
            this.showEventForm(event);
        }
    }

    deleteEvent(id) {
        if (confirm('Czy na pewno chcesz usunąć to wydarzenie?')) {
            this.events = this.events.filter(e => e.id !== id);
            this.saveEvents();
            this.renderEvents();
            this.renderAdminEvents();
            alert('Wydarzenie zostało usunięte!');
        }
    }

    // Program Management
    switchProgramTab(day) {
        // Remove active from all tabs and schedules
        document.querySelectorAll('.program-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.program-schedule').forEach(schedule => schedule.classList.remove('active'));

        // Add active to clicked tab and corresponding schedule
        document.querySelector(`[data-day="${day}"]`).classList.add('active');
        document.getElementById(day).classList.add('active');
    }

    // Contact Form Management
    handleContactForm() {
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value,
            agreement: document.getElementById('contactAgreement').checked
        };

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.agreement) {
            alert('Proszę wypełnić wszystkie wymagane pola i wyrazić zgodę na przetwarzanie danych.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Proszę podać poprawny adres email.');
            return;
        }

        // In a real application, you would send this data to a server
        // For now, we'll just show a success message and clear the form
        alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
        
        // Clear the form
        document.getElementById('contactForm').reset();
        
        // Log the contact form submission (for demo purposes)
        console.log('Contact form submitted:', formData);
    }

    // Animacje obrazów
    initImageAnimations() {
        const imageElements = document.querySelectorAll('.slide-in-image, .slide-in-right, .fade-in-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        imageElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize the application
let eventsManager;
document.addEventListener('DOMContentLoaded', () => {
    eventsManager = new EventsManager();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('loginModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});