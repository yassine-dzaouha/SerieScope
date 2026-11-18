import { state } from "../data/store.js";
import { create } from "../services/serieService.js";
import { descError, descInput, form, genreError, genreInput, imageError, imageInput, languageErrorr, languageInput, nameError, nameInput } from "./dom.js";

export function validateForm() {
    nameError.textContent = "";
    genreError.textContent = "";
    // imageError.textContent = "";
    // descError.textContent = "";
    languageErrorr.textContent = "";
    let isValid = true;

    const title = nameInput.value.trim();
    const genre = genreInput.value.trim();
    const language = languageInput.value;
    // const file = imageInput.files[0];
    // const desc = descInput.value.trim();

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

    // if (!file) {
    //     console.log(file)
    //     imageError.textContent = "Le fichier doit être une image.";
    //     isValid = false;
    // }

    // if (desc === "") {
    //     descError.textContent = "La description est obligatoire.";
    //     isValid = false;
    // }
    
    return isValid;
}

export async function addSerie(){
    if (!validateForm()) {
        return false;
    }
    let newSerie = {};
    // newSerie.id = Date.now();
    newSerie.name = nameInput.value.trim();
    newSerie.language = languageInput.value;
    newSerie.genres = [genreInput.value.trim()];
    // newSerie.image = { medium: URL.createObjectURL(imageInput.files[0]) }
    // newSerie.image = { medium: picture };
    // newSerie.summary = descInput.value.trim();

    console.log(newSerie);
    state.series.push(newSerie);

    try{
        await create(newSerie);
        form.reset();

    } catch(error){
        console.error(error);
    }
}