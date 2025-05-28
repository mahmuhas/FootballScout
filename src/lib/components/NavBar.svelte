<script>
  // Importiere die goto-Funktion für Navigation zwischen Seiten
  import { goto } from "$app/navigation";
</script>

<!-- Navigationsleiste mit Buttons für verschiedene Seiten -->
<nav class="nav">
  <!-- Startseite -->
  <button onclick={() => goto("/")}>Home</button>
  <!-- Spielerübersicht -->
  <button onclick={() => goto("/players")}>Spieler</button>
  <!-- Teamübersicht -->
  <button onclick={() => goto("/teams")}>Teams</button>
  <!-- Spieler verwalten -->
  <button onclick={() => goto("/manage_players")}>Spieler verwalten</button>
  <!-- Teams verwalten -->
  <button onclick={() => goto("/manage_teams")}>Teams verwalten</button>
</nav>

<style>
  /* Styling für die Navigationsleiste */
  .nav {
    background-color: #222;
    padding: 0.5rem;
    display: flex;
    gap: 1rem;
  }

  /* Styling für die Buttons in der Navigation */
  .nav button {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }

  /* Hover-Effekt für Buttons */
  .nav button:hover {
    text-decoration: underline;
  }
</style>
