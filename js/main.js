import { create, getAll } from "./services/serieService.js";
import { state } from "./data/store.js";
import { showSeries } from "./ui/cards.js";
import { AppendGenres, AppendLanguages } from "./ui/filters.js";
import { form, genreFilter, imageInput, languageFilter, loadingMessage, searchInput } from "./ui/dom.js";
import { addSerie, validateForm } from "./ui/form.js";

let pictureData = null;

function getParams() {
    const params = {};

    if (state.criteria.name) params.name = state.criteria.name;
    if (state.criteria.genre) params.genre = state.criteria.genre;
    if (state.criteria.language) params.language = state.criteria.language;

    return params;
}

async function loadSeries() {
    loadingMessage.hidden = false;
    try {
        const response = await getAll();

        state.series = response;
        console.log(state.series);

        showSeries(state.series);
        AppendGenres(state.series);
        AppendLanguages(state.series);

    } catch (error) {
        console.error(error);
    } finally {
        loadingMessage.hidden = true;
    }
}

async function loadFilters() {
    loadingMessage.hidden = false;
    try {
        const response = await getAll(getParams());

        state.series = response;
        console.log(state.series);
        showSeries(state.series);

    } catch (error) {
        console.error(error);
    } finally {
        loadingMessage.hidden = true;
    }
}

async function init() {
    await loadSeries();
    await loadFilters();
}

init();

searchInput.addEventListener("input", () => {
    state.criteria.name = searchInput.value.trim();
    loadFilters();
});

genreFilter.addEventListener("change", () => {
    state.criteria.genre = genreFilter.value;
    loadFilters();
});

languageFilter.addEventListener("change", () => {
    state.criteria.language = languageFilter.value;
    loadFilters();
});

resetBtn.addEventListener("click", () => {
    state.criteria = { name: "", genre: "", language: "" };
    searchInput.value = "";
    genreFilter.value = "all";
    languageFilter.value = "all";
    loadSeries();
});

// imageInput.addEventListener("change", function () {
//     const file = this.files[0];
//     pictureData = null; 

//     if (!file || !file.type.startsWith("image/")) {
//         return; 
//     }

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         pictureData = reader.result;
//     };
//     reader.readAsDataURL(file);
// });

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    addSerie();
    showSeries(state.series);
});