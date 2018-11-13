window.TILE = {
  CEILING: 0,
  CEILING_SIDE:20,
  WALL: 40,
  WALL_SAFE: 122,
  FLOOR: 60,
  FLOOR_1: 42,
  FLOOR_2: 43,
  FLOOR_START: 120,
  FLOOR_END: 121,
  FLOOR_SAFE: 80,
  ROAD: 61,
  GRASS: 1,
  HEALTHKIT: 100,
  SHADOW_CORNER: 21,
  SHADOW_LEFT: 22,
  SHADOW_UP: 23
};

class LevelCreator {

  constructor() {
    this.w = 200;
    this.h = 100;

    this.layers = this.buildBlankLayers();
    this.buildings = this.addBuildings();
    this.roads = this.addRoads();
    this.addGrass();
    this.addHealthKits(4);

    this.addShadows();
    // this.showLayer("obstacles");
    // this.show(false);
  }

  buildBlankLayers() {
    var groundLayer = {
      name: "ground", matrix: math.multiply(math.ones(this.h, this.w), -1)
    };
    var objectsLayer = {
      name: "objects", matrix: math.multiply(math.ones(this.h, this.w), -1)
    };
    var shadowsLayer = {
      name: "shadows", matrix: math.multiply(math.ones(this.h, this.w), -1)
    };
    var obstaclesLayer = {
      name: "obstacles", matrix: math.multiply(math.ones(this.h, this.w), -1)
    };
    var triggersLayer = {
      name: "triggers", matrix: math.multiply(math.ones(this.h, this.w), -1)
    };

    return [groundLayer, objectsLayer, shadowsLayer, obstaclesLayer, triggersLayer];
  }

  addBuildings() {
    var buildings = [];

    var x = Math.round(Math.random()*this.w/16);
    var y = Math.round(Math.random()*this.h/3);
    buildings.push(this.addBuildingAt(x, y, 10, false, true));

    x = Math.round(this.w*5/16) + Math.round(Math.random()*this.w/16);
    y = Math.round(Math.random()*this.h/3);
    buildings.push(this.addBuildingAt(x, y, 10, true, true));

    x = Math.round(this.w*11/16) + Math.round(Math.random()*this.w/16);
    y = Math.round(Math.random()*this.h/3);
    buildings.push(this.addBuildingAt(x, y, 10, true, false));

    var groundLayer = this.getLayer("ground");
    var obstaclesLayer = this.getLayer("obstacles");
    obstaclesLayer.matrix.forEach(function (value, index, matrix) {
      if(index[0] < matrix.size()[0]-1) {
        var belowValue = obstaclesLayer.matrix.subset(math.index(index[0]+1, index[1]));
        if(value == window.TILE.CEILING && belowValue == -1) {
          obstaclesLayer.matrix.subset(math.index(index[0], index[1]), window.TILE.CEILING_SIDE);
          var groundValue = groundLayer.matrix.subset(math.index(index[0]+1, index[1]));
          if(groundValue == window.TILE.FLOOR) {
            groundLayer.matrix.subset(math.index(index[0]+1, index[1]), window.TILE.WALL);
          } else if(groundValue == window.TILE.FLOOR_SAFE) {
            groundLayer.matrix.subset(math.index(index[0]+1, index[1]), window.TILE.WALL_SAFE);
          }
        }
      }
    })

    groundLayer.matrix.forEach(function (value, index, matrix) {
      if(value == window.TILE.FLOOR) {
        var rand = Math.random();
        if(rand < 0.3) {
          groundLayer.matrix.subset(math.index(index[0], index[1]), window.TILE.FLOOR_1);
        } else if(rand < 0.6) {
          groundLayer.matrix.subset(math.index(index[0], index[1]), window.TILE.FLOOR_2);
        }
      }
    })

    return buildings;
  }

  addRoads() {
    var road1 = new Road(this.buildings[0].getExitInWorld(), this.buildings[1].getEntranceInWorld());
    var road2 = new Road(this.buildings[1].getExitInWorld(), this.buildings[2].getEntranceInWorld());

    this.addMatrixInLayer(road1.matrix, "ground", road1.x, road1.y);
    this.addMatrixInLayer(road2.matrix, "ground", road2.x, road2.y);

    var roads = [];
    roads.push(road1);
    roads.push(road2);
    return roads;
  }

  addGrass() {
    var groundLayer = this.getLayer("ground");
    var obstaclesLayer = this.getLayer("obstacles");
    groundLayer.matrix.forEach(function (value, index, matrix) {
      var obstaclesValue = obstaclesLayer.matrix.subset(math.index(index[0], index[1]));
      if(value == -1 && obstaclesValue == -1)
        obstaclesLayer.matrix.subset(math.index(index[0], index[1]), window.TILE.GRASS);
    })
  }

  addHealthKits(nbMax) {
    var groundLayer = this.getLayer("ground");
    var objectsLayer = this.getLayer("objects");
    var h = groundLayer.matrix.size()[0];
    var w = groundLayer.matrix.size()[1];

    var nbTotal = 0;
    while(nbTotal < nbMax) {
      var randomH = Math.floor(Math.random()*h);
      var randomW = Math.floor(Math.random()*w);
      var value = groundLayer.matrix.subset(math.index(randomH, randomW));
      if(value != -1) {
        objectsLayer.matrix.subset(math.index(randomH, randomW), window.TILE.HEALTHKIT);
        nbTotal += 1;
      }
    }
  }

  addShadows() {
    var groundLayer = this.getLayer("ground");
    var shadowsLayer = this.getLayer("shadows");
    var obstaclesLayer = this.getLayer("obstacles");
    groundLayer.matrix.forEach(function (value, index, matrix) {
      if(index[0] > 0 && index[1] > 0 && value != -1) {
        var upleft = obstaclesLayer.matrix.subset(math.index(index[0]-1, index[1]-1));
        var up = groundLayer.matrix.subset(math.index(index[0]-1, index[1]));
        /*if(upleft == window.TILE.CEILING && (up == window.TILE.WALL || up == window.TILE.WALL_SAFE)) {
          shadowsLayer.matrix.subset(math.index(index[0]-1, index[1]), window.TILE.SHADOW_CORNER);
        } else*/
        if(upleft == window.TILE.CEILING || upleft == window.TILE.CEILING_SIDE) {
          shadowsLayer.matrix.subset(math.index(index[0], index[1]), window.TILE.SHADOW_LEFT);
        }
        if(up == window.TILE.WALL || up == window.TILE.WALL_SAFE) {
          shadowsLayer.matrix.subset(math.index(index[0]-1, index[1]), window.TILE.SHADOW_UP);
        }
      }
    })
  }

  addBuildingAt(x, y, nbRooms, hasEntrance = false, hasExit = false) {
    var building = new Building(x, y, nbRooms, hasEntrance, hasExit);
    var groundMatrix = math.multiply(math.ones(building.matrix.size()[0], building.matrix.size()[1]), -1);
    var obstaclesMatrix = groundMatrix.clone();
    var triggersMatrix = groundMatrix.clone();
    building.matrix.forEach(function (value, index, matrix) {
      if(value == window.TILE.FLOOR) {
        groundMatrix.subset(math.index(index[0], index[1]), value);
        obstaclesMatrix.subset(math.index(index[0], index[1]), -1);
      } else if (value == window.TILE.CEILING) {
        groundMatrix.subset(math.index(index[0], index[1]), -1);
        obstaclesMatrix.subset(math.index(index[0], index[1]), value);
      } else if (value == window.TILE.FLOOR_START || value == window.TILE.FLOOR_END) {
        groundMatrix.subset(math.index(index[0], index[1]), window.TILE.FLOOR_SAFE);
        triggersMatrix.subset(math.index(index[0], index[1]), value);
      }
    });
    this.addMatrixInLayer(groundMatrix, "ground", x, y);
    this.addMatrixInLayer(obstaclesMatrix, "obstacles", x, y);
    this.addMatrixInLayer(triggersMatrix, "triggers", x, y);

    return building;
  }

  getLayer(layerName) {
    return this.layers.filter(function(item) { return item.name === layerName; })[0];
  }

  addMatrixInLayer(matrix, layerName, x, y) {
    var layer = this.getLayer(layerName);
    matrix.forEach(function (value, index, matrix) {
      if(value != -1)
        layer.matrix.subset(math.index(index[0] + y, index[1] + x), value);
    })
  }

  showLayer(layerName) {
    var layer = this.getLayer(layerName);
    console.log("\n");
    layer.matrix._data.forEach(function(row) {
      var msg = ""
      row.forEach(function(col) {
        msg += (col == -1) ? "...._...." : "...." + col + "....";
      });
      console.log(msg);
    });
    console.log("\n");
  }

  show(withoutGrass = true) {
    var fullMatrix = math.multiply(math.ones(this.layers[0].matrix.size()[0], this.layers[0].matrix.size()[1]), -1);

    for(var l=this.layers.length-1; l>=0; l--) {
      this.layers[l].matrix.forEach(function (value, index, matrix) {
        if(fullMatrix.subset(math.index(index[0], index[1])) == -1) {
          fullMatrix.subset(math.index(index[0], index[1]), value);
        }
      })
    }

    fullMatrix._data.forEach(function(row) {
      var msg = "";
      row.forEach(function(col) {
        if(withoutGrass) {
          msg += (col == -1 || col == window.TILE.GRASS) ? "...._...." : "...." + col + "....";
        } else {
          msg += (col == -1) ? "...._...." : "...." + col + "....";
        }
      }.bind(this));
      console.log(msg);
    }.bind(this));
    console.log("\n");
  }
}

class Building {

  constructor(x, y, nbRooms, hasEntrance = false, hasExit = false) {
    this.x = x;
    this.y = y;
    this.nbRooms = nbRooms;
    this.hasEntrance = hasEntrance;
    this.hasExit = hasExit;
    this.entrance;
    this.exit;

    this.rooms = [];
    this.buildRooms();
  }

  getEntranceInWorld() {
    if(this.hasEntrance) {
      return {x: this.x + this.entrance.x,
        y: this.y + this.entrance.y,
        direction: this.entrance.direction};
    } else {
      return null;
    }
  }

  getExitInWorld() {
    if(this.hasExit) {
      return {x: this.x + this.exit.x,
        y: this.y + this.exit.y,
        direction: this.exit.direction};
    } else {
      return null;
    }
  }

  buildRooms() {
    // first room
    var doorR, doorD, doorL, doorU;
    doorR = {value:false};
    doorD = {value:false};
    doorL = {value:false};
    doorU = {value:false};

    this.chooseDoors(1, [doorR, doorD, doorL, doorU]);
    var room = new Room(7, 7, doorR.value, doorD.value, doorL.value, doorU.value);
    this.rooms.push(room);
    this.matrix = room.matrix.clone();

    this.addRoomAtDoor(this.getAnExitDoor());

    if(this.hasEntrance) {
      this.createExitDoor(false);
    }
    if(this.hasExit) {
      this.createExitDoor();
    }

    if(this.hasExit && !this.hasEntrance) {
      this.createStartSafe();
    } else if(!this.hasExit && this.hasEntrance) {
      this.createEndSafe();
    }
  }

  chooseDoors(nbDoors, doorBooleans) {
    var nbChosenDoors = 0;
    while(nbChosenDoors < nbDoors) {
      var doorBoolean = doorBooleans[Math.floor(Math.random()*doorBooleans.length)];
      doorBoolean.value = true;
      nbChosenDoors += 1;
    }
  }

  addRoomAtDoor(door) {
    this.nbRooms -= 1;

    var randW = 4 + Math.floor(Math.random()*10);
    var randH = 4 + Math.floor(Math.random()*10);

    var doorR, doorD, doorL, doorU;
    doorR = {value:false};
    doorD = {value:false};
    doorL = {value:false};
    doorU = {value:false};

    var nbDoors = 1 + (Math.floor(Math.random()*3)) % 2;

    switch(door.direction) {
      case "R":
        this.chooseDoors(nbDoors, [doorR, doorD, doorU]);
        break;
      case "L":
        this.chooseDoors(nbDoors, [doorD, doorL, doorU]);
        break;
      case "U":
        this.chooseDoors(nbDoors, [doorR, doorL, doorU]);
        break;
      case "D":
        this.chooseDoors(nbDoors, [doorR, doorL, doorD]);
        break;
    }

    var overlapping = true;
    var room;
    while(overlapping) {
      room = new Room(randW, randH, doorR.value, doorD.value, doorL.value, doorU.value);

      // find where to put new room's upperleft side in the door
      var roomX;
      var roomY;

      switch(door.direction) {
        case "R":
        roomX = door.x;
        roomY = door.y - 1;
        break;
        case "L":
        roomX = door.x - room.rect.width + 1;
        roomY = door.y - 1;
        break;
        case "U":
        roomX = door.x - 1;
        roomY = door.y - room.rect.height + 1;
        break;
        case "D":
        roomX = door.x - 1;
        roomY = door.y;
        break;
      }

      room.setXY(roomX, roomY);

      overlapping = this.rooms.some(function(someRoom) {
        return Phaser.Geom.Rectangle.Overlaps(room, someRoom);
      });
    }

    this.rooms.push(room);

    // resize matrix to fit new blended room
    var totalH = this.matrix.size()[0];
    var totalW = this.matrix.size()[1];

    if(roomY < 0) {
      totalH = totalH -1*roomY;
      var newMatrix = math.multiply(math.ones(totalH, totalW), -1);
      this.matrix.forEach(function (value, index, matrix) {
        newMatrix.subset(math.index(index[0] -1*roomY, index[1]), value);
      })
      this.matrix = newMatrix;
      roomY = 0;
    }

    if(roomX < 0) {
      totalW = totalW -1*roomX;
      var newMatrix = math.multiply(math.ones(totalH, totalW), -1);
      newMatrix.resize([totalH, totalW], -1);
      this.matrix.forEach(function (value, index, matrix) {
        newMatrix.subset(math.index(index[0], index[1] -1*roomX), value);
      }.bind(this))
      this.matrix = newMatrix;
      roomX = 0;
    }

    if(roomY + room.rect.height > totalH) {
      totalH = roomY + room.rect.height;
      this.matrix.resize([totalH, totalW], -1);
    }

    if(roomX + room.rect.width > totalW) {
      totalW = roomX + room.rect.width;
      this.matrix.resize([totalH, totalW], -1);
    }

    // blend room inside existing level indexes
    for(var r = roomY; r < roomY + room.rect.height; r++) {
      for(var c = roomX; c < roomX + room.rect.width; c++) {
        var oldValue = this.matrix.subset(math.index(r,c));
        if(oldValue == -1) {
          var newValue = room.matrix.subset(math.index(r-roomY, c-roomX));
          this.matrix.subset(math.index(r,c), newValue, -1);
        }
      }
    }

    if(this.nbRooms > 0) {
      var nextDoor = this.getAnExitDoor();
      if(nextDoor) {
        this.addRoomAtDoor(nextDoor);
      }
    }
  }

  getAnExitDoor() {
    var door = null;

    for(var r=0; r<this.matrix.size()[0]-1; r++) {
      for(var c=0; c<this.matrix.size()[1]-1; c++) {

        var topLeft = this.matrix.subset(math.index(r, c));
        var topRight = this.matrix.subset(math.index(r, c+1));
        var downLeft = this.matrix.subset(math.index(r+1, c));
        var downRight = this.matrix.subset(math.index(r+1, c+1));

        if(r == 0 && topLeft == window.TILE.FLOOR && topRight == window.TILE.FLOOR) {
          door = {x:c, y:r, direction:"U"};
          r = c = Number.MAX_VALUE;
        } else if(r == this.matrix.size()[0]-2 && downLeft == window.TILE.FLOOR && downRight == window.TILE.FLOOR) {
          door = {x:c, y:r+1, direction:"D"};
          r = c = Number.MAX_VALUE;
        } else if(c == 0 && topLeft == window.TILE.FLOOR && downLeft == window.TILE.FLOOR) {
          door = {x:c, y:r, direction:"L"};
          r = c = Number.MAX_VALUE;
        } else if(c == this.matrix.size()[1]-2 && topRight == window.TILE.FLOOR && downRight == window.TILE.FLOOR) {
          door = {x:c+1, y:r, direction:"R"};
          r = c = Number.MAX_VALUE;
        } else if(topLeft == -1 && topRight == -1 && downLeft == window.TILE.FLOOR && downRight == window.TILE.FLOOR) {
          door = {x:c, y:r+1, direction:"U"};
          r = c = Number.MAX_VALUE;
        } else if(topLeft == window.TILE.FLOOR && topRight == window.TILE.FLOOR && downLeft == -1 && downRight == -1) {
          door = {x:c, y:r, direction:"D"};
          r = c = Number.MAX_VALUE;
        } else if(topLeft == window.TILE.FLOOR && topRight == -1 && downLeft == window.TILE.FLOOR && downRight == -1) {
          door = {x:c, y:r, direction:"R"};
          r = c = Number.MAX_VALUE;
        } else if(topLeft == -1 && topRight == window.TILE.FLOOR && downLeft == -1 && downRight == window.TILE.FLOOR) {
          door = {x:c+1, y:r, direction:"L"};
          r = c = Number.MAX_VALUE;
        }
      }
    }

    return door;
  }

  createExitDoor(rightDirection = true) {
    if(rightDirection) {
      for(var c=this.matrix.size()[1]-2; c>1; c--) {
        for(var r=1; r<this.matrix.size()[0]-2; r++) {

          var topLeft = this.matrix.subset(math.index(r, c));
          var downLeft = this.matrix.subset(math.index(r+1, c));
          var topRight = this.matrix.subset(math.index(r, c+1));
          var downRight = this.matrix.subset(math.index(r+1, c+1));

          if(topLeft == window.TILE.FLOOR && downLeft == window.TILE.FLOOR & topRight == window.TILE.CEILING && downRight == window.TILE.CEILING) {
            this.matrix.subset(math.index(r, c+1), window.TILE.FLOOR);
            this.matrix.subset(math.index(r+1, c+1), window.TILE.FLOOR);
            this.exit = {x:c+1, y:r, direction:"R"};
            r = Number.MAX_VALUE;
            c = 0;
          }
        }
      }
    }
    // left direction
    else {
      for(var c=0; c<this.matrix.size()[1]-2; c++) {
        for(var r=1; r<this.matrix.size()[0]-2; r++) {

          var topLeft = this.matrix.subset(math.index(r, c));
          var downLeft = this.matrix.subset(math.index(r+1, c));
          var topRight = this.matrix.subset(math.index(r, c+1));
          var downRight = this.matrix.subset(math.index(r+1, c+1));

          if(topLeft == window.TILE.CEILING && downLeft == window.TILE.CEILING & topRight == window.TILE.FLOOR && downRight == window.TILE.FLOOR) {
            this.matrix.subset(math.index(r, c), window.TILE.FLOOR);
            this.matrix.subset(math.index(r+1, c), window.TILE.FLOOR);
            this.entrance = {x:c, y:r, direction:"L"};
            r = Number.MAX_VALUE;
            c = Number.MAX_VALUE;
          }
        }
      }
    }
  }

  createStartSafe() {
    for(var size=4; size>1; size--) {
      for(var c=1; c<this.matrix.size()[1]-size; c++) {
        for(var r=1; r<this.matrix.size()[0]-size; r++) {
          var safeTiles = [];
          for(var x=0; x<size; x++) {
            for(var y=0; y<size; y++) {
              safeTiles.push(this.matrix.subset(math.index(r + y, c + x)));
            }
          }

          if(safeTiles.every(function(tile) {return tile == window.TILE.FLOOR;})) {
            for(var x=0; x<size; x++) {
              for(var y=0; y<size; y++) {
                this.matrix.subset(math.index(r + y, c + x), window.TILE.FLOOR_START);
              }
            }
            c = Number.MAX_VALUE;
            r = Number.MAX_VALUE;
            size = 0;
          }
        }
      }
    }
  }

  createEndSafe() {
    for(var size=4; size>1; size--) {
      for(var c=this.matrix.size()[1]-1-size; c>1; c--) {
        for(var r=1; r<this.matrix.size()[0]-size; r++) {

          var safeTiles = [];
          for(var x=0; x<size; x++) {
            for(var y=0; y<size; y++) {
              safeTiles.push(this.matrix.subset(math.index(r + y, c + x)));
            }
          }

          if(safeTiles.every(function(tile) {return tile == window.TILE.FLOOR;})) {
            for(var x=0; x<size; x++) {
              for(var y=0; y<size; y++) {
                this.matrix.subset(math.index(r + y, c + x), window.TILE.FLOOR_END);
              }
            }
            c = 0;
            r = Number.MAX_VALUE;
            size = 0;
          }
        }
      }
    }
  }

  show() {
    console.log("\n");
    this.matrix._data.forEach(function(row) {
      var msg = ""
      row.forEach(function(col) {
        msg += (col == -1) ? "...._...." : "...." + col + "....";
      });
      console.log(msg);
    });
    console.log("\n");
  }
}

class Room {
  constructor(width, height, doorRight = false, doorDown = false, doorLeft = false, doorUp = false) {
    this.width = width;
    this.height = height;
    this.doorRight = doorRight;
    this.doorDown = doorDown;
    this.doorLeft = doorLeft;
    this.doorUp = doorUp;

    this.matrix = math.zeros(height, width);
    this.rect = new Phaser.Geom.Rectangle(0, 0, width, height);
    this.buildFloor();
    this.buildWalls();
    this.buildDoors();
  }

  buildFloor() {
    this.matrix = this.matrix.map(function(value, index, matrix) {
      return window.TILE.FLOOR;
    }.bind(this));
  }

  buildWalls() {
    for(var r=0; r<this.height; r++) {
      for(var c=0; c<this.width; c++) {
        if(r == 0 || r == this.height-1 || c == 0 || c == this.width-1) {
          this.matrix.subset(math.index(r, c), window.TILE.CEILING);
        }
      }
    }
  }

  buildDoors() {
    if(this.doorRight) {
      var randY = 1 + Math.floor(Math.random()*(this.height-4));
      this.matrix.subset(math.index(randY, this.width-1), window.TILE.FLOOR);
      this.matrix.subset(math.index(randY+1, this.width-1), window.TILE.FLOOR);
    }

    if(this.doorLeft) {
      var randY = 1 + Math.floor(Math.random()*(this.height-4));
      this.matrix.subset(math.index(randY, 0), window.TILE.FLOOR);
      this.matrix.subset(math.index(randY+1, 0), window.TILE.FLOOR);
    }

    if(this.doorDown) {
      var randX = 1 + Math.floor(Math.random()*(this.width-4));
      this.matrix.subset(math.index(this.height-1, randX), window.TILE.FLOOR);
      this.matrix.subset(math.index(this.height-1, randX+1), window.TILE.FLOOR);
    }

    if(this.doorUp) {
      var randX = 1 + Math.floor(Math.random()*(this.width-4));
      this.matrix.subset(math.index(0, randX), window.TILE.FLOOR);
      this.matrix.subset(math.index(0, randX+1), window.TILE.FLOOR);
    }
  }

  setXY(x, y) {
    this.rect.x = x;
    this.rect.y = y;
  }

  show() {
    console.log("\n");
    this.matrix._data.forEach(function(row) {
      var msg = ""
      row.forEach(function(col) {
        msg += (col == -1) ? "...._...." : "...." + col + "....";
      });
      console.log(msg);
    });
    console.log("\n");
  }
}

class Road {
  constructor(start, end) {
    this.w = math.abs(start.x - end.x) + 1;
    this.h = math.abs(start.y - end.y) + 2;

    this.x = math.min(start.x, end.x);
    this.y = math.min(start.y, end.y);

    this.start = {x: (start.x - this.x), y: (start.y - this.y)};
    this.end = {x: (end.x - this.x - 1), y: (end.y - this.y)};

    this.matrix = math.multiply(math.ones(this.h, this.w), -1);

    this.buildCoord = {x:this.start.x, y:this.start.y};
    this.build();
  }

  build() {
    var middleX = Math.round((this.end.x-this.start.x)/2);
    this.buildRightUntil(middleX);
    if(this.start.y < this.end.y) {
      this.buildDownUntil(this.end.y);
    } else {
      this.buildUpUntil(this.end.y);
    }
    this.buildRightUntil(this.end.x);
  }

  buildRightUntil(x) {
    while(this.buildCoord.x < x) {
      this.buildCoord.x += 1;
      this.matrix.subset(math.index(this.buildCoord.y,this.buildCoord.x), window.TILE.ROAD);
      this.matrix.subset(math.index(this.buildCoord.y+1,this.buildCoord.x), window.TILE.ROAD);
    }
  }

  buildDownUntil(y) {
    while(this.buildCoord.y < y){
      this.buildCoord.y += 1;
      this.matrix.subset(math.index(this.buildCoord.y,this.buildCoord.x), window.TILE.ROAD);
      this.matrix.subset(math.index(this.buildCoord.y,this.buildCoord.x-1), window.TILE.ROAD);
      this.matrix.subset(math.index(this.buildCoord.y+1,this.buildCoord.x), window.TILE.ROAD);
      this.matrix.subset(math.index(this.buildCoord.y+1,this.buildCoord.x-1), window.TILE.ROAD);
    }
  }

  buildUpUntil(y) {
    while(this.buildCoord.y > y){
      this.buildCoord.y -= 1;
      this.matrix.subset(math.index(this.buildCoord.y,this.buildCoord.x), window.TILE.ROAD);
      this.matrix.subset(math.index(this.buildCoord.y,this.buildCoord.x-1), window.TILE.ROAD);
    }
  }

  show() {
    console.log("\n");
    this.matrix._data.forEach(function(row) {
      var msg = ""
      row.forEach(function(col) {
        msg += (col == -1) ? "...._...." : "...." + col + "....";
      });
      console.log(msg);
    });
    console.log("\n");
  }
}

// var a = new LevelCreator();
