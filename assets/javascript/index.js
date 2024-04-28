
const nyesteOpskrifterContainerEl = document.querySelector(".nyesteOpskrifterContainer");
const udvalgteOpskrifterContainerEl = document.querySelector(".udvalgteOpskrifterContainer");
const nyesteArtiklerContainerEl = document.querySelector(".nyesteArtiklerContainer");

if (nyesteOpskrifterContainerEl) {
    hentNyesteOpskrifter(3, nyesteOpskrifterContainerEl);
}
if (udvalgteOpskrifterContainerEl) {
    hentUdvalgteOpskrifter("arstid", "34", "5", udvalgteOpskrifterContainerEl)
}
if (nyesteArtiklerContainerEl) {
    hentNyesteArtikler("3", nyesteArtiklerContainerEl)
}