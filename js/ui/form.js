import { state } from "../data/store.js";
import { create } from "../services/serieService.js";
import { cancelBtn, descError, descInput, form, formTitle, genreError, genreInput, imageError, imageInput, languageErrorr, languageInput, nameError, nameInput, submitBtn } from "./dom.js";

export function validateForm() {
    nameError.textContent = "";
    genreError.textContent = "";
    imageError.textContent = "";
    descError.textContent = "";
    languageErrorr.textContent = "";
    let isValid = true;

    const title = nameInput.value.trim();
    const genre = genreInput.value.trim();
    const language = languageInput.value;
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

    if (language === "") {
        languageErrorr.textContent = "La longue est obligatoire.";
        isValid = false;
    }

    if (!file && !state.editingPicture) {
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

export function addSerie(){
    if (!validateForm()) {
        return false;
    }
    let newSerie = {};
    // newSerie.id = Date.now();
    newSerie.name = nameInput.value.trim();
    newSerie.language = languageInput.value;
    newSerie.genres = genreInput.value.trim().split(",");
    newSerie.summary = descInput.value.trim();
    if(state.editingId){
        newSerie.image = {medium: state.editingPicture}
    }else{
        newSerie.image = {medium: URL.createObjectURL(imageInput.files[0])}
    }
    // newSerie.image = { medium: picture };
    console.log(newSerie)
    return newSerie;
}

export function setEditMode(serie) {
    state.editingId = serie.id;
    formTitle.textContent = "Modifier une série";
    submitBtn.textContent = "Enregistrer";
    cancelBtn.hidden = false;

    nameInput.value = serie.name || "";
    languageInput.value = serie.language || "";
    genreInput.value = serie.genres[0] || "";
    descInput.value = serie.summary || "";
    state.editingPicture = (serie.image && serie.image.original) || "";
}

export function setAddMode() {
    state.editingPicture = null;
    state.editingId = null;
    formTitle.textContent = "Ajouter une série";
    submitBtn.textContent = "Ajouter";
    cancelBtn.hidden = true;
    form.reset();
}