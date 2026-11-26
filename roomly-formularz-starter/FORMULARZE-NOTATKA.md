# Formularze i przejścia — szybka przypominajka

## HTML określa poprawność, CSS pokazuje stan

required wymaga wartości; type=email sprawdza podstawowy format adresu, a min, max i step ograniczają liczbę. To przeglądarka ocenia te warunki. CSS nie zastępuje reguł walidacji.

| Selektor | Co sprawdza |
| --- | --- |
| :required | Czy kontrolka ma wymagany charakter |
| :invalid / :valid | Aktualny stan poprawności |
| :user-invalid / :user-valid | Stan poprawności z uwzględnieniem interakcji użytkownika |
| :checked | Zaznaczenie checkboxa lub radio |
| :disabled | Natywny stan wyłączenia kontrolki |
| :focus-visible | Czy przeglądarka wskazuje potrzebę widocznego fokusu |
| :focus-within | Fokus na elemencie lub w jego potomkach |

Puste wymagane pole może pasować do :invalid już na początku. Stany user-* pozwalają uniknąć pokazywania błędów przed interakcją. Nie zakładaj, że wszystkie przeglądarki uruchamiają je po identycznej liczbie kliknięć.

Puste opcjonalne pole może być poprawne. Poprawność to spełnienie ograniczeń, a nie potwierdzenie, że użytkownik wpisał dane.

## :has() wybiera element na podstawie relacji

W tym zadaniu wykorzystujesz :has() do wyboru opakowania na podstawie kontrolki w środku. Samo :checked wybiera zaznaczoną kontrolkę; opakowanie:has(...) pozwala wystylizować cały kafelek.

Argument jest selektorem względnym. Specyficzność :has() wynika z najbardziej specyficznego selektora w jego argumentach, więc użycie ID może niepotrzebnie zwiększyć siłę reguły.

## Przejście to zmiana między stanami

transition opisuje właściwość, czas i przebieg zmiany. Wpisz je na elemencie w stanie bazowym, aby działało także przy powrocie. transform zmienia wizualne położenie bez przepychania sąsiadów; opacity zmienia przezroczystość.

Opacity: 0 samo nie usuwa elementu z układu ani nie blokuje interakcji i fokusu. W naszej informacji nie ma kontrolek, ale visibility pozwala także ukryć jej treść. Nie ukrywaj w ten sposób aktywnych pól formularza bez przemyślenia ich dostępności.

Prefers-reduced-motion: reduce wykrywa preferencję ograniczenia ruchu. Wyłącz ruch, zachowując przekazywaną informację. Pamiętaj o specyficzności reguł, również wewnątrz media query.

## Dokumentacja

- [MDN: walidacja formularzy](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)
- [MDN: :user-invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid)
- [MDN: :has()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:has)
- [MDN: przejścia CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Transitions/Using)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
