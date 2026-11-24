import { remove,create, getAll, getById, update } from "./services/serieService.js";
import { state } from "./data/store.js";
import { showSeries } from "./ui/cards.js";
import { AppendGenres, AppendLanguages, getParams} from "./ui/filters.js";
import { form, genreFilter, imageInput, languageFilter, loadingMessage, searchInput } from "./ui/dom.js";
import { addSerie, setAddMode, setEditMode, validateForm } from "./ui/form.js";

// let pictureData = null;

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
    localStorage.setItem("criteria", JSON.stringify(state.criteria));
    searchInput.value = JSON.parse(localStorage.getItem("criteria")).name;
    languageFilter.value = JSON.parse(localStorage.getItem("criteria")).language;
    genreFilter.value = JSON.parse(localStorage.getItem("criteria")).genre;
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
    loadFilters()
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
    localStorage.setItem("criteria", JSON.stringify(state.criteria));
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

form.addEventListener("submit", async (event) => {
    event.preventDefault();
            
    let serie = addSerie()

    try{
        if (state.editingId) {
            await update(state.editingId, serie); 
            setAddMode();
            init();
        } else {
            let image = serie.image;
            delete serie.image;
            const response = await create(serie);
            response.image = image;
            state.series.push(response);
            console.log(response);
            showSeries(state.series);
            form.reset();
        }
    } catch(error){
        console.error(error);
    }
});

articles.addEventListener("click", async (event) => {
    const editButton = event.target.closest("[data-edit]");
    const removeButton = event.target.closest("[data-remove]");

    
    
    if (removeButton) {
        if(!confirm("are you sure ?")){
            return;
        }
        try {
            await remove(removeButton.dataset.remove);
            init();
        } catch (error) {
            console.error(error);
        }
    }
    
    if (editButton) {
        if(!confirm("are you sure ?")){
            return;
        }
        try {
            const serie = await getById(editButton.dataset.edit);
            setEditMode(serie);
        } catch (error) {
            console.error(error)
        }
    }
})

cancelBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    setAddMode();
});


