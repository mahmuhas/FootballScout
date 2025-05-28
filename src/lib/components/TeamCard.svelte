<script>
  // Props werden aus den übergebenen Eigenschaften extrahiert
  const { team } = $props();
</script>

<!-- Teamkarte mit Logo und Infos -->
<div class="team-card">
  <!-- Teamlogo -->
  <img class="team-logo" src={team.logo} alt={"Logo von " + team.name} />
  <div class="team-info">
    <h2>{team.name}</h2>
    <p><strong>Land:</strong> {team.country}</p>
    <p><strong>Gründungsjahr:</strong> {team.founded}</p>
    <p><strong>Stadion:</strong> {team.stadium}</p>
    <p><strong>Marktwert:</strong> €{team.market_value_million} Mio.</p>
  </div>
</div>

<style>
  /* Karte für Team */
  .team-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    border-radius: 1rem;
    padding: 1rem;
    width: 240px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  /* Teamlogo Styling */
  .team-logo {
    width: 100px;
    height: auto;
    margin-bottom: 1rem;
  }

  /* Bereich für Teaminfos */
  .team-info {
    text-align: center;
  }

  .team-info h2 {
    margin-bottom: 0.5rem;
  }

  .team-info p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }
</style>
