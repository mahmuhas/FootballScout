import { getTeams, addTeam, deleteTeamById } from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

// Lade alle Teams aus der Datenbank und gebe sie an die Seite weiter
export async function load() {
  const teams = await getTeams();
  return { teams };
}

export const actions = {
  // Aktion zum Hinzufügen eines neuen Teams
  add: async ({ request }) => {
    const data = await request.formData();

    // Erstelle Teamobjekt mit allen Feldern
    const team = {
      name: data.get('name'),
      country: data.get('country'),
      founded: parseInt(data.get('founded')),
      stadium: data.get('stadium'),
      market_value_million: parseInt(data.get('market_value_million')),
      logo: data.get('logo'),
      teamImage: data.get('teamImage'),
      stadiumImage: data.get('stadiumImage')
    };

    // Füge Team zur Datenbank hinzu
    await addTeam(team);
    // Weiterleitung nach dem Hinzufügen
    throw redirect(303, '/manage_teams');
  },

  // Aktion zum Löschen eines Teams
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    await deleteTeamById(id);
    // Weiterleitung nach dem Löschen
    throw redirect(303, '/manage_teams');
  }
};
