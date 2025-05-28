import { ObjectId } from 'mongodb';
import { getDb } from '$lib/db.js';
import { error } from '@sveltejs/kit';

import { getPlayerById } from '$lib/db.js';

// Load-Funktion fuer die Detailseite eines Spielers
export async function load({ params }) {
  // Hole Spieler anhand der ID aus der Datenbank
  const player = await getPlayerById(params.id);
  // Wenn kein Spieler gefunden wurde, Fehler 404 werfen
  if (!player) throw error(404, 'Spieler nicht gefunden');
  // Rueckgabe des Spielers als Prop fuer die Seite
  return { player };
}