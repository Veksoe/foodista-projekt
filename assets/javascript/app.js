const baseUrl = "https://api-database.annikavekso.com/wp-json/wp/v2/"
const opskriftKategori = "?categories=2"
const artikelKategori = "?categories=37"
const filterBtnEl = document.querySelector(".filterBtn")
const filterContainernEl = document.querySelector(".filterContainer")
const toggleEls = document.querySelectorAll(".toggle")
const navEl = document.querySelector("nav")
const footerEl = document.querySelector("footer")

renderNavigation()
renderFooter()

function hentOpskrift(opskriftId, placering) {
    fetch(baseUrl + "posts/" + opskriftId)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderFuldOpskrift(data, placering)
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

function hentOpskrifterFraTaxonomy(hovedingrediens, kodtype, maltidstype, diet, verdensmad, arstid, temperatur, tilberedningstid, antal, placering) {
    let filteretUrl = baseUrl + "posts" + opskriftKategori + "&per_page=" + antal;
    let query = "";

    if (hovedingrediens && hovedingrediens.length !== 0) {
        query += "&hovedingrediens=" + hovedingrediens
    }

    if (kodtype && kodtype.length !== 0) {
        query += "&kodtype=" + kodtype
    }
    if (maltidstype && maltidstype.length !== 0) {
        query += "&maltidstype=" + maltidstype
    }
    if (diet && diet.length !== 0) {
        query += "&diaeet=" + diet
    }

    if (verdensmad && verdensmad.length !== 0) {
        query += "&verdensmad=" + verdensmad
    }
    if (arstid && arstid.length !== 0) {
        query += "&arstid=" + arstid
    }

    if (temperatur && temperatur.length !== 0) {
        query += "&temperatur=" + temperatur
    }
    if (tilberedningstid && tilberedningstid.length !== 0) {
        query += "&tilberedningstid=" + tilberedningstid
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
async function hentEnOpskriftFraId(id) {
    try {
        const res = await fetch(baseUrl + "posts/" + id)
        const data = await res.json()
        return `
    <article class="opskriftPreview">
         <a href="./opskrift-fremviser.html?id=${data.id}">
             <img src="${data.acf.billede.url}" alt="${data.acf.billede.alt}">
             <button class="likeBtn">
                 <i class="fa-regular fa-heart"></i>
             </button>
             <div class="metadata">
                 <p>${data.acf.tilberedningstid}</p>
                 <p>${data.acf.antal}</p>
             </div>
             <h3>${data.title.rendered}</h3>
         </a>
     </article>`
    } catch (err) {
        return console.log("Noget gik galt: " + err)
    }
}

function hentArtikel(artikelId, placering) {
    fetch(baseUrl + "posts/" + artikelId)
        .then(res => res.json())
        .then(async data => {
            console.log(data)
            await renderFuldArtikel(data, placering)
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

function hentAlleArtikler(placering) {
    fetch(baseUrl + "posts/" + artikelKategori + "&per_page=100")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(artikel => renderPreviewArtikel(artikel, placering))

        })
        .catch(err => console.log("Noget gik galt: " + err));

}

function hentUdvalgteArtikler(kateogori, taxonomiId, antal, placering) {
    fetch(baseUrl + "posts" + artikelKategori + "&" + kateogori + "=" + taxonomiId + "&per_page=" + antal)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.length === 0) {
                placering.innerHTML += `<p>Der er desværre ingen opskrifter der matcher dit valg</p>`
            }
            else {
                data.forEach(artikel => renderPreviewArtikel(artikel, placering))
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


function renderFuldOpskrift(opskrift, placering) {
    placering.innerHTML += `
    <article class="opskrift">
    <section class="opskriftInfo fullWidth">
        <div class="text">
            <a href="opskrifter.html" class="breadcrum">Opskrifter</a> - <a href="#" class="breadcrum">Placering</a> - <a href="#" class="breadcrum">${opskrift.title.rendered}</a>
            <h2 class="opskriftNavn">${opskrift.title.rendered}</h2>
            <div class="metadata">
                <p><i class="fa-regular fa-clock"></i> ${opskrift.acf.tilberedningstid}</p>
                <p class="italic"> ${opskrift.acf.forfatter}</p>
            </div>
            <p class="beskrivelse">${opskrift.acf.beskrivelse}</p>
            <div class="ikoner">
                <button><i class="fa-regular fa-heart"></i> Gem</button>
                <button><i class="fa-solid fa-arrow-up-from-bracket"></i> Del</button>
                <button><i class="fa-solid fa-print"></i>Print</button>
            </div>
        </div>
        <div class="imgContainer"><img src="${opskrift.acf.billede.sizes.large}"
                alt="${opskrift.acf.billede.alt}"></div>
    </section>
    <section class="opskriftAction fullWidth">
        <div class="data">
            <h3>Ingredienser</h3>
            <p class="antal"><i class="fa-solid fa-minus"></i><span>${opskrift.acf.antal} </span> <i
                    class="fa-solid fa-plus"></i></p>
            <div class="ingredienser">
                <ul>
                    ${skabIngredienser(opskrift.acf.ingredienser)}</ul>
            </div>
            <button class="tilfojAlle"> <i class="fa-regular fa-rectangle-list"></i> Tilføj ingredienser til
                indkøbslisten</button>
        </div>
        <div class="fremgangsmåde">
            <h3>Fremgangsmåde</h3>
            <ol> ${skabFremgangsmade(opskrift.acf.fremgangsmade)}</ol>
           ${skabTip(opskrift.acf.tips)}
        </div>
    </section>
    
</article>`
    opdaterTabTitle(opskrift.title.rendered + "- Den Glade Gane")
}
function skabIngredienser(ingredient) {
    let liste = "";
    for (const key in ingredient) {
        if (ingredient) {
            if (ingredient[key] !== "") {
                liste += `<li><button class="tilfojEn"><i class="fa-solid fa-plus"></i></button> ${ingredient[key]} </li>`
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
function skabTip(tip) {
    let tipText = "";

    if (tip !== "") {
        tipText = `<h3 class="tips">Tips til opskriften</h3>
        <p>${tip}</p>`
    }
    return tipText
}

function renderPreviewArtikel(artikel, placering) {
    placering.innerHTML += `
                       <article class="artikelPreview">
                    <a href="./artikel-fremviser.html?id=${artikel.id}">
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

async function renderFuldArtikel(artikel, placering) {
    placering.innerHTML += `
    <article>
    <section class="artikelInfo fullWidth">
    <div class="text">
    <a href="artikler.html" class="breadcrum">Artikler</a> - <a href="#" class="breadcrum">${artikel.title.rendered}</a>
        <h2 class="artikelNavn">${artikel.title.rendered}</h2>
        <div class="metadata">
            <p class="italic">${artikel.acf.forfatter}</p>
            <p>  ${artikel.acf.upload_dato}</p>
        </div>
        <div class="ikoner">
            <button><i class="fa-regular fa-heart"></i> Gem</button>
            <button><i class="fa-solid fa-arrow-up-from-bracket"></i> Del</button>
            <button><i class="fa-solid fa-print"></i>Print</button>
        </div>
    </div>
    <div class="imgContainer"><img src="${artikel.acf.billede.sizes.large}"
            alt="${artikel.acf.billede.alt}"></div>
</section>

<section class="artikelIndhold fullWidth">
<div class="indhold">
${skabArtikelIndhold(artikel.acf.artikel_meal)}
</div>
<div class="billeder">
${await skabArtikelEkstra(artikel.acf.artikel_meal)}
</div>
</section>
    </article>`
    opdaterTabTitle(artikel.title.rendered + "- Den Glade Gane")

}

function skabArtikelIndhold(artikel) {
    let sektion_1_overskriftText = ""
    let sektion_2_overskriftText = ""
    let sektion_3_overskriftText = ""
    let sektion_4_overskriftText = ""
    let sektion_5_overskriftText = ""
    let sektion_6_overskriftText = ""
    let sektion_7_overskriftText = ""
    let sektion_8_overskriftText = ""
    let sektion_9_overskriftText = ""
    let sektion_10_overskriftText = ""
    let sektion_1_Text = ""
    let sektion_2_Text = ""
    let sektion_3_Text = ""
    let sektion_4_Text = ""
    let sektion_5_Text = ""
    let sektion_6_Text = ""
    let sektion_7_Text = ""
    let sektion_8_Text = ""
    let sektion_9_Text = ""
    let sektion_10_Text = ""

    if (artikel.sektion_1_overskrift !== "") {
        sektion_1_overskriftText = `<h3>${artikel.sektion_1_overskrift}</h3>`
    }
    if (artikel.sektion_1 !== "") {
        sektion_1_Text = `<p>${artikel.sektion_1}</p>`
    }

    if (artikel.sektion_2_overskrift !== "") {
        sektion_2_overskriftText += `<h3>${artikel.sektion_2_overskrift}</h3>`
    }
    if (artikel.sektion_2 !== "") {
        sektion_2_Text = `<p>${artikel.sektion_2}</p>`
    }
    if (artikel.sektion_3_overskrift !== "") {
        sektion_3_overskriftText += `<h3>${artikel.sektion_3_overskrift}</h3>`
    }
    if (artikel.sektion_3 !== "") {
        sektion_3_Text = `<p>${artikel.sektion_3}</p>`
    }
    if (artikel.sektion_4_overskrift !== "") {
        sektion_4_overskriftText += `<h3>${artikel.sektion_4_overskrift}</h3>`
    }
    if (artikel.sektion_4 !== "") {
        sektion_4_Text = `<p>${artikel.sektion_4}</p>`
    }
    if (artikel.sektion_5_overskrift !== "") {
        sektion_5_overskriftText = `<h3>${artikel.sektion_5_overskrift}</h3>`
    }
    if (artikel.sektion_5 !== "") {
        sektion_5_Text = `<p>${artikel.sektion_5}</p>`
    }
    if (artikel.sektion_6_overskrift !== "") {
        sektion_6_overskriftText += `<h3>${artikel.sektion_6_overskrift}</h3>`
    }
    if (artikel.sektion_6 !== "") {
        sektion_6_Text = `<p>${artikel.sektion_6}</p>`
    }
    if (artikel.sektion_7_overskrift !== "") {
        sektion_7_overskriftText += `<h3>${artikel.sektion_7_overskrift}</h3>`
    }
    if (artikel.sektion_7 !== "") {
        sektion_7_Text = `<p>${artikel.sektion_7}</p>`
    }
    if (artikel.sektion_8_overskrift !== "") {
        sektion_8_overskriftText += `<h3>${artikel.sektion_8_overskrift}</h3>`
    }
    if (artikel.sektion_8 !== "") {
        sektion_8_Text = `<p>${artikel.sektion_8}</p>`
    }
    if (artikel.sektion_9_overskrift !== "") {
        sektion_9_overskriftText += `<h3>${artikel.sektion_9_overskrift}</h3>`
    }
    if (artikel.sektion_9 !== "") {
        sektion_9_Text = `<p>${artikel.sektion_9}</p>`
    }
    if (artikel.sektion_10_overskrift !== "") {
        sektion_10_overskriftText += `<h3>${artikel.sektion_10_overskrift}</h3>`
    }
    if (artikel.sektion_10 !== "") {
        sektion_10_Text = `<p>${artikel.sektion_10}</p>`
    }

    return sektion_1_overskriftText + sektion_1_Text + sektion_2_overskriftText + sektion_2_Text + sektion_3_overskriftText + sektion_3_Text + sektion_4_overskriftText + sektion_4_Text + sektion_5_overskriftText + sektion_5_Text + sektion_6_overskriftText + sektion_6_Text + sektion_7_overskriftText + sektion_7_Text + sektion_8_overskriftText + sektion_8_Text + sektion_9_overskriftText + sektion_9_Text + sektion_10_overskriftText + sektion_10_Text;
}
async function skabArtikelEkstra(artikel) {
    let fil_1_indhold = ""
    let fil_2_indhold = ""
    let fil_3_indhold = ""
    let fil_4_indhold = ""
    let fil_5_indhold = ""
    let video_1_indhold = ""
    let video_2_indhold = ""
    let video_3_indhold = ""
    let opskrift_1_indhold = ""
    let opskrift_2_indhold = ""
    let opskrift_3_indhold = ""
    let opskrift_4_indhold = ""
    let opskrift_5_indhold = ""

    if (artikel.fil_1 && artikel.fil_1 !== "") {
        fil_1_indhold = `<div class="imgContainer"><img src="${artikel.fil_1.sizes.large}" alt="${artikel.fil_2.alt}"></div>`
    }

    if (artikel.fil_2 && artikel.fil_2 !== "") {
        fil_2_indhold = `<div class="imgContainer"><img src="${artikel.fil_2.sizes.large}" alt="${artikel.fil_2.alt}"></div>`
    }

    if (artikel.fil_3 && artikel.fil_3 !== "") {
        fil_3_indhold = `<div class="imgContainer"><img src="${artikel.fil_3.sizes.large}" alt="${artikel.fil_3.alt}"></div>`
    }
    if (artikel.fil_4 && artikel.fil_4 !== "") {
        fil_4_indhold = `<div class="imgContainer"><img src="${artikel.fil_4.sizes.large}" alt="${artikel.fil_4.alt}"></div>`
    }
    if (artikel.fil_5 && artikel.fil_5 !== "") {
        fil_5_indhold = `<div class="imgContainer"><img src="${artikel.fil_5.sizes.large}" alt="${artikel.fil_5.alt}"></div>`
    }

    if (artikel.video_1 && artikel.video_1 !== "") {
        video_1_indhold = artikel.video_1
    }
    if (artikel.video_2 && artikel.video_2 !== "") {
        video_2_indhold = artikel.video_2
    }
    if (artikel.video_3 && artikel.video_3 !== "") {
        video_3_indhold = artikel.video_3
    }

    if (artikel.opskrift_1 && artikel.opskrift_1 !== "") {
        opskrift_1_indhold = await hentEnOpskriftFraId(artikel.opskrift_1)
    }
    if (artikel.opskrift_2 && artikel.opskrift_2 !== "") {
        opskrift_2_indhold = await hentEnOpskriftFraId(artikel.opskrift_2)
    }
    if (artikel.opskrift_3 && artikel.opskrift_3 !== "") {
        opskrift_3_indhold = await hentEnOpskriftFraId(artikel.opskrift_3)
    }
    if (artikel.opskrift_4 && artikel.opskrift_4 !== "") {
        opskrift_4_indhold = await hentEnOpskriftFraId(artikel.opskrift_4)
    }
    if (artikel.opskrift_5 && artikel.opskrift_5 !== "") {
        opskrift_5_indhold = await hentEnOpskriftFraId(artikel.opskrift_5)
    }

    return fil_1_indhold + fil_2_indhold + fil_3_indhold + fil_4_indhold + fil_5_indhold + video_1_indhold + video_2_indhold + video_3_indhold + opskrift_1_indhold + opskrift_2_indhold + opskrift_3_indhold + opskrift_4_indhold + opskrift_5_indhold
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

function opdaterTabTitle(title) {
    document.querySelector("title").textContent = title

}

function filterEvents(placering, maltidstype) { /* Funktion der skal bruges til at filterer vores events. */
    placering.innerHTML = ""; /* Fjern alt i "eventContainerEl" */
    let tilladtHovedingrediens = [] /* Variablen med tomt array */
    let tilladtKodtype = [] /* Variablen med tomt array */
    let tilladtMaltidstype = [] /* Variablen med tomt array */
    let tilladtVerdensmad = [] /* Variablen med tomt array */
    let tilladtArstid = [] /* Variablen med tomt array */
    let tilladtDiet = [] /* Variablen med tomt array */
    let tilladtTemperatur = [] /* Variablen med tomt array */
    let tilladtTilberedningstid = [] /* Variablen med tomt array */

    if (maltidstype && maltidstype != "")
        tilladtMaltidstype.push(maltidstype)

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


    /* Hvis elementet i HTML med id'et "OnsdagFilter" er checked */
    if (document.querySelector("#efterårFilter").checked) {
        tilladtArstid.push(document.querySelector("#efterårFilter").value);/*indsæt/push value (onsdag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "TorsdagFilter" er checked*/
    if (document.querySelector("#forårsFilter").checked) {
        tilladtArstid.push(document.querySelector("#forårsFilter").value);/* indsæt/push value (torsdag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "FredagFilter" er checked*/
    if (document.querySelector("#sommerFilter").checked) {
        tilladtArstid.push(document.querySelector("#sommerFilter").value);/* indsæt/push value (fredag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "LørdagFilter" er checked*/
    if (document.querySelector("#vinterFilter").checked) {
        tilladtArstid.push(document.querySelector("#vinterFilter").value);/* indsæt/push value (lørdag) til arrayet "allowedDates" */
    }
    /* Hvis elementet i HTML med id'et "SøndagFilter" er checked*/
    if (document.querySelector("#diabetesFilter").checked) {
        tilladtDiet.push(document.querySelector("#diabetesFilter").value);/* indsæt/push value (søndag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "DWineFilter" er checked*/
    if (document.querySelector("#laktoseFilter").checked) {
        tilladtDiet.push(document.querySelector("#laktoseFilter").value)/* indsæt/push value (D`Wine Bar) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "SallingFilter" er checked*/
    if (document.querySelector("#vegatarFilter").checked) {
        tilladtDiet.push(document.querySelector("#vegatarFilter").value)/* indsæt/push value (Salling Rooftop) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "JazzscenenFilter" er checked*/
    if (document.querySelector("#forretFilter").checked) {
        tilladtMaltidstype.push(document.querySelector("#forretFilter").value)/* indsæt/push value (Jazzscenen) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "OnsdagFilter" er checked */
    if (document.querySelector("#hovedretFilter").checked) {
        tilladtMaltidstype.push(document.querySelector("#hovedretFilter").value);/*indsæt/push value (onsdag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "TorsdagFilter" er checked*/
    if (document.querySelector("#dessertFilter").checked) {
        tilladtMaltidstype.push(document.querySelector("#dessertFilter").value);/* indsæt/push value (torsdag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "FredagFilter" er checked*/
    if (document.querySelector("#varmtFilter").checked) {
        tilladtTemperatur.push(document.querySelector("#varmtFilter").value);/* indsæt/push value (fredag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "LørdagFilter" er checked*/
    if (document.querySelector("#koldFilter").checked) {
        tilladtTemperatur.push(document.querySelector("#koldFilter").value);/* indsæt/push value (lørdag) til arrayet "allowedDates" */
    }
    /* Hvis elementet i HTML med id'et "SøndagFilter" er checked*/
    if (document.querySelector("#lynhurtigtFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#lynhurtigtFilter").value);/* indsæt/push value (søndag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "DWineFilter" er checked*/
    if (document.querySelector("#hurtigFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#hurtigFilter").value)/* indsæt/push value (D`Wine Bar) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "SallingFilter" er checked*/
    if (document.querySelector("#mellemFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#mellemFilter").value)/* indsæt/push value (Salling Rooftop) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "FredagFilter" er checked*/
    if (document.querySelector("#langsomFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#langsomFilter").value);/* indsæt/push value (fredag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "LørdagFilter" er checked*/
    if (document.querySelector("#asiasiskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#asiasiskFilter").value);/* indsæt/push value (lørdag) til arrayet "allowedDates" */
    }
    /* Hvis elementet i HTML med id'et "SøndagFilter" er checked*/
    if (document.querySelector("#italienskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#italienskFilter").value);/* indsæt/push value (søndag) til arrayet "allowedDates" */
    }

    /* Hvis elementet i HTML med id'et "DWineFilter" er checked*/
    if (document.querySelector("#mellemøstiskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#mellemøstiskFilter").value)/* indsæt/push value (D`Wine Bar) til arrayet "allowedPlaces" */
    }

    /* Hvis elementet i HTML med id'et "SallingFilter" er checked*/
    if (document.querySelector("#mexicanskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#mexicanskFilter").value)/* indsæt/push value (Salling Rooftop) til arrayet "allowedPlaces" */
    }

    hentOpskrifterFraTaxonomy(tilladtHovedingrediens, tilladtKodtype, tilladtMaltidstype, tilladtDiet, tilladtVerdensmad, tilladtArstid, tilladtTemperatur, tilladtTilberedningstid, 100, placering)
}


function renderNavigation() {
    navEl.innerHTML += ` <ul>
    <li><a href="./index.html" class="logo"> <img src="./assets/img/Logo-lille.png" alt=""></a></li>
    <li class="opskriftDropdown"><a href="./opskrifter.html" >Opskrifter  <i
                class="fa-solid fa-chevron-down"></i></a>

        <ul class="dropdown ">
            <li><a href="./kategorier.html?id=39">Morgenmad</a></li>
            <li><a href="./kategorier.html?id=15">Frokost</a></li>
            <li><a href="./kategorier.html?id=17">Aftensmad</a></li>
            <li><a href="./kategorier.html?id=20">Dessert</a></li>
            <li><a href="./kategorier.html?id=19">Tilbehør</a></li>
            <li><a href="./kategorier.html?id=21">Snack</a></li>
        </ul>

    </li>
    <li><a href="./artikler.html">Artikler</a></li>
</ul>
<div>
    <button><i class="fa-solid fa-magnifying-glass"></i></button>
    <button><i class="fa-solid fa-heart"></i></button>
    <button><i class="fa-regular fa-rectangle-list"></i></button>
    <button><i class="fa-regular fa-user"></i></button>
</div>`
}

function renderFooter() {
    footerEl.innerHTML += `<div class="nyhedsbrev">
<div class="text">
    <h2>Tilmeld dig vores nyhedsbrev </h2>
    <p>Bliv en del af vores mad elskende fællesskab. Tilmeld dig vores nyhedsbrev og åben døren til en
        kulinarisk mad oplevelser.</p>
    <p>Din rejse mod ny smagsoplevelser starter her. </p>
    <label for="name">Navn</label>
    <input type="text" id="name" name="name" placeholder="Navn" />
    <label for="email">Email</label>
    <input type="text" id="email" name="Email" placeholder="Email" />
    <button>Tilmeld nyhedsbrev</button>
</div>
<div class="imgContainer"><img src="./assets/img/mor-datte-bagning.jpg" alt=""></div>

</div>
<div class="social">
<a href="https://www.instagram.com/foodista"><i class="fa-brands fa-instagram"></i> </a>
<a href="https://www.facebook.com/Foodista"><i class="fa-brands fa-facebook-f"></i> </a>
<a href="https://www.instagram.com/foodista"><i class="fa-brands fa-youtube"></i></a>
</div>
<div class="sitemap"> <a href="./opskrifter.html">Opskrifter</a> <a href="./artikler.html">Artikler</a></div>`
}