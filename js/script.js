let series = [];

const errorMessage = document.getElementById("errorMessage");
const articles = document.getElementById("articles");
const emptyMessage = document.getElementById("emptyMessage");
const pagination = document.getElementById("pagination");
let page_actuelle = document.getElementById("page-actuelle");
let btn_precedent = document.getElementById("btn-precedent");
let btn_suivant = document.getElementById("btn-suivant");
let resultCount = document.getElementById("resultCount");
let genreFilter = document.getElementById("genreFilter")

// if(!localStorage.getItem("page")){
//     localStorage.setItem("page",1);
// }
// let page = Number(localStorage.getItem("page"));
let page = 1;

const saved = localStorage.getItem("series");
if (saved) {
    series = JSON.parse(saved);
    showSeries(series);
} else {
    fetch("https://api.tvmaze.com/shows?page=0")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            series = data;
            localStorage.setItem("series", JSON.stringify(series));
            showSeries(series);
        })
        .catch((error) => {
            errorMessage.textContent =
                "Impossible de charger le catalogue. Réessaie plus tard.";
            console.error(error);
        })
        
}

function showSeries(liste) {
    articles.textContent = "";

    if (liste.length === 0) {
        emptyMessage.hidden = false;
        pagination.hidden = true;
        return;
    }

    emptyMessage.hidden = true;

    let total_pages = Math.ceil(liste.length / 15);
    let debut = (page - 1) * 15;
    let fin = debut + 15;
    let pageOfSeries = liste.slice(debut, fin);

    pagination.hidden = total_pages <= 1;

    page_actuelle.textContent = `Page ${page} sur ${total_pages}`;

    btn_precedent.hidden = page === 1;
    btn_suivant.hidden = page === total_pages;
    resultCount.textContent = `${pageOfSeries.length} séries affichées`
    pageOfSeries.forEach((serie) => {
        const article = createEl(
            "article",
            "bg-[#191919] border border-[#393939] rounded-lg overflow-hidden flex flex-col"
        );
        
        const image = createEl("img", "w-full aspect-[4/3] object-cover bg-[#252525]");
        image.alt = "Affiche de " + serie.name;
        if (serie.image) {
            image.src = serie.image.medium;
        }

        const corps = createEl("div", "p-3 flex flex-col gap-2 flex-1");
        
        const titre = createEl("h3", "font-bold text-[16px]", serie.name);
        
        
        const genres = createEl("div", "flex flex-wrap gap-1");
        serie.genres.forEach((genre) => {
            const badge = createEl(
                "span",
                "text-[11px] px-2 py-0.5 border border-[#393939] rounded-full bg-[#252525]",
                genre
            );
            genres.append(badge);
        });
        const desc = createEl(
            "p",
            "line-clamp-2 text-[#8290A2] text-[12px]"
        );
        desc.innerHTML = serie.summary;
        const detailsLink = createEl(
            "a",
            "mt-auto inline-block text-center bg-[#252525] text-white text-[14px] font-bold px-3 py-2 rounded-lg hover:bg-[#151414] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#191919]",
            "Voir les détails"
        );
        detailsLink.href = "details.html?id=" + serie.id;


        corps.append(titre, genres,desc,detailsLink);
        article.append(image, corps);
        articles.append(article);
        AppendGenres();
    });
}

btn_suivant.addEventListener("click", () => {
    page++;
    // localStorage.setItem("page",page)
    showSeries(series);
});

btn_precedent.addEventListener("click", () => {
    page--;
    // localStorage.setItem("page",page)
    showSeries(series);
});

function createEl(tag, classes, text) {
    const element = document.createElement(tag);
    element.className = classes;
    if (text) {
        element.textContent = text;
    }
    return element;
}

function GetGenres() {
    const AllGenres = [];
    series.forEach((serie)=> serie.genres.forEach((genre) => {
        if (!AllGenres.includes(genre)){
            AllGenres.push(genre);
        } 
    }))
    return AllGenres;
}

function AppendGenres() {
    const current = genreFilter.value;   // remember the choice
    genreFilter.textContent = "";

    const TousOption = document.createElement("option");
    TousOption.textContent = "Tous les genres";
    TousOption.value = "all";
    genreFilter.append(TousOption);

    const allGenres = GetGenres();
    allGenres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter.append(option);
    });

    genreFilter.value = allGenres.includes(current) ? current : "all";
}

const form = document.querySelector("form");
const nameInput = document.getElementById("seriesName");
const genreInput = document.getElementById("seriesGenre");
const imageInput = document.getElementById("seriesImage");
const descInput = document.getElementById("description");

const nameError = document.getElementById("seriesNameError");
const genreError = document.getElementById("seriesGenreError");
const imageError = document.getElementById("seriesImageError");
const descError = document.getElementById("seriesDescriptionError");

function validateForm() {
    nameError.textContent = "";
    genreError.textContent = "";
    imageError.textContent = "";

    let isValid = true;

    const title = nameInput.value.trim();
    const genre = genreInput.value.trim();
    const file = imageInput.files[0];
    const desc = descInput.value.trim();

    if (title === "") {
        nameError.textContent = "Le titre est obligatoire.";
        isValid = false;
    }

    if (genre === "") {
        genreError.textContent = "Le genre est obligatoire.";
        isValid = false;
    }

    if (!file) {
        console.log(file)
        imageError.textContent = "Le fichier doit être une image.";
        isValid = false;
    }

    if (desc === "") {
        descError.textContent = "La description est obligatoire.";
        isValid = false;
    }

    return isValid;
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    console.log(imageInput.files[0]);
    addSerie();
});

function addSerie(){
    if (!validateForm()) {
        return;
    }
    let newSerie = {};
    newSerie.id = Date.now();
    newSerie.name = nameInput.value.trim();
    newSerie.genres = [genreInput.value.trim()];
    newSerie.image = { medium: URL.createObjectURL(imageInput.files[0]) }
    // newSerie.image = pictureData ? { medium: pictureData } : null;
    newSerie.summary = descInput.value.trim();

    console.log(newSerie);
    series.unshift(newSerie);
    form.reset();
    localStorage.setItem("series", JSON.stringify(series));
    showSeries(series);
}

let searchInput = document.getElementById("searchInput");

function applySearch() {
    const text = searchInput.value.trim().toLowerCase();
    
    let filteredSeries = series.filter((serie) => {
        return (serie.name || "").toLowerCase().includes(text);
    });
    return filteredSeries;
}

searchInput.addEventListener("input", () => {
    page = 1; 
    let filtredArr = applySearch();
    filtredArr = applyFilter(filtredArr);
    showSeries(filtredArr);
});

function applyFilter(filtredArr) {
    const genre = genreFilter.value;
    let filteredSeries;

    if (genre === "all") {
        filteredSeries = filtredArr;
    } else {
        filteredSeries = filtredArr.filter((serie) => serie.genres.includes(genre));
    }
    return filteredSeries;
}

genreFilter.addEventListener("change", () => {
    page = 1; 
    let filtredArr = applySearch();
    filtredArr = applyFilter(filtredArr);
    showSeries(filtredArr);
});

document.getElementById("resetBtn").addEventListener("click", () => {
    searchInput.value = "";
    genreFilter.value = "all";
    page = 1;
    showSeries(series);
});
 