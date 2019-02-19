// Camera sizes: 
//     Max size: 0
//     Tall Double: 1
//     Single: 2
// Camera positions
//     00  11
//     00  11

//     22  33
//     22  33
function camera(number, size, position){
    this.number = number;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.sizeMultiplier = 1;
    if(size == 0){
        this.x = 0;
        this.y = 0;
        this.width = gameArea.width;
        this.height = gameArea.height;
    }
    this.loop = function(){
        this.updatePos();
        this.drawGround("black");
    }
    this.updatePos = function(){
        // this.x = players[this.number].x - this.width/2;
        // this.y = players[this.number].y - this.height/2;
    }
    this.onScreen = function(x, y, width, height){
        if(x + width > this.x && x < this.x + this.width/this.sizeMultiplier
        && y + height > this.y - this.height/this.sizeMultiplier && y < this.y + this.height/this.sizeMultiplier){
            return true;
        }
        return false;
    }
    this.drawCirc = function(x, y, radius, color){
        if(this.onScreen(x-radius, y-radius, radius*2, radius*2)){
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.x, this.y, this.width, this.height);
                gameArea.ctx.clip();
                gameArea.ctx.beginPath();
                gameArea.ctx.fillStyle=color;
                gameArea.ctx.arc(this.sizeMultiplier*(x - this.x), this.sizeMultiplier*(y - this.y), this.sizeMultiplier*radius, 0, 2*Math.PI);
                gameArea.ctx.fill();
            gameArea.ctx.restore();
        }
    }
    this.drawLine = function(startx, starty, endx, endy, color){
        if(this.onScreen(startx, starty, endx-startx, endy-starty)){
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.x, this.y, this.width, this.height);
                gameArea.ctx.clip();
                gameArea.ctx.beginPath();
                gameArea.ctx.strokeStyle=color;
                gameArea.ctx.moveTo(this.sizeMultiplier*(startx - this.x), this.sizeMultiplier*(starty - this.y));
                gameArea.ctx.lineTo(this.sizeMultiplier*(endx - this.x), this.sizeMultiplier*(endy - this.y));
                gameArea.ctx.stroke();
            gameArea.ctx.restore();
        }
    }
    this.drawGround = function(color){
        var len = gameArea.hillY.length;
        for(var i = 0; i < len; i++){
            gameArea.ctx.beginPath();
            gameArea.ctx.strokeStyle=color;
            gameArea.ctx.moveTo(this.sizeMultiplier*(i*gameArea.hillInterval - this.x), this.sizeMultiplier*(gameArea.hillY[i] - this.y));
            gameArea.ctx.lineTo(this.sizeMultiplier*((i+1)*gameArea.hillInterval - this.x), this.sizeMultiplier*(gameArea.hillY[i+1] - this.y));
            gameArea.ctx.stroke();
        }
    }
}