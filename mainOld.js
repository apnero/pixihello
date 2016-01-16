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
graphic.beginFill(0x000000, 1);
graphic.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
var dimmerContainer = new PIXI.Sprite(graphic.generateTexture(false));
dimmerContainer.alpha = 0;
//charm = new Charm(PIXI);


var container = [];
var childOrderList = [];
var imageContainer = new PIXI.Container();
imageContainer.position.x = renderer.width / 2; //-800 ;
imageContainer.position.y = renderer.height / 2;

var blurFilter = new PIXI.filters.BlurFilter();
imageContainer.filters = [blurFilter];
blurFilter.blur = 0;

var imageArray = [];

function mainFunction() {

  stage.getChildAt(0).alpha = 0;

  for (var i = 0; i < image_position.length; i++) {
    container.push(new PIXI.Container());
    var dimX = image_dimensions[i][0];
    var dimY = image_dimensions[i][1];
    for (var y = 0; y < dimY; y++) {
      for (var x = 0; x < dimX; x++) {
        var sprite = new PIXI.Sprite(imageArray[i]);
        sprite.position.x = image_position[i][step][x + y * dimX][0] * blockSizeX - renderer.width / 2;
        sprite.position.y = image_position[i][step][x + y * dimX][1] * blockSizeY - renderer.height / 2;
        var mask = new PIXI.Texture(imageArray[i], new PIXI.Rectangle(x * blockSizeX, y * blockSizeY, blockSizeX, blockSizeY));
        sprite.texture = mask;
        container[i].addChild(sprite);
				if(x === 0 && y === 0 && i === 0)
					console.log(sprite.position.x + "|" + sprite.position.y);
      }
    }
    imageContainer.addChild(container[i]);
    childOrderList.push(i);

  }

  stage.addChild(imageContainer);
  stage.addChild(dimmerContainer);
  //imageContainer.scale.x = 0.5;
  //imageContainer.scale.y = 0.5;
  step++;
  //ease(step);
  //charm.update();
		//	bringChildtoFront();
  animate();
  //firstAnimate();
  //firstSlide();

} //end mainFuncion

// function ease(step) {
//   bringChildtoFront(step);
//   for (var i = 0; i < image_position.length; i++) {
//     var dimX = image_dimensions[i][0];
//     var dimY = image_dimensions[i][1];
//     for (var y = 0; y < dimY; y++) {
//       for (var x = 0; x < dimX; x++) {
//         var child = imageContainer.getChildAt(childOrderList.indexOf(i)).getChildAt(x + y * dimX);
//         charm.slide(child, image_position[i][step][x + y * dimX][0] * blockSizeX - renderer.width / 2,
//           image_position[i][step][x + y * dimX][1] * blockSizeY - renderer.height / 2, 60, "deceleration");
//
//       }
//     }
//   }
//
//
// }


function bringChildtoFront(step) {
  if (step == 2) //bring image 0 to front
    container[0].bringToFront(0);
  else if (step == 4 && container.length >= 2) //bring image 1 to front
    container[1].bringToFront(1);
  else if (step == 6 && container.length >= 3) //bring image 1 to front
    container[2].bringToFront(2);
}

//exponential easing in -accelerating from zero velocity
Math.easeInExpo = function(t, b, c, d) {
  return c * Math.pow(2, 10 * (t / d - 1)) + b;
};
// exponential easing out - decelerating to zero velocity
Math.easeOutExpo = function(t, b, c, d) {
  return c * (-Math.pow(2, -10 * t / d) + 1) + b;
};
// function firstAnimate(){
//
// 	if (count == 30 && step <numSteps){
// 		step++;
// 		ease(step);
// 	}
// 	if(count>30 && count <90) {
//     imageContainer.scale.x +=0.015;
//     imageContainer.scale.y +=0.015;
// 		dimmerContainer.alpha -=0.01;
//   }
//
// 	if(count == 90){
// 		count = 0;
// 		return;
// 	}
//
// 	count++;
// 	charm.update();
// 	requestAnimationFrame(firstAnimate);
// 	renderer.render(stage);
// }

function easeOutImages(count) {
		var factor = Math.easeOutExpo(count, 0, 1, 60);
		console.log("factor: " + factor);
	  for (var i = 0; i < image_position.length; i++) {
	    var dimX = image_dimensions[i][0];
	    var dimY = image_dimensions[i][1];
	    for (var y = 0; y < dimY; y++) {
	      for (var x = 0; x < dimX; x++) {
	        var child = imageContainer.getChildAt(childOrderList.indexOf(i)).getChildAt(x + y * dimX);
					if (x === 0 && y === 0 && i === 0) {
						console.log(child.position.x + ":" + child.position.y + ":" + x + ":" + y + ":" + i);
					}
					var current = image_position[i][step-1][x + y * dimX];
					var future = image_position[i][step][x + y * dimX];
					child.position.x = current[0]*blockSizeX - renderer.width/2 + (future[0] - current[0])*factor* blockSizeX ;
					child.position.y = current[1]*blockSizeY - renderer.height/2 + (future[1] - current[1])*factor* blockSizeY ;					//child.position.x = (factor*future[0] - (1-factor)*current[0])*blockSizeX - renderer.width/2;
					//child.position.y = (factor*future[1] - (1-factor)*current[1])*blockSizeY - renderer.height/2;
				}
			}
		}
}

// function easeInImages(count) {
// 		var factor = Math.easeInExpo(count, 1, -1, 60);
// 	console.log("factor: " + factor);
// 	  for (var i = 0; i < image_position.length; i++) {
// 	    var dimX = image_dimensions[i][0];
// 	    var dimY = image_dimensions[i][1];
// 	    for (var y = 0; y < dimY; y++) {
// 	      for (var x = 0; x < dimX; x++) {
// 	        var child = imageContainer.getChildAt(childOrderList.indexOf(i)).getChildAt(x + y * dimX);
// 					if (x === 0 && y === 0 && i === 0) {
// 						console.log(child.position.x + ":" + child.position.y + ":" + x + ":" + y + ":" + i);
// 					}
// 					var current = image_position[i][step-1][x + y * dimX];
// 					var future = image_position[i][step][x + y * dimX];
// 					//child.position.x = (current[0]*(1-factor) + future[0]*factor)* blockSizeX - renderer.width / 2;
// 					//child.position.x = (current[1]*(1-factor) + future[1]*factor)* blockSizeY - renderer.height / 2;
// 					child.position.x = current[0]*blockSizeX - renderer.width/2 + (future[0] - current[0])*factor* blockSizeX ;
// 					child.position.y = current[1]*blockSizeY - renderer.height/2 + (future[1] - current[1])*factor* blockSizeY ;
// 				}
// 			}
// 		}
// }


function animate() {
  var factor;
	if (count > 0 && count <= 60) {
		easeOutImages(count);
		factor = Math.easeOutExpo(count, 1, -0.6, 60);
		//console.log("data:" + Math.easeOutExpo(count, 1, -0.5, 60));
    imageContainer.scale.x = factor; //0.02;
    imageContainer.scale.y = factor; //0.02;
    dimmerContainer.alpha += 0.01;
    //blurFilter.blur += 0.02;
  }
  if (count > 60 && count <= 120) {
		easeOutImages(count-60);
		factor = Math.easeOutExpo(count-60, 0.4, 0.6, 60);
		//console.log("data2:" + Math.easeInExpo(count-60, 0.5, 0.5, 60));
    imageContainer.scale.x = factor; //0.02;
    imageContainer.scale.y = factor; //0.02;
    dimmerContainer.alpha -= 0.01;
    //blurFilter.blur -= 0.02;
  }



  //  if (count == 48 && step < numSteps) {
  //    step++;
  //    //count = 0;
  //    //ease(step);
  //
  //   //return;
  // }

  if (count == 60 && step < numSteps) {
    //$('.tlt').textillate('start');

    step++;
		bringChildtoFront(step);

    //ease(step);
  }
	//
  // if (count == 160 && step < numSteps) {
  //   step++;
  //   //count = 0;
  //   ease(step);
  //   //return;
  // }

  if (count == 120) {

    step++;
		bringChildtoFront(step);

		//ease(step);
		count = 0;
    return;
  }



  count++;
  //charm.update();
  requestAnimationFrame(animate);
  renderer.render(stage);

}
