import { ObjectId } from 'mongodb';
import { getDb } from '$lib/db.js';
import { error } from '@sveltejs/kit';

import { getPlayerById } from '$lib/db.js';

// Load-Funktion für die Detailseite eines Spielers
export async function load({ params }) {
  // Hole Spieler anhand der ID aus der Datenbank
  const player = await getPlayerById(params.id);
  // Wenn kein Spieler gefunden wurde, Fehler 404 werfen
  if (!player) throw error(404, 'Spieler nicht gefunden');
  // Rückgabe des Spielers als Prop für die Seite
  return { player };
}
