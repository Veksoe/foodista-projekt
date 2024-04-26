
const nyesteOpskrifterContainerEl = document.querySelector(".nyesteOpskrifterContainer");
const udvalgteOpskrifterContainerEl = document.querySelector(".udvalgteOpskrifterContainer");
const nyesteArtiklerContainerEl = document.querySelector(".nyesteArtiklerContainer");

if (nyesteOpskrifterContainerEl) {
    fangNyesteOpskrifter(3, nyesteOpskrifterContainerEl);
}
if (udvalgteOpskrifterContainerEl) {
    fangUdvalgteOpskrifter("arstid", "34", "5", udvalgteOpskrifterContainerEl)
}
if (nyesteArtiklerContainerEl) {
    fangNyesteArtikler("3", nyesteArtiklerContainerEl)
}