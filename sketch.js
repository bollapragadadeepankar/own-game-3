var ground,groundimg,invisibleground;
var player,playerimg,playerdead;
var backgroundimg;
var obstacle,obstaclesGroup,powerGroup;
var Ghost,pipe,flowerPipe,mush,Jr;
var gameOver,gameOverImg,restart,restartImg;
var starimg,powerimg;
var Sound;
var gameState=1;
var PLAY=1;
var END=0;
var score=0;
var lifes=3;

localStorage["Highscore"]=0

function preload(){
groundimg = loadImage("images/ground.png");
playerimg = loadAnimation("walk1.png","walk2.png","walk3.png");
playerdead = loadAnimation("images/dead.png");
backgroundimg = loadImage("images/day.jpg");
Ghost = loadImage("images/Ghosts (2).png");
pipe = loadImage("images/pipe.png");
flowerPipe = loadImage("images/flowerPipe.png");
mush = loadImage("images/mushroom.png");
Jr = loadImage("images/Br.png");
gameOverImg = loadImage("images/gameOverText.png");
restartImg = loadImage("images/restart.png");
starimg = loadImage("images/star.png");
powerimg = loadImage("images/power1.png");
Sound = loadSound("Sound1.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
 /* ground=createSprite(700,650,1400,10);
  ground.addImage(groundimg);
  ground.velocityX=-3;
  ground.x=ground.width/2;*/

  ground = createSprite(width/2,height/2,1400,700);
  ground.addImage(backgroundimg);
  ground.velocityX=-3;

  invisibleground=createSprite(width/2,height-50,1400,10);
  invisibleground.visible=false;

  player=createSprite(50,height-60,20,10);
  player.addAnimation("mario",playerimg);
  player.addAnimation("dead",playerdead);
  player.setCollider("circle",0,0,30);
//  player.debug=true;

  gameOver = createSprite(width/2,height/2-60);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2+40);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup=new Group();
  powerGroup=new Group();

  score=0;
 Sound.play();
  }

function draw() {
    background("black");
    
    
    
    //Playstate starts
    if(gameState===1)
    {

          if(ground.x<width/2-200)
          {
            ground.x=width/2;
          }

          if((touches.length>0||(keyDown("Space")||keyDown(UP_ARROW)))&& player.y>=height-100){
            player.velocityY = -15;
            touches=[];
          }

          player.velocityY=player.velocityY+1;
          spawnObstacles();
          spawnPowers();
          //score = score + Math.round((Math.round(getFrameRate()/60))/2);
          if(frameCount%50===0)
          {
            score=score+1;
          }

          for(var i=0; i<obstaclesGroup.length;i++)
          {

            if(player.isTouching(obstaclesGroup.get(i)))
             {
             lifes=lifes-1;
             score=score-10;
             obstaclesGroup.get(i).destroy();
             }
        }

          for(var j=0; j<powerGroup.length;j++)
          {
        
               if(player.isTouching(powerGroup.get(j)))
              {
                score=score+5;
                lifes=lifes+1;
                powerGroup.get(j).destroy();
              }
          }

          if(lifes===0)
          {
            gameState=0;
          }


  }
  else if(gameState===0)
  {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    player.velocityY = 0;

    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    powerGroup.setVelocityXEach(0);
    powerGroup.setLifetimeEach(-1);


    player.changeAnimation("dead",playerdead);
    player.scale=0.35;
    
    if(mousePressedOver(restart)) 
    {
      reset();
    }

    function reset(){
      gameState = 1;
      gameOver.visible = false;
      restart.visible = false;
      lifes=3;
      
      obstaclesGroup.destroyEach();

      player.changeAnimation("mario",playerimg);
      player.scale=1;
            
      if(localStorage["HighestScore"]<score){
        localStorage["HighestScore"] = score;
      }
      console.log(localStorage["HighestScore"]);
      
      score = 0;
      
    }
  }
    player.collide(invisibleground);
   // console.log(player.y);
    drawSprites();
    textSize(24);
    fill("green");
    text("Score: "+ score,width-200,100);
    fill("red")
    text("Lifes:"+ lifes, 50,100);
}

function spawnObstacles()
{
  if(frameCount%120 === 0)
  {
   obstacle=createSprite(width,height-70,10,10);
   obstacle.velocityX=-5;

   var rand=Math.round(random(1,5));

   obstacle.setCollider("circle",0,0,20);
  // obstacle.debug=true;

   switch(rand)
   {
    case 1:obstacle.addImage(Ghost);
    obstacle.scale=0.2;
    break
    case 2:obstacle.addImage(pipe);
    obstacle.scale=1;
    break
    case 3:obstacle.addImage(flowerPipe);
    obstacle.scale=0.7;
    break
    case 4:obstacle.addImage(mush);
    obstacle.scale=0.5;
    break
    case 5:obstacle.addImage(Jr);
    obstacle.scale=0.25;
    break
default:break;
   }

   obstacle.lifetime=700;
   obstaclesGroup.add(obstacle);
  }
}

function spawnPowers()
{
  if(frameCount%1000=== 0)
  {
   power=createSprite(width,height-180,10,10);
   power.scale=0.2;
   power.velocityX=-5;
   powerGroup.add(power);

   var rand=Math.round(random(1,2))

   switch(rand)
   {
     case 1:power.addImage(starimg);
     break;

     case 2:power.addImage(powerimg);
     break;

     default:break;
   }
   power.lifetime=700;
  }

}

  // var rand=Math.round(random(1,5));

  // obstacle.setCollider("circle",0,0,20);