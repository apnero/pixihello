var renderer = PIXI.autoDetectRenderer(1920, 1080, { antialias: true });
document.body.appendChild(renderer.view);


var count = 0
var step = "horizontal"
  var array = []
// create the root of the scene graph
var stage = new PIXI.Container()
stage.interactive = true
stage.on('click', onClick);
stage.on('tap', onClick);
function onClick() {
  animate()
}
// var graphic = new PIXI.Graphics()
// graphic.beginFill(0xFFFFFF,0)
// graphic.drawRect(0,0,1,1)
// graphic.endFill()
// var container = new PIXI.Sprite(graphic.generateTexture(false));
// container.anchor = new PIXI.Point(.5, .5);
//var container = new PIXI.Container();
//container.position.x = image_container_position[0]
//container.position.y = image_container_position[1]
//container.pivot.x = 0
//container.pivot.y = 0

var container = new PIXI.Container();
container.position.x = renderer.width /2//-800 ;
container.position.y = renderer.height/2;

var imageArray = []

var loader = PIXI.loader
  .add("image","assets/1.jpg")
  // .on('progress', function (loader, loadedResource) {
  //     console.log('Progress:', loader.progress + '%');
  // })
  // .on('error', function (loader, loadedResource) {
  //     console.log('error:', loader.progress + '%');
  // })
  // .on('load', function (loader, loadedResource) {
  //     console.log('load:', loader.progress + '%');
  // })
  .load(function (loader, resources) {

          imageArray.push(resources.image.texture)
  })

loader.on('complete', function (loader, resources) {
        mainfunction(imageArray, container)
      })


function mainfunction(imageArray, container) {

    var  i = 0
    for (var y = 0; y < blocksY; y++) {
      for (var x = 0; x < blocksX; x++) {
          var sprite = new PIXI.Sprite(imageArray[i])
          sprite.position.x = x*blockSizeX - renderer.width / 2;//image_position[i][4][x+y*blocksX][0]-renderer.width / 2;
          sprite.position.y = y*blockSizeY - renderer.height / 2;//image_position[i][4][x+y*blocksX][1]-renderer.height / 2;
          var mask = new PIXI.Texture(imageArray[i], new PIXI.Rectangle(x*blockSizeX,y*blockSizeY, blockSizeX, blockSizeY))
          sprite.texture = mask
          container.addChild(sprite)
          //var child = container.getChildAt(x+y*blocksX)
          //container.removeChildAt(x+ y*blocksX)
          //container.addChildAt(sprite, x+ y*blocksX)
          //var child = container.getChildAt(x+y*blocksX)
          //console.log(child)
      }
    }



  stage.addChild(container);

  //var count = 0;

  container.scale.x = .6
  container.scale.y = .6

// if(step=="horizontal"){
//   for (var i = 0; i < blocksY; i++) {
//       array.push([i,Math.round(Math.random())])
//   }
// }
// else{
//   for (var i = 0; i < blocksX; i++) {
//       array.push([i,Math.round(Math.random())])
//   }
// }


  animate();
}



  function animate()
  {
    if (step == "horizontal")
      step = "vertical"
    else step = "horizontal"
//     count += .01
//     container.scale.x = 1 + Math.sin(count)*.4
//     container.scale.y = 1 + Math.sin(count)*.4

if (step == "horizontal"){
  for (var y = 0; y < blocksY; y++) {
      move = -blockSizeX*2
      var broke = false
      for (var x = 0; x < blocksX; x++) {
        if(broke == false && Math.random() > .6){
          move = -move
          broke = true
        }
        var child = container.getChildAt(x+ y*blocksX)
        child.position.x = child.position.x + move
       }
  }
}
else {
  for (var x = 0; x < blocksX; x++) {
      move = -blockSizeY*2
      var broke = false
      for (var y = 0; y < blocksY; y++) {
        if(broke == false && Math.random() > .5){
          move = -move
          broke = true
        }
        var child = container.getChildAt(x+ y*blocksX)
        child.position.y = child.position.y + move
       }
  }
}
    // if (count == 100 && step < numSteps) {
    //   //step++
    //   count = 0
    //   //ease(step)
    //   //easeContainerOut()
    //   return
    // }
    //
    // if(step % 2 == 0) {
    //   //container.height +=.004
    //   container.scale.x +=.004
    //   container.scale.y +=.004
    // }
    // else {
    //   //container.height -=.004
    //   container.scale.x -=.004
    //   container.scale.y -=.004
    // }
// return
//     count ++
//
//     count += 1
//    if (count == 10) {
      saveContainerChildLocations()
  //    count = 0
    //  return
    //}

    renderer.render(stage);
    //requestAnimationFrame(animate);

  }

  function saveContainerChildLocations(){
    var locArray = []

    for (var y = 0; y < blocksY; y++) {
      for (var x = 0; x < blocksX; x++) {
        var point = container.getChildAt(x+y*blocksX).position
        locArray.push([(point.x-renderer.width/2)/blockSizeX+4, (point.y-renderer.height/2)/blockSizeY+3])

      }
    }

    var out = ""
    for (var i = 0; i < blocksX*blocksY; i++) {
      out += "["+locArray[i][0]+","+locArray[i][1]+"],"
    }
    console.log(out)

  }
