<script>
  // Props aus den übergebenen Daten extrahern
  const { data } = $props();
  // Aktuelle Sortierreihenfolge (asc, desc oder leer)
  const currentSort = data.sortOrder || "";

  // Funktion zum Umschalten der Sortierung nach Marktwert
  function toggleSort() {
    const url = new URL(window.location.href);
    const nextSort = currentSort === "asc" ? "desc" : "asc";
    url.searchParams.set("sort", nextSort);
    window.location.href = url.toString();
  }
</script>

<!-- Überschrift der Seite -->
<h1 class="center">Spielerdatenbank</h1>

<div class="filter-bar">
  <form method="GET" class="filter-form">
    <!-- Dropdown für Positionen -->
    <select name="position">
      <option value="">-- Position wählen --</option>
      {#each data.positions as pos}
        <option value={pos} selected={data.selectedPosition === pos}
          >{pos}</option
        >
      {/each}
    </select>

    <!-- Eingabefeld für Alter -->
    <input
      type="number"
      name="age"
      placeholder="Alter"
      min="15"
      max="50"
      value={data.selectedAge}
    />

    <!-- Behalte aktuellen Sort-Wert -->
    {#if currentSort}
      <input type="hidden" name="sort" value={currentSort} />
    {/if}

    <button type="submit" class="btn-primary">Filtern</button>
  </form>
</div>

<table class="player-table">
  <thead>
    <tr>
      <th>Spieler</th>
      <th>Position</th>
      <th>Alter</th>
      <th>Nationalität</th>
      <th>Team</th>
      <!-- Spalte für Marktwert mit Sortierfunktion -->
      <th on:click={toggleSort} style="cursor: pointer;">
        Marktwert {currentSort === "asc"
          ? "↑"
          : currentSort === "desc"
            ? "↓"
            : ""}
      </th>
    </tr>
  </thead>
  <tbody>
    {#each data.players as player}
      <tr>
        <td class="spieler-cell">
          <!-- Spielerbild und Link zur Detailseite -->
          <img src={player.photo} alt={player.name} class="avatar" />
          <a href={`/players/${player._id}`}>{player.name}</a>
        </td>
        <td>{player.position}</td>
        <td>{player.age}</td>
        <td>{player.nationality}</td>
        <td><a href="/teams">{player.team_name}</a></td>
        <td>{player.market_value} Mio. €</td>
      </tr>
    {/each}
  </tbody>
</table>