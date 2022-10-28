var tomImg, Tom, TomsGroup
var jerryImg, Jerry
var jcImg, Jerry_cheese
var chImg, Cheese, cheeseGroup
var bg, Background
gameState = "serve"

function preload(){
tomImg = loadImage("Tom.png");
jerryani = loadImage("JA1.png");
jcImg = loadImage("Jerry_with_cheese.png");
chImg = loadImage("Cheese.png");
bg = loadImage("bgbg.png")
bgm = loadSound("bgm.mp3")
}

function setup() {
 createCanvas(windowWidth, windowHeight)
 //bgm.loop();
 Background = createSprite(900, 320);
 Background.scale = 0.5
 Background.addImage("bgpic",bg);
 Background.velocityX = -1

 invisibleGround = createSprite(750, 690, windowWidth, 20);
 invisibleGround.visible = false;

 TomsGroup = new Group();
 cheeseGroup = new Group();

Jerry = createSprite(200,600,50,50);
Jerry.addImage("Jerry", jerryani);
Jerry.scale = 0.1

Jerry.collide(invisibleGround)

TomsGroup = createGroup();
//TomsGroup.add(Tom)
cheeseGroup = createGroup();
//cheeseGroup.add(Cheese)

Jerry.setCollider("circle",10,10,399);
Jerry.debug = true

score = 0
}

function draw() {
  edges= createEdgeSprites();
  Jerry.collide(edges);
drawSprites()
text("Score: "+ score, 750,100)

if(keyDown("right")){
  Jerry.x=Jerry.x+ 10
}
if(keyDown("left")){
  Jerry.x=Jerry.x- 10
}
if(keyDown("up")){
  Jerry.y=Jerry.y- 10
}
if(keyDown("down")){
  Jerry.y=Jerry.y+ 10
}

var select_sprites = Math.round(random(1,2));

if (frameCount % 50 == 0) {
  if (select_sprites == 1) {
    createTom();
  } else if (select_sprites == 2) {
    createCheese();
  }
}
}
function createTom() {
  Tom = createSprite(random(10, 350),40, 10, 10);
  Tom.addImage(tomImg);
  Tom.scale=0.3;
  Tom.velocityY = 5;
  Tom.lifetime = 150;
    
  }
  
  function createCheese() {
  Cheese = createSprite(random(50, 350),40, 10, 10);
  Cheese.addImage(chImg);
  Cheese.scale=0.1;
  Cheese.velocityY = 3;
  Cheese.lifetime = 150;
  }

if(Jerry.isTouching(TomsGroup)){
    gameState=END;
    TomsGroup.destroyEach();
    cheeseGroup.destroyEach();
    TomsGroup.setVelocityXEach(0);
    cheeseGroup.setVelocityXEach(0);
}
if(Jerry.isTouching(cheeseGroup)){
  score = score+5
}
