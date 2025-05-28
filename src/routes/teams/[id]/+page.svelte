<script>
  // Props aus den übergebenen Daten extrahieren
  const { data } = $props();
  const team = data.team; // Team-Objekt aus den Props holen
</script>

<div class="team-container">
  <div class="team-info">
    <h1>{team.name}</h1> <!-- Name des Teams als Überschrift -->
    <img src={team.logo} alt={team.name} class="team-detail-logo" /> <!-- Teamlogo -->
    <ul>
      <li><strong>Land:</strong> {team.country}</li>
      <li><strong>Gründungsjahr:</strong> {team.founded}</li>
      <li><strong>Stadion:</strong> {team.stadium}</li>
      <li><strong>Marktwert:</strong> {team.market_value_million} Mio. €</li>
    </ul>
  </div>

  <div class="team-media">
    <img src={team.teamImage} alt="Mannschaftsfoto" class="media-image" /> <!-- Bild der Mannschaft -->
    <img src={team.stadiumImage} alt="Stadion" class="media-image" /> <!-- Bild des Stadions -->
  </div>
</div>