import { getAll } from "./services/serieService.js";
import { state } from "./data/store.js";
import { showSeries } from "./ui/cards.js";
import { AppendGenres } from "./ui/filters.js";

async function init() {
    try {
        const response = await getAll();
        state.series = response;
        showSeries(state.series);
        AppendGenres(state.series);
    } catch (error) {
        console.error(error);
    }
}

init();