let saved = JSON.parse(localStorage.getItem("criteria"));

if(!saved){
    saved = { name: "", genre: "", language: "" };
    localStorage.setItem("criteria", JSON.stringify(saved))
}

export const state = {
    series: [],
    criteria: saved,
    editingId: null,
    editingPicture: null
};