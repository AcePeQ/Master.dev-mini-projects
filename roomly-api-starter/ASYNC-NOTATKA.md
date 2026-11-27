# Async i moduły — krótka pomoc do projektu

## Obietnica i await

Promise reprezentuje przyszły wynik operacji: pending, fulfilled albo rejected. Funkcja async zawsze zwraca Promise, również gdy w środku zwracasz zwykłą wartość.

Await pozwala kontynuować daną funkcję z wynikiem obietnicy albo zgłasza jej odrzucenie jako wyjątek. Wstrzymuje dalszą część tej funkcji, a nie cały interfejs. Nie zamienia żądania sieciowego w operację synchroniczną dla całego programu.

## Dwa etapy pobierania

Fetch daje obiekt Response. Odczyt jego treści przez json() także jest asynchroniczny. Brak łączności może odrzucić fetch, HTTP 503 daje odpowiedź do sprawdzenia, a błędny JSON może wywołać błąd dopiero podczas odczytu treści.

Try/catch obsługuje odrzucenie obietnicy, na którą czekasz przez await, oraz wyjątki z wykonywanego kodu. Finally przydaje się do sprzątania niezależnego od wyniku. W tym projekcie takim zasobem jest timer.

## Timer

SetTimeout planuje callback, nie zatrzymując dalszych instrukcji. Opóźnienie 0 nie oznacza natychmiastowego wykonania. W prostym przykładzie z diagnozy reakcja then trafia do kolejki mikro-zadań; callback timera jest zadaniem obsługiwanym później. Najpierw musi zakończyć się aktualny kod synchroniczny.

SetTimeout zwraca identyfikator, który możesz przekazać do clearTimeout. Jeśli zadanie skończy się przed 800ms, zaplanowana informacja nie powinna już oczekiwać na wykonanie.

## Moduły i dane

Eksport udostępnia funkcję, a import pozwala skorzystać z niej w innym pliku. W przeglądarce punkt wejścia ma type=module; lokalne ścieżki importu w tym projekcie zawierają rozszerzenie .js. Moduły mają własny zakres. Kod modułu pod tym samym adresem jest zwykle wykonywany raz w ramach danego dokumentu, nie przy każdym imporcie z kolejnego pliku.

Destrukturyzacja pobiera wartości do zmiennych; sama nie wykonuje głębokiej kopii. Spread obiektu tworzy płytką kopię — zagnieżdżone obiekty i tablice mogą nadal być współdzielone. Użyj nowych obiektów dla modelu widoku i zachowaj surowe dane do porównania w debuggerze.

## Dokumentacja

- [MDN: używanie fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN: model wykonywania JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- [MDN: setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)
- [MDN: moduły](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [MDN: płytka kopia](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
