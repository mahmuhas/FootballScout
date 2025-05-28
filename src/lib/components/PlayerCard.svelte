<script>
  // Props werden aus den übergebenen Eigenschaften extrahiert
  const { player } = $props();
</script>

<!-- Spielerkarte mit Bild und Infos -->
<div class="player-card">
  <!-- Spielerbild -->
  <img
    class="player-image"
    src={player.photo}
    alt={"Foto von " + player.name}
  />
  <div class="player-info">
    <h2>{player.name}</h2>
    <p><strong>Position:</strong> {player.position}</p>
    <p><strong>Alter:</strong> {player.age} Jahre</p>
    <p><strong>Team:</strong> {player.team_name}</p>
    <p><strong>Marktwert:</strong> €{player.market_value} Mio.</p>
    <p><strong>Nationalität:</strong> {player.nationality}</p>
  </div>
</div>

<style>
  /* Karte für Spieler */
  .player-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ddd;
    border-radius: 1rem;
    padding: 1rem;
    width: 220px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  /* Spielerbild Styling */
  .player-image {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
  }

  /* Bereich für Spielerinfos */
  .player-info {
    margin-top: 0.5rem;
    text-align: center;
  }

  .player-info h2 {
    margin: 0.3rem 0;
    font-size: 1.2rem;
  }

  .player-info p {
    margin: 0.2rem 0;
    font-size: 0.9rem;
  }
</style>
