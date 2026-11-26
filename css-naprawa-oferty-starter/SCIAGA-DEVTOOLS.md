# Szybka przypominajka

## DevTools

- **Styles:** zobaczysz reguły pasujące do elementu, ich pliki i numery linii. Skreślona deklaracja zwykle przegrała w kaskadzie. Nieprawidłowa wartość jest ignorowana; DevTools może pokazać przy niej ostrzeżenie.
- **Computed:** sprawdzisz wynikową wartość konkretnej właściwości i źródło deklaracji.
- **Box Model:** porównasz obszar treści, padding, border i margin. Najedź na element oraz jego rodzica, zamiast oceniać odstępy wyłącznie na oko.
- **:hov:** możesz wymusić np. :hover lub :focus-visible. Sprawdź też rzeczywiste przechodzenie klawiszem Tab.

Zmiany robione w panelu Styles są zwykle tymczasowe. Docelowe poprawki zapisz w style.css i odśwież stronę.

## Kaskada a dziedziczenie

Najpierw ustalana jest wartość właściwości na danym elemencie. Jeżeli nie ma własnej wartości, właściwość dziedziczona, np. color, może przejąć ją od rodzica. Jawna reguła koloru na dziecku wygrywa z dziedziczeniem od rodzica; nie porównujemy wtedy specyficzności selektorów rodzica i dziecka.

Słowo kluczowe inherit pozwala jawnie zażądać wartości od rodzica. Elementy formularza mogą mieć własne style fontów pochodzące z przeglądarki lub arkusza projektu.

## Margines nie jest paddingiem

Padding to przestrzeń wewnętrzna i obejmuje go tło elementu. Margin leży na zewnątrz obramowania, a tło go nie pokrywa.

Pionowe marginesy bloków mogą się zapadać. Przy dwóch dodatnich marginesach sąsiadujących bloków wynik bywa równy większemu z nich zamiast ich sumie. Margines pierwszego lub ostatniego dziecka może też zapaść się z marginesem rodzica, gdy nie rozdzielają ich odpowiednie padding, border lub inna granica formatowania. Dlatego margines dziecka może znaleźć się poza tłem rodzica. To mechanizm CSS, nie losowy błąd przeglądarki.

## Reset ma zasięg

Reset upraszcza style startowe, ale reguła dla wszystkich ul obejmuje zarówno nawigację, jak i listę korzyści. Sprawdź, które wartości są wspólne, a które powinny należeć do konkretnego komponentu. Lista potrzebuje zarówno markerów, jak i miejsca na ich wyświetlenie.

## Źródła do sprawdzenia mechanizmu

- [MDN: zapadanie marginesów](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Margin_collapsing)
- [MDN: dziedziczenie](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Inheritance)
- [Chrome DevTools: podgląd i zmiana CSS](https://developer.chrome.com/docs/devtools/css)
