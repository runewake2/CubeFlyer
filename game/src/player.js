var gamepadManager = new BABYLON.GamepadManager();

var deviceSourceManager;
class Player extends GameObject {
    constructor() {
        super();
    }

    init() {
        // A Vector2 is a 2 dimensional vector with X and Y dimension - track velocity with this.
        this.velocity = new BABYLON.Vector2(0, 0);
        this.setupInputs();

        // Create the player object - a 1 unit square cube
        let cubeOptions = {width: 1, height: 1, depth: 1};
        this.playerMesh = BABYLON.MeshBuilder.CreateBox("bird", cubeOptions, scene);
    }

    onDestroy() {
        scene.removeMesh(this.playerMesh);
    }

    update(deltaTime) {
        // Update the players physics:
        this.velocity.y += gravity.y * deltaTime;
        this.capVelocity(20);
        this.playerMesh.position.y += this.velocity.y * deltaTime;
        if (this.testGameOver()) {
            console.log("out of bounds!");
            createObject(new Player());
            destroyObject(this);
        }
    }

    testGameOver() {
        return this.playerMesh.position.y > gameHeight ||
               this.playerMesh.position.y < -gameHeight;
    }
    
    onPlayerFlight() {
        console.log(this.velocity);
        console.log(flightForce);
        this.velocity.y += flightForce;
    }
    
    capVelocity(cap) {
        this.velocity.y = Math.min(cap, Math.max(-cap, this.velocity.y));
    }

    setupInputs() {
        deviceSourceManager = new BABYLON.DeviceSourceManager(scene.getEngine());
        console.log('Initializing inputs');
        /**
         * onDeviceConnectedObservable is fired after a device is connected so any code that we
         * put in here should be able to reliably work against an existing device.
         * 
         * For onInputChangedObservable, this will only work with Mouse, Touch, and Keyboards because
         * the Gamepad API currently does not fire input changed events (polling only)
         */
        deviceSourceManager.onDeviceConnectedObservable.add((deviceSource) => {
            // If Mouse/Touch, add an Observer to change text
            if (deviceSource.deviceType === BABYLON.DeviceType.Mouse || deviceSource.deviceType === BABYLON.DeviceType.Touch) {
                deviceSource.onInputChangedObservable.add((eventData) => {
                    if (eventData.type === 'pointerdown' &&
                        eventData.inputIndex === BABYLON.PointerInput.LeftClick) {
                        this.onPlayerFlight();
                    }
                });
            }
            // If Keyboard, add an Observer to change text
            else if (deviceSource.deviceType === BABYLON.DeviceType.Keyboard) {
                deviceSource.onInputChangedObservable.add((eventData) => {
                    if (eventData.type === 'keydown' &&
                        eventData.key === ' ') {
                        this.onPlayerFlight();
                    }
                });
            }
        });

        // This callback is invoked when a new controller is attached:
        gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{
        
            // When a new controller is connected add support for detecting button presses
            gamepad.onButtonDownObservable.add((button, state)=>{
                this.onPlayerFlight();
            });
        });
    }
}
