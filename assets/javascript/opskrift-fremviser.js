const opskriftContainerEl = document.querySelector(".opskriftContainer")
const udvalgteOpskrifterContainerEl = document.querySelector(".udvalgteOpskrifterContainer")
const udvalgteArtiklerContainerEl = document.querySelector(".udvalgteArtiklerContainer")

/* Variable der kigger query-parametere i url/search-baren i det aktuelle vindue/tab */
const urlParams = new URLSearchParams(window.location.search);
/* Variable der sætter et id, ud fra hvad der står efter "id" i url/search baren */
const id = urlParams.get('id');

hentOpskrift(id, opskriftContainerEl) /* Hent en opskrift ud fra det id der bliver sat i id-variablen og placer den i opskriftContainer */
hentUdvalgteOpskrifter("", "", "3", udvalgteOpskrifterContainerEl)  /* Hen 3 opskrifter og placer dem i udvalgteOpskrifterContainer */
hentUdvalgteArtikler("", "", "3", udvalgteArtiklerContainerEl) /* Hent 3 artikler og placer dem i udvalgteArtiklerContainer */

