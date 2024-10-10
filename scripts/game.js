// Game logic: setting up Babylon scene, infinite block generation

// Create the Babylon.js engine and scene
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Setup camera and lighting
const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;

// Call engine.resize() when the window is resized
window.addEventListener("resize", function () {
    engine.resize();
});

// Player setup from player.js
const player = createPlayer(scene);
camera.parent = player;

// Infinite platform generation from environment.js
generatePlatforms(scene, player);

// Game loop
engine.runRenderLoop(function () {
    scene.render();

    // Handle player input and movement from player.js
    updatePlayer(player);
    
    // Check if player has fallen into the "lava"
    if (player.position.y < 0) {
        player.position = new BABYLON.Vector3(0, 5, 0);  // Reset player if they fall
    }
});

window.addEventListener("resize", function () {
    engine.resize();
});

