<script>
  // Props aus den übergebenen Daten extrahieren
  const { data } = $props();
  // Funktion zum Navigieren zur Detailseite eines Teams
  function goToTeam(id) {
    window.location.href = `/teams/${id}`;
  }
</script>

<h1 class="center">Teamübersicht</h1> <!-- Überschrift der Seite -->

<div class="team-grid">
  {#each data.teams as team}
    <!-- Karte für jedes Team, Klick führt zur Detailseite -->
    <div class="team-card" onclick={() => goToTeam(team._id)}>
      <img class="team-logo" src={team.logo} alt={team.name} />
      <h2>{team.name}</h2>
    </div>
  {/each}
</div>
