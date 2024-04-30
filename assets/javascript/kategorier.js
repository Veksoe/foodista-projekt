const opskriftListeContainerEl = document.querySelector(".opskriftListeContainer")
const kategoriTextEls = document.querySelectorAll(".kategorier a p")
const h1El = document.querySelector(".textContainer")

const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')

document.querySelector("title").textContent = hentKategoriFraId(id) + "- Den Glade Gane"

hentUdvalgteOpskrifter("maltidstype", id, 100, opskriftListeContainerEl)
kategoriTextEls.forEach(kategoriText => {
    if (kategoriText.id === id) {
        kategoriText.classList.add("active")
    }
})

const title = hentKategoriFraId(id)
h1El.innerHTML = `<h1>${title}</h1>
    <h2>
        Tag hele familien med i køkkenet og hyg jer sammen med nemme opskrifter til den travle hverdag.
    </h2>`

toggleEls.forEach(toggle => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    toggle.addEventListener("change", () => filterEvents(opskriftListeContainerEl, id))

})