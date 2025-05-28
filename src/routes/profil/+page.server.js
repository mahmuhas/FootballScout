import { getPlayers, getTeams } from '$lib/db.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  // Lade alle Spieler aus der Datenbank
  const players = await getPlayers();
  // Lade alle Teams aus der Datenbank
  const teams = await getTeams();

  // Hole ausgewaehlten Spieler aus den URL-Parametern (falls vorhanden)
  const selectedPlayer = url.searchParams.get('player') ?? '';
  // Hole ausgewaehltes Team aus den URL-Parametern (falls vorhanden)
  const selectedTeam = url.searchParams.get('team') ?? '';

  // Rueckgabe der Daten an die Seite
  return {
    players,
    teams,
    selectedPlayer,
    selectedTeam
  };
}