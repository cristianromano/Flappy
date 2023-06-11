var contexto = document.getElementById("lienzo-juego").getContext("2d");
var HEIGHT = 530;
var WIDTH = 300;
var CANVAS_HEIGHT = 530;
var CANVAS_WIDTH = 300;

document.getElementById("lienzo-juego").height = HEIGHT;
document.getElementById("lienzo-juego").width = WIDTH;

var FPS = 60;
var score = 0;
var gravedad = 1.5;
var personaje = {
  x: 50,
  y: 150,
  w: 50,
  h: 50,
};

var tuberias = new Array();
tuberias[0] = {
  x: contexto.canvas.width,
  y: 0,
};

// AUDIO
var punto = new Audio();
punto.src = "/assets/audios/punto.mp3";

//IMAGENES
var bird = new Image();
bird.src = "assets/images/bird.png";

var background = new Image();
background.src = "assets/images/background.png";

var tuberiaN = new Image();
tuberiaN.src = "assets/images/tuberiaNorte.png";

var tuberiaS = new Image();
tuberiaS.src = "assets/images/tuberiaSur.png";

var floor = new Image();
floor.src = "assets/images/suelo.png";

//CONTROL
function keyDown() {
  personaje.y -= 25;
}

resize();
function resize() {
  CANVAS_HEIGHT = window.innerHeight;
  CANVAS_WIDTH = window.innerWidth;

  document.getElementById("lienzo-juego").width = WIDTH;
  document.getElementById("lienzo-juego").height = HEIGHT;

  document.getElementById("lienzo-juego").style.height =
    "" + CANVAS_HEIGHT + "px";
}

setInterval(loop, 1000 / FPS);
function loop() {
  contexto.clearRect(0, 0, 300, 530);

  contexto.drawImage(background, 0, 0);
  contexto.drawImage(floor, 0, contexto.canvas.height - floor.height);
  contexto.drawImage(bird, personaje.x, personaje.y);

  for (let index = 0; index < tuberias.length; index++) {
    var constante = tuberiaN.height + 80;
    contexto.drawImage(tuberiaN, tuberias[index].x, tuberias[index].y);
    contexto.drawImage(
      tuberiaS,
      tuberias[index].x,
      tuberias[index].y + constante
    );
    if (tuberias[index].y + tuberiaN.height < 80) {
      tuberias[index].y = 0;
    }
    tuberias[index].x--;

    if (tuberias[index].x == 150) {
      tuberias.push({
        x: contexto.canvas.height,
        y: Math.floor(Math.random() * tuberiaN.height) - tuberiaN.height,
      });
    }

    if (
      (personaje.x + bird.width >= tuberias[index].x &&
        personaje.x <= tuberias[index].x + tuberiaN.width &&
        (personaje.y <= tuberias[index].y + tuberiaN.height ||
          personaje.y + bird.height >= tuberias[index].y + constante)) ||
      personaje.y + bird.height >= contexto.canvas.height - floor.height
    ) {
      location.reload();
    }
    if (tuberias[index].x == personaje.x) {
      score++;
      punto.play();
    }
  }
  contexto.fillStyle = "rgba(0,0,0,1)";
  contexto.font = "25px Arial";
  contexto.fillText("Puntaje:" + score, 10, contexto.canvas.height - 40);
  personaje.y += gravedad;
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", keyDown);
