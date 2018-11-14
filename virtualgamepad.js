window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

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
