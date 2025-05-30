<script>
  // Props aus den übergebenen Daten extrahieren
  const { data } = $props();
</script>

<h1 class="center">Teams verwalten</h1>
<!-- Überschrift der Seite -->
<div class="container">
  <div class="form-block">
    <h2>Neues Team hinzufügen</h2>
    <!-- Formular zum Hinzufügen eines neuen Teams -->
    <form method="POST" action="?/add" class="form">
      <input name="name" placeholder="Teamname" required />
      <input name="country" placeholder="Land" required />
      <input
        name="founded"
        type="number"
        placeholder="Gründungsjahr"
        required
      />
      <input name="stadium" placeholder="Stadion" required />
      <input
        name="market_value_million"
        type="number"
        placeholder="Marktwert (Mio)"
        required
      />

      <input name="logo" type="url" placeholder="URL zum Logo" required />
      <input
        name="teamImage"
        type="url"
        placeholder="URL zum Teambild"
        required
      />
      <input
        name="stadiumImage"
        type="url"
        placeholder="URL zum Stadionbild"
        required
      />

      <button type="submit" class="btn-primary">Hinzufügen</button>
    </form>
  </div>

  <div class="form-block">
    <h2>Team löschen</h2>
    <!-- Formular zum Löschen eines Teams -->
    <form method="POST" action="?/delete" class="form">
      <label for="id">Team auswählen:</label>
      <select name="id" required>
        <option value="">-- Team wählen --</option>
        {#each data.teams as team}
          <option value={team._id}>{team.name} ({team.country})</option>
        {/each}
      </select>
      <button type="submit" class="btn-primary">Löschen</button>
    </form>
  </div>
</div>
