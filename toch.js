// Variablen zur Speicherung der Berührungspositionen
let touchStartX = 0;
let touchStartY = 0;

// Event-Listener für Touch-Ereignisse
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

// Funktion zur Behandlung des Touch-Start-Ereignisses
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

// Funktion zur Behandlung des Touch-Bewegungsereignisses
function handleTouchMove(event) {
    event.preventDefault(); // Verhindert das Scrollen der Seite während der Touch-Bewegung

    // Berechne die Verschiebung des Touch
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Hier könntest du die Logik implementieren, um die Bewegungen des Spielers basierend auf deltaX und deltaY zu steuern
    // Zum Beispiel: Bewegung des Spielers nach links/rechts oder oben/unten
}

// Hier integrierst du die Logik, um die Bewegungen des Spielers basierend auf Touch-Ereignissen zu steuern
// Zum Beispiel: Bewegung des Spielers nach links/rechts oder oben/unten
