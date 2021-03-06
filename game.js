class GameScene extends Phaser.Scene {

  createAnims() {
    // bullet
    this.anims.create({
      key: 'bullet-fired',
      frames: this.anims.generateFrameNames('bullet', {
        start: 1, end: 3, zeroPad: 0,
        prefix: 'bullet-', suffix: '.png'
      }),
      frameRate: 24
    });

    // bill
    this.anims.create({
      key: 'bill-walk-left-down',
      frames: this.anims.generateFrameNames('bill', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'bill-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'bill-walk-left-up',
      frames: this.anims.generateFrameNames('bill', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'bill-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    // louis
    this.anims.create({
      key: 'louis-walk-left-down',
      frames: this.anims.generateFrameNames('louis', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'louis-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'louis-walk-left-up',
      frames: this.anims.generateFrameNames('louis', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'louis-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    // zoey
    this.anims.create({
      key: 'zoey-walk-left-down',
      frames: this.anims.generateFrameNames('zoey', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'zoey-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'zoey-walk-left-up',
      frames: this.anims.generateFrameNames('zoey', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'zoey-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    // francis
    this.anims.create({
      key: 'francis-walk-left-down',
      frames: this.anims.generateFrameNames('francis', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'francis-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'francis-walk-left-up',
      frames: this.anims.generateFrameNames('francis', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'francis-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    // impact
    this.anims.create({
      key: 'impact-anim',
      frames: this.anims.generateFrameNames('impact', {
        start: 1, end: 3, zeroPad: 0,
        prefix: 'impact-', suffix: '.png'
      }),
      frameRate: 12
    });

    // rock
    this.anims.create({
      key: 'rock-anim',
      frames: this.anims.generateFrameNames('rock', {
        start: 1, end: 5, zeroPad: 0,
        prefix: 'rock-', suffix: '.png'
      }),
      frameRate: 6
    });

    // zombie
    this.anims.create({
      key: 'zombie-walk-left-down',
      frames: this.anims.generateFrameNames('zombie', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'zombie-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'zombie-walk-left-up',
      frames: this.anims.generateFrameNames('zombie', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'zombie-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    // boomer
    this.anims.create({
      key: 'boomer-walk-left-down',
      frames: this.anims.generateFrameNames('boomer', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'boomer-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'boomer-walk-left-up',
      frames: this.anims.generateFrameNames('boomer', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'boomer-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'boomer-explode',
      frames: this.anims.generateFrameNames('boomer', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'boomer-explode-', suffix: '.png'
      }),
      frameRate: 4
    });

    // hunter
    this.anims.create({
      key: 'hunter-walk-left-down',
      frames: this.anims.generateFrameNames('hunter', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'hunter-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'hunter-walk-left-up',
      frames: this.anims.generateFrameNames('hunter', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'hunter-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    // smoker
    this.anims.create({
      key: 'smoker-walk-left-down',
      frames: this.anims.generateFrameNames('smoker', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'smoker-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'smoker-walk-left-up',
      frames: this.anims.generateFrameNames('smoker', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'smoker-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    // tank
    this.anims.create({
      key: 'tank-walk-left-down',
      frames: this.anims.generateFrameNames('tank', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'tank-walk-left-down-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });
    this.anims.create({
      key: 'tank-walk-left-up',
      frames: this.anims.generateFrameNames('tank', {
        start: 1, end: 2, zeroPad: 0,
        prefix: 'tank-walk-left-up-', suffix: '.png'
      }),
      frameRate: 6,
      yoyo: true
    });

    //grenade
    this.anims.create({
      key: 'grenade-explosion',
      frames: this.anims.generateFrameNumbers('grenade', {start:0, end:3}),
      frameRate: 6
    });

    //help sign
    this.anims.create({
      key: 'helpsign-anim',
      frames: this.anims.generateFrameNumbers('helpsign', {start:0, end:3}),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    });
  }

  createAudio() {
    this.sounds = {};

    //background music
    this.sounds["music"] = this.sound.add('musicSound', {volume: 0.5, loop: true});

    //weapons
    this.sounds["pistols"] = this.sound.add('pistolsSound');
    this.sounds["shotgun"] = this.sound.add('shotgunSound');
    this.sounds["uzi"] = this.sound.add('uziSound');
    this.sounds["rifle"] = this.sound.add('rifleSound');
    this.sounds["grenade"] = this.sound.add('grenadeSound');

    //reloading
    this.sounds["reloading"] = this.sound.add('reloadingSound');

    //walking
    this.sounds["walking"] = this.sound.add('walkingSound');

    //zombie
    this.sounds["zombie"] = [];
    for(var i=0; i<9; i++){
      this.sounds.zombie[i] = this.sound.add('zombie'+ (i+1) +'Sound');
    }
    this.sounds["zombiefast"] = [];
    for(var i=0; i<5; i++){
      this.sounds.zombiefast[i] = this.sound.add('zombiefast'+ (i+1) +'Sound');
    }
    this.sounds["zombiewave"] = this.sound.add('zombiewaveSound');

    //boomer
    this.sounds["boomermusic"] = this.sound.add('boomermusicSound');
    this.sounds["boomerexplode"] = this.sound.add('boomerexplodeSound');
    this.sounds["boomercry"] = this.sound.add('boomercrySound');
    this.sounds["boomerattack"] = [];
    for(var i=0; i<3; i++){
      this.sounds.boomerattack[i] = this.sound.add('boomerattack'+ (i+1) +'Sound');
    }

    //hunter
    this.sounds["huntermusic"] = this.sound.add('huntermusicSound');
    this.sounds["hunterjump"] = this.sound.add('hunterjumpSound', {volume: 0.5});
    this.sounds["huntercry"] = this.sound.add('huntercrySound');
    this.sounds["hunterattack"] = [];
    for(var i=0; i<3; i++){
      this.sounds.hunterattack[i] = this.sound.add('hunterattack'+ (i+1) +'Sound');
    }

    //smoker
    this.sounds["smokermusic"] = this.sound.add('smokermusicSound');
    this.sounds["smokerdrag"] = this.sound.add('smokerdragSound');
    this.sounds["smokercry"] = this.sound.add('smokercrySound');
    this.sounds["smokerattack"] = [];
    for(var i=0; i<3; i++){
      this.sounds.smokerattack[i] = this.sound.add('smokerattack'+ (i+1) +'Sound');
    }

    //tank
    this.sounds["tankmusic"] = this.sound.add('tankmusicSound');
    this.sounds["tankwalk"] = this.sound.add('tankwalkSound');
    this.sounds["tankattack"] = [];
    for(var i=0; i<3; i++){
      this.sounds.tankattack[i] = this.sound.add('tankattack'+ (i+1) +'Sound');
    }
    this.sounds["tankpickrock"] = this.sound.add('tankpickrockSound');
    this.sounds["tankthrow"] = this.sound.add('tankthrowSound');
    this.sounds["tankrockexplode"] = this.sound.add('tankrockexplodeSound');

    // change music function
    this.sounds["changeMusic"] = function(newMusic) {
      this.sounds.music.pause();
      this.sounds[newMusic].play();

      this.sounds[newMusic].on('ended', function(music){
        this.sounds.music.resume();
      }, this);
      this.sounds[newMusic].on('stop', function(music){
        this.sounds.music.resume();
      }, this);
    }.bind(this);
  }

  create() {
    this.createAnims();
    this.createAudio();
    this.createStats();

    if(window.mobilecheck())
      this.createGamepad();

    this.sounds.music.play();

    if(!window.mobilecheck())
      this.myLights = new Lights(this);

    this.level = new Level(this);
    this.allies = new Allies(this);
    this.enemies = new Enemies(this);
    this.bullets = new Bullets(this);
    this.aidirector = new AIDirector(this, this.allies, this.enemies);

    this.camera = this.cameras.main;
    this.camera.startFollow(this.allies.player, true, 0.02);
    this.camera.setZoom(3);

    this.isBeingRemoved = false;

    this.input.keyboard.on('keydown_ESC', function(){
      this.sounds.music.stop();
      this.isBeingRemoved = true;
      this.scene.remove(this);
      this.scene.add('menuScene', MenuScene, true);;
    }, this);

    this.input.keyboard.on('keydown_ENTER', function(){
      this.sounds.music.stop();
      this.isBeingRemoved = true;
      this.scene.remove(this);
      this.scene.add('endScene', EndScene, true);
    }, this);
  }

  createStats() {
    window.gameplayStats = {
      startGameTime: Date.now(),
      bill: {
        name: 'bill',
        isPlayer: false,
        nbTimesIncapacited: 0,
        nbFirstAidKitsUsed: 0,
        nbZombiesKilled: 0,
        nbBoomersKilled: 0,
        nbHuntersKilled: 0,
        nbSmokersKilled: 0,
        nbDamageTaken: 0,
        nbRevivedTeammate: 0,
        nbBulletsFired: 0,
        nbBulletsHit: 0
      },
      louis: {
        name: 'louis',
        isPlayer: false,
        nbTimesIncapacited: 0,
        nbFirstAidKitsUsed: 0,
        nbZombiesKilled: 0,
        nbBoomersKilled: 0,
        nbHuntersKilled: 0,
        nbSmokersKilled: 0,
        nbDamageTaken: 0,
        nbRevivedTeammate: 0,
        nbBulletsShot: 0,
        nbBulletsHit: 0
      },
      zoey: {
        name: 'zoey',
        isPlayer: false,
        nbTimesIncapacited: 0,
        nbFirstAidKitsUsed: 0,
        nbZombiesKilled: 0,
        nbBoomersKilled: 0,
        nbHuntersKilled: 0,
        nbSmokersKilled: 0,
        nbDamageTaken: 0,
        nbRevivedTeammate: 0,
        nbBulletsShot: 0,
        nbBulletsHit: 0
      },
      francis: {
        name: 'francis',
        isPlayer: false,
        nbTimesIncapacited: 0,
        nbFirstAidKitsUsed: 0,
        nbZombiesKilled: 0,
        nbBoomersKilled: 0,
        nbHuntersKilled: 0,
        nbSmokersKilled: 0,
        nbDamageTaken: 0,
        nbRevivedTeammate: 0,
        nbBulletsShot: 0,
        nbBulletsHit: 0
      },
    };
  }

  createGamepad() {
    this.gamepad = new VirtualGamepad(this);
  }

  update(time, delta) {
    if(!this.isBeingRemoved) {
      this.allies.update();
      this.aidirector.update(time, delta);
      if(!window.mobilecheck())
        this.myLights.update();
    }
  }

  end() {
    this.allies.clear();
    this.enemies.clear();

    // clear all timeouts
    window.timeouts.forEach(function(t){
      window.clearTimeout(t);
    });

    // clear all intervals
    window.intervals.forEach(function(i){
      window.clearInterval(i);
    });

    this.sounds.music.stop();
    this.isBeingRemoved = true;

    this.scene.remove(this);
    if(!this.scene.get('endScene')) {
      this.scene.add('endScene', EndScene, true);
    }
  }
}
