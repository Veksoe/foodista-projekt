const opskriftListeContainerEl = document.querySelector(".opskriftListeContainer")


if (opskriftListeContainerEl) {
    hentAlleOpskrifter(opskriftListeContainerEl)
}


toggleEls.forEach(toggle => {
    toggle.addEventListener("change", () => filterEvents(opskriftListeContainerEl))

})