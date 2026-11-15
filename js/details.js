const params = new URLSearchParams(window.location.search);
console.log(params)
const id = Number(params.get("id"));

const series = JSON.parse(localStorage.getItem("series"));

const show = series.find((s) => s.id === id);

if (!show) {
    document.getElementById("notFound").classList.remove("hidden");
} else {
    document.getElementById("details").classList.remove("hidden");
    document.title = show.name + " | SérieScope";

    document.getElementById("title").textContent = show.name || "Non renseigné";

    const poster = document.getElementById("poster");
    poster.alt = "Affiche de " + show.name;
    poster.src = show.image.medium

    const genres = document.getElementById("genres");
    if (show.genres && show.genres.length > 0) {
        show.genres.forEach((genre) => {
            let span = document.createElement("span");
            span.className = "text-[11px] px-2 py-0.5 border border-[#393939] rounded-full bg-[#252525]";
            span.textContent = genre;  
            genres.append(span) 
        });
    }

    const summary = document.getElementById("summary");
    if (show.summary) {
        summary.innerHTML = show.summary;
    } else {
        summary.textContent = "Non renseigné";
    }

    document.getElementById("language").textContent = show.language ? show.language : "Non renseigné";
    document.getElementById("status").textContent = show.status ? show.status : "Non renseigné";

    document.getElementById("rating").textContent = show.rating ? show.rating.average + " / 10" : "Non renseigné";

    document.getElementById("country").textContent =  show.network ? show.network.country.name : "Non renseigné";
}