// Create the player object - a 1 unit square cube
const player = BABYLON.MeshBuilder.CreateBox("bird", {width: 1, height: 1, depth: 1}, scene);
// A Vector2 is a 2 dimensional vector with X and Y dimension - track velocity with this.
var velocity = new BABYLON.Vector2(0, 0);
const flightForce = 5; // The amount of force applied when the "fly" button is pressed

var updatePlayer = function() {
    // Delta Time is used to track how much time has passed since the last update
    // We use this instead of a fixed value to account for changes in frame rate (lag)
    // This means the game will play similarly at different frame rates.
    // Update the players physics:
    velocity.y += gravity.y * scene.deltaTime / 1000;
    capVelocity(velocity, 20);
    player.position.y += velocity.y * scene.deltaTime / 1000;
    if (testGameOver()) {
        //console.log("out of bounds!");
    }
};

var testGameOver = function() {
    return player.position.y > gameHeight || player.position.y < -gameHeight;
}

var onPlayerFlight = function() {
    velocity.y += flightForce;
}

var capVelocity = function(velocity, cap) {
    velocity.y = Math.min(cap, Math.max(-cap, velocity.y));
}