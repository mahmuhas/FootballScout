<script>
  import "./styles.css"; // Globale CSS-Datei importieren
  import { goto } from "$app/navigation"; // Navigation-Funktion importieren

  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props(); // Props extrahieren

  let search = $state(""); // Suchfeld als reaktiver State

  // Funktion für die Suche
  function handleSearch() {
    if (!search.trim()) return;
    const input = search.trim().toLowerCase();

    // Schlagworte für Weiterleitung zu Teams
    const teamKeywords = [
      "fc",
      "club",
      "team",
      "teams",
      "fc barcelona",
      "real madrid",
      "manchester city",
      "bayern münchen",
      "paris sg",
      "paris",
      "juventus",
      "ajax amsterdam",
      "ajax",
      "fc zürich",
    ];

    // Wenn ein Team-Schlagwort gefunden wird, zu Teams weiterleiten
    if (teamKeywords.some((keyword) => input.includes(keyword))) {
      goto(`/teams`);
    } else {
      // Sonst zur Spielersuche weiterleiten
      goto(`/players?query=${encodeURIComponent(search)}`);
    }
  }
</script>

<header class="top-bar">
  <div class="top-inner">
    <img
      src="/images/Logo_FootballScout.png"
      alt="FootballScout Logo"
      class="logo"
    />

    <div class="search-container">
      <input
        type="text"
        placeholder="Spieler oder Team suchen..."
        value={search}
        oninput={(e) => (search = e.target.value)}
        onkeydown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button onclick={handleSearch}>🔍</button>
    </div>

    <!-- Neuer Profil-Button -->
    <a href="/profil" class="profile-button">
      <span>Profil</span>
      <img
        src="/images/Profilbild.png"
        alt="Profilbild"
        class="profile-image"
      />
    </a>
  </div>
</header>

<nav class="navbar">
  <a href="/">Home</a>
  <a href="/players">Spieler</a>
  <a href="/teams">Teams</a>
  <a href="/manage_players">Spieler verwalten</a>
  <a href="/manage_teams">Teams verwalten</a>
</nav>

<main class="page-content">
  {@render children?.()}
</main>