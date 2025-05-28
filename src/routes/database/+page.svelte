<script>
  import { goto } from "$app/navigation";
  const { data } = $props(); // Props aus den übergebenen Daten extrahieren

  // Filter-Variablen fuer die Suche und Filterung
  let query = "";
  let position = "";
  let nationality = "";
  let minAge = "";
  let maxAge = "";

  // Funktion zum Filtern der Spieler nach Suchtext, Position, Nationalitaet und Alter
  function filterPlayers(player) {
    const matchName = player.name.toLowerCase().includes(query.toLowerCase());
    const matchPosition = !position || player.position === position;
    const matchNationality = !nationality || player.nationality === nationality;
    const matchAge =
      (!minAge || player.age >= minAge) && (!maxAge || player.age <= maxAge);
    return matchName && matchPosition && matchNationality && matchAge;
  }
</script>

<h1>Spielerdatenbank</h1>
<!-- Überschrift der Seite -->

<!-- Filterleiste fuer Suche und Filteroptionen -->
<div class="filters">
  <input type="text" placeholder="Spieler suchen..." bind:value={query} />
  <select bind:value={position}>
    <option value="">Position</option>
    <option value="Torwart">Torwart</option>
    <option value="Verteidiger">Verteidiger</option>
    <option value="Mittelfeld">Mittelfeld</option>
    <option value="Stuermer">Stürmer</option>
  </select>
  <input type="number" placeholder="Mindestalter" bind:value={minAge} />
  <input type="number" placeholder="Maximalalter" bind:value={maxAge} />
  <input type="text" placeholder="Nationalitaet" bind:value={nationality} />
</div>

<!-- Tabelle mit allen gefilterten Spielern -->
<table class="players">
  <thead>
    <tr>
      <th>Spieler</th>
      <th>Position</th>
      <th>Alter</th>
      <th>Nationalitaet</th>
      <th>Team</th>
      <th>Marktwert</th>
    </tr>
  </thead>
  <tbody>
    {#each data.players.filter(filterPlayers) as player}
      <tr>
        <td>
          <!-- Link zur Detailseite des Spielers mit Bild und Name -->
          <a href={`/players/${player._id}`}>
            <img
              src={player.photo}
              alt={player.name}
              width="40"
              height="40"
              style="border-radius: 50%; vertical-align: middle;"
            />
            {player.name}
          </a>
        </td>
        <td>{player.position}</td>
        <td>{player.age}</td>
        <td>{player.nationality}</td>
        <td><a href="/teams">{player.team_name}</a></td>
        <td>€ {player.market_value} Mio.</td>
      </tr>
    {/each}
  </tbody>
</table>
