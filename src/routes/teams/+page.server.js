import { getTeams } from "$lib/db.js";

// Load-Funktion fuer die Teamuebersicht
export async function load() {
  // Lade alle Teams aus der Datenbank
  const teams = await getTeams();
  // Rückgabe der Teams als Props für die Seite
  return { teams };
}