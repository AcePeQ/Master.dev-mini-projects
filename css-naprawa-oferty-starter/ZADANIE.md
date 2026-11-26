# FlowSpace — naprawa komponentu oferty

Pierwszy blok powtórki Modern CSS Fundamentals: diagnozowanie CSS.

## Sytuacja

Przejmujesz gotowy komponent od innego developera. Struktura HTML i układ są przygotowane, ale po połączeniu stylów pojawiło się pięć problemów. Twoim zadaniem jest znaleźć ich przyczyny i poprawić CSS.

Otwórz index.html w przeglądarce. Live Server jest opcjonalny; projekt działa również bez serwera. Nie wymaga instalowania paczek ani dostępu do internetu.

## Zgłoszenia do poprawy

1. **Tło nagłówka oferty.** Nad zielonym fragmentem karty pojawia się biały pas, a odstępy przy jego dolnej krawędzi też są nieprawidłowe. Zielony obszar ma zaczynać się przy górnej krawędzi karty, wewnątrz obramowania. W jego środku ma być po 24 px przestrzeni od każdej krawędzi do treści. Między nagłówkiem a opisem zachowaj 12 px. Sprawdź, do którego elementu należą obecne marginesy i gdzie faktycznie się znajdują.

2. **Za mały napis przycisku.** Tekst „Wybieram Pakiet Flex” ma korzystać z rodziny fontów, rozmiaru i wysokości wiersza karty. Gdy zmienisz te trzy właściwości na karcie, przycisk ma podążać za zmianą. Nie kopiuj do niego obecnych wartości na sztywno. Pogrubienie przycisku może zostać.

3. **Obcy kolor linku kontaktowego.** Link „Napisz do nas” ma zawsze mieć taki kolor jak otaczający go tekst „Masz pytania?”. Nadal ma być podkreślony. Po zmianie koloru całego akapitu link ma zmienić się razem z nim. Nie zmieniaj z tego powodu kolorów linków nawigacji ani globalnego koloru wszystkich linków.

4. **Niewidoczny fokus.** Przejdź po stronie klawiszem Tab. Przycisk wyboru oferty ma mieć wyraźne obramowanie fokusu klawiatury, które nie przesuwa treści. Sprawdź istniejącą regułę w DevTools, zanim dodasz kolejną.

5. **Znikające wypunktowanie.** Korzyści „W pakiecie” mają być zwykłą listą z pełnymi okrągłymi punktami. Punkty mają mieścić się wewnątrz obszaru treści karty, a zawinięte wiersze mają zaczynać się pod tekstem poprzedniego wiersza. Lista nawigacji „Oferta / Kontakt” nadal ma być bez wypunktowania i bez zbędnego wcięcia.

## Granice zadania

- Zmieniasz wyłącznie style.css. HTML jest gotowy.
- Możesz poprawiać istniejące deklaracje i dodawać reguły komponentu.
- Bez !important, ujemnych marginesów maskujących problem ani sztywnych wysokości dopasowanych do obecnego tekstu.
- Nie dorabiasz logiki rezerwacji. Przycisk w tym ćwiczeniu służy do sprawdzenia stylów i fokusu.
- Nie przebudowujesz layoutu. Grid, Flex i responsywność omówimy w kolejnych blokach.

## Jak pracować

Przy każdym zgłoszeniu przejdź przez: objaw → element w DevTools → źródło właściwości → przyczyna → poprawka → sprawdzenie.

Nie musisz najpierw oglądać ponownie całego materiału. Spróbuj zdiagnozować problem, a po teorię sięgnij tam, gdzie utkniesz. SCIAGA-DEVTOOLS.md przypomina podstawowe mechanizmy.

## Kiedy kończymy

- Wszystkie pięć zgłoszeń jest poprawione.
- Sprawdzasz stronę przy szerokościach około 390 px i 1100 px oraz przycisk klawiszem Tab.
- Tymczasowo zmieniasz typografię karty i kolor akapitu kontaktowego, aby potwierdzić dziedziczenie. Potem cofasz wartości próbne.
- Wysyłasz zmieniony CSS i po jednym krótkim zdaniu o przyczynie każdego problemu. Nie potrzebujesz publikacji ani repozytorium.

Po tym zadaniu zamykamy blok diagnozowania CSS i przechodzimy do typografii oraz wspólnych stylów.
