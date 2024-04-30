const artikelContainerEl = document.querySelector(".artikelContainer")
const udvalgteOpskrifterContainerEl = document.querySelector(".udvalgteOpskrifterContainer")
const udvalgteArtiklerContainerEl = document.querySelector(".udvalgteArtiklerContainer")

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

hentArtikel(id, artikelContainerEl)
hentUdvalgteArtikler("", "", "3", udvalgteArtiklerContainerEl)
hentUdvalgteOpskrifter("", "", "3", udvalgteOpskrifterContainerEl)
