PIXI.Container.prototype.bringToFront = function(image) {
	if (this.parent) {
		var parent = this.parent;
		parent.removeChild(this);
		parent.addChild(this);
    //var newChildOrderList = []
    //each child childOrderList.removeChildAt
    childOrderList.push(childOrderList.splice(childOrderList.indexOf(image), 1)[0]);
	}
};


var renderer = PIXI.autoDetectRenderer(1920, 1080, { antialias: true });
document.body.appendChild(renderer.view);

var count = 0;
var step = 0;

// create the root of the scene graph
charm = new Charm(PIXI);
var stage = new PIXI.Container();
stage.interactive = true;
stage.on('click', onClick);
stage.on('tap', onClick);
function onClick() {
  animate();
}

var container = [];
var childOrderList = [];
var imageContainer = new PIXI.Container();
imageContainer.position.x = renderer.width/2; //-800 ;
imageContainer.position.y = renderer.height/2;

var imageArray = [];

var loader = PIXI.loader
  .add("image0","assets/0.jpg")
  .add("image1","assets/1.jpg")
  .add("image2","assets/2.jpg")
  .add("image3","assets/3.jpg")
  .add("image4","assets/4.jpg")
  .add("image5","assets/5.jpg")
  .load(function (loader, resources) {

          imageArray.push(resources.image0.texture);
          imageArray.push(resources.image1.texture);
          imageArray.push(resources.image2.texture);
          imageArray.push(resources.image3.texture);
          imageArray.push(resources.image4.texture);
          imageArray.push(resources.image5.texture);
  });

loader.on('complete', function (loader, resources) {
        mainfunction();
});


function mainfunction() {

  for (var i = 0; i < numPictures; i++) {
    container.push(new PIXI.Container());
    //container.position.x = renderer.width/2
    //container.position.y = renderer.height/2
    for (var y = 0; y < blocksY; y++) {
      for (var x = 0; x < blocksX; x++) {
            var sprite = new PIXI.Sprite(imageArray[i]);
            sprite.position.x = image_position[i][0][x+y*blocksX][0]*blockSizeX-renderer.width/2;
            sprite.position.y = image_position[i][0][x+y*blocksX][1]*blockSizeY-renderer.height/2;
            var mask = new PIXI.Texture(imageArray[i], new PIXI.Rectangle(x*blockSizeX,y*blockSizeY, blockSizeX, blockSizeY));
            sprite.texture = mask;
            container[i].addChild(sprite);
      }
    }
    imageContainer.addChild(container[i]);
    childOrderList.push(i);

  }

stage.addChild(imageContainer);
//
// container.scale.x = .3
// container.scale.y = .3
//ease(step)
//bringChildtoFront(step)
animate();

}

function ease(step) {
bringChildtoFront(step);
 for (var i = 0; i < numPictures; i++) {
    for (var y = 0; y < blocksY; y++) {
      for (var x = 0; x < blocksX; x++) {
        var child = imageContainer.getChildAt(childOrderList.indexOf(i)).getChildAt(x+y*blocksX);
        charm.slide(child, image_position[i][step][x+y*blocksX][0]*blockSizeX-renderer.width/2,
          image_position[i][step][x+y*blocksX][1]*blockSizeY-renderer.height/2, 48, "inverseSineCubed" );

      }
    }
 }


}


function bringChildtoFront(step) {
  if (step == 1) //bring image 0 to front
      container[0].bringToFront(0);
  else if (step == 3 && container.length >=2)//bring image 1 to front
    container[1].bringToFront(1);
  else if (step == 5 && container.length >=3)//bring image 1 to front
    container[2].bringToFront(2);
}


function animate()  {

  if (count == 48 && step < numSteps) {
    step++;
    count = 0;
    ease(step);

   return;
 }

  if(step % 2 == 1) {
    imageContainer.scale.x +=0.006;
    imageContainer.scale.y +=0.006;
    imageContainer.alpha += 0.015;
  }
  else {
    imageContainer.scale.x -=0.006;
    imageContainer.scale.y -=0.006;
    imageContainer.alpha -= 0.015;
  }

  count ++;
  charm.update();
  requestAnimationFrame(animate);
  renderer.render(stage);

}
