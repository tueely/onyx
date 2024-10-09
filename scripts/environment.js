
// Procedural platform generation

let platformCount = 0;

function generatePlatforms(scene, player) {
    const platformSize = {width: 5, height: 1, depth: 5};
    let platforms = [];

    // Create initial platform
    createPlatform(scene, platformSize, new BABYLON.Vector3(0, 0, 0), platforms);

    // Procedurally generate new platforms as the player progresses
    scene.registerBeforeRender(function() {
        const lastPlatform = platforms[platforms.length - 1];
        if (player.position.z > lastPlatform.position.z - 20) {
            const newPlatformPos = new BABYLON.Vector3(
                Math.random() * 8 - 4,   // Random x position
                0,                       // y stays constant (platform height)
                lastPlatform.position.z + 10  // Z-axis progression
            );
            createPlatform(scene, platformSize, newPlatformPos, platforms);
        }
    });
}

function createPlatform(scene, size, position, platforms) {
    const platform = BABYLON.MeshBuilder.CreateBox("platform" + platformCount++, size, scene);
    platform.position = position;

    // Add platform physics
    platform.physicsImpostor = new BABYLON.PhysicsImpostor(platform, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0.2}, scene);

    // Add platform to the list
    platforms.push(platform);

    // Add "lava" material to the ground
    const lavaMaterial = new BABYLON.StandardMaterial("lava", scene);
    lavaMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0); // Red for lava
    platform.material = lavaMaterial;
}
