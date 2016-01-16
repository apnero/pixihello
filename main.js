PIXI.Container.prototype.bringToFront = function(image, orderList) {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChild(this);
    orderList.push(orderList.splice(orderList.indexOf(image), 1)[0]);

  }
};

var count = 0;
var lowerStep = 1;


// create the root of the scene graph
var graphic = new PIXI.Graphics();
graphic.beginFill(0x000000, 1);
graphic.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
var dimmerContainer = new PIXI.Sprite(graphic.generateTexture(false));
dimmerContainer.alpha = 0;



imageContainer.position.x = renderer.width / 2;
imageContainer.position.y = renderer.height / 2;
upperImageContainer.position.x = renderer.width / 2;
upperImageContainer.position.y = renderer.height / 2;

var dotsContainer = new PIXI.Container();
dotsContainer.position.x = renderer.width / 2;
dotsContainer.position.y = renderer.height / 2;


var blurFilter = new PIXI.filters.BlurFilter();
imageContainer.filters = [blurFilter];
blurFilter.blur = 0;

//**************************************************************************************************************
function imagesToSprites(imageDim, imagePos, imageArr, imageCon, orderList, ste) {
  var container = [];
  for (var i = 0; i < imagePos.length; i++) {

    container.push(new PIXI.Container());
    var dimX = imageDim[i][0];
    var dimY = imageDim[i][1];
    for (var y = 0; y < dimY; y++) {
      for (var x = 0; x < dimX; x++) {
        var sprite = new PIXI.Sprite(imageArr[i]);
        sprite.position.x = imagePos[i][ste][x + y * dimX][0] * blockSizeX - renderer.width / 2;
        sprite.position.y = imagePos[i][ste][x + y * dimX][1] * blockSizeY - renderer.height / 2;
        var mask = new PIXI.Texture(imageArr[i], new PIXI.Rectangle(x * blockSizeX, y * blockSizeY, blockSizeX, blockSizeY));
        sprite.texture = mask;
        container[i].addChild(sprite);
        if (x === 0 && y === 0)
          console.log(sprite.position.x + "|" + sprite.position.y);
      }
    }
    imageCon.addChild(container[i]);
    orderList.push(i);


  }
  return imageCon;

}

///************MAIN function**************************************************
function mainFunction() {

  //hide title background
  stage.getChildAt(0).alpha = 0;
  step = 0;
  stage.addChild(imagesToSprites(image_dimensions, image_position, imageArray, imageContainer, childOrderList, 0));
  stage.addChild(dimmerContainer);
  step++;
  firstSlide();

  // var p1 = new Promise(function(resolve, reject) {
  //   var done = false;
  //   done = cycleAnimate(image_position, image_dimensions, imageContainer, childOrderList, 1);
  //
  //   if (done === true) {
  //     resolve("Stuff worked!");
  //   }
  // });
  //
  // p1.then(function(value) {
  //     console.log(value); // Success!
  //   } //, function(reason) {
  //   //  console.log(reason); // Error!
  //   //}
  // );


  cycleAnimate(image_position, image_dimensions, imageContainer, childOrderList, 1);
  setTimeout(function(){
    firstSlideAnimate();
  }, 5000);



} //end mainFuncion

//*************************************************************************************************************************************************
function firstSlideAnimate(){

  var firstSlideStepCount = 0;
  var dot;
  var zero = -renderer.width/2;

  for (var i = 0; i < 6; i++) {
    dot = new PIXI.Graphics();
    dot.lineStyle(10, 0xFFFFFF, 1);
    dot.moveTo(zero - i*25,-renderer.height/2 + blockSizeY*5/2);
    dot.lineTo(zero - i*25,-renderer.height/2 + blockSizeY*5/2+50);
    //dot.beginFill(0xFFFF0B, 1);
    //dot.drawCircle(zero - i*20,-renderer.height/2 + blockSizeY*5/2,8);
    //dot.endFill();
    //dot.position.x = 0;
    //dot.position.y = 0;
    //dot.scale.x = 1.5;
    //dot.pivot = new PIXI.Point(0.5,0.5);
    dotsContainer.addChild(dot);
  }
  stage.addChild(dotsContainer);
  //dotsContainer.scale.x = 1.5;

  var finalPosition = blockSizeX*7/2;
  var numberOfSteps = Math.floor(finalPosition/60);
  console.log("Steps: " + numberOfSteps);

function animateFirstSlide() {

    if(firstSlideStepCount == numberOfSteps*15){
      return;
  }

  for (var i = 0; i < 6; i++) {
        dot = dotsContainer.getChildAt(i);

        if (dot.position.x <= finalPosition+30){
          if (firstSlideStepCount - i*5 > 0)
            dot.position.x = dot.position.x + 60;
            //dot.rotation = firstSlideStepCount*0.1;
        }
        else {
                  //dot.anchor = new PIXI.Point(dot.position.x, 0);
                  //dot.pivot = new PIXI.Point(500, 500);
          dotsContainer.rotation = firstSlideStepCount*0.01;
        }

  }
    firstSlideStepCount++;
    requestAnimationFrame(animateFirstSlide);
    renderer.render(stage);

  }

  animateFirstSlide();


}

//*************************************************************************************************************************************************

var update = function() {

  requestAnimationFrame(update);

  var now = Date.now();

  //if (emitterContainer.position.x < 0 || emitterContainer.position.x > renderer.width)
  //emitterContainer.position.x = 0;
  // if (emitterContainer.position.y < 0 || emitterContainer.position.y > renderer.width)
  // emitterContainer.position.y = 0;

  emitterX += 25;
  emitterY += 30 * Math.sin(elapsed * 4);
  if (emitterX < -renderer.width / 2 || emitterX > renderer.width / 3)
    emitterX = -renderer.width / 2;
  if (emitterY < -renderer.height / 2 || emitterY > renderer.height / 2)
    emitterY = -renderer.height / 2;
  emitter.updateOwnerPos(emitterX, emitterY);
  //emitterContainer.position.y += 20*(Math.round(Math.random()) - Math.round(Math.random()));


  // The emitter requires the elapsed
  // number of seconds since the last update
  emitter.update((now - elapsed) * 0.001);
  elapsed = now;

  // Should re-render the PIXI Stage
  renderer.render(stage);
};

function bringChildtoFront(step, imageCon, order) {
  if (step == 2) { //bring image 0 to front
    imageCon.getChildAt(order.indexOf(0)).bringToFront(0, order);
    imageCon.getChildAt(order.indexOf(3)).bringToFront(3, order);
    imageCon.getChildAt(order.indexOf(4)).bringToFront(4, order);
    imageCon.getChildAt(order.indexOf(5)).bringToFront(5, order);
  } else if (step == 4) //bring image 1 to front
    imageCon.getChildAt(order.indexOf(1)).bringToFront(1, order);
  else if (step == 6) //bring image 1 to front
    imageCon.getChildAt(order.indexOf(2)).bringToFront(2, order);
}

//exponential easing in -accelerating from zero velocity
// Math.easeInExpo = function(t, b, c, d) {
//   return c * Math.pow(2, 10 * (t / d - 1)) + b;
// };
// exponential easing out - decelerating to zero velocity
Math.easeOutExpo = function(t, b, c, d) {
  return c * (-Math.pow(2, -10 * t / d) + 1) + b;
};


//****************************************************************************************************************
function easeOutImages(count, imagePos, imageDim, imageCon, orderList, step) {
  var factor = Math.easeOutExpo(count, 0, 1, 60);
  console.log("factor: " + orderList + ":" + step);
  for (var i = 0; i < imagePos.length; i++) {
    var dimX = imageDim[i][0];
    var dimY = imageDim[i][1];
    for (var y = 0; y < dimY; y++) {
      for (var x = 0; x < dimX; x++) {
        var child = imageCon.getChildAt(orderList.indexOf(i)).getChildAt(x + y * dimX);
        var current = imagePos[i][step - 1][x + y * dimX];
        var future = imagePos[i][step][x + y * dimX];
        child.position.x = current[0] * blockSizeX - renderer.width / 2 + (future[0] - current[0]) * factor * blockSizeX;
        child.position.y = current[1] * blockSizeY - renderer.height / 2 + (future[1] - current[1]) * factor * blockSizeY;
      }
    }
  }
}


//*******************************************************************************************************************
function cycleAnimate(image_pos, image_dim, imageCon, orderList, step) {
  function animate() {
    var factor;
    if (count > 0 && count <= 60) {
      easeOutImages(count, image_pos, image_dim, imageCon, orderList, step);
      factor = Math.easeOutExpo(count, 1, -0.6, 60);
      imageCon.scale.x = factor; //0.02;
      imageCon.scale.y = factor; //0.02;
      //dimmerContainer.alpha += 0.01;
    }
    if (count > 60 && count <= 120) {
      easeOutImages(count - 60, image_pos, image_dim, imageCon, orderList, step);
      factor = Math.easeOutExpo(count - 60, 0.4, 0.6, 60);
      imageCon.scale.x = factor; //0.02;
      imageCon.scale.y = factor; //0.02;
      //dimmerContainer.alpha -= 0.01;
    }



    if (count == 60 && step < numSteps) {
      //$('.tlt').textillate('start');

      step++;
      bringChildtoFront(step, imageCon, orderList);
    }

    if (count == 120) {

      step++;
      //bringChildtoFront(step, imageCon, orderList);

      count = 0;
      // Start the update

      //stage.addChild(emitterContainer);
      //emitterContainer.position.x = renderer.width / 2;
      //emitterContainer.position.y = renderer.height / 2;
      // Start emitting
      //emitter.emit = true;

      //update();

      return;

    }



    count++;
    requestAnimationFrame(animate);
    renderer.render(stage);

  }

  animate();
  return;

}
