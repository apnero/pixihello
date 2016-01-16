
GAME_WIDTH = 1920;
GAME_HEIGHT = 1080;

var rendererOptions = {
  antialiasing: false,
  transparent: false,
  resolution: window.devicePixelRatio,
  autoResize: true,
}


var renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);

// Put the renderer on screen in the corner
renderer.view.style.position = "absolute";
renderer.view.style.top = "0px";
renderer.view.style.left = "0px";

// Size the renderer to fill the screen
var stage = new PIXI.Container();

resize();

// Actually place the renderer onto the page for display
document.body.appendChild(renderer.view);

// Listen for and adapt to changes to the screen size, e.g.,
// user changing the window or rotating their device
window.addEventListener("resize", resize);
function resize() {

  // Determine which screen dimension is most constrained
  ratio = Math.min(window.innerWidth/GAME_WIDTH,
                   window.innerHeight/GAME_HEIGHT);

  // Scale the view appropriately to fill that dimension
  stage.scale.x = stage.scale.y = ratio;

  // Update the renderer dimensions
  renderer.resize(Math.ceil(GAME_WIDTH * ratio),
                  Math.ceil(GAME_HEIGHT * ratio));
}



//loaderAnimation
loaderAnimation();
