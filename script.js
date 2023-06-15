let bird;
let pipes = []
let score = 0
let playing = true

function preload(){
  birdImg = loadImage('flappybird.png')
  pipeImg = loadImage('revpipeimg.png')
  revPipeImg = loadImage('flappybirdpipe.png')
  backgroundImg = loadImage('background.png')
  font = loadFont("Flappy-Bird.ttf")
}

function setup() {
  textFont(font,60)
  createCanvas(400, 600)
  bird = new Bird(width/3,height/3)
  bird.flap()
  angleMode(DEGREES)
  textAlign(CENTER,CENTER)
  frameRate(40)
}

if (playing) {
  function draw(){
    textSize(60)
    background(backgroundImg)
    if(frameCount % 50 == 0) {
      pipes.push(new Pipe())
    }
    //track pipe location
    for(let i = pipes.length - 1; i>=0; i--){
      pipes[i].show()
      pipes[i].update()
      if (pipes[i].offScreen()){
        if (pipes[i].pass(bird)){
          bird.score++
        }
        pipes.splice(i,1)
      }
  //when pipe hits bird
      if (pipes[i].hit(bird)) {
        strokeWeight(8)
        rectMode(CENTER)
        fill(255)
        rect(width/2,height/2, width - 80, 80)
        fill(0,0,0)
        strokeWeight(1)
        text("Score: "+ bird.score,width/2,height/2)
        fill(255,255,0)
        strokeWeight(5)
        text("Double",width/2,height/4)
        text("Click to Reset",width/2,height/3)
        bird.score = 0
        playing = false
        noLoop()
      }
  //when bird hits ground
      if (bird.y >= 600){
        strokeWeight(8)
        rectMode(CENTER)
        fill(255)
        rect(width/2,height/2, width- 80, 80)
        fill(0,0,0)
        strokeWeight(1)
        text("Score: "+ bird.score,width/2,height/2 )
        fill(255,255,0)
        strokeWeight(5)
        text("Double",width/2,height/4)
        text("Click to Reset",width/2,height/3)
        bird.score = 0
        playing = false
        noLoop()
      }
      }
    bird.show();
    bird.update();
    //score card
    if(playing){
      fill(255,255,0)
      text(bird.score, width/2, height/4)
  }
    //start title
    if (pipes.length -1 < 0){
      strokeWeight(5)
      fill(255,255,0)
      stroke(0,0,0)
      text("Start",width/2,height/2)
    }
    textSize(25)
    fill(255,255,255)
    text("Bhavya K.", 350,585)
}
}
//to make bird jump from up arrow
function keyPressed(){
  if (key == ''){
    bird.flap()
  } else if(keyIsDown(UP_ARROW)){
    bird.flap()
  }}

//to make bird jump from mouse press
function mousePressed(){
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY<height) {
    bird.flap()
  }
}

class Bird {
  constructor(x,y){
    this.y = y
    this.x = x
    this.gravity = 2.5
    this.velocity = 0
    this.score = 0
    this.friction = 0.2
    this.up = false
    this.lift = -23
  }
  
  show(){
    //to place bird image on bird class
    fill(255)
    push()
    imageMode(CENTER)
    translate(this.x, this.y) 
    if (this.up || this.velocity <0){
      rotate(-35)
    } else {
      rotate(35)
    }
    image(birdImg,0,0,50,50)
    pop()
    }
  
    flap(){
      this.velocity+=this.lift
      this.velocity *= (1-this.friction)
      this.up = true
    }
    
    update() {
      this.velocity += this.gravity
      this.velocity = constrain(this.velocity,-25,25)
      this.y += this.velocity
    
    if (this.y > height){
      this.y = height
      this.velocity = 0
    } else if (this.y<0){
      this.y = 0 
      this.velocity = 0
    }
      this.up = false 
    }
  }


class Pipe {
  constructor() {
    this.x = width;
    this.w = 90;
    this.gap = 120;
    this.min_height = 100;
    this.max_height = height - this.min_height - this.gap;
    this.top = floor(random(this.min_height, this.max_height));
    this.speed = 5;
  }

  show() {
    //pipe textures
    fill(255, 0, 0);
    //top pipe
    image(revPipeImg, this.x, 0, this.w, this.top);
    // bottom pipe
    fill(0, 255, 0);
    let height_b = height - this.gap - this.top;
    let y_b = height - height_b;
    image(pipeImg, this.x, y_b, this.w, height_b);
  }

  offScreen() {
    //pipe off screen detection
    if (this.x + this.w + this.speed < 0) {
      return true;
    }
    return false;
  }

  hit(bird) {
    //bird hit detection
    if (bird.x > this.x && bird.x < this.x + this.w) {
      if (bird.y < this.top || bird.y > this.top + this.gap) {
        return true;
      }
    }
    return false;
  }

  pass(bird) {
    //bird pass detection
    if (bird.x > this.x + this.w) {
      return true;
    }
    return false;
  }

  update() {
    this.x -= this.speed;
  }
}

function doubleClicked(){
  //double click function to restart game
  if (playing == false){
    playing = true
  	bird.flap()
    pipes = []
    loop()
  }
}
