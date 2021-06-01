var ground;
var prince,princeImg;
var score=0;
var bckground,backgroundImg;
var batAnimation,bat,batGroup;
var crystal,crystalImg,crystalGroup;
var coin,emerald,gem,ruby;
var flower,flowerImg,flowerGroup;
var orangeflower,purpleflower,sunflower;
var stone,stoneImg,stoneGroup;
var heart,heartImg;
var crystalCount=0;
var flowerCount=0;
var flowershower=100;
var monster,monsterImg;
var lives=3;
var princess,princessImg;
var rand,rand1;
var birdsound,monstersound,notifysound,jumpsound,winsound;
var gameState="play";

function preload(){

birdsound=loadSound("sounds/birds.wav");
monstersound=loadSound("sounds/monster.wav");
notifysound=loadSound("sounds/notification.wav");
jumpsound=loadSound("sounds/player-jumping.wav");
winsound=loadSound("sounds/winning.wav");

princeImg=loadImage("images/Prince.jpg");
backgroundImg=loadImage("images/Forest.jpg");
crystalImg=loadImage("images/Crystal.jpg");
flowerImg=loadImage("images/Flower.jpg");
stoneImg=loadImage("images/Stone.png");
heartImg=loadImage("images/redheart.png");
princessImg=loadImage("images/tiara.png");
monsterImg=loadImage("images/Monster.png");
coin=loadImage("images/coin.png");
emerald=loadImage("images/emerald.png");
gem=loadImage("images/gem-1.png");
ruby=loadImage("images/ruby.png");
orangeflower=loadImage("images/orange-flower.png");
purpleflower=loadImage("images/purple-flower.png");
sunflower=loadImage("images/sunflower.png");

batAnimation = loadAnimation("images/bat1.png","images/bat2.png","images/bat3.png",
                        "images/bat4.png","images/bat5.png","images/bat6.png",
                        "images/bat7.png","images/bat8.png","images/bat9.png",
                        "images/bat10.png","images/bat11.png","images/bat12.png");
}

function setup(){
createCanvas(1000,600);

crystalGroup=new Group();
flowerGroup=new Group();
stoneGroup=new Group();
batGroup=new Group();
heartGroup=new Group();

ground=createSprite(500,380,1000,10);
ground.x=ground.width/2;
ground.velocityX=-7;

bckground=createSprite(0,100,1000,380);
bckground.addImage("backgroundImg",backgroundImg);
bckground.x=bckground.width/2;

prince=createSprite(80,330,30,100);
}
function draw(){
background("blue")     
if(bckground.x<350)
  {
   bckground.x=bckground.width/2; 
  }
 bckground.velocityX=-7;

 if (gameState==="play"){    
  birdsound.play();
 if (crystalGroup.isTouching(prince)) {
    notifysound.play();
    score=score+2; 
    crystalCount=crystalCount+1;
    crystalGroup.destroyEach();
  
}

     if (flowerGroup.isTouching(prince)) {
        notifysound.play();
        score=score+1; 
        flowerCount=flowerCount+1;
        flowerGroup.destroyEach();
        
     }

     if (stoneGroup.isTouching(prince)){
         score=score-3;
         stoneGroup.destroyEach();
     }

      if (batGroup.isTouching(prince)){
         lives=lives-1;
         //prince.visible=false
         //tint(255,100)
         switch(lives){
            case 1:prince.tint=rgb(255,255,255,0.3);
            break;
            case 2:prince.tint=rgb(255,255,255,0.7);
            break;
            default:
            prince.tint=rgb(255,255,255,1);
            break;
            
         }
         batGroup.destroyEach();
      }
      
      if (heartGroup.isTouching(prince)){
        lives=lives+1;
        switch(lives){
            case 1:prince.tint=rgb(255,255,255,0.7);
            break;
            case 2:prince.tint=rgb(255,255,255,1);
            break;
            default:
            prince.tint=rgb(255,255,255,1);
            break;
        }
        heartGroup.destroyEach();
     }
   
   prince.setCollider("circle",0,0,160)

prince.addImage(princeImg);
	prince.scale = 0.3;
    ground.velocityX=-7;
if (ground.x<500){
    ground.x=ground.width/2
}

spawnCrystals();
spawnFlowers();
spawnBats();
spawnStones();
spawnHearts();

if ((keyDown("UP")||keyDown("space"))&& prince.y>=100 ){
jumpsound.play();
prince.velocityY=-8.5;

}

prince.velocityY=prince.velocityY+1;
prince.collide(ground);
if(keyDown("RIGHT") && prince.x<950){;
    prince.x=prince.x+10;
   }
   else{
    if (keyDown("LEFT") && prince.x>50){
      prince.x=prince.x-10;
    }
   }
   if (lives === 0)
   gameState="end";
   
   if (score>=2){  
      gameState="end";
      displayPrincess();}
}

   else if (gameState==="end") {
    prince.collide(ground);
    prince.velocityX=-0;
    prince.velocityY=0;
    ground.velocityX=0;
    bckground.velocityX=0;
    bat.visible = false;
    crystalGroup.destroyEach();
    flowerGroup.destroyEach();
    stoneGroup.destroyEach();
    heartGroup.destroyEach();
    prince.y=310;
   }
   
 
drawSprites();
textSize(24);
 fill("black");
 text("Score:"+score,100,40);

 textSize(24);
 fill("blue");
 text("Lives:"+lives,250,40);

 textSize(24);
 fill("red");
 text("Crystals Collected:"+crystalCount,350,40);

 textSize(24);
 fill("green");
 text("Flowers Collected:"+flowerCount,600,40);

 textSize(20);
 fill("red");
 text("INSTRUCTIONS:",25,440);

 textSize(20);
 fill("red");
 text("1.Use the arrow keys to move the prince.",25,470);

 textSize(20);
 fill("red");
 text("2.Collect Crystals and flowers while avoiding bats and stones.",25,495);

 textSize(20);
 fill("red");
 text("3.You have 3 lives.If you touch a bat you lose 1.If you collect a heart you get an extra life.",25,520);

 textSize(20);
 fill("red");
 text("4.If you touch a stone you lose 3 points in your score.",25,545);

 textSize(20);
 fill("red");
 text("5.Collect 30 points to win.You lose if you lose all of your lives.",25,570);

 if (gameState==="end"){

    textSize(30);
    fill("blue");
 if (lives!=0){
winsound.play();
 text("CONGRATULATUIONS! YOU ARE HOME",300,190);

 }
 else {
//birdsound.stop();
 monstersound.play();
 text("PRINCESS EATEN BY A MONSTER!",500,190);
 monster=createSprite(800,300,20,20);
 monster.addImage(monsterImg);
 monster.scale=0.5;
 }
}
 }


function spawnCrystals(){
if (frameCount %150 === 0){
    crystal=createSprite(200,200,20,20);
    crystal.y=Math.round(random(120,200));
    rand=Math.round(random(1,5));
    switch(rand){
        case 1: crystal.addImage(crystalImg);
        crystal.scale=0.04;
        break;
        case 2: crystal.addImage(coin);
        crystal.scale=0.04;
        break; 
        case 3: crystal.addImage(emerald);
        crystal.scale=0.07;
        break;
        case 4: crystal.addImage(gem);
        crystal.scale=0.04;
        break;
        case 5: crystal.addImage(ruby);
        crystal.scale=0.1;
        break;
        default: break;
    }
    crystal.velocityX=-6;
    crystalGroup.add(crystal);
    }
}

function spawnFlowers(){
if (frameCount %100 === 0){
    flower=createSprite(250,250,20,20);
    flower.y=Math.round(random(120,200));
    rand1=Math.round(random(1,4));
    switch(rand1){
        case 1: flower.addImage(flowerImg);
        flower.scale=0.05; 
        break;
        case 2: flower.addImage(orangeflower);
        flower.scale=0.04;
        break; 
        case 3: flower.addImage(purpleflower);
        flower.scale=0.05;
        break;
        case 4: flower.addImage(sunflower);
        flower.scale=0.04;
        break;
        default: break;
    } 
    flower.velocityX=-6;
    flowerGroup.add(flower);
    }
}

function spawnBats(){
    bat= createSprite(Math.round(random(0,400)),Math.round(random(0,400)));
    bat.addAnimation("moving_bat",batAnimation);
    bat.visible = false;
    //Added MirrorX so that the bats will face the prince when they are flying
    bat.mirrorX(-1)
    if(frameCount % 300 === 0){
        bat.visible = true;
        bat.velocityX = Math.round(random(-4,4));
        bat.velocityY = Math.round(random(-4,4));
        bat.scale=0.4;
        batGroup.add(bat);
    }
}

function spawnStones(){
    if (frameCount %250 === 0){
        stone=createSprite(500,350,10,40);
        stone.addImage(stoneImg);
        stone.scale=0.2;  
        stone.velocityX=-6;
        stoneGroup.add(stone);
        }
}

function spawnHearts(){
if (frameCount %700 === 0){
heart=createSprite(250,250,20,20);
heart.addImage(heartImg);
heart.scale=0.01;
heart.velocityX=-6;
heartGroup.add(heart);
    }
}

function displayPrincess(){
 princess=createSprite(700,330,30,100);
 princess.addImage(princessImg);
 princess.scale=0.3;
 //Add a switch statement and add flowers and gems
 while(flowershower>=0){
    flower=createSprite(700,250,20,20);
    flower.y=Math.round(random(120,200));
    flower.x=Math.round(random(670,720));
    rand2=Math.round(random(1,4));
    switch(rand2){
        case 1:flower.addImage(flowerImg);
        flower.scale=0.005; 
        break;
        case 2: flower.addImage(orangeflower);
        flower.scale=0.004;
        break; 
        case 3: flower.addImage(purpleflower);
        flower.scale=0.005;
        break;
        case 4: flower.addImage(sunflower);
        flower.scale=0.004;
        break;
        default: break;
    }
        flower.velocityY=6;
        flower.lifetime=30;
       flowershower--;
      
 }
    } 