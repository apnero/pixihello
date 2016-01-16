function jumpUp() {


  var upperImageCon = imagesToSprites(upperImage_dimensions, upperImage_position, upperImageArray, upperImageContainer, upperChildOrderList, 0);
  var upperStep = 0
  var upperCount = 0

  function animateOut() {
    var factor;
    if (upperCount > 0 && upperCount <= 100) {
      //easeOutImages(count, image_pos, image_dim, imageCon, orderList);
      factor = Math.easeOutExpo(upperCount, 1, -0.8, 100);
      imageContainer.scale.x = factor; //0.02;
      imageContainer.scale.y = factor; //0.02;
      //dimmerContainer.alpha += 0.008;
    }




    //if (count == 60 && step < numSteps) {
      //$('.tlt').textillate('start');

      //step++;
      //bringChildtoFront(step, imageCon, orderList);
    //}

    if (upperCount == 100) {

       stage.addChild(upperImageCon);
      // //stage.addChild(dimmerContainer);
      // upperStep++;
      // //firstSlide();
      // imageContainer.render = false;
       cycleAnimate(upperImage_position, upperImage_dimensions, upperImageCon, upperChildOrderList, step);//step++;
      // //bringChildtoFront(step, imageCon, orderList);
      // //alert("hrer");
      //count = 0;
      //return;
    }



    upperCount++;
    requestAnimationFrame(animateOut);
    renderer.render(stage);

  }
  animateOut();
}
