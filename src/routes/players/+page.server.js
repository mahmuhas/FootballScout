// Importiere Funktion zum Laden der Spieler aus der API
import { getPlayersFromLeagues } from '$lib/api/football';
// Importiere Funktionen zum Hinzufuegen und Laden aller Spieler aus der Datenbank
import { addPlayer, getAllPlayers } from '$lib/db.js';

// Die load-Funktion wird beim Laden der Seite aufgerufen
export async function load({ url }) {
  // Lade Spieler aus der API
  const apiPlayers = await getPlayersFromLeagues();
  // Fuege jeden Spieler aus der API der Datenbank hinzu
  for (const player of apiPlayers) {
    await addPlayer(player);
  }

  // Lade alle Spieler aus der Datenbank
  let players = await getAllPlayers();

  // Filter-Parameter aus der URL holen
  const selectedPosition = url.searchParams.get('position') || '';
  const selectedAge = url.searchParams.get('age') || '';
  const sortOrder = url.searchParams.get('sort') || '';

  // Nach Position filtern, falls gewaehlt
  if (selectedPosition) {
    players = players.filter(p => p.position === selectedPosition);
  }

  // Nach Alter filtern, falls gewaehlt
  if (selectedAge) {
    players = players.filter(p => p.age === parseInt(selectedAge));
  }

  // Sortierung nach Marktwert
  if (sortOrder === 'asc') {
    players.sort((a, b) => a.market_value - b.market_value);
  } else if (sortOrder === 'desc') {
    players.sort((a, b) => b.market_value - a.market_value);
  }

  // Positionen sammeln (fuer Dropdown)
  const positions = [...new Set(players.map(p => p.position))];

  // Rueckgabe der Daten an die Seite
  return {
    players,
    positions,
    selectedPosition,
    selectedAge,
    sortOrder
  };
}