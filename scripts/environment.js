// Ensure platformCount is defined
let platformCount = 0;

// Function to generate a room where platforms will be placed
function generateRoom(scene) {
    // Room dimensions
    const roomWidth = 30;
    const roomHeight = 15;
    const roomDepth = 100;

    // Create floor
    const floor = BABYLON.MeshBuilder.CreateBox("floor", { width: roomWidth, height: 1, depth: roomDepth }, scene);
    floor.position.y = 0; // Floor at y = 0
    floor.checkCollisions = true;

    // Create ceiling
    const ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", { width: roomWidth, height: 1, depth: roomDepth }, scene);
    ceiling.position.y = roomHeight; // Ceiling at y = roomHeight
    ceiling.checkCollisions = true;

    // Create walls
    const leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: 1, height: roomHeight, depth: roomDepth }, scene);
    leftWall.position.x = -roomWidth / 2;
    leftWall.checkCollisions = true;

    const rightWall = BABYLON.MeshBuilder.CreateBox("rightWall", { width: 1, height: roomHeight, depth: roomDepth }, scene);
    rightWall.position.x = roomWidth / 2;
    rightWall.checkCollisions = true;

    const backWall = BABYLON.MeshBuilder.CreateBox("backWall", { width: roomWidth, height: roomHeight, depth: 1 }, scene);
    backWall.position.z = -roomDepth / 2;
    backWall.checkCollisions = true;

    // Add a front wall as well to enclose the room
    const frontWall = BABYLON.MeshBuilder.CreateBox("frontWall", { width: roomWidth, height: roomHeight, depth: 1 }, scene);
    frontWall.position.z = roomDepth / 2;
    frontWall.checkCollisions = true;

    return floor;
}


// Function to generate platforms within the room
function generatePlatforms(scene, player) {
    const platformSize = {width: 5, height: 1, depth: 5};
    let platforms = [];

    const roomFloor = generateRoom(scene); // Generate the room

    // Create initial platform
    createPlatform(scene, platformSize, new BABYLON.Vector3(0, 1, 0), platforms);

    // Procedurally generate new platforms within the room as the player progresses
    scene.registerBeforeRender(function() {
        const lastPlatform = platforms[platforms.length - 1];
        if (player.position.z > lastPlatform.position.z - 20) {
            const newPlatformPos = new BABYLON.Vector3(
                Math.random() * 20 - 10,  // Random x within room bounds
                1,                        // y stays constant (1 above the floor)
                lastPlatform.position.z + 10  // Z-axis progression
            );
            createPlatform(scene, platformSize, newPlatformPos, platforms);
        }
    });
}

// Function to create individual platforms
function createPlatform(scene, size, position, platforms) {
    const platform = BABYLON.MeshBuilder.CreateBox("platform" + platformCount++, size, scene);
    platform.position = position;

    // Add platform physics
    platform.physicsImpostor = new BABYLON.PhysicsImpostor(platform, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0.2}, scene);

    platforms.push(platform);
}
