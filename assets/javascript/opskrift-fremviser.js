const opskriftContainerEl = document.querySelector(".opskriftContainer")
const udvalgteOpskrifterContainerEl = document.querySelector(".udvalgteOpskrifterContainer")
const udvalgteArtiklerContainerEl = document.querySelector(".udvalgteArtiklerContainer")

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

hentOpskrift(id, opskriftContainerEl)
hentUdvalgteOpskrifter("", "", "3", udvalgteOpskrifterContainerEl)
hentUdvalgteArtikler("", "", "3", udvalgteArtiklerContainerEl)

