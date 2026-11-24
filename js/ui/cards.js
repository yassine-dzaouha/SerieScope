import { articles, resultCount } from "./dom.js";

export function showSeries(liste) {
    articles.textContent = "";
    resultCount.textContent = `${liste.length} séries affichées`
    if (liste.length === 0) {
        resultCount.textContent = `${liste.length} séries affichées`
        emptyMessage.hidden = false;
        // pagination.hidden = true;
        return;
    }

    emptyMessage.hidden = true;

    // let total_pages = Math.ceil(liste.length / 20);
    // let debut = (page - 1) * 20;
    // let fin = debut + 20;
    // let pageOfSeries = liste.slice(debut, fin);

    // pagination.hidden = total_pages <= 1;

    // page_actuelle.textContent = `Page ${page} sur ${total_pages}`;

    // btn_precedent.hidden = page === 1;
    // btn_suivant.hidden = page === total_pages;
    
    

    liste.forEach((serie) => {
        
        
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

        const actionsDiv = createEl("div","flex justify-between","");
        const editBtn = createEl(
            "button",
            "border border-blue-500 text-blue-400 text-[14px] font-bold px-3 py-2 rounded-lg hover:bg-[#252525] focus:outline-none focus:ring-2 focus:ring-white",
            "Modifier"
        );
        editBtn.type = "button";
        editBtn.dataset.edit = serie.id;
        editBtn.setAttribute("aria-label", "Modifier " + serie.name);
        const deleteBtn = createEl("button",
                "border border-red-500 text-red-400 text-[14px] font-bold px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400",
                "Supprimer"
                );
        deleteBtn.type = "button";
        deleteBtn.dataset.action = "delete";
        deleteBtn.dataset.remove = serie.id;
        deleteBtn.dataset.name = serie.name;
        actionsDiv.append( editBtn,deleteBtn);
        
        corps.append(titre, genres,desc,detailsLink,actionsDiv);
        article.append(image, corps);
        articles.append(article);
        // AppendGenres();
    });

}


function createEl(tag, classes, text) {
    const element = document.createElement(tag);
    element.className = classes;
    if (text) {
        element.textContent = text;
    }
    return element;
}