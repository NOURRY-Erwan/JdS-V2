const sheetID = "1itKcj2L9HyA0GBIFcRTeQ8-OiIOI5eqw23-vvgXI5pQ"; // Remplace par ton ID Google Sheet
const sheetRange = "A2:I"; // Vérifie que le range correspond bien à tes données
const apiKey = "YOUR_API_KEY"; // Remplace par ta clé API Google

// Fonction pour récupérer les données du Google Sheet
async function fetchData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetRange}?key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.values; // Retourne les lignes des données
}

// Fonction pour afficher les jeux dans la galerie
function displayGames(games) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // Vide la galerie avant de l'afficher

  games.forEach(game => {
    // Déstructure les colonnes pour une lecture plus simple
    const [name, time, players, mechanism, recap, boxImg, rules, img, review] = game;

    // Crée un élément pour chaque jeu
    const card = document.createElement("div");
    card.className = "card";

    // HTML pour une carte de jeu
    card.innerHTML = `
      <h3>${name}</h3>
      <img src="${img || boxImg || 'https://via.placeholder.com/150'}" alt="${name}">
      <p><strong>Mécanisme:</strong> ${mechanism}</p>
      <p><strong>Temps de jeu:</strong> ${time}</p>
      <p><strong>Nombre de joueurs:</strong> ${players}</p>
      <a href="${rules}" target="_blank">Voir les règles</a>
    `;

    // Ajoute la carte dans la galerie
    gallery.appendChild(card);
  });
}

// Charger et afficher les données dès que la page est prête
fetchData()
  .then(displayGames)
  .catch(error => console.error("Erreur lors du chargement des données :", error));
