const opskriftContainerEl = document.querySelector(".opskriftContainer")
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// hentOpskrift(id, opskriftContainerEl)