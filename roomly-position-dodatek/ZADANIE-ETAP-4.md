# Roomly — pozycjonowanie i warstwy

Blok 4: relative, absolute, fixed, sticky, z-index, konteksty nakładania i pseudo-element.

## Jak uruchomić dodatek

To rozszerzenie Twojego obecnego Roomly, a nie nowy projekt od zera.

1. Skopiuj pięć plików z tej paczki do folderu, w którym masz własne appearance.css i layout.css.
2. Zachowaj oba swoje arkusze. Ta paczka ich nie zawiera i nie nadpisuje.
3. Otwórz etap-4.html. Wczytuje Twoje arkusze oraz nowe extras.css i position.css.
4. Reguły do zadania piszesz w position.css. HTML oraz wygląd nowych elementów są przygotowane.

Nie musisz przepisywać layoutu. extras.css zawiera gotowe wyglądy oraz celowy problem z warstwami.

## 1. Oznaczenie na ilustracji — relative, absolute i pseudo-element

Na trzech kartach Studio Zielone znajduje się span .room-card__badge z tekstem „Polecana”. Jego rodzicem jest .room-card__visual.

- Umieść oznaczenie 12px od górnej i prawej krawędzi ilustracji.
- Ma odnosić się do ilustracji własnej karty, również gdy container query przełącza kartę na układ poziomy.
- Oznaczenie nie ma zajmować dodatkowego miejsca w układzie ani zwiększać wysokości ilustracji.
- Przed napisem dodaj małą, pełną kropkę przez ::before. To dekoracja: wykorzystaj pustą treść pseudo-elementu, rozmiar i zaokrąglenie. Nie dodawaj nowego elementu HTML.

## 2. Powrót na górę — fixed

Gotowy link .back-to-top znajduje się pod stopką. Strzałka i wygląd są gotowe.

- Ustaw go 16px od dolnej i prawej krawędzi okna.
- Ma pozostawać w tym miejscu podczas przewijania.
- Ma być widoczny nad zwykłą treścią i nadal dostępny klawiszem Tab.
- To zwykły link do #main. Nie dodajesz obsługi JS ani animowanego przewijania.

## 3. Nagłówek i filtry — sticky

W układzie szerokim, powyżej 850px:

- .site-header ma przyklejać się przy górnej krawędzi okna. Zachowuje swoje miejsce w układzie.
- .filters-panel, czyli panel „Dopasuj miejsce”, ma przyklejać się niżej, aby nie chował się pod nagłówkiem. Zacznij od odsunięcia 6.5rem i sprawdź je przy swoim układzie nagłówka.
- Przyklejasz sam panel filtrów, a nie całe .catalog-sidebar razem z dodatkową kartą.
- Nagłówek ma pozostawać nad przewijaną treścią. Panel filtrów może poruszać się tylko w granicach swojej kolumny.
- Nie dodawaj sztywnej wysokości całej strony ani sztucznego przewijania do panelu. Jeśli sticky nie działa, zbadaj wysokość i overflow jego przodków.

Przy szerokości 850px lub mniejszej nagłówek i filtry mają pozostawać w zwykłym przepływie. Sprawdź desktop przy wysokości okna wystarczającej do wyświetlenia całego panelu filtrów.

## 4. Menu zasłaniane przez kartę — z-index i stacking context

W pasku wyszukiwania otwórz „Jak działa rezerwacja?”. Element details zapewnia otwieranie także klawiaturą.

Panel jest już pozycjonowany, ale po otwarciu jego część zostaje zasłonięta przez wyróżnioną ofertę. W extras.css są celowo ustawione warstwy powodujące ten problem.

- Menu ma w całości wyświetlać się nad kartami.
- Podczas przewijania nadal ma znajdować się pod przyklejonym nagłówkiem.
- Napraw reguły w position.css. Zbadaj panel i jego przodków zamiast zwiększać tylko jego własny z-index.
- Zastąp 9999 małą, uzasadnioną wartością. Uporządkuj relację: zwykłe karty → otwarte menu → nagłówek.
- Otwieranie panelu nie powinno przesuwać kart.

## Kiedy kończymy

Sprawdź ekran około 390px oraz 1280px. Na szerokim ekranie przewiń stronę, otwórz menu i zobacz, jak zachowuje się względem kart i nagłówka. Sprawdź też oznaczenie na pionowej oraz poziomej karcie. Zachowaj widoczny fokus linków i summary.

Wyślij position.css i krótko wyjaśnij:

1. Dlaczego oznaczenie potrzebuje ustalonego przodka do pozycjonowania?
2. Dlaczego z-index: 9999 nie wystarczył panelowi menu?

Zakres kończy się na tych czterech punktach. Nie dodajesz rezerwacji, modali ani dalszej logiki aplikacji. Możesz zacząć od punktów 1–2 i pokazać ten fragment.
