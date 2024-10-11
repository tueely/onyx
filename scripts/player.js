function createPlayer(scene) {
    const player = BABYLON.MeshBuilder.CreateBox("player", {height: 2, width: 1, depth: 1}, scene);
    player.position = new BABYLON.Vector3(0, 5, 0);  // Start above platforms

    // Setup player physics with lower restitution to prevent bouncing
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { 
        mass: 1, 
        friction: 0.2, 
        restitution: 0  // Reduce bounciness
    }, scene);

    return player;
}

function resetPlayerRotation(player) {
    // Get the current angular velocity
    let angularVelocity = player.physicsImpostor.getAngularVelocity();
    
    // Limit the X and Z rotation to prevent tipping over
    angularVelocity.x = 0;
    angularVelocity.z = 0;
    
    // Cap the player's linear velocity to prevent high-speed collisions
    let linearVelocity = player.physicsImpostor.getLinearVelocity();
    if (linearVelocity.length() > 10) {
        linearVelocity = linearVelocity.scale(0.9);  // Slow down the velocity
        player.physicsImpostor.setLinearVelocity(linearVelocity);
    }

    // Apply the reset angular velocity to the physics impostor
    player.physicsImpostor.setAngularVelocity(angularVelocity);
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
    
    // WASD movement
    if (inputMap["w"]) player.moveWithCollisions(new BABYLON.Vector3(0, 0, speed));
    if (inputMap["s"]) player.moveWithCollisions(new BABYLON.Vector3(0, 0, -speed));
    if (inputMap["a"]) player.moveWithCollisions(new BABYLON.Vector3(-speed, 0, 0));
    if (inputMap["d"]) player.moveWithCollisions(new BABYLON.Vector3(speed, 0, 0));

    // Jump with spacebar (if the player is grounded)
    if (inputMap[" "] && player.physicsImpostor.getLinearVelocity().y === 0) {
        player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, jumpForce, 0), player.getAbsolutePosition());
    }
}
