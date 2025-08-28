# System Zarządzania Wydarzeniami Gminnymi

## Opis projektu

Kompletna strona internetowa z systemem CMS do zarządzania wydarzeniami dla gminy. Strona zawiera:

- **Stronę główną** z prezentacją wydarzeń
- **System logowania** dla administratora
- **Panel CMS** do zarządzania treścią i wydarzeniami
- **Responsywny design** dostosowany do wszystkich urządzeń

## Funkcjonalności

### Strona główna:
- Prezentacja nadchodzących wydarzeń w atrakcyjnym układzie
- Sekcje: Hero, Wydarzenia, Program, Prelegenci, Partnerzy, O nas, Kontakt
- Kategoryzacja wydarzeń (kultura, edukacja, sport, społeczne)
- Responsywny design

### Panel administratora:
- **Login:** Admin
- **Hasło:** Admin
- Edycja wszystkich tekstów na stronie
- Zarządzanie wydarzeniami (dodawanie, edycja, usuwanie)
- Intuicyjny interfejs z zakładkami

### Nowe funkcjonalności:
- **Sekcja Program i Agenda** - szczegółowy harmonogram wydarzeń z podziałem na dni
- **Sekcja Prelegenci** - prezentacja ekspertów i prowadzących wydarzenia
- **Sekcja Partnerzy** - lista organizacji wspierających wydarzenia
- **Rozszerzona sekcja Kontakt** - formularz kontaktowy z walidacją

## Domyślne wydarzenia

Strona zawiera 6 przykładowych wydarzeń:

1. **Klub Książki** - "Lalka" Bolesława Prusa
2. **Warsztaty garncarskie** dla dzieci
3. **Spotkanie z mieszkańcami** - planowane inwestycje
4. **Turniej szachowy** o Puchar Wójta
5. **Koncert zespołu** "Gminne Nuty"
6. **Warsztaty ekologiczne** - "Zielona Gmina"

## Jak używać

### Uruchomienie strony:
1. Otwórz plik `index.html` w przeglądarce
2. Strona działa lokalnie bez potrzeby serwera

### Logowanie do panelu admin:
1. Kliknij "Panel Admin" w górnym menu
2. Wprowadź dane logowania:
   - **Nazwa użytkownika:** Admin
   - **Hasło:** Admin
3. Po zalogowaniu masz dostęp do dwóch zakładek:
   - **Treść strony** - edycja wszystkich tekstów
   - **Wydarzenia** - zarządzanie wydarzeniami

### Zarządzanie treścią:
- Edytuj tytuły, opisy, dane kontaktowe
- Edytuj tytuły wszystkich sekcji (Program, Prelegenci, Partnerzy, Kontakt)
- Kliknij "Zapisz zmiany" aby zaktualizować stronę

### Zarządzanie wydarzeniami:
- **Dodawanie:** Kliknij "Dodaj nowe wydarzenie"
- **Edycja:** Kliknij przycisk "Edytuj" przy wydarzeniu
- **Usuwanie:** Kliknij przycisk "Usuń" przy wydarzeniu

### Formularz kontaktowy:
- Wypełnij wszystkie wymagane pola
- Wybierz temat z listy rozwijanej
- Wyraź zgodę na przetwarzanie danych
- Po wysłaniu otrzymasz potwierdzenie

## Przechowywanie danych

Wszystkie dane są przechowywane lokalnie w przeglądarce (localStorage):
- Wydarzenia
- Treść strony
- Ustawienia

Dane pozostają zapisane nawet po odświeżeniu strony.

## Dostosowanie

### Zmiana danych logowania:
W pliku `script.js`, znajdź linię:
```javascript
if (username === 'Admin' && password === 'Admin') {
```
I zmień wartości na swoje.

### Dodanie nowych kategorii wydarzeń:
1. W HTML dodaj nową opcję w `<select id="eventCategory">`
2. W CSS dodaj style dla nowej kategorii
3. W JavaScript dodaj nazwę kategorii w funkcji `getCategoryName()`

### Personalizacja wyglądu:
- Edytuj plik `style.css`
- Zmień kolory w zmiennych CSS
- Dostosuj fonty i rozmiary

## Struktura plików

```
GminaEvents/
├── index.html          # Główny plik HTML
├── script.js           # Logika aplikacji i CMS
├── style.css           # Style i responsywność
└── README.md           # Ta dokumentacja
```

## Wsparcie techniczne

Strona została stworzona z użyciem:
- **HTML5** - struktura
- **CSS3** - stylowanie i responsywność
- **JavaScript (ES6+)** - funkcjonalność i CMS
- **Font Awesome** - ikony
- **localStorage** - przechowywanie danych

## Kompatybilność

Strona działa we wszystkich nowoczesnych przeglądarkach:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

**Autor:** AI Assistant  
**Data:** 2024  
**Licencja:** Do użytku przez gminę
