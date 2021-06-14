var bg, bg_Image, steve;
var PLAY = 0;
var OUT = 1;
var WIN = 2;
var diamond;
var gameState = PLAY;


var score = 0;

function preload(){
    backGround = loadImage("bg.jpg");
    player_image = loadImage("player.png");
    fireball_image = loadImage("fireball.png")
    apple_image = loadImage("apple.png")
}

function setup(){
    createCanvas(500, 400)

    bg = createSprite(250, 200, 100, 100);
    bg.addImage(backGround);
    bg.scale = 4

    player = createSprite(250, 300, 10, 10);
    player.addImage(player_image);
    player.velocityX = 5;
    player.scale = 0.03;

    invis_platform = createSprite(250, 340, 1000000000000000000, 10);
    invis_platform.visible = true

    fireballGroup = createGroup();
    appleGroup = createGroup();

}

function draw(){

    background(0);

    camera.position.x = player.x;

    if(bg.x < camera.position.x - 600){
        bg.x = camera.position.x;
    }

    if(invis_platform.x < 0){
        invis_platform.x = 200
    }

    if (gameState === PLAY) {
        if (keyDown("UP_ARROW") && player.y >= 290) {
          player.velocityY = -15;
        }

        if (keyDown(RIGHT_ARROW)) {
            player.x = player.x + 10;
            bg.velocityX = -1
        }

        console.log(player.y)


        if(player.isTouching(appleGroup)){

            appleGroup.destroyEach();
            score+= 1

            

            if(score>15){
                gameState = WIN;
            }
        }
      


        if(gameState === WIN){
            textSize(30)
            fill(255);
            text("CONGRATS || YOU WON || RELOAD TO PLAY AGAIN", camera.position.x-50, 200);
            end();
            

        }

        if(player.isTouching(fireballGroup)){
            gameState = OUT;
        }

        
        if (gameState === OUT){
            textSize(20);
            fill(180);
            text("GAME OVER", camera.position.x-20, 200);
            end()
        }
    

       
       
       
       
       
       
       
       
       
       
       
       
        player.velocityY++;

        player.collide(invis_platform);


      

    spawnApple();
    spawnFireball();
    drawSprites()

}
}

function end(){
    player.visible = false;
    bg.visible = false;
    
    appleGroup.destroyEach();
    fireballGroup.destroyEach();
}

function spawnFireball(){

    if(frameCount % 100 === 0)
    {
        fireball = createSprite(player.x+350, 300, 20, 20);
        fireball.addImage(fireball_image);
        fireball.lifetime = 2000;
        fireball.scale = 0.3
        fireballGroup.add(fireball);
        fireball.velocity.x = -4
    }
}

function spawnApple(){
    if (frameCount%70 === 0){
        apple = createSprite(player.x+500, 200, 20, 20);
        apple.addImage(apple_image);
        apple.scale = 0.03;
        apple.lifetime = 2000;
        appleGroup.add(apple);
    }
}