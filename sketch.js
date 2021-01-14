const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
 
var plinkos = [];
var divisions = [];
var d1, d2;
var particle;
var turn = 0;
var gameState = "play";

var divisionHeight=300;
var score =0;

function setup() {
  createCanvas(897, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 10; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 50; j <=width; j = j + 50)  {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 25; j <= width - 10; j = j + 50) {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 50; j <= width; j = j + 50) {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 25; j <= width - 10; j = j + 50)  {
       plinkos.push(new Plinko(j,375));
    }
}
function draw() {
  Engine.update(engine);
  background("black");

  fill(255);
  textSize(20);
  text("Score : " + score, 25, 30);
  noFill();
  fill(255);
  textSize(28);
  text("500", 25, 550);
  text("500", 105, 550);
  text("500", 185, 550);
  text("500", 265, 550);
  text("100", 345, 550);
  text("100", 425, 550);
  text("100", 505, 550);
  text("100", 585, 550);
  text("200", 665, 550);
  text("200", 745, 550);
  text("200", 825, 550);
  textSize(20);
  text("Turns: "+turn, 800,30);
  noFill();

   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display(); 
   }
   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }
     if(particle != null){
      particle.display();
      if(particle.body.position.y > 760){
        if(particle.body.position.x < 300){
          score = score + 500;
          particle = null;
          if(turn >= 5){ 
            gameState = "end";
          }
        }
        else if (particle.body.position.x >= 300 && particle.body.position.x < 600){
          score = score + 100;
          particle = null;
          if(turn >= 5) {
            gameState = "end";
          }
        }else {
          score = score + 200;
          particle = null;
          if(turn >= 5){ 
            gameState = "end";
          }
        }
      }
   }
   if(gameState === "end"){
    textSize(30);
    fill("white");
    text("Game Over", 450, 400);
   }
   ground.display();
}

function mousePressed(){
  if(gameState!=="end"){
  turn++;
  particle = new Particle(mouseX, 10, 10, 10);
  }
}
