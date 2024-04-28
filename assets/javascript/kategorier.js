const opskriftListeContainerEl = document.querySelector(".opskriftListeContainer")
const kategoriTextEls = document.querySelectorAll(".kategorier a p")
const titleEl = document.querySelector(".textContainer")

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

hentUdvalgteOpskrifter("maltidstype", id, 100, opskriftListeContainerEl)
kategoriTextEls.forEach(kategoriText => {
    if (kategoriText.id === id) {
        kategoriText.classList.add("active")
    }
})

const title = hentKategoriFraId(id)
titleEl.innerHTML = `<h1>${title}</h1>
    <h2>
        Tag hele familien med i køkkenet og hyg jer sammen med nemme opskrifter til den travle hverdag.
    </h2>`

toggleEls.forEach(toggle => {
    toggle.addEventListener("change", () => filterEvents(opskriftListeContainerEl))

})