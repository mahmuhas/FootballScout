// Importiere die Funktion zum Laden aller Spieler aus der Datenbank
import { getPlayers } from '$lib/db.js';

// Die load-Funktion wird beim Laden der Seite aufgerufen
export async function load() {
  // Lade alle Spieler aus der Datenbank
  const players = await getPlayers();
  // Rückgabe der Spieler als Props für die Seite
  return { players };
}