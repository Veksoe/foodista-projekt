const baseUrl = "https://api-database.annikavekso.com/wp-json/wp/v2/"
const opskriftKategori = "?categories=2"
const artikelKategori = "?categories=37"
const filterBtnEl = document.querySelector(".filterBtn")
const filterContainernEl = document.querySelector(".filterContainer")
const toggleEls = document.querySelectorAll(".toggle")
const navEl = document.querySelector("nav")
const footerEl = document.querySelector("footer")


renderNavigation() /* Kald funktionen der skaber navigationen */
renderFooter() /* Kald funktionen der skaber footer */


/************************************
HENT OPSKRIFTER PÅ FORSKELLIGE MÅDER
*************************************/

/* Hent en opskrift og tag et id og en placering ind */
function hentOpskrift(opskriftId, placering) {
    fetch(baseUrl + "posts/" + opskriftId) /* Fetch link med id fra den specefikke opskrift vi ønsker at hente.  */
        .then(res => res.json())
        .then(data => {
            renderFuldOpskrift(data, placering) /* Kald funktionen der renderer en opskrift med dataet der bliver fetchet og hvor den skal placeres på siden  */
        })
        .catch(err => console.log("Noget gik galt: " + err));
}

/* Hent alle opskrifter og tag en placering ind */
function hentAlleOpskrifter(placering) {
    fetch(baseUrl + "posts/" + opskriftKategori + "&per_page=100") /* Fetch link med querrien til opskrift kategorien og hent 100 "posts".  */
        .then(res => res.json())
        .then(data => {
            data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering)) /* For hvert object i datet, kør funktionen til at rendere preview af en opskrift/opskrift card. */
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/* Hent de nyeste opskrifter og tag et antal der skal vises og en placering ind */
function hentNyesteOpskrifter(antal, placering) {
    fetch(baseUrl + "posts/" + opskriftKategori + "&per_page=" + antal) /* Fetch link med med querrien til opskrift kategorien og hent det antal opskrifter sat når funktionen klades.  */
        .then(res => res.json())
        .then(data => {
            data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering)) /* For hvert object i datet, kør funktionen til at rendere preview af en opskrift/opskrift card. */
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/* Hent udvalgte opskrifter og tag en kategori, et taxonomi id, et antal der skal vises og en placering ind */
function hentUdvalgteOpskrifter(kateogori, taxonomiId, antal, placering) {
    fetch(baseUrl + "posts" + opskriftKategori + "&" + kateogori + "=" + taxonomiId + "&per_page=" + antal) /* Fetch link med parameterne sat i funktionens kaldet  */
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) { /* Hvis der ikke er noget data  sæt teksten ind i placeringen sat i functions kaldet */
                placering.innerHTML += `<p>Der er desværre ingen opskrifter der matcher dit valg</p>`
            }
            else { /* Hvis der er noget data kør kør funktionen til at rendere preview af en opskrift/opskrift card for hver data */
                data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering))
            }
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/* Hent opskrifter og fra bestemt taxonomi og taxonomierne, et antal der skal vises og en placering ind */
function hentOpskrifterFraTaxonomy(hovedingrediens, kodtype, maltidstype, diet, verdensmad, arstid, temperatur, tilberedningstid, antal, placering) {
    let filteretUrl = baseUrl + "posts" + opskriftKategori + "&per_page=" + antal; /* Variable til at holde url'et til filtreringen af opskrifter */
    let query = ""; /* Variable til at holde det vi vil filtere ud fra */

    if (hovedingrediens && hovedingrediens.length !== 0) { /* Tjekker om vi sætter noget i parameteret */
        query += "&hovedingrediens=" + hovedingrediens /* Hvis der er sat noget, ligger vi det til vores query variable, sammen med teksten til den kategori */
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

    fetch(filteretUrl + query) /* Hent datet fra linket der kommer når vi ligger vores query variable sammen med vores filteretUrl */
        .then(res => res.json())
        .then(data => {

            if (data.length === 0) { /* Hvis der ikke er noget data  sæt teksten ind i placeringen sat i functions kaldet */
                placering.innerHTML += `<p>Der er desværre ingen opskrifter der matcher dit valg</p>`
            }
            else {
                data.forEach(opskrift => renderPreviewOpskrift(opskrift, placering)) /* Hvis der er noget data kør kør funktionen til at rendere preview af en opskrift/opskrift card for hver data */
            }

        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/** Hent opskrift ud fra et id */
async function hentEnOpskriftFraId(id) {
    /* Gør det samme som de "almindelige" fetch, gør opsætningen/koden nemmere når vi kalder funktionen */
    try { /* Prøv at gør de næste ting efter hinanden. */
        const res = await fetch(baseUrl + "posts/" + id)
        const data = await res.json()
        /* Retuner htmlen til previewet af en opskrift så det kan bruges når vi kalder funktionen*/
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
    } catch (err) { /* Hvis den ikke kan gøre de overstående ting, retuner en fejlmeddelelse. */
        return console.log("Noget gik galt: " + err)
    }
}

/* Render preview til en opskrift / opskrift card */
function renderPreviewOpskrift(opskrift, placering) {
    /* Brug innerHTML på placeringen sat i funktions kaldet til at indsætte indholdet */
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

/* Render hele opskriften */
function renderFuldOpskrift(opskrift, placering) {
    /* Brug innerHTML på placeringen sat i funktions kaldet til at indsætte indholdet. Brug funktioner til at opsætte ingredienser, fremgangmåde og tips. */
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

    opdaterTabTitle(opskrift.title.rendered + "- Den Glade Gane") /* Kør funktionen der opdatere teksten i fanen ud, med titlen på opskriften og hjemmesiden navn  */
}

/* Skab ingredienserne og deres opsætning */
function skabIngredienser(ingrediens) {
    let liste = ""; /* Variable til at holde listen af ingredienser */
    for (const key in ingrediens) { /* For hver key/element i parameteret(ingredient) vi får når vi kalder funktionen, tjek om ingrediens er sat og indeholde tekst */
        if (ingrediens && ingrediens[key] !== "") {
            /* Hvis den er sat og har noget tekst i sig, tilføj html til at lave et listepunkt hvor vi sætter indholdet i ingrediens keyen/elementet ind */
            liste += `<li><button class="tilfojEn"><i class="fa-solid fa-plus"></i></button> ${ingrediens[key]} </li>`
        }
    }
    return liste /* Retuner liste-variablen så vi kan bruge den når vi kalder funktionen */
}

/* Skab fremgangsmåden og deres opsætning */
function skabFremgangsmade(fremgangsmade) {
    let liste = ""; /* Variable til at holde listen af fremgangsmåde */
    for (const key in fremgangsmade) { /* For hver key/element i parameteret(fremgangsmåde) vi får når vi kalder funktionen, tjek om fremgangsmåden er sat og indeholde tekst */
        if (fremgangsmade && fremgangsmade[key] !== "") {
            /* Hvis den er sat og har noget tekst i sig, tilføj html til at lave et listepunkt hvor vi sætter indholdet i fremgangsmåde keyen/elementet ind */
            liste += `<li>${fremgangsmade[key]} </li>`
        }
    }
    return liste /* Retuner liste-variablen så vi kan bruge den når vi kalder funktionen */
}

/* Skab tip og dens opsætning */
function skabTip(tip) {
    let tipText = ""; /* Variabel til at holde teksten til tippet */

    if (tip !== "") { /* Hvis der er tekst i parameteret/tippet, vi sætter ind når vi kalder funktionen, tilføj teksten til tipText variablen sammen med ekstra tekst*/
        tipText = `<h3 class="tips">Tips til opskriften</h3>
        <p>${tip}</p>`
    }
    return tipText /* Retuner tipText variablen så vi kan bruge den når vi kalder funktionen */
}


/************************************
HENT ARTIKLER PÅ FORSKELLIGE MÅDER
*************************************/

/* Hent en artikel og tag et id og en placering ind */
function hentArtikel(artikelId, placering) {
    fetch(baseUrl + "posts/" + artikelId) /* Fetch link med id fra den specefikke artikel vi ønsker at hente.  */
        .then(res => res.json())
        .then(async data => {
            /* Kald funktionen der renderer en opskrift med dataet der bliver fetchet og hvor den skal placeres på siden  og vent med at gå videre i koden til den er kørt færdig */
            await renderFuldArtikel(data, placering)
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/* Hent alle opskrifter og tag en placering ind */
function hentAlleArtikler(placering) {
    fetch(baseUrl + "posts/" + artikelKategori + "&per_page=100") /* Fetch link med querrien til artikel kategorien og hent 100 "posts".  */
        .then(res => res.json())
        .then(data => {
            data.forEach(artikel => renderPreviewArtikel(artikel, placering)) /* For hvert object i datet, kør funktionen til at rendere preview af en artikel/artikel card. */
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/* Hent de nyeste artikler og tag et antal der skal vises og en placering ind */
function hentNyesteArtikler(antal, placering) {
    fetch(baseUrl + "posts/" + artikelKategori + "&per_page=" + antal) /* Fetch link med med querrien til artikel kategorien og hent det antal artikler sat når funktionen klades.  */
        .then(res => res.json())
        .then(data => {
            data.forEach(artikel => renderPreviewArtikel(artikel, placering)) /* For hvert object i datet, kør funktionen til at rendere preview af en artikel/artikel card. */
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/* Hent udvalgte opskrifter og tag en kategori, et taxonomi id, et antal der skal vises og en placering ind */
function hentUdvalgteArtikler(kateogori, taxonomiId, antal, placering) {
    fetch(baseUrl + "posts" + artikelKategori + "&" + kateogori + "=" + taxonomiId + "&per_page=" + antal) /* Fetch link med parameterne sat i funktionens kaldet  */
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) { /* Hvis der ikke er noget data  sæt teksten ind i placeringen sat i functions kaldet */
                placering.innerHTML += `<p>Der er desværre ingen opskrifter der matcher dit valg</p>`
            }
            else {  /* Hvis der er noget data kør kør funktionen til at rendere preview af en artikel/artikel card for hver data */
                data.forEach(artikel => renderPreviewArtikel(artikel, placering))
            }
        })
        .catch(err => console.log("Noget gik galt: " + err));

}

/* Render preview til en artikel / artikel card */
function renderPreviewArtikel(artikel, placering) {
    /* Brug innerHTML på placeringen sat i funktions kaldet til at indsætte indholdet */
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

/* Render hele opskriften */
async function renderFuldArtikel(artikel, placering) {
    /* Brug innerHTML på placeringen sat i funktions kaldet til at indsætte indholdet. Brug funktioner til at opsætte tekst indhold og ekstra ikke-tekst indhold. */
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
    opdaterTabTitle(artikel.title.rendered + "- Den Glade Gane") /* Kør funktionen der opdatere teksten i fanen ud, med titlen på artiklen og hjemmesiden navn */

}

/* Skab indholdet til tekstdelen af artiklen */
function skabArtikelIndhold(artikel) {
    /* Variabler til at holde teksten i hver mulig sektion på siden */
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

    /* Tjek om en sektions overskrift har noget tekst. */
    if (artikel.sektion_1_overskrift !== "") {
        /* Hvis den har tekst, gem htmlen til en h3 med teksten, i variablen der skal holde dens tekst. */
        sektion_1_overskriftText = `<h3>${artikel.sektion_1_overskrift}</h3>`
    }
    /* Tjek om en sektionen har noget tekst. */
    if (artikel.sektion_1 !== "") {
        /* Hvis den har tekst, gem htmlen til en p med teksten, i variablen der skal holde dens tekst. */
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

    /* Retuner alle variablerne til tekst-indholdet så vi kan bruge det når vi kalder funktionen.*/
    return sektion_1_overskriftText + sektion_1_Text + sektion_2_overskriftText + sektion_2_Text + sektion_3_overskriftText + sektion_3_Text + sektion_4_overskriftText + sektion_4_Text + sektion_5_overskriftText + sektion_5_Text + sektion_6_overskriftText + sektion_6_Text + sektion_7_overskriftText + sektion_7_Text + sektion_8_overskriftText + sektion_8_Text + sektion_9_overskriftText + sektion_9_Text + sektion_10_overskriftText + sektion_10_Text;
}

/* Skab indholdet til ekstra-indholds delen af artiklen */
async function skabArtikelEkstra(artikel) {
    /* Variabler til at holde indholdet i hver mulig ekstra indhold på siden */
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

    /* Tjek om en fil er sat eller har noget tekst. */
    if (artikel.fil_1 && artikel.fil_1 !== "") {
        /* Hvis den har noget indhold, gem htmlen til et billede med tingene fra den aktutelle fil sat ind, i variablen der skal holde dens indhold. */
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

    /* Tjek om en video er sat eller har noget tekst. */
    if (artikel.video_1 && artikel.video_1 !== "") {
        /* Hvis den har noget indhold, gem det i variablen der skal holde dens indhold. */
        video_1_indhold = artikel.video_1
    }
    if (artikel.video_2 && artikel.video_2 !== "") {
        video_2_indhold = artikel.video_2
    }
    if (artikel.video_3 && artikel.video_3 !== "") {
        video_3_indhold = artikel.video_3
    }
    /* Tjek om et opskrift id er sat eller har noget tekst. */
    if (artikel.opskrift_1 && artikel.opskrift_1 !== "") {
        /* Hvis den har noget indhold, gem funktionen til at hente en opskrift ud fra et id i variablen. Vent med at forsætte i koden til funktionen er færdig. */
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

    /* Retuner alle variablerne til tekst-indholdet så vi kan bruge det når vi kalder funktionen.*/
    return fil_1_indhold + fil_2_indhold + fil_3_indhold + fil_4_indhold + fil_5_indhold + video_1_indhold + video_2_indhold + video_3_indhold + opskrift_1_indhold + opskrift_2_indhold + opskrift_3_indhold + opskrift_4_indhold + opskrift_5_indhold
}

/************************************
EKSTRA TING
*************************************/

/* Hent en taxonomi-kategori ud fra et id og tag et id ind */
function hentKategoriFraId(id) {
    /* Kig på id'et der bliver sat ind når man kalder funktionen og kør gennem hver case og se om det matcher. Når den rammer en case den matcher, retunere den en kategori som kan bruges når funktionen kaldes. */
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

/* Tjek om der er en filterBtn på siden. Hvis der er, tilføj en eventlistene, så når man klikker på knappen toggler den hidden-classen på filterContainer */
if (filterBtnEl) {
    filterBtnEl.addEventListener("click", () => {
        filterContainernEl.classList.toggle("hidden")
    })
}

/* Opdater titlen i tabsene  */
function opdaterTabTitle(title) {
    /* Fang title tagget og sæt den tekst lige med parameteret/titlen der bliver sat når funktionen bliver kaldt.*/
    document.querySelector("title").textContent = title

}

/* Filtrer opskrifter og tag en placering og en måltidstype ind */
function filterOpskrifter(placering, maltidstype) {
    placering.innerHTML = ""; /* Fjern hvad der står i placeringen i øjeblikket */
    let tilladtHovedingrediens = [] /* Variablen med tomt array til at holde taxonomier i den aktuelle kategori */
    let tilladtKodtype = []
    let tilladtMaltidstype = []
    let tilladtVerdensmad = []
    let tilladtArstid = []
    let tilladtDiet = []
    let tilladtTemperatur = []
    let tilladtTilberedningstid = []

    /* Tjek om måltidstype er sat og indeholder tekst */
    if (maltidstype && maltidstype != "")
        /* Hvis den indeholder noget, tilføjer vi den arrayet med tilladte måltidstyper */
        tilladtMaltidstype.push(maltidstype)

    /* Hvis elementet i HTMLet med et bestemt id er checked */
    if (document.querySelector("#pastaFilter").checked) {
        /* Hvis den er checked, indsæt dens værdi i det aktuelle array */
        tilladtHovedingrediens.push(document.querySelector("#pastaFilter").value);
    }
    if (document.querySelector("#suppeFilter").checked) {
        tilladtHovedingrediens.push(document.querySelector("#suppeFilter").value);
    }
    if (document.querySelector("#risFilter").checked) {
        tilladtHovedingrediens.push(document.querySelector("#risFilter").value);
    }
    if (document.querySelector("#kartofelFilter").checked) {
        tilladtHovedingrediens.push(document.querySelector("#kartofelFilter").value);
    }
    if (document.querySelector("#kyllingeFilter").checked) {
        tilladtKodtype.push(document.querySelector("#kyllingeFilter").value);
    }
    if (document.querySelector("#oksekødFilter").checked) {
        tilladtKodtype.push(document.querySelector("#oksekødFilter").value)
    }
    if (document.querySelector("#svinekødFilter").checked) {
        tilladtKodtype.push(document.querySelector("#svinekødFilter").value)
    }
    if (document.querySelector("#fiskeFilter").checked) {
        tilladtKodtype.push(document.querySelector("#fiskeFilter").value)
    }
    if (document.querySelector("#efterårFilter").checked) {
        tilladtArstid.push(document.querySelector("#efterårFilter").value);
    }
    if (document.querySelector("#forårsFilter").checked) {
        tilladtArstid.push(document.querySelector("#forårsFilter").value);
    }
    if (document.querySelector("#sommerFilter").checked) {
        tilladtArstid.push(document.querySelector("#sommerFilter").value);
    }
    if (document.querySelector("#vinterFilter").checked) {
        tilladtArstid.push(document.querySelector("#vinterFilter").value);
    }
    if (document.querySelector("#diabetesFilter").checked) {
        tilladtDiet.push(document.querySelector("#diabetesFilter").value);
    }
    if (document.querySelector("#laktoseFilter").checked) {
        tilladtDiet.push(document.querySelector("#laktoseFilter").value)
    }
    if (document.querySelector("#vegatarFilter").checked) {
        tilladtDiet.push(document.querySelector("#vegatarFilter").value)
    }
    if (document.querySelector("#forretFilter").checked) {
        tilladtMaltidstype.push(document.querySelector("#forretFilter").value)
    }
    if (document.querySelector("#hovedretFilter").checked) {
        tilladtMaltidstype.push(document.querySelector("#hovedretFilter").value);
    }
    if (document.querySelector("#dessertFilter").checked) {
        tilladtMaltidstype.push(document.querySelector("#dessertFilter").value);
    }
    if (document.querySelector("#varmtFilter").checked) {
        tilladtTemperatur.push(document.querySelector("#varmtFilter").value);
    }
    if (document.querySelector("#koldFilter").checked) {
        tilladtTemperatur.push(document.querySelector("#koldFilter").value);
    }
    if (document.querySelector("#lynhurtigtFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#lynhurtigtFilter").value);
    }
    if (document.querySelector("#hurtigFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#hurtigFilter").value)
    }
    if (document.querySelector("#mellemFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#mellemFilter").value)
    }
    if (document.querySelector("#langsomFilter").checked) {
        tilladtTilberedningstid.push(document.querySelector("#langsomFilter").value);
    }
    if (document.querySelector("#asiasiskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#asiasiskFilter").value);
    }
    if (document.querySelector("#italienskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#italienskFilter").value);
    }
    if (document.querySelector("#mellemøstiskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#mellemøstiskFilter").value)
    }
    if (document.querySelector("#mexicanskFilter").checked) {
        tilladtVerdensmad.push(document.querySelector("#mexicanskFilter").value)
    }
    /* Kør funktionen der henter opskrifter ud fra taxonomier, og indsæt variablerne med de valgte/tilladte felter der er blevet checked, sammen med antallet der skal vises og hvor det skal vises. */
    hentOpskrifterFraTaxonomy(tilladtHovedingrediens, tilladtKodtype, tilladtMaltidstype, tilladtDiet, tilladtVerdensmad, tilladtArstid, tilladtTemperatur, tilladtTilberedningstid, 100, placering)
}

/* Render navigationen */
function renderNavigation() {
    navEl.innerHTML += ` <ul>
    <li><a href="./index.html" class="logo"> <img src="./assets/img/Logo-lille.png" alt=""></a></li>
    <li class="opskriftDropdown"><a href="./opskrifter.html" >Opskrifter  <i
                class="fa-solid fa-chevron-down"></i></a>

        <ul class="dropdown ">
            <li><a href="./kategorier.html?id=39"> <img src="./assets/img/morgenmad-buffet.jpg"
            alt="Æg og bacon på en pande, på et bordm ed morgenmadbuffet"> Morgenmad</a></li>
            <li><a href="./kategorier.html?id=15"><img src="./assets/img/frokost-sandwich.jpg" alt="En sprød sandwich på træ-skærebræt "> Frokost</a></li>
            <li><a href="./kategorier.html?id=17"> <img src="./assets/img/aftensmad-buffet.jpg"
            alt="Aftensmadbuffet med masser af forskelligt mad og folk der rækker ind over bordet.">Aftensmad</a></li>
            <li><a href="./kategorier.html?id=20">  <img src="./assets/img/dessert-kage.jpg"
            alt="Chokoladekage med blåbær på toppen på en rød tallerken.">Dessert</a></li>
            <li><a href="./kategorier.html?id=19"><img src="./assets/img/tilbehør-salat.jpg"
            alt="Farverig salat med ferkner, rødbeder, nødder, ost og salat.">Tilbehør</a></li>
            <li><a href="./kategorier.html?id=21"><img src="./assets/img/snack-bord.jpg"
            alt="Bord med nachochip, guacamole, ostedip, tomater og chili.">Snack</a></li>
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

/* Render footeren */
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