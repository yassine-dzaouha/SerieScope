import { getAll } from "./services/serieService.js";
import { state } from "./data/store.js";
import { showSeries } from "./ui/cards.js";
import { AppendGenres, AppendLanguages } from "./ui/filters.js";
import { genreFilter, languageFilter, loadingMessage, searchInput } from "./ui/dom.js";

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
        const response = await getAll(getParams());

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

async function init() {
    await loadSeries();
}

init()

searchInput.addEventListener("input", () => {
    state.criteria.name = searchInput.value.trim();
    loadSeries()
});

genreFilter.addEventListener("change", () => {
    state.criteria.genre = genreFilter.value;
    loadSeries();
});

languageFilter.addEventListener("change", () => {
    state.criteria.language = languageFilter.value;
    loadSeries();
});

resetBtn.addEventListener("click", () => {
    state.criteria = { name: "", genre: "", language: "" };
    searchInput.value = "";
    genreFilter.value = "all";
    languageFilter.value = "all";
    loadSeries();
});


