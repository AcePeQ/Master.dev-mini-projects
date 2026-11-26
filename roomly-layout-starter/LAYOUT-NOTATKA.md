# Przypominajka do układów

## Flex i Grid

Flex układa elementy przede wszystkim w jednym kierunku. justify-content pracuje w osi głównej, align-items w poprzecznej. Przy domyślnym kierunku row są to odpowiednio kierunek poziomy i pionowy. flex-wrap pozwala przenosić elementy do kolejnych linii; każda linia jest układana osobno.

Grid definiuje tory kolumn i wierszy. gap daje odstępy między nimi, a fr dzieli wolne miejsce po uwzględnieniu pozostałych ograniczeń. minmax() pozwala określić minimalny i maksymalny rozmiar toru.

Samo 1fr może mieć automatyczne minimum zależne od treści. Długi, niepodzielny tekst potrafi więc wypchnąć kolumnę. Przy diagnozowaniu sprawdź minimalny rozmiar toru, min-inline-size elementu i możliwość łamania tekstu. Nie maskuj przepełnienia ukrywaniem całej strony.

## Rozmiary wynikające z treści

min-content to minimalny rozmiar wynikający z treści przy wykorzystaniu dostępnych miejsc zawijania; w zwykłym tekście często ogranicza go najdłuższe słowo. max-content odpowiada rozmiarowi bez miękkiego zawijania tekstu. fit-content pozwala dopasować rozmiar do dostępnej przestrzeni, w granicach narzuconych przez treść.

## auto-fit a auto-fill

Oba próbują zmieścić odpowiednią liczbę powtarzanych torów. auto-fill zachowuje także puste tory, natomiast auto-fit zwija puste tory po rozmieszczeniu elementów. Przy elastycznym maksimum zajęte tory mogą dzięki temu wykorzystać zwolnione miejsce. Różnicę najłatwiej zobaczyć, gdy elementów jest mniej niż potencjalnych kolumn.

## Media query a container query

Media query o szerokość sprawdza okno przeglądarki. Size container query sprawdza rozmiar odpowiedniego kontenera przodka. To pozwala temu samemu komponentowi wyglądać inaczej w szerokim obszarze i w bocznym panelu.

Ogólna składnia, bez rozwiązania układu kart:

    .component-slot {
      container-type: inline-size;
    }

    @container (min-width: 28rem) {
      .component {
        /* Reguły dla potomka szerokiego kontenera. */
      }
    }

W tym ćwiczeniu .room-slot jest opakowaniem, a .room-card jego dzieckiem. Zapytanie ma wpływać na kartę na podstawie szerokości opakowania. Nie próbuj zmieniać przez to zapytanie szerokości samego badanego kontenera.

## Jak podejść do pracy

Buduj od zewnątrz: nagłówek → dwie kolumny strony → siatka wyników → wnętrze karty. Podgląd Grid i Flex w DevTools pokaże tory, osie i wolne miejsce. Osobno sprawdzaj szerokość okna oraz szerokość opakowania karty.

## Dokumentacja

- [MDN: Grid](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids)
- [MDN: repeat(), auto-fit i auto-fill](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat)
- [MDN: container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
