<script>
  // Props aus den übergebenen Daten extrahern
  const { data } = $props();
</script>

<h1 class="center">Spieler verwalten</h1>
<!-- Überschrift der Seite -->

<div class="container">
  <div class="form-block">
    <h2>Neuen Spieler hinzufügen</h2>
    <!-- Formular zum Hinzufügen eines neuen Spielers -->
    <form
      method="POST"
      action="?/add"
      enctype="multipart/form-data"
      class="form"
    >
      <input name="name" placeholder="Name" required />

      <div class="row">
        <label for="position">Position:</label>
        <select name="position" required>
          <option value="Torwart">Torwart</option>
          <option value="Verteidiger">Verteidiger</option>
          <option value="Mittelfeld">Mittelfeld</option>
          <option value="Stürmer">Stürmer</option>
        </select>
      </div>

      <input name="age" type="number" min="15" placeholder="Alter" required />

      <div class="row">
        <label for="team_name">Team:</label>
        <select name="team_name" required>
          <option value="FC Barcelona">FC Barcelona</option>
          <option value="Real Madrid">Real Madrid</option>
          <option value="Manchester City">Manchester City</option>
          <option value="Ajax Amsterdam">Ajax Amsterdam</option>
          <option value="Juventus Turin">Juventus Turin</option>
          <option value="PSG">PSG</option>
          <option value="FC Zürich">FC Zürich</option>
          <option value="Bayern München">Bayern München</option>
        </select>
      </div>

      <input
        name="market_value"
        type="number"
        min="0"
        placeholder="Marktwert (Mio)"
        required
      />
      <input name="nationality" placeholder="Nationalität" required />

      <div class="row">
        <label for="photo">Spielerbild:</label>
        <input
          type="file"
          name="photo"
          accept=".png,.jpg,.jpeg,.webp"
          required
        />
      </div>

      <button type="submit" class="btn-primary">Hinzufügen</button>
    </form>
  </div>

  <div class="form-block">
    <h2>Spieler löschen</h2>
    <!-- Formular zum Löschen eines Spielers -->
    <form method="POST" action="?/delete" class="form">
      <label for="id">Spieler auswählen:</label>
      <select name="id" required>
        <option value="">-- Spieler wählen --</option>
        {#each data.players as player}
          <option value={player._id}>{player.name} ({player.team_name})</option>
        {/each}
      </select>
      <button type="submit" class="btn-primary">Löschen</button>
    </form>
  </div>
</div>