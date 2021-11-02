var rocket,asteroid,background,blast,lazer,earth;
var rocketImg,asteroidImg,backgroundImg,blastImg,lazerImg,earthImg;
var life=3,score=0;
var lazerGroup,asteroidGroup;
function preload(){
  rocketImg = loadImage("rocket.png")
  asteroidImg = loadImage("asteroid.png")
  backgroundImg = loadImage("background.jpg")
  blastImg = loadImage("blast.png")
  lazerImg = loadImage("lazer.png")
  earthImg = loadImage("earth.png")
}
function setup() {
  createCanvas(800,400);
  background = createSprite(200,100,200,200);
  earth = createSprite(400,550,50,50);
  earth.addImage(earthImg)
  earth.scale=3
  rocket = createSprite(400, 350, 50, 50);
  asteroidGroup = createGroup();
  background.addImage(backgroundImg)
  background.scale=1.2;
  rocket.addImage(rocketImg)
  rocket.scale=0.08;
  lazerGroup = createGroup();
  if(lazerGroup.collide(earth)){
    handleGameover(lazerGroup)
  }
}  
function draw() { 
  //background(0);  
  drawSprites();
  controls()
  movebg()
  if(frameCount%80===0){
    spawnAsteroid()
  }
  if(asteroidGroup.collide(lazerGroup)){
    handleAsteroidCollision(lazerGroup);
  }
  if(keyDown("space")){
    shootLazer()
    }
}
function controls(){
  if(keyDown(LEFT_ARROW)){
    rocket.x=rocket.x-6;
  }
  if(keyDown(RIGHT_ARROW)){
    rocket.x=rocket.x+6;
  }
}
function movebg(){
  background.velocityY=1
  if(background.y===240){
    background.y=100;
  }
}
function spawnAsteroid(){
  asteroid = createSprite(random(10,800),10,50,50);
  asteroid.addImage(asteroidImg)
  asteroid.scale=0.08;
  asteroid.velocityY = 3;
  asteroid.lifetime = 400;
  asteroidGroup.add(asteroid)
}
function shootLazer(){
  lazer= createSprite(150, width/2, 50,20)
  lazer.x = rocket.x-20;
  lazer.addImage(lazerImg)
  lazer.scale=0.02
  lazer.velocityY = -7
  lazerGroup.add(lazer)
}
function handleAsteroidCollision(asteroidGroup){
  if (life > 0) {
     score=score+1;
  }
  blast= createSprite(lazer.x+60, lazer.y, 50,50);
    image(blastImg) 
    
    blast.scale=0.3
    blast.life=20
    lazerGroup.destroyEach()
    asteroidGroup.destroyEach()
}
function handleGameover(lazerGroup){
  
  life=life-1;
  lazerGroup.destroyEach();
  

  if (life === 0) {
    gameState=2
    
    swal({
      title: `Game Over`,
      text: "Oops you lost the game....!!!",
      text: "Your Score is " + score,
      confirmButtonText: "Thanks For Playing"
    });
  }

}