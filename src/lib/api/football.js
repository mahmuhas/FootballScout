// IDs der wichtigsten europäischen Ligen
const LEAGUES = [39, 140, 78, 61, 135]; // Premier League, La Liga, Bundesliga, Ligue 1, Serie A

// Nur diese Teams werden berücksichtigt
const ALLOWED_TEAMS = [
  "FC Barcelona",
  "Real Madrid",
  "Manchester City",
  "Bayern Munich",
  "Paris Saint Germain",
  "Juventus"
];

// Übersetzung der Spielerpositionen ins Deutsche
const POSITION_MAP = {
  "Goalkeeper": "Torwart",
  "Defender": "Verteidiger",
  "Midfielder": "Mittelfeld",
  "Attacker": "Stürmer"
};

// Übersetzung der Nationalitäten ins Deutsche
const NATIONALITY_MAP = {
  "Germany": "Deutschland",
  "Spain": "Spanien",
  "France": "Frankreich",
  "Italy": "Italien",
  "Brazil": "Brasilien",
  "Argentina": "Argentinien",
  "England": "England",
  "Portugal": "Portugal",
  "Netherlands": "Niederlande",
  "Switzerland": "Schweiz",
  "USA": "USA"
};

/**
 * Holt alle Spieler aus den definierten Ligen und Teams für eine Saison.
 * Nur Spieler im Alter von 15-21 Jahren und aus den erlaubten Teams werden berücksichtigt.
 * @param {number} season - Die Saison (z.B. 2023)
 * @returns {Promise<Array>} - Liste der Spielerobjekte
 */
export async function getPlayersFromLeagues(season = 2023) {
  let players = [];

  // Für jede Liga
  for (const leagueId of LEAGUES) {
    // Bis zu 10 Seiten pro Liga abfragen (wegen Paginierung der API)
    for (let page = 1; page <= 10; page++) {
      const url = `https://api-football-v1.p.rapidapi.com/v3/players?league=${leagueId}&season=${season}&page=${page}`;
      const res = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_FOOTBALL_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_API_FOOTBALL_HOST
        }
      });

      // Wenn die Anfrage fehlschlägt, nächste Liga
      if (!res.ok) break;
      const json = await res.json();

      // Für jeden Spieler in der Antwort
      for (const item of json.response) {
        const player = item.player;
        const team = item.statistics[0]?.team;
        const position = item.statistics[0]?.games?.position;

        const teamName = team?.name?.trim();

        // Nur Spieler im Alter 15-21 und aus erlaubten Teams
        if (
          player.age >= 15 &&
          player.age <= 21 &&
          ALLOWED_TEAMS.includes(teamName)
        ) {
          players.push({
            name: player.name,
            position: POSITION_MAP[position] || position,
            age: player.age,
            nationality: NATIONALITY_MAP[player.nationality] || player.nationality,
            market_value: 10,
            team_name: teamName,
            photo: player.photo
          });
        }
      }

      // Wenn weniger als 50 Spieler auf der Seite, ist es die letzte Seite
      if (json.response.length < 50) break;
    }
  }

  return players;
}