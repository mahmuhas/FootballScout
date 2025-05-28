<script>
  // Props aus den übergebenen Daten extrahieren
  const { data } = $props();
</script>

<h1 class="player-name">{data.player.name}</h1> <!-- Name des Spielers als Überschrift -->

<div class="player-profile">
  <!-- Spielerbild -->
  <img class="player-image" src={data.player.photo} alt={data.player.name} />
  <ul class="player-details">
    <li><strong>Position:</strong> {data.player.position}</li>
    <li><strong>Alter:</strong> {data.player.age} Jahre</li>
    <li><strong>Nationalität:</strong> {data.player.nationality}</li>
    <li>
      <strong>Team:</strong>
      <!-- Link zum Team (aktuell allgemeine Teamseite) -->
      <a class="team-link" href="/teams">{data.player.team_name}</a>
    </li>
    <li><strong>Marktwert:</strong> € {data.player.market_value} Mio.</li>
  </ul>
</div>