import { MongoClient } from 'mongodb';
import { DB_URI } from '$env/static/private';

// MongoDB-Client initialisieren und verbinden
const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("FootballScout");

// IDs der wichtigsten europäischen Ligen
const LEAGUES = [39, 140, 78, 61, 135]; // Premier League, La Liga, Bundesliga, Ligue 1, Serie A

// Erlaubte Teams für die Spielerauswahl
const ALLOWED_TEAMS = [
  "FC Barcelona",
  "Real Madrid",
  "Manchester City",
  "Bayern Munich",
  "Paris Saint Germain",
  "Juventus"
];

// Positionsmapping von API zu deutscher Bezeichnung
const POSITION_MAP = {
  "Goalkeeper": "Torwart",
  "Defender": "Verteidiger",
  "Midfielder": "Mittelfeld",
  "Attacker": "Stürmer"
};

// Nationalitätsmapping von API zu deutscher Bezeichnung
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
 * Holt alle Spieler aus der MongoDB oder lädt sie einmalig über die API und speichert sie dann.
 * Nur Spieler im Alter von 15–21 Jahren und aus bestimmten Teams werden gespeichert.
 */
export async function getPlayersFromLeagues(season = 2023) {
  const playersCollection = db.collection("players");

  // Prüfen, ob Spieler bereits gespeichert sind
  const existing = await playersCollection.countDocuments();
  if (existing > 0) {
    console.log(`Daten aus MongoDB geladen (${existing} Spieler)`);
    const result = await playersCollection.find().toArray();
    result.forEach(p => p._id = p._id.toString());
    return result;
  }

  // Spieler werden erstmalig aus der API geladen
  console.log("Spielerdaten werden erstmalig aus API geladen...");
  let players = [];

  // Für jede Liga und bis zu 10 Seiten Spieler laden
  for (const leagueId of LEAGUES) {
    for (let page = 1; page <= 10; page++) {
      const url = `https://api-football-v1.p.rapidapi.com/v3/players?league=${leagueId}&season=${season}&page=${page}`;
      const res = await fetch(url, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_API_FOOTBALL_KEY,
          'X-RapidAPI-Host': import.meta.env.VITE_API_FOOTBALL_HOST
        }
      });

      if (!res.ok) break;
      const json = await res.json();

      // Jeden Spieler aus der API-Antwort prüfen und speichern
      for (const item of json.response) {
        const player = item.player;
        const team = item.statistics[0]?.team;
        const position = item.statistics[0]?.games?.position;
        const teamName = team?.name?.trim();

        // Nur Spieler im Alter von 15–21 Jahren und aus erlaubten Teams speichern
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
      // Wenn weniger als 50 Spieler auf der Seite, gibt es keine weiteren Seiten
      if (json.response.length < 50) break;
    }
  }

  // In die Datenbank speichern
  if (players.length > 0) {
    await playersCollection.insertMany(players);
    console.log(`Spielerdaten gespeichert (${players.length})`);
  }

  return players;
}