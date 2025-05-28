<script>
    // Props aus den übergebenen Daten extrahieren
    const { data } = $props();
</script>

<h1 class="center">Mein Profil</h1> <!-- Überschrift der Profilseite -->

<form method="GET" class="form">
    <!-- Auswahlfeld für Lieblingsspieler -->
    <label for="player">Lieblingsspieler:</label>
    <select name="player" id="player" required>
        <option disabled value="">-- Spieler wählen --</option>
        {#each data.players as player}
            <option
                value={player.name}
                selected={data.selectedPlayer === player.name}
            >
                {player.name}
            </option>
        {/each}
    </select>

    <!-- Auswahlfeld für Lieblingsverein -->
    <label for="team">Lieblingsverein:</label>
    <select name="team" id="team" required>
        <option disabled value="">-- Team wählen --</option>
        {#each data.teams as team}
            <option
                value={team.name}
                selected={data.selectedTeam === team.name}
            >
                {team.name}
            </option>
        {/each}
    </select>

    <button type="submit" class="btn-primary">Speichern</button> <!-- Button zum Speichern der Auswahl -->
</form>

{#if data.selectedPlayer || data.selectedTeam}
    <div class="result">
        <!-- Anzeige der aktuellen Auswahl für Spieler und Verein -->
        <p><strong>Spieler:</strong> {data.selectedPlayer}</p>
        <p><strong>Verein:</strong> {data.selectedTeam}</p>
    </div>
{/if}