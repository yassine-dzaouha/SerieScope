import { state } from "../data/store.js";
import { genreFilter, languageFilter, searchInput,  } from "./dom.js";

function GetGenres(list) {
    const AllGenres = [];
    list.forEach((serie)=> serie.genres.forEach((genre) => {
        if (!AllGenres.includes(genre)){
            AllGenres.push(genre);
        } 
    }));
    return AllGenres;
}

export function AppendGenres(list) {
    const current = genreFilter.value;
    genreFilter.textContent = "";
    const alloption = document.createElement("option");
    alloption.textContent = "Tous les genres";
    alloption.value = "";
    genreFilter.append(alloption)
    const allGenres = GetGenres(list);
    allGenres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.append(option);
    });
    genreFilter.value = allGenres.includes(current) ? current : "";
};

function GetLanguages(list) {
    const AllLanguages = [];
    list.forEach((serie)=> {
        if (!AllLanguages.includes(serie.language)){
            AllLanguages.push(serie.language);
        };
    });
    return AllLanguages;
};

export function AppendLanguages(list) {
    const current = languageFilter.value;
    languageFilter.textContent = "";
    const alloption = document.createElement("option");
    alloption.textContent = "Tous les genres";
    alloption.value = "";
    languageFilter.append(alloption);
    const AllLanguages = GetLanguages(list);
    AllLanguages.forEach(language => {
        const option = document.createElement("option");
        option.value = language;
        option.textContent = language;
        languageFilter.append(option);
    });
    languageFilter.value = AllLanguages.includes(current) ? current : "";
};

export function getParams() {
    const params = {};

    if (state.criteria.name){
        params.name = state.criteria.name;
    }
    if (state.criteria.genre) {
        params.genre = state.criteria.genre;
    }
    if (state.criteria.language) {
        params.language = state.criteria.language;
    }

    return params;
}