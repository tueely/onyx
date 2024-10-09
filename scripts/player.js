
// Player creation and movement handling

function createPlayer(scene) {
    // Create a simple box for the player
    const player = BABYLON.MeshBuilder.CreateBox("player", {height: 2, width: 1, depth: 1}, scene);
    player.position = new BABYLON.Vector3(0, 5, 0);  // Start above platforms

    // Setup player physics
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction: 0.2, restitution: 0 }, scene);
    return player;
}

let inputMap = {};
window.addEventListener("keydown", function(event) {
    inputMap[event.key] = true;
});
window.addEventListener("keyup", function(event) {
    inputMap[event.key] = false;
});

function updatePlayer(player) {
    const speed = 0.2;
    const jumpForce = 8;

    // Move player using WASD controls
    if (inputMap["w"]) player.moveWithCollisions(new BABYLON.Vector3(0, 0, speed));
    if (inputMap["s"]) player.moveWithCollisions(new BABYLON.Vector3(0, 0, -speed));
    if (inputMap["a"]) player.moveWithCollisions(new BABYLON.Vector3(-speed, 0, 0));
    if (inputMap["d"]) player.moveWithCollisions(new BABYLON.Vector3(speed, 0, 0));

    // Jump if on the ground (simple Y-axis check)
    if (inputMap[" "] && player.position.y <= 2.1) {
        player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, jumpForce, 0), player.getAbsolutePosition());
    }
}
