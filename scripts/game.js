const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Create a UniversalCamera for first-person view
const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);  // Attach the mouse controls to the camera

// Lock the pointer to the canvas to enable mouse movement
canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
});

// Enable physics engine
scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

// Camera setup for first-person view (no arrow keys)
const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);
camera.inputs.clear();  // Remove all default controls (including arrow keys)

// Only use WASD keys for movement
camera.inputs.addKeyboard(); 
camera.inputs.attached.keyboard.keysUp = [87];    // W
camera.inputs.attached.keyboard.keysDown = [83];  // S
camera.inputs.attached.keyboard.keysLeft = [65];  // A
camera.inputs.attached.keyboard.keysRight = [68]; // D
camera.inputs.attached.keyboard.preventDefault = true; // Prevent default browser behavior

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
