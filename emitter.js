	var	emitterContainer = new PIXI.ParticleContainer();


		var elapsed = Date.now();
// Create a new emitter
var emitter = new cloudkid.Emitter(

  // The DisplayObjectContainer to put the emitter in
  // if using blend modes, it's important to put this
  // on top of a bitmap, and not use the PIXI.Stage
  emitterContainer,

  // The collection of particle images to use
  [PIXI.Texture.fromImage('assets/particle.png')],

    // Emitter configuration, edit this to change the look
    // of the emitter
    {
    	"alpha": {
    		"start": 0,
    		"end": 1
    	},
    	"scale": {
    		"start": 0.1,
    		"end": 0.2,
    		"minimumScaleMultiplier": 1
    	},
    	"color": {
    		"start": "#f8ffe3",
    		"end": "#24051a"
    	},
    	"speed": {
    		"start": 10,
    		"end": 50
    	},
    	"acceleration": {
    		"x": 0,
    		"y": 0
    	},
    	"startRotation": {
    		"min": 0,
    		"max": 360
    	},
    	"rotationSpeed": {
    		"min": 0,
    		"max": 0
    	},
    	"lifetime": {
    		"min": 0.64,
    		"max": 2
    	},
    	"blendMode": "multiply",
    	"frequency": 0.001,
    	"emitterLifetime": -1,
    	"maxParticles": 1000,
    	"pos": {
    		"x": 4,
    		"y": 5
    	},
    	"addAtBack": false,
    	"spawnType": "rect",
    	"spawnRect": {
    		"x": 7,
    		"y": 7,
    		"w": 6,
    		"h": 6
    	}
    }
);

var emitterX = 0;
var emitterY = 0;
emitter.updateOwnerPos(emitterX,emitterY);
