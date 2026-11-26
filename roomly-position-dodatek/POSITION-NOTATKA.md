# Pozycjonowanie — szybkie przypomnienie

| Wartość position | Miejsce w zwykłym układzie | Zastosowanie w zadaniu |
| --- | --- | --- |
| static | Zostaje | Zwykły przepływ na telefonie |
| relative | Zostaje | Punkt odniesienia dla oznaczenia |
| absolute | Nie rezerwuje miejsca | Oznaczenie na ilustracji |
| fixed | Nie rezerwuje miejsca | Link przy krawędzi okna |
| sticky | Zachowuje miejsce | Przyklejany nagłówek i filtry |

## Do czego odnoszą się odsunięcia?

W tym układzie element absolute może liczyć odsunięcia od najbliższego odpowiednio pozycjonowanego przodka. Ustawienie relative na opakowaniu bez odsunięć nie przesuwa opakowania.

Fixed zwykle odnosi się do okna. Nie jest to bezwarunkowa reguła: niektóre właściwości przodka, np. transform inny niż none, mogą zmienić punkt odniesienia. Tutaj link znajduje się bezpośrednio w body i nie potrzebuje takiego przodka.

Sticky wymaga granicy, np. top lub inset-block-start. Obserwuj najbliższego przodka z mechanizmem przewijania oraz granice rodzica. Overflow przodków, także hidden, może zmienić oczekiwane zachowanie. Element potrzebuje również miejsca na przemieszczenie; przyklejanie całej wysokiej kolumny często daje inny efekt niż przyklejenie krótszego panelu w środku.

## z-index nie jest jedną globalną listą

Kontekst nakładania grupuje elementy w osobną warstwę. Zagnieżdżony kontekst jest porównywany z sąsiednimi kontekstami jako całość. Duża liczba na potomku nie pozwala mu wyprzedzić sąsiada znajdującego się nad całym kontekstem jego przodka.

Kontekst tworzą m.in. relative lub absolute z z-index innym niż auto, fixed, sticky, transform inny niż none oraz opacity poniżej 1. Lista nie jest pełna. Przy diagnozie sprawdzaj łańcuch przodków, nie tylko zasłonięty element.

Isolation: isolate celowo tworzy osobny kontekst. Pomaga zamknąć warstwy wewnątrz komponentu, ale nie jest uniwersalną naprawą problemów z nakładaniem.

## Pseudo-element

::before pozwala dodać dekoracyjny fragment przed zawartością elementu. Żeby taki pseudo-element powstał, ustaw content, choćby pusty. Ważny napis „Polecana” pozostaje w HTML; kropka jest tylko dekoracją.

## Dokumentacja

- [MDN: position](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)
- [MDN: stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context)
- [MDN: isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation)
