var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var CloudsGroup, cloudImage;
var ObstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameState, PLAY, END;

var gameOverimg, gameOver;
var restartImg, restartButton;


function preload(){
  trex_running = loadAnimation("images/trex1.png","images/trex2.png","images/trex3.png");
  trex_collided = loadImage("images/trexCollided.gif");
  
  groundImage = loadImage("images/ground.png");
  
  cloudImage = loadImage("images/cloud.gif");
  
  obstacle1 = loadImage("images/obs1.gif");
  obstacle2 = loadImage("images/obs2.gif");
  obstacle3 = loadImage("images/obs3.gif");
  obstacle4 = loadImage("images/obs4.gif");
  obstacle5 = loadImage("images/obs5.gif");
  obstacle6 = loadImage("images/obs6.gif");
  heartImg = loadImage("images/heart3.png");
  
  gameOverImg = loadImage("images/gameOver.gif");
  restartImg = loadImage("images/restartButton.gif");

}

function setup() {
  createCanvas(displayWidth/1.3, displayHeight/2.1);

  trex = createSprite(displayWidth/30.1,displayHeight/2.5);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.setCollider("rectangle",100,0,1000,950);
  trex.scale = 0.07;

  ground = createSprite(displayWidth/2.6,displayHeight/2.3,displayWidth/1.3,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2
  
  invisibleGround = createSprite(displayWidth/2.6,displayHeight/2.2,displayWidth/1.3,10);
  invisibleGround.visible = false;

  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  
  score = 0;
  turn = 0;
  
  PLAY = 1;
  END = 0;
  
  gameState = PLAY;
  
  heart1 = createSprite(camera.position.x + displayWidth/6.1,displayHeight/28.8,20,20);
  heart1.addImage(heartImg);
  heart1.scale = 0.06;
  heart2 = createSprite(camera.position.x + displayWidth/6.1,displayHeight/28.8,20,20);
  heart2.addImage(heartImg);
  heart2.scale = 0.06;
  heart3 = createSprite(camera.position.x + displayWidth/6.1,displayHeight/28.8,20,20);
  heart3.addImage(heartImg);
  heart3.scale = 0.06;
  
  gameOver = createSprite(camera.position.x,displayHeight/4.3);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4;
  gameOver.visible = false;
  
  restartButton = createSprite(camera.position.x,displayHeight/3.1);

  restartButton.addImage(restartImg);
  restartButton.visible = false;

  
}

function draw() {
  background(180);

  heart1.x = camera.position.x + displayWidth/4.4;
  heart2.x = camera.position.x + displayWidth/3.85;
  heart3.x = camera.position.x + displayWidth/3.4;
  gameOver.x = camera.position.x;
  restartButton.x = camera.position.x;

  trex.collide(invisibleGround);

  if(gameState === PLAY){
    camera.position.x = camera.position.x + (6 + 3*score/500);
    trex.x = camera.position.x - displayWidth/3.1;
    trex.setCollider("rectangle",100,0,1000,950);
    trex.scale = 0.07;

    if(ground.x<camera.position.x-displayWidth/2.56){
      ground.x = camera.position.x-displayWidth/60.2;
    }
    invisibleGround.x = camera.position.x;

    score = score + Math.round(getFrameRate()/60);
     if(keyWentDown("space")) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    spawnObstacles();
  }

  if(trex.collide(ObstaclesGroup)){
    turn++;
    gameState = END;
  }

  if(turn ===1){
    heart1.destroy();
  }else if(turn === 2){
    heart2.destroy();
  }else if(turn === 3){
    heart3.destroy();
  }

  if(mousePressedOver(restartButton)){
    restart();
  }

  if(gameState === END){
    gameOver.visible = false;
    restartButton.visible = true;
    if(turn === 3){
      restartButton.visible = false;
      gameOver.visible = true;
    }
    ground.velocityX = 0;
    trex.changeAnimation("collided",trex_collided);
    trex.scale = 0.14;
    trex.setCollider("rectangle",-20,0,trex.width,trex.height + 390);
    ObstaclesGroup.setLifetimeEach(4);
    CloudsGroup.setLifetimeEach(4);
  }

  text("Score: "+ score, camera.position.x + displayWidth/10.2,50);
  
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 40 === 0) {
    var cloud = createSprite(camera.position.x + displayWidth/2.6,220,40,10);
    cloud.y = Math.round(random(displayHeight/10.1,displayHeight/7.2));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
   // cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    CloudsGroup.add(cloud);
    gameOver.depth = CloudsGroup.depth +1;
  }
  
}

function spawnObstacles() {
  if(frameCount %60 === 0) {
    var obstacle = createSprite(camera.position.x + 600,displayHeight/2.4,10,40);
    //obstacle.velocityX = -4;
//obstacle.debug =true;
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.2;
              break;
      case 2: obstacle.addImage(obstacle2)
              obstacle.scale = 0.4;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.4;
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale = 0.2;
              break;
      case 5: obstacle.addImage(obstacle5);
              obstacle.scale = 0.4;
              break;
      case 6: obstacle.addImage(obstacle6);
              obstacle.scale = 0.4;
              break;
      default: break;
    }
    
    obstacle.lifetime = 200;
    ObstaclesGroup.add(obstacle);

  }
}

function restart(){
  gameState = PLAY;
  trex.changeAnimation("running", trex_running);
  gameOver.visible = false;
  restartButton.visible = false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
}

