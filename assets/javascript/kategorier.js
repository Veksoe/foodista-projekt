const opskriftListeContainerEl = document.querySelector(".opskriftListeContainer")
const kategoriTextEls = document.querySelectorAll(".kategorier a p")
const h1El = document.querySelector("h1")

/* Variable der kigger query-parametere i url/search-baren i det aktuelle vindue/tab */
const urlParams = new URLSearchParams(window.location.search)
/* Variable der sætter et id, ud fra hvad der står efter "id" i url/search baren */
const id = urlParams.get('id')

/* Fang title-tagget og sæt dens tekst indhold til den kategori der matcher sidens id, sammen med hjemmesidens navn */
document.querySelector("title").textContent = hentKategoriFraId(id) + "- Den Glade Gane"

/* Hent 100 opskrifter fra måltidstype-kategorien, med det id som matcher de i urlet og placer dem i opskriftListeContainer */
hentUdvalgteOpskrifter("maltidstype", id, 100, opskriftListeContainerEl)

/* For hver kategoriText der er, tjek om den id matcher id'et i url'et */
kategoriTextEls.forEach(kategoriText => {
    /* Hvis den matcher id'et i url'et så toogle "active" classen */
    if (kategoriText.id === id) {
        kategoriText.classList.add("active")
    }
})

/* Gem teksten man får, når man kalder hentKategoriFraId og sender id'et fra url'et, i en variable  */
const title = hentKategoriFraId(id)

/* Fang h1-tagget og sæt dens indhold til title-variablen. */
h1El.innerHTML = title;

/* For hver toggle tjek hvad id der er i url'et og tilføj en event listener.  */
toggleEls.forEach(toggle => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    /* Når den bliver ændret skal filterOpskrifter og smid det ind i opskriftListeContainer og send id'et fra url'et med.  */
    toggle.addEventListener("change", () => filterOpskrifter(opskriftListeContainerEl, id))

})