var renderer = PIXI.autoDetectRenderer(1920, 1080, { antialias: true });
document.body.appendChild(renderer.view);


var count = 0;

var step = "horizontal";
var startStep = 0;

//image number
var i=2;


var imagePicture = 0;

  var array = [];
// create the root of the scene graph
var stage = new PIXI.Container();
stage.interactive = true;
stage.on('click', onClick);
stage.on('tap', onClick);
function onClick() {
  animate();
}


var container = new PIXI.Container();
container.position.x = renderer.width /2;
container.position.y = renderer.height/2;

var imageArray = [];

var loader = PIXI.loader
  .add("image","assets/1.jpg")

  .load(function (loader, resources) {

          imageArray.push(resources.image.texture);
  });

loader.on('complete', function (loader, resources) {
        mainfunction(imageArray, container);
      });


function mainfunction(imageArray, container) {

  var dimX = image_dimensions[i][0];
  var dimY = image_dimensions[i][1];
  for (var y = 0; y < dimY; y++) {
    for (var x = 0; x < dimX; x++) {
          var sprite = new PIXI.Sprite(imageArray[imagePicture]);
          sprite.position.x = image_position[i][startStep][x+y*dimX][0]*blockSizeX-renderer.width/2;
          sprite.position.y = image_position[i][startStep][x+y*dimX][1]*blockSizeY-renderer.height/2;
          var mask = new PIXI.Texture(imageArray[imagePicture], new PIXI.Rectangle(x*blockSizeX,y*blockSizeY, blockSizeX, blockSizeY));
          sprite.texture = mask;
        container.addChild(sprite);

      }
    }

  stage.addChild(container);

  //var count = 0;

  container.scale.x = 0.6;
  container.scale.y = 0.6;

// if(step=="horizontal"){
//   for (var i = 0; i < image_dimensions[i][1]; i++) {
//       array.push([i,Math.round(Math.random())])
//   }
// }
// else{
//   for (var i = 0; i < image_dimensions[i][0]; i++) {
//       array.push([i,Math.round(Math.random())])
//   }
// }
saveContainerChildLocations();
renderer.render(stage);
  //animate();
}



  function animate()
  {
    if (step == "horizontal")
      step = "vertical";
    else step = "horizontal";

    var x;
    var y;
    var broke;
    var child;

    if (step == "horizontal"){
      for (y = 0; y < image_dimensions[i][1]; y++) {
          move = -blockSizeX*2;
          broke = false;
          for (x = 0; x < image_dimensions[i][0]; x++) {
            if(broke === false && Math.random() > 0.6){
              move = -move;
              broke = true;
            }
            child = container.getChildAt(x+ y*image_dimensions[i][0]);
            child.position.x = child.position.x + move;
           }
      }
    }
    else {
      for (x = 0; x < image_dimensions[i][0]; x++) {
          move = -blockSizeY*2;
          broke = false;
          for (y = 0; y < image_dimensions[i][1]; y++) {
            if(broke === false && Math.random() > 0.5){
              move = -move;
              broke = true;
            }
            child = container.getChildAt(x+ y*image_dimensions[i][0]);
            child.position.y = child.position.y + move;
           }
      }
    }

    saveContainerChildLocations();

    renderer.render(stage);
    //requestAnimationFrame(animate);

  }

  function saveContainerChildLocations(){
    var locArray = [];

    var dimX = image_dimensions[i][0];
    var dimY = image_dimensions[i][1];

    for (var y = 0; y < dimY; y++) {
      for (var x = 0; x < dimX; x++) {
        var point = container.getChildAt(x+y*dimX).position;
        locArray.push([(point.x-renderer.width/2)/blockSizeX+4, (point.y-renderer.height/2)/blockSizeY+3]);

      }
    }

    var out = "";
    for (var j = 0; j < dimX*dimY; j++) {
      out += "["+locArray[j][0]+","+locArray[j][1]+"],";
    }
    console.log(out);

  }
