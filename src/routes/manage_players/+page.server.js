import { getPlayers, addPlayer, deletePlayerById } from '$lib/db.js';
import fs from 'fs';
import path from 'path';
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
    const file = data.get('photo');
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // Erzeuge Dateinamen und Speicherpfad für das Bild
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join('static', 'images', fileName);
    fs.writeFileSync(filePath, bytes);

    // Erstelle Spielerobjekt mit allen Feldern
    const player = {
      name: data.get('name'),
      position: data.get('position'),
      age: parseInt(data.get('age')),
      team_name: data.get('team_name'),
      market_value: parseInt(data.get('market_value')),
      nationality: data.get('nationality'),
      photo: `/images/${fileName}`
    };

    // Fuege Spieler zur Datenbank hinzu
    await addPlayer(player);
    // Weiterleitung nach dem Hinzufuegen
    throw redirect(303, '/manage_players');
  },

  // Aktion zum Loeschen eines Spielers
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    await deletePlayerById(id);
    // Weiterleitung nach dem Loeschen
    throw redirect(303, '/manage_players');
  }
};