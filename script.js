(function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var dt, previousTime, currentTime = Date.now();

  var mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    pressed: false
  };
  var radius, displayRadius = 0;
  var position = {
    x: canvas.width/2,
    y: canvas.height/2
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

  var update = function() {
    previousTime = currentTime;
    currentTime = Date.now();
    dt = (currentTime - previousTime)/1000;

    radius = mouse.pressed ? 20 : 30;
    displayRadius += (radius - displayRadius)*15*dt;

    position.x += (mouse.x - position.x)*8*dt;
    position.y += (mouse.y - position.y)*8*dt;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();

    context.beginPath();
    context.fillStyle = "salmon";
    context.arc(position.x, position.y, displayRadius, 0, Math.PI*2);
    context.closePath;
    context.fill();

    requestAnimationFrame(update);
  };

  update();
})();