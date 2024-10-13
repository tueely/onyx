// Setup camera
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Create the UniversalCamera for first-person view
const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
camera.attachControl(canvas, true);

// Disable arrow key inputs and other defaults, only WASD and Mouse
camera.inputs.clear();
camera.inputs.addKeyboard(); // WASD movement
camera.inputs.addMouse();    // Mouse for looking around

// Adjust mouse sensitivity for smoother camera control
camera.inputs.attached.mouse.angularSensibility = 2000;  // Adjust as needed

// Enable physics engine with gravity
scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
light.intensity = 0.7;

// Player setup from player.js
const player = createPlayer(scene);
camera.parent = player;  // Attach camera to player for first-person POV

// Infinite platform generation from environment.js
generatePlatforms(scene, player);

// Lock the pointer to the canvas to enable mouse control like a first-person game
canvas.addEventListener("click", () => {
    canvas.requestPointerLock();
});

document.addEventListener('pointerlockchange', function() {
    if (document.pointerLockElement === canvas) {
        camera.attachControl(canvas);  // Attach controls once pointer is locked
        console.log("Pointer is locked");
    } else {
        camera.detachControl(canvas);  // Detach controls if pointer is not locked
        console.log("Pointer is unlocked");
    }
});

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
