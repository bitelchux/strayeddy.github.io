class Blood extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {

    var blood = [
      '...55.......',
      '.....5......'
    ];

    var id = Math.random();
    this.textures.generate('blood-' + id, { data: blood });
    super(scene, x, y, 'blood-' + id);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setPipeline("Light2D");


  }
}
