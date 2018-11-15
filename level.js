class Level {
  constructor(scene) {
    this.scene = scene;

    var levelCreator = new LevelCreator();
    this.tilemap = scene.make.tilemap({
      tileWidth: 16, tileHeight: 16,
      width: levelCreator.w, height: levelCreator.h
    });
    this.tileset = this.tilemap.addTilesetImage('level');

    this.groundLayer = this.tilemap.createBlankDynamicLayer('ground', this.tileset);
    this.objectsLayer = this.tilemap.createBlankDynamicLayer('objects', this.tileset);
    this.shadowsLayer = this.tilemap.createBlankDynamicLayer('shadows', this.tileset);
    this.obstaclesLayer = this.tilemap.createBlankDynamicLayer('obstacles', this.tileset);
    this.triggersLayer = this.tilemap.createBlankDynamicLayer('triggers', this.tileset);

    if(!window.mobilecheck()) {
      this.groundLayer.setPipeline('Light2D');
      this.objectsLayer.setPipeline('Light2D');
      this.shadowsLayer.setPipeline('Light2D');
      this.obstaclesLayer.setPipeline('Light2D');
      this.triggersLayer.setPipeline('Light2D');
    }

    levelCreator.getLayer("ground").matrix.forEach(function (value, index, matrix) {
      this.groundLayer.putTileAt(value, index[1], index[0]);
    }.bind(this))

    levelCreator.getLayer("objects").matrix.forEach(function (value, index, matrix) {
      this.objectsLayer.putTileAt(value, index[1], index[0]);
    }.bind(this))

    levelCreator.getLayer("shadows").matrix.forEach(function (value, index, matrix) {
      this.shadowsLayer.putTileAt(value, index[1], index[0]);
    }.bind(this))

    levelCreator.getLayer("obstacles").matrix.forEach(function (value, index, matrix) {
      this.obstaclesLayer.putTileAt(value, index[1], index[0]);
    }.bind(this))

    levelCreator.getLayer("triggers").matrix.forEach(function (value, index, matrix) {
      this.triggersLayer.putTileAt(value, index[1], index[0]);
    }.bind(this))

    //this.shadowsLayer.setDepth(1000);
    this.shadowsLayer.setAlpha(0.5);
    this.obstaclesLayer.setCollisionBetween(0,400);
    this.obstaclesLayer.setDepth(1000);
    this.triggersLayer.setVisible(false);

    if(!window.mobilecheck())
      this.setupLights();
  }

  setupLights() {
    this.groundLayer.forEachTile(function(tile) {
      if(tile.index == 41)
        this.scene.myLights.addLight(tile.getCenterX(), tile.getCenterY())
    }.bind(this));
  }

  getStartPoints() {
    var starts = [];
    this.triggersLayer.filterTiles(function(tile){
      if(tile.index == 120) {
        var point = new Phaser.Math.Vector2(tile.getCenterX(), tile.getCenterY());
        starts.push(point);
      }
    }, this);
    return starts;
  }

  getAllSpawns() {
    var spawns = [];
    this.groundLayer.filterTiles(function(tile){
      if(tile.index != 81 && tile.index != -1) {
        var point = new Phaser.Math.Vector2(tile.getCenterX(), tile.getCenterY());
        spawns.push(point);
      }
    }, this);
    return spawns;
  }

  getSpawns(playerCoord, minRange, maxRange) {
    var spawns = [];
    var minCircle = new Phaser.Geom.Circle(playerCoord.x, playerCoord.y, minRange);
    var maxCircle = new Phaser.Geom.Circle(playerCoord.x, playerCoord.y, maxRange);
    this.groundLayer.filterTiles(function(tile){
      if(tile.index != 81 && tile.index != -1) {
        var tileCoord = new Phaser.Math.Vector2(tile.getCenterX(), tile.getCenterY());
        var insideMinCircle = minCircle.contains(tileCoord.x, tileCoord.y);
        var insideMaxCircle = maxCircle.contains(tileCoord.x, tileCoord.y);
        if(insideMaxCircle && !insideMinCircle) {
          var point = new Phaser.Math.Vector2(tile.getCenterX(), tile.getCenterY());
          spawns.push(point);
        }
      }
    }, this);
    return spawns;
  }

  getTilesAround(coord) {
    var rect = new Phaser.Geom.Rectangle(coord.x-16*2, coord.y-16*2, 16*5, 16*5);
    var tiles = this.groundLayer.getTilesWithinWorldXY(rect.x, rect.y, rect.width, rect.height);
    tiles.splice(12, 1);
    return tiles;
  }

  getObjectAt(point) {
    var tile = this.objectsLayer.getTileAtWorldXY(point.x, point.y);
    if(tile && tile.index != -1) {
      return tile;
    } else {
      return null;
    }
  }

  getClosestHealthKit(point) {
    var healthkitTiles = this.objectsLayer.filterTiles(function(tile){
      return tile.index == 100;
    });

    var distanceToHealthkit = 10000;
    var chosenTile = null;
    healthkitTiles.forEach(function(tile) {
      var tileCoord = new Phaser.Math.Vector2(tile.getCenterX(), tile.getCenterY());
      var distance = tileCoord.distance(point);
      if(distance < distanceToHealthkit) {
        distanceToHealthkit = distance;
        chosenTile = tile;
      }
    }.bind(this));

    return new Phaser.Math.Vector2(chosenTile.getCenterX(), chosenTile.getCenterY());
  }

  getCoordBeforeObstacleFromAtoB(a, b) {
    var line = new Phaser.Geom.Line(a.x, a.y, b.x, b.y);
    var obstacles = this.obstaclesLayer.getTilesWithinShape(line, {isNotEmpty: true});
    if(obstacles && obstacles.length > 0) {
      var points = line.getPoints(0, 16);
      var firstObstacle;
      var distance = 10000;
      obstacles.forEach(function(obstacle) {
        var obstacleCoord = new Phaser.Math.Vector2(obstacle.getCenterX(), obstacle.getCenterY());
        var obstacleDistance = obstacleCoord.distance(a);

        if(obstacleDistance < distance) {
          distance  = obstacleDistance;
          firstObstacle = obstacle;
        }
      }.bind(this));

      var firstObstacleCoord = new Phaser.Math.Vector2(firstObstacle.getCenterX(), firstObstacle.getCenterY());
      for(var i=0; i< points.length; i++) {
        if(firstObstacleCoord.distance(new Phaser.Math.Vector2(points[i].x, points[i].y)) < 24) {
          return points[i];
        }
      }
    } else {
      // no obstacles
      return b;
    }
  }
}
