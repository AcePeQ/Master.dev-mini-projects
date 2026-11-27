# Roomly — jeden projekt uzupełniający JS

Zakres: obietnice, async/await, timery, moduły ES, destrukturyzacja i debugger. Wykorzystujemy kurs JavaScript: From First Steps to Professional do uzupełnienia luk, bez kolejnej pełnej powtórki podstaw.

Zacznij od dwóch pytań w DIAGNOZA.md. Potem uruchom projekt według START.md.

## Etap A — dane i moduły

W api.js uzupełnij eksportowaną funkcję fetchRooms(criteria). Kryteria to obiekt z city, people i scenario. Zbuduj parametry, pobierz dane z /api/rooms, sprawdź response.ok, odczytaj JSON i zwróć samą tablicę rooms. Funkcja nie obsługuje DOM; przekazuje błędy do wywołującego.

Możesz skorzystać z URLSearchParams. Przykładowy adres gotowego API:

    /api/rooms?city=warszawa&people=4&scenario=normal

Odpowiedź ma opakowanie:

    {
      "query": { "city": "warszawa", "people": 4 },
      "total": 3,
      "rooms": [ ... ]
    }

Pojedyncza surowa sala:

    {
      "id": 101,
      "name": "Studio Zielone",
      "location": { "code": "warszawa", "city": "Warszawa", "district": "Wola" },
      "capacity": 6,
      "pricing": { "hourly": 85, "currency": "PLN" },
      "features": ["Wi-Fi", "Tablica"]
    }

W normalize.js funkcja normalizeRooms(rawRooms) ma zwrócić nową tablicę z nowymi obiektami w takim kształcie:

    {
      id: 101,
      title: "Studio Zielone",
      city: "Warszawa",
      district: "Wola",
      capacity: 6,
      hourlyRate: 85,
      features: ["Wi-Fi", "Tablica"]
    }

Użyj destrukturyzacji, w tym pobrania właściwości z obiektów location i pricing. Nie zmieniaj surowych obiektów. Nie musisz wykonywać głębokiej kopii całych danych — nie modyfikujesz tablicy features.

Zaimportuj obie funkcje w app.js. W tym miejscu możesz wysłać api.js i normalize.js do sprawdzenia.

## Etap B — połączenie operacji i stany

Uzupełnij loadRooms(criteria) w app.js. Obsługa formularza już ją wywołuje.

1. Od razu pokaż stan loading.
2. Uruchom timer: po 800ms trwającego wyszukiwania pokaż dodatkową informację, np. „To chwilę potrwa…”. Służy do tego gotowe showLoadingHint(message).
3. Pobierz sale, poczekaj na wynik i przekształć go przez normalizeRooms.
4. Pokaż success z przygotowaną tablicą. Pusta tablica jest poprawnym wynikiem.
5. Przy błędzie pokaż error z czytelnym komunikatem. Obsłuż zarówno błąd HTTP, odrzucenie fetch, jak i błąd odczytu JSON.
6. Wyczyść zaplanowany timer niezależnie od wyniku. Pomyśl, gdzie przyda się finally.

Gotowy widok wywołujesz przez:

    renderState({ status: "loading" });
    renderState({ status: "success", rooms: przygotowanaTablica });
    renderState({ status: "error", message: komunikat });

renderState automatycznie zmienia opis, czyści poprzednie wyniki, pokazuje pusty stan i blokuje przycisk na czas ładowania. Nie przepisujesz renderowania kart.

Timer pokazuje informację w interfejsie; nie anuluje samego żądania. W tym projekcie nie dodajesz obsługi równoległych wyszukiwań ani AbortController.

## Etap C — debugger i sprawdzenie zachowania

W rozwijanej sekcji „Scenariusz ćwiczenia” wybierasz zachowanie API. Po każdej zmianie ponownie naciśnij przycisk wyszukiwania.

| Scenariusz | Oczekiwany wynik |
| --- | --- |
| normal | Sale według miasta i pojemności; bez opóźnionej informacji |
| slow | Loading, po około 800ms dodatkowa informacja, potem sale |
| empty | Poprawnie zakończone wyszukiwanie z pustym stanem |
| http-error | HTTP 503; komunikat błędu i ponownie aktywny przycisk |
| bad-json | HTTP 200, ale błąd parsowania JSON; komunikat błędu |
| network-error | Przerwane połączenie; komunikat błędu |

Po błędzie przełącz na normal: kolejne wyszukiwanie ma działać. Dla Warszawy i 4 osób API zwróci 3 sale, dla Gdańska i 4 osób — 2. Przy 20 osobach normal również zwróci pustą tablicę.

Ustaw breakpoint na linii po await fetch w api.js. Zobacz w Scope, czym jest odpowiedź i jakie ma ok oraz status. Użyj Step over, aby dojść do odczytu JSON. Następnie włącz zatrzymywanie także na przechwyconych wyjątkach i sprawdź bad-json: ustal, na którym etapie pojawia się błąd. Wróć do breakpointów w app.js i obejrzyj surowe oraz znormalizowane dane.

Nie ograniczaj tego punktu do console.log. Napisz krótko, gdzie zatrzymał się debugger dla błędu HTTP i gdzie dla błędnego JSON.

## Zakończenie

Wysyłasz trzy swoje pliki JS i krótką obserwację z debuggera. Po etapach A–C kończymy projekt i przechodzimy do dostępności. Nie dodajemy rezerwacji, kont, zapisu danych ani kolejnych modułów aplikacji.
