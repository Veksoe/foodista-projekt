const opskriftListeContainerEl = document.querySelector(".opskriftListeContainer")

/* Hvis der er en opskriftListeContainer så hent alle opskrifter og smid den der ind */
if (opskriftListeContainerEl) {
    hentAlleOpskrifter(opskriftListeContainerEl)
}

/* For hver toggle der er, tilføj en eventlistener der køre filterOpskrifter når man ændre deres tilstand, og smidt resultatet ud i opskriftListeContainer */
toggleEls.forEach(toggle => {
    toggle.addEventListener("change", () => filterOpskrifter(opskriftListeContainerEl))

})