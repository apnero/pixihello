function loaderAnimation(){


  var graphic = new PIXI.Graphics();
  graphic.beginFill(0xAC741A,1);
  graphic.drawRect(0,0, GAME_WIDTH,GAME_HEIGHT*3/4);
  graphic.endFill();
  var graphic2 = new PIXI.Graphics();
  graphic2.beginFill(0xAC741A,1);
  graphic2.drawRect(0,GAME_HEIGHT*3/4, GAME_WIDTH,GAME_HEIGHT)  ;
  graphic2.endFill();
  stage.addChild(graphic);
  stage.addChild(graphic2);

  var loadingLine = new PIXI.Graphics();
  loadingLine.lineStyle(2, 0xFFFFFF, 1);
  loadingLine.moveTo(GAME_WIDTH/2-100,GAME_HEIGHT/2*1.8);
  loadingLine.lineTo(GAME_WIDTH/2+100, GAME_HEIGHT/2*1.8);
  stage.addChild(loadingLine);

  var countForText = 0;
  var rate = 64;
  var count = 0;

  var countingText = new PIXI.Text(countForText,
        { font: 'bold 470px Arial', fill: '#AC7723', stroke: '#AC7723', strokeThickness: 6, height: GAME_HEIGHT/3 });

  countingText.anchor = new PIXI.Point(0.5, 0.5);
    countingText.position.x = GAME_WIDTH/2;
  countingText.position.y = GAME_HEIGHT/2;
  stage.addChild(countingText);

  var aryaText = new PIXI.Text("PlasmaScape",
        { fill: '#FFFFFF', align: 'center',width: 200, height: GAME_HEIGHT/60 });
  aryaText.anchor = new PIXI.Point(0.5, 0.5);
  aryaText.position.x = GAME_WIDTH/2;
  aryaText.position.y = GAME_HEIGHT/2;
  aryaText.alpha = 0.5;
  stage.addChild(aryaText);


  //var i = 0;
  var grid = new PIXI.Container();
  var line  = new PIXI.Graphics();
  line.lineStyle(2, 0xFFFFFF, 0.1);

  for (var i = 1; i < 4; i++) {

    line.moveTo(GAME_WIDTH/4*i, i);
    line.lineTo(GAME_WIDTH/4*i, GAME_HEIGHT);
  }

  for (i = 4; i < 6; i++) {
    line.moveTo(i, GAME_HEIGHT/3*(i-3));
    line.lineTo(GAME_WIDTH, GAME_HEIGHT/3*(i-3));
  }
  stage.addChild(line);


  loaderAnimate();

  var titleImage;


  var loader = PIXI.loader
  .add("image0","assets/0.jpg")
  .add("image1","assets/1.jpg")
  .add("image2","assets/2.jpg")
  .add("image3","assets/3.jpg")
  .add("image4","assets/4.jpg")
  .add("image5","assets/5.jpg")
  .add("title", "assets/title.jpg")
  .add("android", "assets/android.jpg")
  .add("ios", "assets/ios.jpg")
  .add("button", "assets/button.png")
  .load(function (loader, resources) {

          imageArray.push(resources.image0.texture);
          imageArray.push(resources.image1.texture);
          imageArray.push(resources.image2.texture);
          imageArray.push(resources.android.texture);
          imageArray.push(resources.ios.texture);
          imageArray.push(resources.button.texture);

          // imageArray.push(resources.image5.texture);
          upperImageArray.push(resources.image3.texture);
          upperImageArray.push(resources.image4.texture);
          upperImageArray.push(resources.image5.texture);

          stage.addChildAt(new PIXI.Sprite(resources.title.texture), 0);

  })
	.on('progress', function (loader, loadedResource) {
	    console.log('Progress:', loader.progress + '%');
      if(loader.progress > countForText)
        rate = rate/2;
      else rate = rate*2;
      //progress = loader.progress;
	});

  loader.on('complete', function (loader, resources) {

        //startTitleText();
        // $('#line1').textillate('start');
        // $('#line2').textillate('start');

          //renderer.render(stage);
          //mainfunction();
  });


  function closingAnimate(){

    if(countingText !== null) {
      countingText.alpha = 0;
      loadingLine.alpha = 0;
      aryaText.alpha = 0;
      //countingText.destroy();
    }
    if(graphic.position.y + GAME_HEIGHT*3/4 < 0 )
      return;

    graphic.position.y = graphic.position.y -20;
    graphic2.position.y =  graphic2.position.y + 20;
    //aryaText.position.y = aryaText.position.y -10
    requestAnimationFrame(closingAnimate);
    renderer.render(stage);

  }


  function loaderAnimate(){


  	count++;

    if (count % rate === 0) {
      countForText++;
      if(countForText < 100){
        loadingLine.moveTo(GAME_WIDTH/2-GAME_WIDTH/60-countForText*10,GAME_HEIGHT/2*1.8);
        loadingLine.lineTo(GAME_WIDTH/2+GAME_WIDTH/60+countForText*10, GAME_HEIGHT/2*1.8);

      }
      if (countForText < 10)
        countingText.text = "0" + countForText;
      else if (countForText < 100)
        countingText.text = countForText;
      else {
       startTitleText();
        //setTimeout(moveTitleButton, 1000);
        setTimeout(closingAnimate, 1000);

        return;
      }
    }

  	requestAnimationFrame(loaderAnimate);
  	renderer.render(stage);


  }



}
