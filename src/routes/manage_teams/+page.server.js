import { getTeams, addTeam, deleteTeamById } from '$lib/db.js';
import fs from 'fs';
import path from 'path';
import { redirect } from '@sveltejs/kit';

// Lade alle Teams aus der Datenbank und gebe sie an die Seite weiter
export async function load() {
  const teams = await getTeams();
  return { teams };
}

export const actions = {
  // Aktion zum Hinzufuegen eines neuen Teams
  add: async ({ request }) => {
    const data = await request.formData();

    // Bilddateien aus dem Formular holen
    const logoFile = data.get('logo');
    const teamImageFile = data.get('teamImage');
    const stadiumImageFile = data.get('stadiumImage');

    // Funktion zum Speichern einer Datei synchron
    function saveFile(file) {
      const buffer = new Uint8Array(file.arrayBufferSync());
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join('static', 'images', fileName);
      fs.writeFileSync(filePath, buffer);
      return `/images/${fileName}`;
    }

    // Asynchrone Hilfsfunktion zum Speichern einer Datei
    async function saveAsync(file) {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join('static', 'images', fileName);
      fs.writeFileSync(filePath, bytes);
      return `/images/${fileName}`;
    }

    // Speichere die hochgeladenen Bilder und erhalte die Pfade
    const logo = await saveAsync(logoFile);
    const teamImage = await saveAsync(teamImageFile);
    const stadiumImage = await saveAsync(stadiumImageFile);

    // Erstelle Teamobjekt mit allen Feldern
    const team = {
      name: data.get('name'),
      country: data.get('country'),
      founded: parseInt(data.get('founded')),
      stadium: data.get('stadium'),
      market_value_million: parseInt(data.get('market_value_million')),
      logo,
      teamImage,
      stadiumImage
    };

    // Fuege Team zur Datenbank hinzu
    await addTeam(team);
    // Weiterleitung nach dem Hinzufuegen
    throw redirect(303, '/manage_teams');
  },

  // Aktion zum Loeschen eines Teams
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    await deleteTeamById(id);
    // Weiterleitung nach dem Loeschen
    throw redirect(303, '/manage_teams');
  }
};