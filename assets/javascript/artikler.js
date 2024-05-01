const artikelListeContainerEl = document.querySelector(".artikelListeContainer")
const udvalgteArtiklerContainerEl = document.querySelector(".udvalgteArtiklerContainer")

/* Hent 3 udvalgte artikler og sæt dem ind i udvalgteArtiklerContaineren */

hentUdvalgteArtikler("", "", "3", udvalgteArtiklerContainerEl)
/* Hvis der er en artikelListeContainer så hent alle artikler og sæt dem ind i den */
if (artikelListeContainerEl) {
    hentAlleArtikler(artikelListeContainerEl)
}