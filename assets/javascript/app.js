const baseUrl = "https://api-database.annikavekso.com/wp-json/wp/v2/"
const opskriftKategori = "?categories=2"
const artikelKategori = "?categories=37"
const filterBtnEl = document.querySelector(".filterBtn")
const filterContainernEl = document.querySelector(".filterContainer")
const toggleEls = document.querySelectorAll(".toggle")


function hentOpskrift(opskriftId, placering) {
    fetch(baseUrl + "posts/" + opskriftId)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderFullOpskrift(data, placering)
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

function hentAlleOpskrifter(placering) {
    fetch(baseUrl + "posts/" + opskriftKategori + "&per_page=100")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(post => renderPreviewOpskrift(post, placering))
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

function hentNyesteOpskrifter(antal, placering) {
    fetch(baseUrl + "posts/" + opskriftKategori + "&per_page=" + antal)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering))
        })
        .catch(err => console.log("Noget gik galt: " + err));

}
function hentUdvalgteOpskrifter(kateogori, taxonomiId, antal, placering) {
    fetch(baseUrl + "posts" + opskriftKategori + "&" + kateogori + "=" + taxonomiId + "&per_page=" + antal)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.length === 0) {
                placering.innerHTML += `<p>Der er desværre ingen opskrifter der matcher dit valg</p>`
            }
            else {
                data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering))
            }
        })
        .catch(err => console.log("Noget gik galt: " + err));

}
function hentNyesteArtikler(antal, placering) {
    fetch(baseUrl + "posts/" + artikelKategori + "&per_page=" + antal)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            data.forEach(artikel => renderPreviewArtikel(artikel, placering))
        })
        .catch(err => console.log("Noget gik galt: " + err));

}
function hentOpskrifterFraTaxonomy(hovedingrediens, kodtype, maltidstype, diet, verdensmad, arstid, temperatur, tilberedningstid, antal, placering) {
    let filteretUrl = baseUrl + "posts" + opskriftKategori + "&per_page=" + antal;
    let query = "";

    if (hovedingrediens != "") {
        query += "&hovedingrediens=" + hovedingrediens
    }
    if (kodtype != "") {
        query += "&kodtype=" + kodtype
    }


    fetch(filteretUrl + query)
        .then(res => res.json())
        .then(data => {

            if (data.length === 0) {
                placering.innerHTML += `<p>Der er desværre ingen opskrifter der matcher dit valg</p>`
            }
            else {
                data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering))
            }

        })
        .catch(err => console.log("Noget gik galt: " + err));

}
function renderPreviewOpskrift(opskrift, placering) {
    placering.innerHTML += `
                       <article class="opskriftPreview">
                    <a href="./opskrift-fremviser.html?id=${opskrift.id}">
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

function hentKategoriFraId(id) {
    switch (id) {
        case "15":
            return "Frokost"
        case "17":
            return "Aftensmad"
        case "19":
            return "Tilbehør"
        case "20":
            return "Dessert"
        case "21":
            return "Snack"
        case "39":
            return "Morgenmad"
    }
}
if (filterBtnEl) {
    filterBtnEl.addEventListener("click", () => {
        filterContainernEl.classList.toggle("hidden")
    })
}


function filterEvents(placering) { /* Funktion der skal bruges til at filterer vores events. */
    placering.innerHTML = ""; /* Fjern alt i "eventContainerEl" */
    let tilladtHovedingrediens = [] /* Variablen med tomt array */
    let tilladtKodtype = [] /* Variablen med tomt array */

    /* Hvis elementet i HTML med id'et "OnsdagFilter" er checked */
    if (document.querySelector("#pastaFilter").checked) {
        tilladtHovedingrediens.push(document.querySelector("#pastaFilter").value);/*indsæt/push value (onsdag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "TorsdagFilter" er checked*/
    if (document.querySelector("#suppeFilter").checked) {
        tilladtHovedingrediens.push(document.querySelector("#suppeFilter").value);/* indsæt/push value (torsdag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "FredagFilter" er checked*/
    if (document.querySelector("#risFilter").checked) {
        tilladtHovedingrediens.push(document.querySelector("#risFilter").value);/* indsæt/push value (fredag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "LørdagFilter" er checked*/
    if (document.querySelector("#kartofelFilter").checked) {
        tilladtHovedingrediens.push(document.querySelector("#kartofelFilter").value);/* indsæt/push value (lørdag) til arrayet "allowedDates" */
    }
    /* Hvis elementet i HTML med id'et "SøndagFilter" er checked*/
    if (document.querySelector("#kyllingeFilter").checked) {
        tilladtKodtype.push(document.querySelector("#kyllingeFilter").value);/* indsæt/push value (søndag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "DWineFilter" er checked*/
    if (document.querySelector("#oksekødFilter").checked) {
        tilladtKodtype.push(document.querySelector("#oksekødFilter").value)/* indsæt/push value (D`Wine Bar) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "SallingFilter" er checked*/
    if (document.querySelector("#svinekødFilter").checked) {
        tilladtKodtype.push(document.querySelector("#svinekødFilter").value)/* indsæt/push value (Salling Rooftop) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "JazzscenenFilter" er checked*/
    if (document.querySelector("#fiskeFilter").checked) {
        tilladtKodtype.push(document.querySelector("#fiskeFilter").value)/* indsæt/push value (Jazzscenen) til arrayet "allowedPlaces" */
    }

    console.log(tilladtHovedingrediens, tilladtKodtype)

    hentOpskrifterFraTaxonomy(tilladtHovedingrediens, tilladtKodtype, "", "", "", "", "", "", 100, placering)
}

