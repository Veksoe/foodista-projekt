const artikelContainerEl = document.querySelector(".artikelContainer")
const udvalgteOpskrifterContainerEl = document.querySelector(".udvalgteOpskrifterContainer")
const udvalgteArtiklerContainerEl = document.querySelector(".udvalgteArtiklerContainer")

/* Variable der kigger query-parametere i url/search-baren i det aktuelle vindue/tab */
const urlParams = new URLSearchParams(window.location.search);
/* Variable der sætter et id, ud fra hvad der står efter "id" i url/search baren */
const id = urlParams.get('id');

hentArtikel(id, artikelContainerEl) /* Hent en artikel ud fra det id der bliver sat i id-variablen og placer den i artikelContainer */
hentUdvalgteArtikler("", "", "3", udvalgteArtiklerContainerEl) /* Hent 3 artikler og placer dem i udvalgteArtiklerContainer */
hentUdvalgteOpskrifter("", "", "3", udvalgteOpskrifterContainerEl) /* Hen 3 opskrifter og placer dem i udvalgteOpskrifterContainer */
