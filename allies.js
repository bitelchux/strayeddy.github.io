class Allies {
  constructor(scene) {
    this.scene = scene;

    var allies = [
      { name:'bill', weaponName:'shotgun' },
      { name:'zoey', weaponName:'uzi' },
      { name:'francis', weaponName:'rifle' },
      { name:'louis', weaponName:'pistols' }
    ];

    var chosenAlly = allies.filter(item => item.name === window.selectedName)[0];
    allies = allies.filter(item => item.name !== window.selectedName);

    var startPoints = this.scene.level.getStartPoints();

    this.player = new Player(this.scene, startPoints[0].x, startPoints[0].y, chosenAlly.name, chosenAlly.weaponName, 0xCB904D);
    this.ally1 = new Ally(this.scene, startPoints[1].x, startPoints[1].y, allies[0].name, allies[0].weaponName, 0xFFFFFF);
    this.ally2 = new Ally(this.scene, startPoints[2].x, startPoints[2].y, allies[1].name, allies[1].weaponName, 0xFFFFFF);
    this.ally3 = new Ally(this.scene, startPoints[3].x, startPoints[3].y, allies[2].name, allies[2].weaponName, 0xFFFFFF);

    this.group = [];
    this.group.push(this.player);
    this.group.push(this.ally1);
    this.group.push(this.ally2);
    this.group.push(this.ally3);

    this.setupLights();
    this.setupColliders();
    this.setupHelpEvents();
  }

  setupLights() {
    this.group.forEach(function(ally) {
      this.scene.myLights.addOwnerLight(ally);
    }.bind(this));
  }

  setupColliders() {
    this.group.forEach(function(ally) {
      this.scene.physics.add.collider(ally, this.scene.level.obstaclesLayer);
    }.bind(this));
  }

  setupHelpEvents() {
    for(var i=0; i<this.group.length; i++) {
      var ally = this.group[i];
      ally.on("askHelp", function(allyAsking) {
        for(var j=0; j<this.group.length; j++) {
          var allyHelping = this.group[j];
          if(allyAsking.name != allyHelping.name) {
            allyHelping.calledForHelp(allyAsking);
          }
        }
      }.bind(this));
    }
  }

  update() {
    this.group.forEach(function(ally) {
      ally.update();
    });

    if(this.areAtEndPosition()) {
      this.scene.end();
    }
  }

  clear() {
    this.group.forEach(function(ally) {
      ally.destroy();
    });
    this.player = null;
    this.ally1 = null;
    this.ally2 = null;
    this.ally3 = null;
  }

  removeAlly(ally) {
    this.group.splice(this.group.indexOf(ally), 1);
  }

  getClosestAllyTo(coord) {
    var distance = 100000;
    var chosenAlly;
    this.group.forEach(function(ally) {
      var allyCoord = ally.getCenter();
      var allyDistance = allyCoord.distance(coord);
      if(allyDistance < distance) {
        distance = allyDistance;
        chosenAlly = ally;
      }
    })
    return chosenAlly;
  }

  getWeakestAlly() {
    var totalhp = 401;
    var chosenAlly;
    this.group.forEach(function(ally) {
      var totalhpAlly = ally.healthbar.hp + ally.healthbar.extrahp;
      if(totalhpAlly < totalhp) {
        totalhp = totalhpAlly;
        chosenAlly = ally;
      }
    })
    return chosenAlly;
  }

  getStrongestAlly() {
    var totalhp = 0;
    var chosenAlly;
    this.group.forEach(function(ally) {
      var totalhpAlly = ally.healthbar.hp + ally.healthbar.extrahp;
      if(totalhpAlly > totalhp) {
        totalhp = totalhpAlly;
        chosenAlly = ally;
      }
    })
    return chosenAlly;
  }

  getAlly(name) {
    var chosenAlly;
    this.group.forEach(function(ally) {
      if(ally.name == name)
        chosenAlly = ally;
    });
    return chosenAlly;
  }

  getAlliesAround(point, radius) {
    var allies = [];
    var circle = new Phaser.Geom.Circle(point.x, point.y, radius);
    this.group.forEach(function(ally) {
      if(circle.contains(ally.x, ally.y)) {
        allies.push(ally);
      }
    });
    return allies;
  }

  areAtStartPosition() {
    return this.group.every(function(ally) {
      var tile = this.scene.level.triggersLayer.getTileAtWorldXY(ally.x, ally.y);
      return (tile && tile.index == 121);
    });
  }

  areAtEndPosition() {
    return this.group.every(function(ally) {
      var tile = this.scene.level.triggersLayer.getTileAtWorldXY(ally.x, ally.y);
      return (tile && tile.index == 122);
    }.bind(this));
  }
}
