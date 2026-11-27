# Uruchomienie

Potrzebujesz Node.js 18 lub nowszego. Nie instalujesz paczek.

1. Rozpakuj folder i otwórz w nim terminal.
2. Uruchom: **node server.mjs**.
3. Otwórz adres pokazany w terminalu: domyślnie **http://127.0.0.1:4173**.
4. Zostaw terminal uruchomiony. Serwer zatrzymasz przez Ctrl+C.

Jeżeli port jest zajęty, użyj np. **node server.mjs 4174** i otwórz adres z terminala.

Nie otwieraj index.html bezpośrednio i nie uruchamiaj tego projektu przez Live Server: gotowy serwer obsługuje zarówno pliki strony, jak i lokalne API.

## Co jest gotowe

- public/index.html i public/style.css — interfejs.
- public/js/ui.js — renderowanie stanów i kart.
- server.mjs i fixtures/rooms.json — lokalne API i przykładowe dane.
- Obsługa formularza w app.js — gotowa.

## Co piszesz

- public/js/api.js — pobieranie danych.
- public/js/normalize.js — przekształcenie danych przez destrukturyzację.
- loadRooms w public/js/app.js — połączenie operacji, stany i timer.

Po pierwszym uruchomieniu zobaczysz gotową stronę. Wyszukiwanie zacznie działać po uzupełnieniu TODO. To oczekiwany stan startera.
