import { getTeamById } from '$lib/db.js';

// Load-Funktion fuer die Detailseite eines Teams
export async function load({ params }) {
  // Hole Team anhand der ID aus der Datenbank
  const team = await getTeamById(params.id);
  // Rueckgabe des Teams als Prop fuer die Seite
  return { team };
}