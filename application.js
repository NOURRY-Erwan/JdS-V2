const sheetID = "1itKcj2L9HyA0GBIFcRTeQ8-OiIOI5eqw23-vvgXI5pQ"; // Replace with your sheet ID
const sheetRange = "A2:I"; // Adjust if necessary
const apiKey = "YOUR_API_KEY"; // Replace with your Google API key

async function fetchData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetRange}?key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.values;
}

function displayGames(games) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = ""; // Clear previous results

  games.forEach(game => {
    const [name, time, players, mechanism, recap, boxImg, rules, img, review] = game;

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${name}</h3>
      <img src="${img || boxImg}" alt="${name}">
      <p><strong>Mécanisme:</strong> ${mechanism}</p>
      <p><strong>Temps de jeu:</strong> ${time}</p>
      <p><strong>Nombre de joueurs:</strong> ${players}</p>
      <a href="${rules}" target="_blank">Voir les règles</a>
    `;
    gallery.appendChild(card);
  });
}

document.getElementById("searchBtn").addEventListener("click", async () => {
  const games = await fetchData();

  const nameFilter = document.getElementById("searchName").value.toLowerCase();
  const mechanismFilter = document.getElementById("searchMechanism").value.toLowerCase();
  const playersFilter = document.getElementById("searchPlayers").value;
  const timeFilter = document.getElementById("searchTime").value;

  const filteredGames = games.filter(game => {
    const [name, time, players, mechanism] = game;

    return (
      (!nameFilter || name.toLowerCase().includes(nameFilter)) &&
      (!mechanismFilter || mechanism.toLowerCase().includes(mechanismFilter)) &&
      (!playersFilter || players.includes(playersFilter)) &&
      (!timeFilter || time.includes(timeFilter))
    );
  });

  displayGames(filteredGames);
});

// Initial load
fetchData().then(displayGames);
