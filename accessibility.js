// Accessibility functionality
class AccessibilityManager {
    constructor() {
        this.settings = {
            fontSize: 'normal',
            grayscale: false,
            highContrast: false,
            negativeContrast: false,
            lightBackground: false,
            underlineLinks: false,
            readableFont: false
        };
        
        this.init();
        this.loadSettings();
    }

    init() {
        // Create accessibility panel if it doesn't exist
        this.createAccessibilityPanel();
        this.bindEvents();
    }

    createAccessibilityPanel() {
        // Check if panel already exists
        if (document.getElementById('accessibilityPanel')) {
            return;
        }

        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.id = 'accessibilityPanel';
        panel.innerHTML = `
            <button class="accessibility-toggle" id="accessibilityToggle" aria-label="Otwórz panel ułatwień dostępu" title="Narzędzia ułatwień dostępu">
                <i class="fas fa-universal-access"></i>
            </button>
            <div class="accessibility-content" id="accessibilityContent">
                <h3><i class="fas fa-universal-access"></i> Narzędzia ułatwień dostępu</h3>
                <div class="accessibility-controls">
                    <button class="accessibility-btn" id="increaseFontBtn" aria-label="Zwiększ rozmiar tekstu">
                        <i class="fas fa-text-height"></i> Zwiększ tekst
                    </button>
                    <button class="accessibility-btn" id="decreaseFontBtn" aria-label="Zmniejsz rozmiar tekstu">
                        <i class="fas fa-compress-alt"></i> Zmniejsz tekst
                    </button>
                    <button class="accessibility-btn" id="grayscaleBtn" aria-label="Włącz skalę szarości">
                        <i class="fas fa-adjust"></i> Skala szarości
                    </button>
                    <button class="accessibility-btn" id="highContrastBtn" aria-label="Włącz wysoki kontrast">
                        <i class="fas fa-circle-half-stroke"></i> Wysoki kontrast
                    </button>
                    <button class="accessibility-btn" id="negativeContrastBtn" aria-label="Włącz negatywny kontrast">
                        <i class="fas fa-circle"></i> Negatywny kontrast
                    </button>
                    <button class="accessibility-btn" id="lightBackgroundBtn" aria-label="Włącz jasne tło">
                        <i class="fas fa-sun"></i> Jasne tło
                    </button>
                    <button class="accessibility-btn" id="underlineLinksBtn" aria-label="Podkreśl wszystkie linki">
                        <i class="fas fa-underline"></i> Linki podkreślone
                    </button>
                    <button class="accessibility-btn" id="readableFontBtn" aria-label="Włącz czcionkę dla dyslektyków">
                        <i class="fas fa-font"></i> Czytelna czcionka
                    </button>
                    <button class="accessibility-btn reset-btn" id="resetAccessibilityBtn" aria-label="Resetuj wszystkie ustawienia">
                        <i class="fas fa-undo"></i> Reset ustawień
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
    }

    bindEvents() {
        // Toggle panel
    const toggleBtn = document.getElementById('accessibilityToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.togglePanel();
        });
    }

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('accessibilityPanel');
        if (panel && !panel.contains(e.target) && panel.classList.contains('active')) {
            this.closePanel();
        }
    });

        // Accessibility controls
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[id]');
            if (!target) return;

            switch (target.id) {
                case 'increaseFontBtn':
                    this.increaseFontSize();
                    break;
                case 'decreaseFontBtn':
                    this.decreaseFontSize();
                    break;
                case 'grayscaleBtn':
                    this.toggleGrayscale();
                    break;
                case 'highContrastBtn':
                    this.toggleHighContrast();
                    break;
                case 'negativeContrastBtn':
                    this.toggleNegativeContrast();
                    break;
                case 'lightBackgroundBtn':
                    this.toggleLightBackground();
                    break;
                case 'underlineLinksBtn':
                    this.toggleUnderlineLinks();
                    break;
                case 'readableFontBtn':
                    this.toggleReadableFont();
                    break;
                case 'resetAccessibilityBtn':
                    this.resetSettings();
                    break;
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePanel();
            }
            
            // Alt + A to toggle accessibility panel
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                this.togglePanel();
            }
        });
    }

    togglePanel() {
        const panel = document.getElementById('accessibilityPanel');
        const toggle = document.getElementById('accessibilityToggle');
        
        if (panel) {
            const isActive = panel.classList.contains('active');
            
            if (isActive) {
                // Zamykanie panelu
                panel.classList.remove('active');
                toggle.classList.remove('active');
            } else {
                // Otwieranie panelu
                panel.classList.add('active');
                toggle.classList.add('active');
            }
            
            console.log('Panel toggled, active:', !isActive); // Debug
        }
    }
    
    closePanel() {
        const panel = document.getElementById('accessibilityPanel');
        const toggle = document.getElementById('accessibilityToggle');
        
        if (panel) {
            panel.classList.remove('active');
            toggle.classList.remove('active');
        }
    }

    increaseFontSize() {
        document.body.classList.remove('small-text');
        document.body.classList.add('large-text');
        this.settings.fontSize = 'large';
        this.updateButtonState('increaseFontBtn', true);
        this.updateButtonState('decreaseFontBtn', false);
        this.saveSettings();
    }

    decreaseFontSize() {
        document.body.classList.remove('large-text');
        document.body.classList.add('small-text');
        this.settings.fontSize = 'small';
        this.updateButtonState('decreaseFontBtn', true);
        this.updateButtonState('increaseFontBtn', false);
        this.saveSettings();
    }

    toggleGrayscale() {
        this.settings.grayscale = !this.settings.grayscale;
        document.body.classList.toggle('grayscale', this.settings.grayscale);
        this.updateButtonState('grayscaleBtn', this.settings.grayscale);
        this.saveSettings();
    }

    toggleHighContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        document.body.classList.toggle('high-contrast', this.settings.highContrast);
        this.updateButtonState('highContrastBtn', this.settings.highContrast);
        
        // Disable negative contrast if high contrast is enabled
        if (this.settings.highContrast && this.settings.negativeContrast) {
            this.toggleNegativeContrast();
        }
        
        this.saveSettings();
    }

    toggleNegativeContrast() {
        this.settings.negativeContrast = !this.settings.negativeContrast;
        document.body.classList.toggle('negative-contrast', this.settings.negativeContrast);
        this.updateButtonState('negativeContrastBtn', this.settings.negativeContrast);
        
        // Disable high contrast if negative contrast is enabled
        if (this.settings.negativeContrast && this.settings.highContrast) {
            this.toggleHighContrast();
        }
        
        this.saveSettings();
    }

    toggleLightBackground() {
        this.settings.lightBackground = !this.settings.lightBackground;
        document.body.classList.toggle('light-background', this.settings.lightBackground);
        this.updateButtonState('lightBackgroundBtn', this.settings.lightBackground);
        this.saveSettings();
    }

    toggleUnderlineLinks() {
        this.settings.underlineLinks = !this.settings.underlineLinks;
        document.body.classList.toggle('underline-links', this.settings.underlineLinks);
        this.updateButtonState('underlineLinksBtn', this.settings.underlineLinks);
        this.saveSettings();
    }

    toggleReadableFont() {
        this.settings.readableFont = !this.settings.readableFont;
        document.body.classList.toggle('readable-font', this.settings.readableFont);
        this.updateButtonState('readableFontBtn', this.settings.readableFont);
        this.saveSettings();
    }

    resetSettings() {
        // Remove all accessibility classes
        document.body.classList.remove(
            'large-text', 'small-text', 'grayscale', 'high-contrast', 
            'negative-contrast', 'light-background', 'underline-links', 'readable-font'
        );

        // Reset settings object
        this.settings = {
            fontSize: 'normal',
            grayscale: false,
            highContrast: false,
            negativeContrast: false,
            lightBackground: false,
            underlineLinks: false,
            readableFont: false
        };

        // Update all button states
        this.updateAllButtonStates();
        this.saveSettings();
        
        // Show confirmation
        this.showNotification('Ustawienia dostępności zostały zresetowane');
    }

    updateButtonState(buttonId, isActive) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.toggle('active', isActive);
        }
    }

    updateAllButtonStates() {
        this.updateButtonState('increaseFontBtn', this.settings.fontSize === 'large');
        this.updateButtonState('decreaseFontBtn', this.settings.fontSize === 'small');
        this.updateButtonState('grayscaleBtn', this.settings.grayscale);
        this.updateButtonState('highContrastBtn', this.settings.highContrast);
        this.updateButtonState('negativeContrastBtn', this.settings.negativeContrast);
        this.updateButtonState('lightBackgroundBtn', this.settings.lightBackground);
        this.updateButtonState('underlineLinksBtn', this.settings.underlineLinks);
        this.updateButtonState('readableFontBtn', this.settings.readableFont);
    }

    saveSettings() {
        localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('accessibilitySettings');
        if (saved) {
            try {
                this.settings = JSON.parse(saved);
                this.applySettings();
            } catch (e) {
                console.warn('Failed to load accessibility settings:', e);
            }
        }
    }

    applySettings() {
        // Apply font size
        if (this.settings.fontSize === 'large') {
            document.body.classList.add('large-text');
        } else if (this.settings.fontSize === 'small') {
            document.body.classList.add('small-text');
        }

        // Apply other settings
        document.body.classList.toggle('grayscale', this.settings.grayscale);
        document.body.classList.toggle('high-contrast', this.settings.highContrast);
        document.body.classList.toggle('negative-contrast', this.settings.negativeContrast);
        document.body.classList.toggle('light-background', this.settings.lightBackground);
        document.body.classList.toggle('underline-links', this.settings.underlineLinks);
        document.body.classList.toggle('readable-font', this.settings.readableFont);

        // Update button states
        setTimeout(() => {
            this.updateAllButtonStates();
        }, 100);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10001;
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        // Add animation keyframes
        if (!document.querySelector('#accessibility-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'accessibility-notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize accessibility manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityManager();
});

// Also initialize if document is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AccessibilityManager();
    });
} else {
    new AccessibilityManager();
}

// Zamknij panel przy kliknięciu poza nim
document.addEventListener('click', (e) => {
    const panel = document.getElementById('accessibilityPanel');
    const toggle = document.getElementById('accessibilityToggle');
    
    if (panel && panel.classList.contains('active')) {
        if (!panel.contains(e.target)) {
            this.closePanel();
        }
    }
});

// Zamknij panel przy naciśnięciu Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        this.closePanel();
    }
});