// Handles the controller state

var gamepadManager = new BABYLON.GamepadManager();

var deviceSourceManager;


var setupInputs = function() {
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
                    onPlayerFlight();
                }
            });
        }
        // If Keyboard, add an Observer to change text
        else if (deviceSource.deviceType === BABYLON.DeviceType.Keyboard) {
            deviceSource.onInputChangedObservable.add((eventData) => {
                if (eventData.type === 'keydown' &&
                    eventData.key === ' ') {
                    onPlayerFlight();
                }
            });
        }
    });

    // This callback is invoked when a new controller is attached:
    gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{
    
        // When a new controller is connected add support for detecting button presses
        gamepad.onButtonDownObservable.add((button, state)=>{
            onPlayerFlight();
        });
    });
};