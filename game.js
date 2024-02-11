// Erstelle die Anwendung
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    resizeTo: window,
    backgroundColor: 0x000000, // Hintergrundfarbe auf Schwarz setzen
});

// Lade das Hintergrundbild
const background = PIXI.Sprite.from('assets/background.jpg');
background.width = app.screen.width; // An die Bildschirmbreite anpassen
background.height = app.screen.height; // An die Bildschirmhöhe anpassen
app.stage.addChild(background); // Hintergrund zur Bühne hinzufügen

// Füge die Anwendungsansicht dem DOM hinzu
document.body.appendChild(app.view);

// Liste der UFOs
const ufoList = [];

// Rakete erstellen
const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.scale.x = 0.260;
rocket.scale.y = 0.260;
rocket.x = 390;
rocket.y = 720;
app.stage.addChild(rocket);

// Spiel-Intervall für UFOs
gameInterval(function (){
    const ufo = PIXI.Sprite.from('assets/'+'ufo'+random(3, 2)+'.png');
    ufo.scale.set(0.13);
    ufo.x = random(0, 1900);
    ufo.y = -25;
    app.stage.addChild(ufo);
    ufoList.push(ufo);
    flyDown(ufo, 1.45);
    
    waitForCollision(rocket, ufo).then(function () {
        stopGame();
        reloadGame();
        app.stage.removeChild(rocket);
    });
},460);

// Funktion für die linke Pfeiltaste
function leftKeyPressed(){
    rocket.x -= 4;
}

// Funktion für die rechte Pfeiltaste
function rightKeyPressed(){
    rocket.x += 4;
}


// Funktion für das Schießen
let lastShootTime = 0;
const shootCooldown = 220; // 0,1 Sekunden in Millisekunden

function spaceKeyPressed() {
    const currentTime = Date.now();
    
    if (currentTime - lastShootTime >= shootCooldown) {
        const bullet = PIXI.Sprite.from('assets/bullet.png');
        bullet.scale.set(0.0490, 0.0490);
        bullet.x = rocket.x +38;
        bullet.y = 690;
        flyUp(bullet, 26);
        app.stage.addChild(bullet);
        
        waitForCollision(bullet, ufoList).then(function ([bullet, ufo]) {
            const boom = PIXI.Sprite.from('assets/boom.png');
            boom.scale.set(0.290);
            app.stage.addChild(boom);
            app.stage.removeChild(ufo);
            app.stage.removeChild(bullet);
            boom.scale.x = 0.25;
            boom.scale.y = 0.25;
            boom.x = ufo.x;
            boom.y = ufo.y;
            

            // Entferne den Boom-Effekt nach 1,5 Sekunden
            setTimeout(() => {
                app.stage.removeChild(boom);
            }, 150);
        });

        lastShootTime = currentTime; 
    }
}

// Funktion für die obere Pfeiltaste (Bombe)
let lastBombTime = 0;
const bombCooldown = 1700; // 1,7 Sekunden in Millisekunden

function upKeyPressed() {
    const currentTime = Date.now();
    
    if (currentTime - lastBombTime >= bombCooldown) {
        const bomb = PIXI.Sprite.from('assets/bomb.png');
        bomb.scale.set(0.130); 
        bomb.x = rocket.x + 44;
        bomb.y = rocket.y - 20;
        app.stage.addChild(bomb);

        waitForCollision(bomb, ufoList).then(function ([bomb, ufo]) {
            app.stage.removeChild(ufo);
            app.stage.removeChild(bomb);

            // Erzeuge den Boom-Effekt
            const boom = PIXI.Sprite.from('assets/boom.png');
            boom.scale.set(0.290);
            boom.scale.x = 0.25;
            boom.scale.y = 0.25;
            boom.x = bomb.x;
            boom.y = bomb.y;
            app.stage.addChild(boom);

            // Entferne den Boom-Effekt nach 1,5 Sekunden
            setTimeout(() => {
                app.stage.removeChild(boom);
            }, 150);
        });

        lastBombTime = currentTime; 
    }
}

// Die Ereignishandler für Tasten
window.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: // Linke Pfeiltaste
            leftKeyPressed();
            break;
        case 39: // Rechte Pfeiltaste
            rightKeyPressed();
            break;
        case 32: // Leertaste
            spaceKeyPressed();
            break;
        case 38: // Obere Pfeiltaste
            upKeyPressed();
            break;
    }
});
