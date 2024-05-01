
const nyesteOpskrifterContainerEl = document.querySelector(".nyesteOpskrifterContainer");
const udvalgteOpskrifterContainerEl = document.querySelector(".udvalgteOpskrifterContainer");
const nyesteArtiklerContainerEl = document.querySelector(".nyesteArtiklerContainer");

/* Hvis der er en nyesteOpskrifterContainer så hent de 3 nyeste opskrifter og sæt dem ind i den */
if (nyesteOpskrifterContainerEl) {
    hentNyesteOpskrifter(3, nyesteOpskrifterContainerEl);
}

/* Hvis der er en udvalgteOpskrifterContainer så hent 5 opskrifter fra årstidskategorien med taxonomien svarende til  34 (sommer) og sæt dem ind i den */
if (udvalgteOpskrifterContainerEl) {
    hentUdvalgteOpskrifter("arstid", "34", "5", udvalgteOpskrifterContainerEl)
}

/* Hvis der er en nyesteArtiklerContainer så hent de 3 nyeste artikler og sæt dem ind i den */
if (nyesteArtiklerContainerEl) {
    hentNyesteArtikler("3", nyesteArtiklerContainerEl)
}