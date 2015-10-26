                        ///// ENEMY SPECS
var Enemy = function(x,y,speed) {
    
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

//Brings Enemy back to -100 x when it goes over board
//Makes enemy move from left to right
Enemy.prototype.update = function(dt) {
    var yLoc = [60,140,220,300];
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
        //ensures that enemy will never start in the same place twice 
        var randomY = yLoc[Math.floor(Math.random()*yLoc.length)];
        while(randomY === this.y) {
            randomY = yLoc[Math.floor(Math.random()*yLoc.length)];
            return randomY;
        }
        this.y = randomY;
    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

                        ///// PLAYER SPECS
var Player = function(x,y,speed) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};


Player.prototype.update = function(){
    //Would restart player's x & y position when in collision
    for (var i = 0; i < allEnemies.length; i++) {
        if((allEnemies[i].x) <= player.x + 40 &&
            (allEnemies[i].x + 40) >= (player.x) &&
            (allEnemies[i].y)<= player.y + 40 &&
            (allEnemies[i].y + 40) >= (player.y)){
                this.x = 200;
                this.y = 400; 
            }
    }
    //keeps player inside the canvas at all times 
    if (this.x < -40){
        this.x = -40;
    } else if (this.x > 440){
        this.x = 440;
    } else if (this.y < -20){
        this.y = -20;
    } else if (this.y > 440){
        this.y = 440;
    }
    //resets player to init location when it reaches the water
    if (this.y < 0){
        this.x = 200;
        this.y = 400;
    }
}; 

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  
  player.handleInput = function (keyCode){
      var generalSpeed = 20;
      
      if(keyCode == 'left')
        { this.x -= generalSpeed}
      else if(keyCode == 'right')
        {this.x += generalSpeed}
      else if (keyCode == 'down')
        {this.y -= generalSpeed}
      else {
         this.y += generalSpeed}
        }
};

                ///// RENDERING ENEMYS & PLAYER 
var allEnemies = [new Enemy(-300,60,175), new Enemy(-100,140,300), new Enemy(-100,220,150), new Enemy(-300,300,250), new Enemy(-100,220,200)];
var player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        40: 'up',
        39: 'right',
        38: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
