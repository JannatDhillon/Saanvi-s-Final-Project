const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world, body;

var board, dice;
var purple, purpleSpaces, purpleMoved;
var redPiece, redSpaces, redMoved;

function preload(){
  board = loadImage("background.png");
}

function drawdice(x, y, side){
  fill("white");
  strokeWeight(8);
  rectMode(CENTER);
  rect(x, y, 100, 100, 20);

  fill("black")
  strokeWeight(3);
  if(side === 1){
    circle(x, y, 20);
  }else if(side === 2){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 3){
    circle(x - 25, y - 25, 20);
    circle(x, y, 20);
    circle(x + 25, y + 25, 20);
  }else if(side === 4){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 5){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x, y, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
  }else if(side === 6){
    circle(x - 25, y - 25, 20);
    circle(x + 25, y + 25, 20);
    circle(x - 25, y + 25, 20);
    circle(x + 25, y - 25, 20);
    circle(x - 25, y, 20);
    circle(x + 25, y, 20);
  }
}

function checkForBlueUpsAndDowns(){
  //ladders
  if(purpleSpaces === 2){
    Matter.Body.setVelocity(purple.body, {x: 7, y: -13});
    purpleSpaces = 23;
  }

  if(purpleSpaces === 6){
    Matter.Body.setVelocity(purple.body, {x: -6, y: -26});
    purpleSpaces = 45;
  }

  if(purpleSpaces === 20){
    Matter.Body.setVelocity(purple.body, {x: 7, y: -26});
    purpleSpaces = 59;
  }

  if(purpleSpaces === 57){
    Matter.Body.setVelocity(purple.body, {x: 7, y: -26});
    purpleSpaces = 96;
  }

  if(purpleSpaces === 28){
    Matter.Body.setVelocity(purple.body, {x: 7, y: -13});
    purpleSpaces = 49;
  }

  if(purpleSpaces === 52){
    Matter.Body.setVelocity(purple.body, {x: 0, y: -13});
    purpleSpaces = 72;
  }

  if(purpleSpaces === 71){
    Matter.Body.setVelocity(purple.body, {x: -7, y: -13});
    purpleSpaces = 92;
  }

}

function setup() {
  //create canvas
  createCanvas(600,725);

  //setup
  engine = Engine.create();
  world = engine.world;

  //set gravity
  engine.world.gravity.y = 0;

  //create the dice array
  dice = [false, 1, 0, false, 0];
  //item 0 = if dice is rolling
  //item 1 = current number displayed
  //item 2 = times to dice will change
  //item 3 = blinking time or not
  //item 4 = blinking counter

  purple = new Purple(20, 570, 40, 40);
  purpleSpaces = 1;
  purpleMoved = false;

}

function draw() {
  //draw the background
  background(158, 113, 79);  

  //update the engine
  Engine.update(engine);

  image(board, 0, 0, 600, 600);

  purple.display();

  //add a divider
  stroke("black");
  strokeWeight(8);
  
  line(0, 602.5, 600, 602.5);

  //draw dice or make it blink or move it
  if(dice[3] === false){
    drawdice(525, 665, dice[1]);
  }else{
    if(dice[4] % 2 === 0){
      drawdice(525, 665, dice[1]);

      if(purpleMoved === false && purpleSpaces !== 100){
        if(purpleSpaces % 10 === 0){
          purple.moveUp();
        }else{
          var num = Math.floor(purpleSpaces / 10);
          if(num === 0 || num === 2 || num === 4 || num === 6 || num === 8){
            purple.moveRight();
          }else{
            purple.moveLeft();
          }
        }
        purpleMoved = true;
        purpleSpaces++;
        console.log(purpleSpaces);
      }
    }

    if(frameCount % 15 === 0){
      dice[4]--;
      purpleMoved = false;

      if(dice[4] === 0){
        dice[3] = false;
        dice[0] = false;
        checkForBlueUpsAndDowns();
      }
    }
  }

  //make the dice roll
  if(dice[0] === true && dice[2] > 0 && frameCount % 5 === 0){
    dice[2]--;

    dice[1]++;
    if(dice[1] > 6){
      dice[1] = 1;
    }

    if(dice[2] === 0){
      dice[3] = true;
      dice[4] = dice[1] * 2;
    }
  }
}

function keyPressed(){
  if (keyCode === 32 && dice[0] === false) {
    dice[0] = true;
    dice[2] = round(random(12, 18));
  }
}