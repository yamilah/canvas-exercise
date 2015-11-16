(function() {
  // Global variables.
  var canvas, context;
  var dt, previousTime, currentTime;
  var mouse;
  var player;

  // Player object.
  var Player = function(x, y) {
    this.position = {
      x: x,
      y: y
    };
    this.displayRadius = 0;
  };

  Player.prototype.update = function(dt) {
    this.radius = mouse.pressed ? 20 : 30;
    this.displayRadius += (this.radius - this.displayRadius)*15*dt;

    this.position.x += (mouse.x - this.position.x)*8*dt;
    this.position.y += (mouse.y - this.position.y)*8*dt;

    context.beginPath();
    context.fillStyle = "black";
    context.arc(this.position.x, this.position.y, this.displayRadius, 0, Math.PI*2);
    context.closePath();
    context.fill();
  };

// Global state.
var init = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  currentTime = Date.now();

  mouse = {
   x: canvas.width/2,
   y: canvas.height/2,
   pressed: false
 };

  canvas.addEventListener("mousemove", function(event) {
    var canvasRect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - canvasRect.x;
    mouse.y = event.clientY - canvasRect.y;
  });

  canvas.addEventListener("mousedown", function(event) {
    mouse.pressed = true;
  });

  canvas.addEventListener("mouseup", function(event) {
    mouse.pressed = false;
  });

  player = new Player(canvas.width/2, canvas.height/2);

  requestAnimationFrame(update);
};

  var update = function() {
    previousTime = currentTime;
    currentTime = Date.now();
    dt = (currentTime - previousTime)/1000;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();

    player.update(dt);

    requestAnimationFrame(update);
  };

init();

})();
