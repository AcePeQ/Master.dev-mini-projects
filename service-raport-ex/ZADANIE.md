**Panel zgłoszeń — zadanie DOM i zdarzenia**

**Cel**

Połącz wcześniejsze dane i raport z interfejsem przeglądarkowym. Gotowe są HTML, CSS, przykładowe dane oraz szablon karty. Logikę aplikacji napisz w script.js. Możesz wykorzystać własne createNewTicket() i buildServiceReport(). Format wcześniejszego raportu pozostaje Twoją decyzją.

**Uruchomienie i pliki**

Rozpakuj archiwum i otwórz index.html w przeglądarce. Możesz też uruchomić katalog przez lokalny serwer.

- index.html: gotowy widok oraz template pojedynczej karty.
- style.css: gotowy wygląd i responsywność.
- data.js: sześć zgłoszeń w tablicy tickets.
- script.js: miejsce na Twoją implementację; zawiera tylko komentarze.
- DOM-NOTATKA.md: krótkie przypomnienie teorii.
- ZADANIE.md: ten opis.

Oba skrypty mają defer. data.js jest wcześniej niż script.js, dlatego tablica tickets jest dostępna w drugim pliku.

Sześć kart i liczniki w HTML pokazują przykładowy stan początkowy. Pierwsze renderowanie napisane przez Ciebie powinno zastąpić zawartość listy. Template możesz klonować albo samodzielnie tworzyć odpowiadające mu elementy. Widok działa jako makieta, dopóki nie dopiszesz JavaScriptu.

**Zachowanie aplikacji**

1. Początkowo pokaż wszystkie sześć zgłoszeń na podstawie danych. Zachowaj ich kolejność.
2. Uzupełniaj brakujący priorytet wartością 2 i brakujące godziny wartością 1. Brak przypisanej osoby lub jej nazwy oznacza napis Nieprzypisane. Brak oznacza tutaj null albo undefined; podane 0 zachowujesz.
3. Wyszukiwanie dotyczy fragmentu tytułu. Pomija wielkość liter i zewnętrzne spacje frazy. Uruchom je po wysłaniu formularza przyciskiem Szukaj albo Enterem. Strona pozostaje otwarta bez przeładowania.
4. Zmiana selecta statusu od razu odświeża listę, uwzględniając frazę aktualnie wpisaną w polu wyszukiwania. all oznacza każdy status. Wyszukiwanie i status działają łącznie.
5. Przycisk Zamknij zmienia status wskazanego zgłoszenia na closed. Pozostałe dane tego zgłoszenia i inne zgłoszenia pozostają bez zmian. Po operacji odśwież widok i podsumowanie, zachowując wybrane filtry.
6. Zamknięte zgłoszenie ma nieaktywny przycisk z tekstem Zamknięte. Ponowne zamknięcie nie powoduje dodatkowych zmian.
7. Obsługę wszystkich przycisków zamykania oprzyj na jednym listenerze kliknięć na #ticket-list, zarejestrowanym raz. Kliknięcie w SVG, jego ścieżkę, napis lub tło przycisku ma zamykać ten sam rekord. Kliknięcie poza przyciskiem niczego nie zamyka.
8. Po dowolnej liczbie ponownych renderowań przyciski nadal działają, a pojedyncze kliknięcie powoduje jedną operację.
9. Wyniki bez dopasowania: pusta lista, widoczny #empty-state i napis Liczba wyników: 0. Po zmianie filtrów lista może znów się pojawić.
10. Cztery liczniki zawsze dotyczą CAŁEJ aktualnej tablicy danych: wszystkie, aktywne, pilne aktywne oraz godziny aktywnych. Filtry zmieniają tylko listę i liczbę wyników.
11. Stan aplikacji jest przechowywany w pamięci. Ponowne załadowanie strony przywraca przykładowe dane.

Za aktywne uznaj open i in_progress. Pilne aktywne mają dodatkowo priorytet 0 albo 1. Godziny sumujesz wyłącznie dla aktywnych rekordów.

**Elementy widoku**

| Element | Selektor lub atrybut |
| --- | --- |
| Formularz | #filters-form |
| Fraza wyszukiwania | #ticket-search |
| Status | #status-filter |
| Lista | #ticket-list |
| Karta | .ticket-card oraz data-ticket-id |
| Szablon karty | #ticket-template |
| Przycisk karty | button[data-action="close"] |
| Liczba widocznych wyników | #results-count |
| Pusty widok | #empty-state |
| Wszystkie zgłoszenia | #total-count |
| Aktywne | #active-count |
| Pilne aktywne | #urgent-count |
| Godziny aktywnych | #hours-count |

Karta ma data-status i data-priority: CSS używa ich do kolorowania etykiet. W szablonie pola oznaczono atrybutami data-field: status, priority, title, id, assignee, hours oraz action-label.

Teksty statusów: open = Otwarte, in_progress = W trakcie, closed = Zamknięte.
Teksty priorytetów: 0 = Pilny, 1 = Wysoki, 2 = Normalny, 3 = Niski.

**Sprawdzenie zachowania**

Każdy wiersz tabeli zaczynaj od świeżo załadowanych danych, chyba że zaznaczono inaczej.

| Przypadek | Oczekiwany wynik |
| --- | --- |
| Początek | 6 kart; liczniki 6 / 4 / 2 / 5 h |
| Status open | ID 1, 4, 5; liczniki nadal 6 / 4 / 2 / 5 h |
| Status in_progress | Tylko ID 2 |
| Status closed | ID 3 i 6 |
| Fraza LOGOWANIEM i all | Tylko ID 4 |
| Fraza płatności i open | 0 kart i pusty widok |
| Zamknięcie ID 2 przy all | Nadal 6 kart, ID 2 ma status closed i nieaktywny przycisk |
| Podsumowanie po zamknięciu ID 2 | 6 / 3 / 1 / 2 h |
| Zamknięcie ID 2 przy in_progress | 0 kart i pusty widok, filtr pozostaje in_progress |
| Kliknięcie ikony przy ID 2 | Ten sam rezultat jak po kliknięciu napisu przycisku |
| Wielokrotne filtrowanie | Przyciski nadal działają po ponownym renderowaniu |

**Pytania do review**

- Dlaczego defer pozwala odczytać elementy z HTML?
- Co jest event.target, gdy klikniesz ścieżkę SVG? Co jest event.currentTarget w listenerze na liście?
- Dlaczego wymiana kart nie wymaga ponownego dodawania listenera do kontenera?
- Co zrobi closest(), gdy klikniesz poza przyciskiem?
- Dlaczego wysłanie formularza wymaga obsługi działania domyślnego?
- Jak odróżnisz brak godzin od prawidłowego 0?

Zacznij od renderowania sześciu kart z danych. Kolejność wdrażania pozostałych zachowań i podział na funkcje wybierz sam.
