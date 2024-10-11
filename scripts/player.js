    function createPlayer(scene) {
    // Create a cylinder for the player, which is more stable
    const player = BABYLON.MeshBuilder.CreateCylinder("player", {height: 2, diameter: 1}, scene);
    player.position = new BABYLON.Vector3(0, 5, 0);  // Start above platforms

    // Setup player physics with lower restitution and using a cylinder impostor
    player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.CylinderImpostor, { 
        mass: 1, 
        friction: 0.2, 
        restitution: 0 // No bounciness
    }, scene);

    return player;
}

function resetPlayerVelocity(player) {
    let linearVelocity = player.physicsImpostor.getLinearVelocity();

    // Cap the player's linear velocity to avoid high-speed collisions
    const maxSpeed = 10;
    if (linearVelocity.length() > maxSpeed) {
        linearVelocity = linearVelocity.scale(0.9);  // Slow down the velocity
        player.physicsImpostor.setLinearVelocity(linearVelocity);
    }
}



function resetPlayerRotation(player) {
    // Get the current angular velocity
    let angularVelocity = player.physicsImpostor.getAngularVelocity();

    // Lock rotation completely
    angularVelocity.x = 0;
    angularVelocity.y = 0; // You can leave this if you want to lock the Y-axis too
    angularVelocity.z = 0;

    // Apply the reset angular velocity to prevent spinning
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

    // Check for jump input (spacebar) and only jump if the player is grounded
    if (inputMap[" "] && player.physicsImpostor.getLinearVelocity().y === 0) {
        player.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, jumpForce, 0), player.getAbsolutePosition());
    }
}

