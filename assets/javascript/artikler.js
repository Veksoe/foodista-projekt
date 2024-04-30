const artikelListeContainerEl = document.querySelector(".artikelListeContainer")
const udvalgteArtiklerContainerEl = document.querySelector(".udvalgteArtiklerContainer")


if (artikelListeContainerEl) {
    hentAlleArtikler(artikelListeContainerEl)
}
hentUdvalgteArtikler("", "", "3", udvalgteArtiklerContainerEl)