const baseUrl = "https://api-database.annikavekso.com/wp-json/wp/v2/"
const opskriftKategori = "?categories=2"
const artikelKategori = "?categories=37"


function fangAlleOpskrifter(placering) {
    fetch(baseUrl + "posts/" + opskriftKategori + "&per_page=100")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(post => renderPreviewOpskrift(post, placering))
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

function fangNyesteOpskrifter(antal, placering) {
    fetch(baseUrl + "posts/" + opskriftKategori + "&per_page=" + antal)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering))
        })
        .catch(err => console.log("Noget gik galt: " + err));

}
function fangUdvalgteOpskrifter(kateogori, taxonomiId, antal, placering) {
    fetch(baseUrl + "posts/" + opskriftKategori + "&" + kateogori + "=" + taxonomiId)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering))
        })
        .catch(err => console.log("Noget gik galt: " + err));

}
function fangNyesteArtikler(antal, placering) {
    fetch(baseUrl + "posts/" + artikelKategori + "&per_page=" + antal)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.forEach(artikel => renderPreviewArtikel(artikel, placering))
        })
        .catch(err => console.log("Noget gik galt: " + err));

}
function renderPreviewOpskrift(opskrift, placering) {
    placering.innerHTML += `
                       <article class="opskriftPreview">
                    <a href="./opskrifter.html?id=${opskrift.id}">
                        <img src="${opskrift.acf.billede.url}" alt="${opskrift.acf.billede.alt}">
                        <button class="likeBtn">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                        <div class="metadata">
                            <p>${opskrift.acf.tilberedningstid}</p>
                            <p>${opskrift.acf.antal}</p>
                        </div>
                        <h3>${opskrift.title.rendered}</h3>
                    </a>
                </article>

            </div>`
}

function renderFullOpskrift(opskrift, placering) {
    placering.innerHTML += `
    <article>
        <h2 class="title">${opskrift.title.rendered}</h2>
        <img src="${opskrift.acf.billede.url}" alt="${opskrift.acf.billede.alt}">
        <div class="metaData">
            <p class="author">Forfatter: ${opskrift.acf.forfatter}</p>
            <p class="date">Uploaded d. ${opskrift.acf.upload_dato}</p>
            <p class="date">Tilberedningstid: ${opskrift.acf.tilberedningstid}</p>
            <p class="date">Antal: ${opskrift.acf.antal}</p>
        </div>
        <p>${opskrift.acf.beskrivelse}</p>
        <h3>Ingredienser</h3>
        <ul> ${skabIngredienser(opskrift.acf.ingredienser)}</ul>
            <h3>Fremgangsmåde</h3>
        <ol> ${skabFremgangsmade(opskrift.acf.fremgangsmade)}</ol>
    </article>`
}
function skabIngredienser(ingredient) {
    let liste = "";
    for (const key in ingredient) {
        if (ingredient) {
            if (ingredient[key] !== "") {
                liste += `<li>${ingredient[key]} </li>`
            }
        }
    }
    return liste
}

function skabFremgangsmade(fremgangsmade) {
    let liste = "";
    for (const key in fremgangsmade) {
        if (fremgangsmade) {
            if (fremgangsmade[key] !== "") {
                liste += `<li>${fremgangsmade[key]} </li>`
            }
        }
    }
    return liste
}

function renderPreviewArtikel(artikel, placering) {
    placering.innerHTML += `
                       <article class="artikelPreview">
                    <a href="./opskrifter.html?id=${artikel.id}">
                        <img src="${artikel.acf.billede.url}" alt="${artikel.acf.billede.alt}">
                        <button class="likeBtn">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                          <h3>${artikel.title.rendered}</h3>
                          <p>${artikel.acf.artikel_bite_preview}</p>
                    </a>
                </article>

            </div>`
}