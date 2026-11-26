# Roomly — katalog sal spotkań

Blok 3 powtórki Modern CSS Fundamentals: Grid, Flex, responsywność i dopasowanie komponentu do kontenera.

## Sytuacja

Tworzysz ekran katalogu dla firmy wynajmującej sale spotkań. Treść, semantyka, kolory, formularze i wygląd kart są gotowe. Twoim zadaniem jest przygotowanie układu, który działa na telefonie i szerokim ekranie. Nie piszesz JS.

Otwórz index.html. Możesz użyć Live Server, ale zwykłe otwarcie pliku też wystarczy. appearance.css zawiera wygląd; własne reguły zapisujesz w layout.css, podpiętym jako ostatni arkusz. Brak układu na starcie jest zamierzony.

## 1. Elementy w jednym kierunku — Flex

- Na szerokim ekranie logo, nawigacja i przycisk nagłówka są obok siebie, wyrównane w pionie. Na wąskim mają się zawijać bez ściskania tekstu i bez wychodzenia poza stronę.
- Linki nawigacji są obok siebie z odstępami.
- Nagłówek wyników i liczba przestrzeni są po przeciwnych stronach, gdy jest miejsce.
- W pasku narzędzi wyszukiwarka zajmuje wolne miejsce, a sortowanie ma rozsądną szerokość. Gdy robi się ciasno, kontrolki przechodzą do kolejnego wiersza. Możesz wykorzystać flex-basis, grow i wrap.
- W stopce karty cena i link są obok siebie, z odstępem. Mogą się zawinąć zamiast nachodzić na siebie.

## 2. Układ ekranu — Grid i media query

- Przy szerokim oknie lewa kolumna z filtrami ma 14rem. Prawa kolumna z wynikami wypełnia pozostałe miejsce. Odstęp między nimi: 1.75rem.
- Poniżej około 850px układ ma jedną kolumnę: najpierw panel boczny, potem wyniki. To odpowiada kolejności w HTML.
- Długi tytuł nie może wymuszać rozszerzenia prawej kolumny poza ekran. Sprawdź ograniczenia minimalnego rozmiaru elementów i torów Grida.

## 3. Katalog — kolumny wynikające z dostępnego miejsca

- .room-grid ma automatycznie dobierać liczbę kolumn. Nie ustawiaj ręcznie trzech, dwóch i jednej kolumny osobnymi breakpointami.
- Użyj repeat(), auto-fit, minmax() i fr. Docelowe minimum karty to 16rem, a maksimum to równy udział w dostępnym miejscu.
- Gdy cała dostępna przestrzeń jest węższa niż 16rem, jedna karta nadal ma się w niej mieścić. W dolnej granicy rozmiaru może pomóc min().
- Między kartami ma być 1.25rem przerwy.
- Karty w jednym rzędzie mają mieć równą wysokość i stopki wyrównane przy dole. Nie ustawiaj sztywnej wysokości dopasowanej do obecnej treści.
- Długa nazwa BoardroomInternationalStrategyWorkshop2026 musi być w całości czytelna. Pozwól ją zawinąć, zamiast ukrywać lub ucinać.

## 4. Ten sam komponent w różnych miejscach — container query

Sala Studio Zielone występuje jako szeroka oferta wyróżniona oraz jako karta w panelu bocznym. Obie używają .room-slot i tego samego komponentu .room-card.

- Uczyń .room-slot kontenerem do zapytań o dostępną szerokość.
- Domyślna karta ma ilustrację nad treścią.
- Gdy jej własny kontener ma przynajmniej 28rem, ilustracja i treść mają być obok siebie, w proporcji około 2:3. Możesz wykorzystać Grid wewnątrz karty.
- Na szerokim ekranie wyróżniona karta powinna być pozioma, a ta w panelu bocznym pionowa — jednocześnie, przy tej samej szerokości okna.
- Ta zmiana nie może zależeć od media query ani od osobnej klasy wariantu karty. Wykorzystaj @container.

## Granice

- Pracujesz w layout.css. HTML i wygląd są gotowe; nie musisz ich przepisywać.
- Nie implementujesz filtrów, sortowania, wyszukiwania ani rezerwacji.
- Bez position: absolute do budowania układu, stałych wysokości kart i overflow-x: hidden na stronie jako sposobu ukrycia problemu.
- Nie dodajesz animacji, modali, sticky ani dekoracji. To osobny blok.

## Sprawdzenie i zakończenie

Sprawdź szerokości około 320px, 768px i 1280px oraz stan pośredni podczas przeciągania okna. Strona nie powinna mieć poziomego przewijania. Upewnij się, że cała długa nazwa pozostaje widoczna, a Tab pozwala przejść po kontrolkach.

W DevTools tymczasowo ukryj pięć z sześciu li w .room-grid. Zobacz, co robi auto-fit. Porównaj zachowanie z auto-fill, a potem przywróć sześć kart i auto-fit. Wyróżniona oferta jest poza tą listą.

Wysyłasz layout.css i po jednym zdaniu: dlaczego Flex w pasku narzędzi, dlaczego Grid w katalogu oraz co zmieniłoby auto-fill przy jednej karcie. Nie potrzebujesz repozytorium ani publikacji.

Zacznij od punktów 1–2. Możesz wysłać ten fragment do sprawdzenia, zanim przejdziesz do automatycznych kolumn i container queries. W tym bloku kończymy na opisanych wymaganiach.
