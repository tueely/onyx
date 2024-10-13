// Setup camera
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);

// Remove default inputs, including arrow keys
camera.inputs.clear();

// Re-enable only keyboard and mouse inputs (WASD for movement)
camera.inputs.addKeyboard(); // WASD movement
camera.inputs.addMouse(); // Mouse for looking around

// Enable physics engine with gravity
scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;


// Player setup from player.js
const player = createPlayer(scene);
camera.parent = player;  // Attach camera to player

// Infinite platform generation from environment.js
generatePlatforms(scene, player);


// Game loop
engine.runRenderLoop(function () {
    scene.render();

    // Reset player's rotation to prevent toppling
    resetPlayerRotation(player);

    // Reset player's velocity to prevent excessive speed and being flung around
    resetPlayerVelocity(player);

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
