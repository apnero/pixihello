PIXI.Container.prototype.bringToFront = function(image) {
	if (this.parent) {
		var parent = this.parent;
		parent.removeChild(this);
		parent.addChild(this);
    childOrderList.push(childOrderList.splice(childOrderList.indexOf(image), 1)[0]);

	}
};

var count = 0;
var step = 0;

// create the root of the scene graph
var graphic = new PIXI.Graphics();
graphic.beginFill(0x000000,1);
graphic.drawRect(0,0, GAME_WIDTH, GAME_HEIGHT);
var dimmerContainer = new PIXI.Sprite(graphic.generateTexture(false));
dimmerContainer.alpha = 0.6;
charm = new Charm(PIXI);


var container = [];
var childOrderList = [];
var imageContainer = new PIXI.Container();
imageContainer.position.x = renderer.width/2; //-800 ;
imageContainer.position.y = renderer.height/2;
var blurFilter = new PIXI.filters.BlurFilter();
imageContainer.filters = [blurFilter];
blurFilter.blur = 0;

var imageArray = [];

function mainFunction() {

  stage.getChildAt(0).alpha = 0;

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
	stage.addChild(dimmerContainer);
	imageContainer.scale.x = 0.5;
	imageContainer.scale.y = 0.5;
	firstAnimate();
  firstSlide();

}

function ease(step) {
bringChildtoFront(step);
 for (var i = 0; i < numPictures; i++) {
    for (var y = 0; y < blocksY; y++) {
      for (var x = 0; x < blocksX; x++) {
        var child = imageContainer.getChildAt(childOrderList.indexOf(i)).getChildAt(x+y*blocksX);
        charm.slide(child, image_position[i][step][x+y*blocksX][0]*blockSizeX-renderer.width/2,
          image_position[i][step][x+y*blocksX][1]*blockSizeY-renderer.height/2, 60, "decelerationCubed" );

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



function firstAnimate(){

	if (count == 30 && step <numSteps){
		step++;
		ease(step);
	}
	if(count>30 && count <90) {
    imageContainer.scale.x +=0.015;
    imageContainer.scale.y +=0.015;
		dimmerContainer.alpha -=0.01;
  }

	if(count == 90){
		count = 0;
		return;
	}

	count++;
	charm.update();
	requestAnimationFrame(firstAnimate);
	renderer.render(stage);
}




function animate()  {

	if(count>10 && count <70) {
    imageContainer.scale.x -=0.015;
    imageContainer.scale.y -=0.015;
		dimmerContainer.alpha +=0.01;
		blurFilter.blur += 0.01 ;
  }
  if(count>130 && count <190) {
    imageContainer.scale.x +=0.015;
    imageContainer.scale.y +=0.015;
    dimmerContainer.alpha -= 0.01;
		blurFilter.blur -= 0.01 ;
  }



 //  if (count == 48 && step < numSteps) {
 //    step++;
 //    //count = 0;
 //    //ease(step);
 //
 //   //return;
 // }

if (count == 30 && step <numSteps){
	$('.tlt').textillate('start');
	step++;
	ease(step);
}

 if (count == 130 && step < numSteps) {
	 step++;
	 //count = 0;
	 ease(step);
	 //return;
 }

 if (count == 190) {
	 count = 0;
	 return;
 }



  count ++;
  charm.update();
  requestAnimationFrame(animate);
  renderer.render(stage);

}
