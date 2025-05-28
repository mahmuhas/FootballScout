<script>
  // Props aus den übergebenen Daten extrahern
  const { data } = $props();
</script>

<h1 class="center">Teams verwalten</h1>
<!-- Überschrift der Seite -->

<div class="container">
  <div class="form-block">
    <h2>Neues Team hinzufügen</h2>
    <!-- Formular zum Hinzufügen eines neuen Teams -->
    <form
      method="POST"
      action="?/add"
      enctype="multipart/form-data"
      class="form"
    >
      <input name="name" placeholder="Teamname" required />
      <input name="country" placeholder="Land" required />
      <input
        name="founded"
        type="number"
        min="1800"
        placeholder="Gründungsjahr"
        required
      />
      <input name="stadium" placeholder="Stadion" required />
      <input
        name="market_value_million"
        type="number"
        min="0"
        placeholder="Marktwert (Mio)"
        required
      />

      <div class="row">
        <label for="logo">Logo:</label>
        <input
          type="file"
          name="logo"
          accept=".png,.jpg,.jpeg,.webp"
          required
        />
      </div>

      <div class="row">
        <label for="teamImage">Teambild:</label>
        <input
          type="file"
          name="teamImage"
          accept=".png,.jpg,.jpeg,.webp"
          required
        />
      </div>

      <div class="row">
        <label for="stadiumImage">Stadionbild:</label>
        <input
          type="file"
          name="stadiumImage"
          accept=".png,.jpg,.jpeg,.webp"
          required
        />
      </div>

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
          <option value={team._id}>{team.name}</option>
        {/each}
      </select>
      <button type="submit" class="btn-primary">Löschen</button>
    </form>
  </div>
</div>