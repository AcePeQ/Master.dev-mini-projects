# Dwa pytania przed projektem

Odpowiedz najpierw bez uruchamiania kodu. Jeśli nie jesteś pewien, zaznacz, gdzie pojawia się wątpliwość. Potem możemy sprawdzić wynik.

## 1. Kolejność

    console.log("A");
    setTimeout(() => console.log("B"), 0);
    Promise.resolve().then(() => console.log("C"));
    console.log("D");

W jakiej kolejności pojawią się litery? Dlaczego timer z zerowym opóźnieniem nie wykonuje się od razu?

## 2. Kopia

    const original = { name: "Studio Zielone", features: ["Wi-Fi"] };
    const draft = { ...original };
    draft.name = "Loft";
    draft.features.push("Projektor");
    console.log(original.name);
    console.log(original.features);

Co wypiszą oba logi? Czy draft i original współdzielą cały obiekt, czy tylko część danych?
