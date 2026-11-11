let series = [];

const errorMessage = document.getElementById("errorMessage");

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
            series = data.slice(0, 20);
            localStorage.setItem("series", JSON.stringify(series));
            showSeries(series);
        })
        .catch((error) => {
            errorMessage.textContent =
                "Impossible de charger le catalogue. Réessaie plus tard.";
            console.error(error);
        })
}

const articles = document.getElementById("articles");
