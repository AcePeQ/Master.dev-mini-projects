# Roomly — formularz zapytania o rezerwację

Ostatni zaplanowany blok powtórki Modern CSS Fundamentals: formularze, selektory stanów i przejścia.

## Start

To samodzielny starter. Rozpakuj paczkę i otwórz index.html. Nie wymaga poprzednich plików Roomly, instalacji ani serwera.

HTML, responsywny układ i wygląd są gotowe. Pracujesz tylko w states.css. Gotowy demo.js zatrzymuje wysyłkę i pokazuje komunikat po przejściu natywnej walidacji. Nie piszesz JS i nie dodajesz backendu.

## 1. Fokus — użytkownik musi widzieć aktywne miejsce

- Nadaj wyraźny fokus klawiatury kontrolkom .form-control oraz przyciskom .button. Możesz użyć --focus. Fokus nie może przesuwać układu ani znikać na błędnym polu.
- Gdy fokus znajduje się wewnątrz .form-field, wyróżnij jego główną etykietę. Użyj :focus-within. Nie zmieniaj kolorów wszystkich etykiet jednocześnie.
- Sprawdź przechodzenie klawiszem Tab. Nie wyłączaj domyślnego obrysu bez zapewnienia własnego widocznego odpowiednika.

## 2. Walidacja — błąd po interakcji, nie przy pierwszym otwarciu

Reguły poprawności wynikają z gotowego HTML: required, type, minlength, min, max i step. CSS pokazuje ich stan.

- Po otwarciu pustego formularza pola i komunikaty mają być neutralne.
- Wymagane pole w stanie :user-invalid ma dostać czerwone obramowanie i delikatne tło, wykorzystując --error i --error-soft.
- Jego własny .field-error ma stać się widoczny. Użyj :has() na opakowaniu .form-field, aby zareagować na stan kontrolki w środku.
- Wymagane pole w stanie :user-valid ma otrzymać zielone obramowanie. Puste opcjonalne textarea nie powinno być oznaczane jako poprawnie uzupełnione.
- Po poprawieniu wartości komunikat błędu ma zniknąć. Nie dopisuj na stałe aria-invalid do HTML.
- Zostaw natywną walidację przeglądarki. Nie dodawaj novalidate ani nie blokuj możliwości naciśnięcia przycisku na pustym formularzu.

Moment wejścia w stany user-* zależy od interakcji i zachowania przeglądarki. Testuj wpisanie błędnej wartości, opuszczenie pola oraz próbę wysłania formularza.

## 3. Dodatkowe wyposażenie — :has(), :checked i :disabled

- Ustaw accent-color natywnych checkboxów na kolor marki. Nie zastępujesz ich własnymi elementami.
- Zaznaczenie #projector ma wyróżniać cały otaczający go kafelek .addon-option przez zmianę obramowania i tła. Użyj :has().
- Kafelek z wyłączonym checkboxem ma mieć wizualnie odróżniony, nieaktywny stan. Tekst nadal musi być czytelny, a kursor nie powinien sugerować aktywnego przycisku. Nie usuwaj disabled.
- Informacja .addon-note jest widoczna tylko po zaznaczeniu projektora. Nie jest komunikatem o poprawności całego formularza.

## 4. Przejścia — transform, opacity i ograniczenie ruchu

- Główny przycisk na :hover oraz :focus-visible lekko przesuwa się w górę i zmienia kolor tła. Na :active wraca do pozycji bazowej.
- Zmiany mają mieć krótkie przejście, np. 160–200ms. Definiuj transition w stanie bazowym i wymień konkretne właściwości zamiast używać all.
- Informacja .addon-note ma pojawiać się przez zmianę opacity i niewielkiego translateY. Możesz połączyć opacity z visibility. Zarezerwowane miejsce na informację może pozostać w układzie także po jej ukryciu.
- Nie wykorzystuj display: none do elementu, którego opacity ma płynnie przechodzić między stanami. W tym ćwiczeniu nie animujesz wysokości.
- Przy prefers-reduced-motion: reduce wyłącz przesunięcia i niepotrzebne przejścia. Informacja oraz stany przycisku nadal muszą działać.

## Sprawdzenie i zakończenie

1. Odśwież pusty formularz: brak czerwonych pól i komunikatów.
2. Wpisz a w imię, abc w e-mail oraz 7 w liczbę osób. Opuść pola lub spróbuj wysłać formularz: sprawdź ich stany i własne komunikaty.
3. Popraw na Jan Testowy, ola@example.com i 4. Wybierz datę i czas spotkania. Sprawdź, czy błędy znikają i wymagane pola mają stan poprawny.
4. Zaznacz i odznacz projektor. Catering pozostaje nieaktywny.
5. Przejdź formularz klawiszem Tab. Sprawdź przycisk, kliknięcie oraz ustawienie ograniczonego ruchu w DevTools.
6. Naciśnij Wyślij zapytanie po poprawnym uzupełnieniu: gotowa demonstracja potwierdzi walidację, bez wysyłania danych. Wyczyść przywraca wartości startowe.

Sprawdź też szerokości około 390px i 1100px. Nie przebudowujesz przygotowanego układu.

Wyślij states.css. Zacznij od punktów 1–2; możesz pokazać ten fragment przed przejściem do checkboxów i ruchu. Po opisanych czterech punktach zamykamy ten blok. Nie dodajesz modali, płatności ani dalszej logiki rezerwacji.
