**DOM i zdarzenia — szybkie przypomnienie**

**DOM i ładowanie**

DOM to obiektowa reprezentacja dokumentu w przeglądarce. querySelector() zwraca pasujący element albo null. createElement() tworzy element, append() dołącza go do drzewa, a textContent ustawia tekst.

Dla zewnętrznych klasycznych skryptów defer pozwala pobierać pliki podczas parsowania HTML. Wykonanie następuje po zakończeniu parsowania dokumentu, z zachowaniem kolejności skryptów. async wykonuje skrypt, gdy jest gotowy; nie zapewnia kolejności między niezależnymi plikami.

**Przebieg kliknięcia**

- Capture: zdarzenie przechodzi od zewnętrznych węzłów w kierunku celu. Listener tego etapu wybierasz opcją capture: true.
- Target: zdarzenie dociera do elementu będącego celem.
- Bubbling: dla kliknięcia przechodzi następnie przez przodków celu. Domyślnie listener na przodku obsługuje tę fazę.

W tym panelu event.target może być przyciskiem, spanem, svg albo path. event.currentTarget w listenerze listy wskazuje listę. Zagnieżdżenie elementów HTML nie wyznacza zakresu zmiennych JavaScript.

**Delegacja i przechodzenie po DOM**

Listener kontenera może obsługiwać kliknięcia jego dzieci. Zastąpienie dzieci pozostawia listener na niezmienionym kontenerze. Nowe przyciski również mogą być obsłużone dzięki propagacji.

closest(selector) szuka dopasowania na samym elemencie i potem w jego przodkach. Przy braku dopasowania zwraca null. parentElement daje rodzica, children kolekcję elementów potomnych pierwszego poziomu, a nextElementSibling następny element rodzeństwa.

Wartości data-* odczytywane przez dataset są stringami. ID w danych tego zadania są liczbami, więc przy wyszukiwaniu rekordu uwzględnij tę różnicę typów.

**Dwie różne operacje na zdarzeniu**

- preventDefault() blokuje domyślne działanie przeglądarki dla zdarzenia, które można anulować, np. domyślną obsługę wysłania formularza.
- stopPropagation() zatrzymuje dalszą propagację. Samo nie blokuje działania domyślnego.

Do usunięcia listenera przez removeEventListener() potrzebujesz tego samego typu zdarzenia, tej samej funkcji oraz zgodnej opcji capture. Każde nowe wyrażenie funkcji tworzy nową funkcję.

**Dokumentacja**

- [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [Skrypty: async i defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)
- [Propagacja, delegacja, target i currentTarget](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)
- [closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
- [preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
- [stopPropagation](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)
- [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
