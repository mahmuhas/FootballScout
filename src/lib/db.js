import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

// MongoDB-Client initialisieren und verbinden
const client = new MongoClient(DB_URI);
await client.connect();

// Zugriff auf die FootballScout-Datenbank
const db = client.db("FootballScout");

//////////////////////////////////////////
// TEAMS
//////////////////////////////////////////

// Alle Teams aus der Datenbank laden
export async function getTeams() {
  try {
    const teams = await db.collection("teams").find().toArray();
    teams.forEach(team => team._id = team._id.toString()); // ObjectId in String umwandeln
    return teams;
  } catch (error) {
    console.log("Fehler beim Laden der Teams:", error.message);
    return [];
  }
}

// Ein neues Team zur Datenbank hinzufuegen
export async function addTeam(team) {
  return await db.collection("teams").insertOne(team);
}

// Ein Team anhand der ID aus der Datenbank loeschen
export async function deleteTeamById(id) {
  return await db.collection("teams").deleteOne({ _id: new ObjectId(id) });
}

// Ein Team anhand der ID aus der Datenbank holen
export async function getTeamById(id) {
  try {
    const team = await db.collection("teams").findOne({ _id: new ObjectId(id) });
    if (team) team._id = team._id.toString();
    return team;
  } catch (err) {
    console.error("Fehler in getTeamById:", err.message);
    return null;
  }
}


//////////////////////////////////////////
// SPIELER
//////////////////////////////////////////

// Alle Spieler aus der Datenbank laden
export async function getPlayers() {
  try {
    const result = await db.collection("players").find().toArray();
    result.forEach(p => p._id = p._id.toString()); // ObjectId in String umwandeln
    console.log("Players aus DB:", result.length); // Debug-Ausgabe
    return result;
  } catch (err) {
    console.error("Fehler in getPlayers():", err.message);
    return [];
  }
}

// Einen neuen Spieler zur Datenbank hinzufuegen
export async function addPlayer(player) {
  try {
    const result = await db.collection("players").insertOne(player);
    return result.insertedId;
  } catch (err) {
    console.error("Fehler beim Hinzufuegen des Spielers:", err.message);
    return null;
  }
}

// Einen Spieler anhand der ID aus der Datenbank loeschen
export async function deletePlayerById(id) {
  try {
    const result = await db.collection("players").deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch (err) {
    console.error("Fehler beim Loeschen des Spielers:", err.message);
    return false;
  }
}

// Einen Spieler anhand der ID aus der Datenbank holen
export async function getPlayerById(id) {
  try {
    const player = await db.collection("players").findOne({ _id: new ObjectId(id) });
    if (player) player._id = player._id.toString();
    return player;
  } catch (err) {
    console.error("Fehler in getPlayerById:", err.message);
    return null;
  }
}

// Einen neuen Spieler hinzufuegen, falls noch nicht vorhanden (optional)
export async function addPlayer(player) {
  const db = await getDb();
  const players = db.collection('players');

  // Optional: Verhindere Duplikate (z. B. per Name + Alter)
  const exists = await players.findOne({ name: player.name, age: player.age });
  if (exists) return;

  await players.insertOne(player);
}

// Alle Spieler aus der Datenbank holen
export async function getAllPlayers() {
  try {
    const result = await db.collection("players").find().toArray();
    result.forEach(p => p._id = p._id.toString());
    return result;
  } catch (err) {
    console.error("Fehler in getAllPlayers():", err.message);
    return [];
  }
}


// ===========================
// Hilfszugriff auf DB
// ===========================

// Gibt das DB-Objekt zurueck
export function getDb() {
  return db;
}