import { getPlayers, addPlayer, deletePlayerById } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

// Lade alle Spieler aus der Datenbank und gebe sie an die Seite weiter
export async function load() {
  const players = await getPlayers();
  return { players };
}

export const actions = {
  // Aktion zum Hinzufügen eines neuen Spielers
  add: async ({ request }) => {
    const data = await request.formData();

    // Erstelle Spielerobjekt mit allen Feldern
    const player = {
      name: data.get('name'),
      position: data.get('position'),
      age: parseInt(data.get('age')),
      team_name: data.get('team_name'),
      market_value: parseInt(data.get('market_value')),
      nationality: data.get('nationality'),
      photo: data.get('photo')
    };

    // Füge Spieler zur Datenbank hinzu
    await addPlayer(player);
    // Weiterleitung nach dem Hinzufügen
    throw redirect(303, '/manage_players');
  },

  // Aktion zum Löschen eines Spielers
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    await deletePlayerById(id);
    // Weiterleitung nach dem Löschen
    throw redirect(303, '/manage_players');
  }
};