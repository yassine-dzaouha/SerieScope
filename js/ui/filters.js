import { genreFilter } from "./dom.js";

function GetGenres(list) {
    const AllGenres = [];
    list.forEach((serie)=> serie.genres.forEach((genre) => {
        if (!AllGenres.includes(genre)){
            AllGenres.push(genre);
        } 
    }))
    return AllGenres;
}

export function AppendGenres(list) {
    const current = genreFilter.value;

    const allGenres = GetGenres(list);
    allGenres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.append(option);
    });
    genreFilter.value = allGenres.includes(current) ? current : "all";
}