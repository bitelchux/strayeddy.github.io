class MenuScene extends Phaser.Scene {

  preload() {
    this.load.setPath('assets/');

    var textStyle = {fontStyle: 'bold', fontSize: '48px', fill: '#EEEEEE'};
    this.loadingText = this.add.text(280, 284, 'Loading', textStyle);
    this.loadingIndex = 0;

    this.loadingInterval = setInterval(function() {
      switch(this.loadingIndex) {
        case 0:
          this.loadingText.text = 'Loading';
          break;
        case 1:
          this.loadingText.text = 'Loading.';
          break;
        case 2:
          this.loadingText.text = 'Loading..';
          break;
        case 3:
          this.loadingText.text = 'Loading...';
          break;
      }
      this.loadingIndex = (this.loadingIndex + 1) % 4;
    }.bind(this), 1000);

    // images
    this.load.image("bulletshell", ["bullet.png", "bullet_n.png"]);
    this.load.image("blood", ["blood/blood.png", "blood/blood_n.png"]);
    this.load.image("reload", ["reload.png", "reload_n.png"]);
    this.load.image("help", ["help.png", "help_n.png"]);

    //levels
    this.load.image("level", ["levels/level.png", "levels/level_n.png"]);
    this.load.tilemapTiledJSON("levelTilemap", "levels/level.json");

    // weapons
    this.load.image("pistols", ["weapons/pistols.png", "weapons/pistols_n.png"]);
    this.load.image("shotgun", ["weapons/shotgun.png", "weapons/shotgun_n.png"]);
    this.load.image("uzi", ["weapons/uzi.png", "weapons/uzi_n.png"]);
    this.load.image("rifle", ["weapons/rifle.png", "weapons/rifle_n.png"]);

    this.load.atlas({
      key: 'bullet',
      textureURL: 'bullet/bullet.png',
      normalMap: 'bullet/bullet_n.png',
      atlasURL: 'bullet/bullet.json'
    });
    this.load.atlas({
      key: 'bill',
      textureURL: 'bill/bill.png',
      normalMap: 'bill/bill_n.png',
      atlasURL: 'bill/bill.json'
    });
    this.load.atlas({
      key: 'louis',
      textureURL: 'louis/louis.png',
      normalMap: 'louis/louis_n.png',
      atlasURL: 'louis/louis.json'
    });
    this.load.atlas({
      key: 'zoey',
      textureURL: 'zoey/zoey.png',
      normalMap: 'zoey/zoey_n.png',
      atlasURL: 'zoey/zoey.json'
    });
    this.load.atlas({
      key: 'francis',
      textureURL: 'francis/francis.png',
      normalMap: 'francis/francis_n.png',
      atlasURL: 'francis/francis.json'
    });
    this.load.atlas({
      key: 'zombie',
      textureURL: 'enemies/zombie/zombie.png',
      normalMap: 'enemies/zombie/zombie_n.png',
      atlasURL: 'enemies/zombie/zombie.json'
    });
    this.load.atlas({
      key: 'boomer',
      textureURL: 'enemies/boomer/boomer.png',
      normalMap: 'enemies/boomer/boomer_n.png',
      atlasURL: 'enemies/boomer/boomer.json'
    });
    this.load.atlas({
      key: 'hunter',
      textureURL: 'enemies/hunter/hunter.png',
      normalMap: 'enemies/hunter/hunter_n.png',
      atlasURL: 'enemies/hunter/hunter.json'
    });
    this.load.atlas({
      key: 'smoker',
      textureURL: 'enemies/smoker/smoker.png',
      normalMap: 'enemies/smoker/smoker_n.png',
      atlasURL: 'enemies/smoker/smoker.json'
    });
    this.load.atlas({
      key: 'tank',
      textureURL: 'enemies/tank/tank.png',
      normalMap: 'enemies/tank/tank_n.png',
      atlasURL: 'enemies/tank/tank.json'
    });
    this.load.atlas({
      key: 'impact',
      textureURL: 'impact/impact.png',
      normalMap: 'impact/impact_n.png',
      atlasURL: 'impact/impact.json'
    });
    this.load.atlas({
      key: 'rock',
      textureURL: 'rock/rock.png',
      normalMap: 'rock/rock_n.png',
      atlasURL: 'rock/rock.json'
    });
    this.load.spritesheet('grenade', 'grenade.png', {
      frameWidth: 64, frameHeight: 64
    });
    this.load.spritesheet('healthbar', 'healthbar.png', {
      frameWidth: 64, frameHeight: 16
    });
    this.load.spritesheet('helpsign', 'helpsign.png', {
      frameWidth: 16, frameHeight: 16
    });

    // sounds
    this.load.audio('musicSound', 'audio/music.wav');
    this.load.audio('endSound', 'audio/end.wav');

    // weapons
    this.load.audio('pistolsSound', 'audio/pistols.wav');
    this.load.audio('shotgunSound', 'audio/shotgun.wav');
    this.load.audio('uziSound', 'audio/uzi.wav');
    this.load.audio('rifleSound', 'audio/rifle.wav');
    this.load.audio('grenadeSound', 'audio/grenade.wav');

    //reloading
    this.load.audio('reloadingSound', 'audio/reloading.wav');

    //walking
    this.load.audio('walkingSound', 'audio/walking.wav');

    //zombie
    this.load.audio('zombie1Sound', 'audio/zombie/zombie-1.wav',{instances: 10});
    this.load.audio('zombie2Sound', 'audio/zombie/zombie-2.wav');
    this.load.audio('zombie3Sound', 'audio/zombie/zombie-3.wav');
    this.load.audio('zombie4Sound', 'audio/zombie/zombie-4.wav');
    this.load.audio('zombie5Sound', 'audio/zombie/zombie-5.wav');
    this.load.audio('zombie6Sound', 'audio/zombie/zombie-6.wav');
    this.load.audio('zombie7Sound', 'audio/zombie/zombie-7.wav');
    this.load.audio('zombie8Sound', 'audio/zombie/zombie-8.wav');
    this.load.audio('zombie9Sound', 'audio/zombie/zombie-9.wav');
    this.load.audio('zombiefast1Sound', 'audio/zombie/zombie-fast-1.wav');
    this.load.audio('zombiefast2Sound', 'audio/zombie/zombie-fast-2.wav');
    this.load.audio('zombiefast3Sound', 'audio/zombie/zombie-fast-3.wav');
    this.load.audio('zombiefast4Sound', 'audio/zombie/zombie-fast-4.wav');
    this.load.audio('zombiefast5Sound', 'audio/zombie/zombie-fast-5.wav');
    this.load.audio('zombiewaveSound', 'audio/zombie/zombie-wave.wav');

    //boomer
    this.load.audio('boomermusicSound', 'audio/boomer/boomer-music.wav');
    this.load.audio('boomerexplodeSound', 'audio/boomer/boomer-explode.wav');
    this.load.audio('boomercrySound', 'audio/boomer/boomer-cry.wav');
    this.load.audio('boomerattack1Sound', 'audio/boomer/boomer-attack-1.wav');
    this.load.audio('boomerattack2Sound', 'audio/boomer/boomer-attack-2.wav');
    this.load.audio('boomerattack3Sound', 'audio/boomer/boomer-attack-3.wav');

    //hunter
    this.load.audio('huntermusicSound', 'audio/hunter/hunter-music.wav');
    this.load.audio('hunterjumpSound', 'audio/hunter/hunter-jump.wav');
    this.load.audio('huntercrySound', 'audio/hunter/hunter-cry.wav');
    this.load.audio('hunterattack1Sound', 'audio/hunter/hunter-attack-1.wav');
    this.load.audio('hunterattack2Sound', 'audio/hunter/hunter-attack-2.wav');
    this.load.audio('hunterattack3Sound', 'audio/hunter/hunter-attack-3.wav');

    //smoker
    this.load.audio('smokermusicSound', 'audio/smoker/smoker-music.wav');
    this.load.audio('smokerdragSound', 'audio/smoker/smoker-drag.wav');
    this.load.audio('smokercrySound', 'audio/smoker/smoker-cry.wav');
    this.load.audio('smokerattack1Sound', 'audio/smoker/smoker-attack-1.wav');
    this.load.audio('smokerattack2Sound', 'audio/smoker/smoker-attack-2.wav');
    this.load.audio('smokerattack3Sound', 'audio/smoker/smoker-attack-3.wav');

    //tank
    this.load.audio('tankmusicSound', 'audio/tank/tank-music.wav');
    this.load.audio('tankwalkSound', 'audio/tank/tank-walk.wav');
    this.load.audio('tankattack1Sound', 'audio/tank/tank-attack-1.wav');
    this.load.audio('tankattack2Sound', 'audio/tank/tank-attack-2.wav');
    this.load.audio('tankattack3Sound', 'audio/tank/tank-attack-3.wav');
    this.load.audio('tankpickrockSound', 'audio/tank/tank-pick-rock.wav');
    this.load.audio('tankthrowSound', 'audio/tank/tank-throw.wav');
    this.load.audio('tankrockexplodeSound', 'audio/tank/tank-rock-explode.wav');

    this.load.audio('menuSound', 'audio/menu.wav');

    this.load.image('menuBkg', 'menu/menu.png');
    this.load.image('endBkg', 'end/end.png');

    this.load.image('billPhoto', 'bill/bill-photo.png');
    this.load.image('zoeyPhoto', 'zoey/zoey-photo.png');
    this.load.image('francisPhoto', 'francis/francis-photo.png');
    this.load.image('louisPhoto', 'louis/louis-photo.png');

    this.load.image("pistolsPhoto", "weapons/pistols.png");
    this.load.image("shotgunPhoto", "weapons/shotgun.png");
    this.load.image("uziPhoto", "weapons/uzi.png");
    this.load.image("riflePhoto", "weapons/rifle.png");

    this.load.image("beginnerPhoto", "difficulties/beginner.png");
    this.load.image("normalPhoto", "difficulties/normal.png");
    this.load.image("expertPhoto", "difficulties/expert.png");
    this.load.image("insanePhoto", "difficulties/insane.png");

    this.load.atlas({
      key: 'zombie',
      textureURL: 'enemies/zombie/zombie.png',
      normalMap: 'enemies/zombie/zombie_n.png',
      atlasURL: 'enemies/zombie/zombie.json'
    });
  }

  createMusic() {
    this.menuMusic = this.sound.add('menuSound', {loop: true});
    this.menuMusic.play();
  }

  createBackground() {
    this.add.image(384, 384, 'menuBkg');
  }

  createTexts() {
    var textStyle = {fontStyle: 'bold', fontSize: '48px', fill: '#24281F'};
    this.survivorText = this.add.text(150, 160, 'Choose a survivor', textStyle);
    this.difficultyText = this.add.text(150, 420, 'And a difficulty', textStyle);
    this.survivorText.setDepth(160);
    this.difficultyText.setDepth(420);

    this.titleIndex = 0;
    this.survivorText.setTint(0xFF0000);
    this.difficultyText.setTint(0x000000);
  }

  createSurvivors() {
    this.survivors = ["bill", "zoey", "francis", "louis"];

    this.bill = this.add.image(100, 300, 'billPhoto');
    this.zoey = this.add.image(285, 300, 'zoeyPhoto');
    this.francis = this.add.image(485, 300, 'francisPhoto');
    this.louis = this.add.image(668, 300, 'louisPhoto');
    this.bill.setDepth(300);
    this.zoey.setDepth(300);
    this.francis.setDepth(300);
    this.louis.setDepth(300);

    this.bill["weapon"] = this.add.image(100, 350, 'shotgunPhoto');
    this.zoey["weapon"] = this.add.image(285, 350, 'uziPhoto');
    this.francis["weapon"] = this.add.image(485, 350, 'riflePhoto');
    this.louis["weapon"] = this.add.image(668, 350, 'pistolsPhoto');
    this.bill.weapon.setScale(4).setDepth(350);
    this.zoey.weapon.setScale(4).setDepth(350);
    this.francis.weapon.setScale(4).setDepth(350);
    this.louis.weapon.setScale(4).setDepth(350);

    var textStyle = {fontStyle: 'bold', fontSize: '24px', fill: '#24281F'};
    this.bill["title"] = this.add.text(75, 380, 'Bill', textStyle);
    this.zoey["title"] = this.add.text(260, 380, 'Zoey', textStyle);
    this.francis["title"] = this.add.text(440, 380, 'Francis', textStyle);
    this.louis["title"] = this.add.text(630, 380, 'Louis', textStyle);
    this.bill.title.setDepth(380);
    this.zoey.title.setDepth(380);
    this.francis.title.setDepth(380);
    this.louis.title.setDepth(380);

    this.survivorIndex = 0;
    this.updateSurvivorSelection();
  }

  createDifficulties() {
    this.difficulties = ["beginner", "normal", "expert", "insane"];

    this.beginner = this.add.image(100, 560, 'beginnerPhoto');
    this.normal = this.add.image(285, 560, 'normalPhoto');
    this.expert = this.add.image(485, 560, 'expertPhoto');
    this.insane = this.add.image(668, 560, 'insanePhoto');
    this.beginner.setDepth(560);
    this.normal.setDepth(560);
    this.expert.setDepth(560);
    this.insane.setDepth(560);

    var textStyle = {fontStyle: 'bold', fontSize: '24px', fill: '#24281F'};
    this.beginner["title"] = this.add.text(75, 640, 'Beginner', textStyle);
    this.normal["title"] = this.add.text(260, 640, 'Normal', textStyle);
    this.expert["title"] = this.add.text(440, 640, 'Expert', textStyle);
    this.insane["title"] = this.add.text(630, 640, 'Insane', textStyle);
    this.beginner.title.setDepth(640);
    this.normal.title.setDepth(640);
    this.expert.title.setDepth(640);
    this.insane.title.setDepth(640);

    this.difficultyIndex = 1;
    this.updateDifficultySelection();
  }

  createZombies() {
    // zombie
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNames('zombie', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'zombie-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    });

    var x = config.width + 16;
    var y = Math.random() * config.height;
    this.addZombie(x, y);

    this.timeout();
  }

  timeout() {
    this.timeoutVar = setTimeout(function () {
      var x = config.width + 16;
      var y = Math.random() * config.height;
      this.addZombie(x, y);
      this.timeout();
    }.bind(this), 1000 + Math.floor(Math.random()*3000));
  }

  create() {
    clearInterval(this.loadingInterval);
    this.loadingText.destroy();

    this.createMusic();
    this.createBackground();
    this.createTexts();
    this.createSurvivors();
    this.createDifficulties();
    this.createZombies();

    this.input.keyboard.on('keydown_ENTER', function() {
      if(this.titleIndex == 0){
        this.titleIndex += 1;
        this.survivorText.setTint(0x000000);
        this.difficultyText.setTint(0xFF0000);
        this.updateDifficultySelection();
      } else {
        window.selectedName = this.survivors[this.survivorIndex];
        window.selectedDifficulty = this.difficultyIndex + 1;
        clearTimeout(this.timeoutVar);
        this.menuMusic.stop();
        this.scene.remove(this);
        this.scene.add('gameScene', GameScene, true);
      }
    }, this);

    this.input.keyboard.on('keydown_LEFT', function() {
      this.moveSelectionLeft();
    }, this);

    this.input.keyboard.on('keydown_RIGHT', function() {
      this.moveSelectionRight();
    }, this);
  }

  addZombie(x, y) {
    var zombie = this.physics.add.sprite(x, y, 'zombie');
    zombie.anims.play('walk');
    zombie.setVelocity(-16 + (Math.floor(Math.random()*-16*3)),0);
    zombie.setDepth(y);
    zombie.setScale(4);
  }

  updateSurvivorSelection() {
    var selectedName = this.survivors[this.survivorIndex];
    for(var i=0; i<this.survivors.length; i++) {
      var name = this.survivors[i];
      if(name == selectedName) {
        this[name].setTint(0xFFFFFF);
        this[name].weapon.setTint(0xFFFFFF);
        this[name].title.setTint(0xFFFFFF);
      } else {
        this[name].setTint(0x333333);
        this[name].weapon.setTint(0x333333);
        this[name].title.setTint(0x333333);
      }
    };
  }

  updateDifficultySelection() {
    var selectedDifficulty = this.difficulties[this.difficultyIndex];
    for(var i=0; i<this.difficulties.length; i++) {
      var difficulty = this.difficulties[i];
      if(difficulty == selectedDifficulty) {
        this[difficulty].setTint(0xFFFFFF);
        this[difficulty].title.setTint(0xFFFFFF);
      } else {
        this[difficulty].setTint(0x333333);
        this[difficulty].title.setTint(0x333333);
      }
    };
  }

  modulo(x,n) {
      return ((x%n)+n)%n;
  }

  moveSelectionRight() {
    if(this.titleIndex == 0) {
      this.survivorIndex = this.modulo((this.survivorIndex + 1), this.survivors.length);
      this.updateSurvivorSelection();
    } else {
      this.difficultyIndex = this.modulo((this.difficultyIndex + 1), this.difficulties.length);
      this.updateDifficultySelection();
    }
  }

  moveSelectionLeft() {
    if(this.titleIndex == 0) {
      this.survivorIndex = this.modulo((this.survivorIndex - 1), this.survivors.length);
      this.updateSurvivorSelection();
    } else {
      this.difficultyIndex = this.modulo((this.difficultyIndex - 1), this.difficulties.length);
      this.updateDifficultySelection();
    }
  }
}
