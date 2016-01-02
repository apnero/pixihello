var renderer = PIXI.autoDetectRenderer(1200, 1200, { antialias: true });
document.body.appendChild(renderer.view);

var blocksX = 10
var blocksY = 10
var pictures = 6
// create the root of the scene graph
var stage = new PIXI.Container()

stage.interactive = false


var container = new PIXI.Container();
container.position.x = 0
container.position.y = 0

for (var x = 0; x < blocksX; x++) {
  for (var y = 0; y < blocksY; y++) {
    var graphics = new PIXI.Graphics()
    graphics.beginFill(0x000000, 1)
    graphics.drawRect(x, y*blocksX, 100, 100);
    container.addChild(graphics)
    graphics.endFill()
  }
}


var imageArray = []
var car

var loader = PIXI.loader
 PIXI.loaders.Resource
loader
  .add("image0","assets/0.jpg")
  .add("image1","assets/1.jpg")
  .add("image2","assets/2.jpg")
  .add("image3","assets/3.jpg")
  .add("image4","assets/4.jpg")
  .add("image5","assets/5.jpg")
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

          imageArray.push(resources.image0.texture)
          imageArray.push(resources.image1.texture)
          imageArray.push(resources.image2.texture)
          imageArray.push(resources.image3.texture)
          imageArray.push(resources.image4.texture)
          imageArray.push(resources.image5.texture)
  })

loader.on('complete', function (loader, resources) {
        mainfunction(imageArray, container)
      })


function mainfunction(imageArray, container) {

  for (var i = 1; i < pictures; i++) {
    for (var x = 0; x < blocksX; x++) {
      for (var y = 0; y < blocksY; y++) {
        if (Math.random() > .45) {
          var sprite = new PIXI.Sprite(imageArray[i])
          sprite.position.x = x*100
          sprite.position.y = y*100
          var mask = new PIXI.Texture(imageArray[i], new PIXI.Rectangle(x*100, y*100, 100, 100))
          sprite.texture = mask
          //var child = container.getChildAt(x+y*blocksX)
          container.removeChildAt(x+ y*blocksX)
          container.addChildAt(sprite, x+ y*blocksX)
          //var child = container.getChildAt(x+y*blocksX)
          //console.log(child)
        }
      }
    }
  }

  stage.addChild(container);

  var count = 0;

  var array = []
  for (var i = 0; i < blocksX; i++) {
    if(Math.random() > .6) {
      array.push(i)
    }
  }

  animate();

  function animate()
{
//     count += .01
//     container.scale.x = 1 + Math.sin(count)*.4
//     container.scale.y = 1 + Math.sin(count)*.4

    // array.forEach(function (item, index, array) {
    //   // for (var j = 0; j < pictures; i++){
    //     for (var i = 0; i < blocksX; i++) {
    //       var child = container.getChildAt(item+ i*blocksX)
    //       child.position.y = child.position.y + 1
    //     // }
    //   }
    // })

    renderer.render(stage);
    requestAnimationFrame(animate);
}

}
