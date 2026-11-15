# SérieScope

SérieScope est une application web d'une seule page pour une médiathèque. Les visiteurs parcourent un catalogue de séries, recherchent un titre, filtrent par genre et consultent une fiche détaillée. L'équipe peut ajouter une série depuis l'interface.

**Démo en ligne : [SérieScope](https://yassine-dzaouha.github.io/SerieScope/)**

## Technologies

- HTML5 sémantique
- Tailwind CSS (via CDN)
- JavaScript Vanilla (sans framework)
- API TVmaze
- `localStorage` pour la sauvegarde dans le navigateur

## API utilisée

Le catalogue est alimenté par l'API publique [TVmaze](https://www.tvmaze.com/api) :

```
GET https://api.tvmaze.com/shows?page=0
```

Les 20 premières séries sont conservées. Les propriétés exploitées sont `id`, `name`, `language`, `status`, `genres`, `summary`, `image.medium`, `rating.average`, `schedule.days`, `schedule.time`, `network.name` et `network.country.name`.

## Fonctionnalités

### Catalogue
- Récupération des données avec `fetch()`, `response.ok` et gestion des erreurs.
- Affichage des séries sous forme de cartes : affiche, titre, langue, statut, genres en badges et résumé.
- Message de chargement pendant la requête, et message d'erreur explicite si elle échoue.
- Valeurs de remplacement pour les informations manquantes (affiche, langue, statut, genres).
- Pagination (15 séries par page) avec boutons Précédent / Suivant.
- Compteur du nombre de séries affichées.

### Recherche et filtre par genre
- Recherche par nom à chaque saisie, sans distinction entre majuscules et minuscules.
- Liste des genres construite automatiquement à partir du catalogue, avec l'option « Tous les genres ».
- Filtrage avec `.filter()` et `.includes()` : une série qui a plusieurs genres apparaît dans chacun d'eux.
- La recherche et le filtre fonctionnent ensemble.
- Bouton **Réinitialiser** qui efface les critères et rétablit le catalogue complet.
- Message « Aucune série trouvée » quand aucun résultat ne correspond.

### Ajout d'une série
- Formulaire avec titre, langue, genre(s), description et affiche (facultative).
- Validation : titre vide ou composé d'espaces refusé, langue, genre et description obligatoires.
- Message d'erreur affiché près de chaque champ concerné.
- Les genres du formulaire sont des cases à cocher générées à partir du catalogue.
- La série est ajoutée sans recharger la page, et le catalogue est actualisé en gardant la recherche et le filtre actifs.
- Message de confirmation et réinitialisation du formulaire après l'ajout.

### Sauvegarde locale (bonus)
- Le catalogue et les séries ajoutées sont enregistrés dans `localStorage`, et ils sont rechargés après un rafraîchissement.
- L'affiche choisie est convertie en texte avec `FileReader`, ce qui lui permet d'être conservée.

### Fiche détaillée (bonus)
- Bouton **Voir les détails** sur chaque carte, qui ouvre `details.html?id=...`.
- Affichage de la note moyenne, des jours et de l'heure de diffusion, de la chaîne et de son pays.
- « Non renseigné » s'affiche lorsqu'une donnée est absente.
- Message « Série introuvable » si l'identifiant n'existe pas.

### Design et accessibilité
- Interface responsive (mobile, tablette, desktop) avec Tailwind CSS.
- Étiquette `label` associée à chaque champ, focus visible et navigation complète au clavier.
- Zones de messages avec `role="alert"` et `role="status"`.

## Structure du projet

```
SerieScope/
├── .vscode/
├── js/
│   ├── script.js      # catalogue, recherche, filtre, formulaire
│   └── details.js     # fiche détaillée
├── details.html       # page de détails d'une série
├── index.html         # page principale
└── README.md
```

## Organisation du code JavaScript

| Fonction | Rôle |
|---|---|
| `createEl()` | Crée un élément avec ses classes et son texte |
| `showSeries()` | Affiche les cartes (utilisée pour tous les cas) |
| `applySearch()` / `applyFilter()` | Recherche par nom et filtre par genre |
| `updateCatalogue()` | Combine la recherche et le filtre, puis affiche |
| `AppendGenres()` / `AppendGenreCheckboxes()` | Construisent le filtre et les cases du formulaire |
| `validateForm()` | Valide le formulaire |
| `addSerie()` | Construit l'objet, l'ajoute au tableau et actualise |
| `saveSeries()` | Enregistre dans `localStorage` |

## Lancement en local

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/yassine-dzaouha/SerieScope.git
   ```
2. Ouvrir le dossier dans VS Code.
3. Lancer `index.html` avec l'extension **Live Server**, ou l'ouvrir directement dans un navigateur.

Aucune installation n'est nécessaire. Une connexion internet est requise pour l'API et pour Tailwind CSS.

Pour repartir d'un catalogue propre, ouvrir la console (F12) et exécuter :
```js
localStorage.removeItem("series")
```

## Organisation du travail

- **GitFlow** : branches `main` et `develop`, avec les branches de fonctionnalités `feature/layout`, `feature/fetch-shows`, `feature/filter-by-genre` et `feature/add-show`.
- **Pull Requests** pour chaque intégration, sans commit direct sur `main` ou `develop`.
- **Jira** : tableau Kanban avec les statuts À faire, En cours, En revue et Terminé.
- **Figma** : zoning et maquettes desktop et mobile.

## Auteur

Yassine Dzaouha, projet réalisé en travail individuel (9 au 13 novembre 2026).
