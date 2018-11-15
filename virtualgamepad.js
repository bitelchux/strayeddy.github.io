class VirtualGamepad {

  constructor(scene){
    this.scene = scene;
    this.input = this.scene.game.input;
    this.joystick = null;
    this.joystickPad = null;
    this.joystickPadOrigin = null;
    this.firebutton = null;
    this.interactbutton = null;

    scene.input.addPointer(1);

    // Add a joystick to the game (only one is allowed right now)
    this.addJoystick(300, 470, 0.7, 'gamepad');

    // Add buttons to the game
    this.addInteractButton(430, 470, 0.3, 'gamepad');
    this.addFireButton(470, 470, 0.5, 'gamepad');
  }

  addJoystick(x, y, scale, key) {

    // Add the joystick to the game
    this.joystick = this.scene.add.sprite(x, y, key, 2).setInteractive();
    this.joystick.setScrollFactor(0);
    this.joystick.setScale(scale);
    this.joystick.setDepth(2000);
    this.joystickPad = this.scene.add.sprite(x, y, key, 3).setInteractive();
    this.joystickPad.setScrollFactor(0);
    this.joystickPad.setScale(scale);
    this.joystickPad.setDepth(2000);

    // Remember the coordinates of the joystick
    this.joystickPadOrigin = new Phaser.Math.Vector2(x, y);

    // Set up initial joystick properties
    this.joystick.properties = {
      inUse: false,
      up: false,
      down: false,
      left: false,
      right: false,
      x: 0,
      y: 0,
      distance: 0,
      angle: 0,
      rotation: 0
    };

    // Set the touch area as defined by the button's radius
    this.joystickRadius = scale * (this.joystick.width / 2);


    this.scene.input.setDraggable(this.joystickPad);

    this.scene.input.on('dragstart', function(pointer, gameObject) {
      console.log("dragstart");
    }.bind(this));

    this.scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
      var diffX = dragX - this.joystickPadOrigin.x;
      var diffY = dragY - this.joystickPadOrigin.y;

      diffX = (diffX > 100) ? 100 : diffX;
      diffX = (diffX < -100) ? -100 : diffX;

      diffY = (diffY > 100) ? 100 : diffY;
      diffY = (diffY < -100) ? -100 : diffY;

      var newX = this.joystickPadOrigin.x + diffX / 3;
      var newY = this.joystickPadOrigin.y + diffY / 3;
      this.joystickPad.setPosition(newX, newY);

      var rotation = Phaser.Math.Angle.Between(this.joystickPad.x, this.joystickPad.y,
        this.joystickPadOrigin.x, this.joystickPadOrigin.y);
      var magnitude = new Phaser.Math.Vector2(diffX, diffY).length();

      if(magnitude > 30) {
        this.simulatePlayerMovement(rotation);
      }

    }.bind(this));

    this.scene.input.on('dragend', function(pointer, gameObject) {
      this.simulateArrowUpRelease();
      this.simulateArrowDownRelease();
      this.simulateArrowRightRelease();
      this.simulateArrowLeftRelease();
      this.joystickPad.setPosition(this.joystickPadOrigin.x, this.joystickPadOrigin.y);
    }.bind(this));
  }

  addFireButton(x, y, scale, key) {

    // Add the button to the game
    this.firebutton = this.scene.add.sprite(x, y, key).setInteractive();
    this.firebutton.setScrollFactor(0);
    this.firebutton.setScale(scale);
    this.firebutton.setDepth(2000);

    this.firebutton.on('pointerdown', function(pointer, localX, localY, event) {
      this.simulateSpacePress();
      this.firebutton.setFrame(1);
    }.bind(this));
    this.firebutton.on('pointerup', function(pointer, localX, localY, event) {
      this.simulateSpaceRelease();
      this.firebutton.setFrame(0);
    }.bind(this));
  }

  addInteractButton(x, y, scale, key) {

    // Add the button to the game
    this.interactbutton = this.scene.add.sprite(x, y, key).setInteractive();
    this.interactbutton.setScrollFactor(0);
    this.interactbutton.setScale(scale);
    this.interactbutton.setDepth(2000);

    this.interactbutton.on('pointerdown', function(pointer, localX, localY, event) {
      this.simulateCtrlPress();
      this.interactbutton.setFrame(1);
    }.bind(this));
    this.interactbutton.on('pointerup', function(pointer, localX, localY, event) {
      this.simulateCtrlRelease();
      this.interactbutton.setFrame(0);
    }.bind(this));
  }

  simulatePlayerMovement(joystickRotation) {
    this.simulateArrowUpRelease();
    this.simulateArrowDownRelease();
    this.simulateArrowRightRelease();
    this.simulateArrowLeftRelease();

    if(joystickRotation >= -Math.PI/8 && joystickRotation < Math.PI/8) {
      this.simulateArrowLeftPress();
    } else if(joystickRotation >= Math.PI/8 && joystickRotation < 3*Math.PI/8) {
      this.simulateArrowUpPress();
      this.simulateArrowLeftPress();
    } else if(joystickRotation >= 3*Math.PI/8 && joystickRotation < 5*Math.PI/8) {
      this.simulateArrowUpPress();
    } else if(joystickRotation >= 5*Math.PI/8 && joystickRotation < 7*Math.PI/8) {
      this.simulateArrowUpPress();
      this.simulateArrowRightPress();
    } else if(joystickRotation >= 7*Math.PI/8 || joystickRotation < -7*Math.PI/8) {
      this.simulateArrowRightPress();
    } else if(joystickRotation >= -3*Math.PI/8 && joystickRotation < -Math.PI/8) {
      this.simulateArrowDownPress();
      this.simulateArrowLeftPress();
    } else if(joystickRotation >= -5*Math.PI/8 && joystickRotation < -3*Math.PI/8) {
      this.simulateArrowDownPress();
    } else if(joystickRotation >= -7*Math.PI/8 && joystickRotation < -5*Math.PI/8) {
      this.simulateArrowDownPress();
      this.simulateArrowRightPress();
    }
  }

  simulateCtrlPress() {
    this.simulateKeyPress(17, true);
  }
  simulateSpacePress() {
    this.simulateKeyPress(32);
  }
  simulateArrowLeftPress() {
    this.simulateKeyPress(37);
  }
  simulateArrowUpPress() {
    this.simulateKeyPress(38);
  }
  simulateArrowRightPress() {
    this.simulateKeyPress(39);
  }
  simulateArrowDownPress() {
    this.simulateKeyPress(40);
  }

  simulateCtrlRelease() {
    this.simulateKeyRelease(17, true);
  }
  simulateSpaceRelease() {
    this.simulateKeyRelease(32);
  }
  simulateArrowLeftRelease() {
    this.simulateKeyRelease(37);
  }
  simulateArrowUpRelease() {
    this.simulateKeyRelease(38);
  }
  simulateArrowRightRelease() {
    this.simulateKeyRelease(39);
  }
  simulateArrowDownRelease() {
    this.simulateKeyRelease(40);
  }


  simulateKeyPress(code, ctrl = false) {
    var e = new KeyboardEvent("keydown", {
        bubbles : true,
        cancelable : true,
        keyCode : code,
        which : code,
        ctrlKey : ctrl
    });
    document.dispatchEvent(e);
  }

  simulateKeyRelease(code, ctrl = false) {
    var e = new KeyboardEvent("keyup", {
        bubbles : true,
        cancelable : true,
        keyCode : code,
        which : code,
        ctrlKey : ctrl
    });
    document.dispatchEvent(e);
  }
}
