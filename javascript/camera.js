// Camera sizes: 
//     Max size: 0
//     Tall Double: 1
//     Single: 2
// Camera positions
//     00  11               //44444  55555              //666666666666
//     00  11               //44444  55555              //666666666666
                            //44444  55555              //666666666666
//     22  33               //44444  55555              //666666666666
//     22  33               //44444  55555              //666666666666
function camera(number, position, color){
    this.number = number;
    this.x = 0;
    this.y = 0;
    this.xOnScreen = 0;
    this.yOnScreen = 0;
    this.width = 0;
    this.height = 0;
    this.sizeMultiplier = 1;
    this.groundColor = color;
    this.position = position;
    if(this.position == 6){
        this.xOnScreen = 0;
        this.yOnScreen = 0;
        this.width = gameArea.width;
        this.height = gameArea.height;
    }
    if(this.position == 4 || this.position == 5){
        this.xOnScreen = (this.position-4)*gameArea.width/2;
        this.yOnScreen = 0;
        this.width = gameArea.width/2;
        this.height = gameArea.height;
    }
    if(this.position == 0 || this.position == 1){
        this.xOnScreen = (this.position)*gameArea.width/2;
        this.yOnScreen = 0;
        this.width = gameArea.width/2;
        this.height = gameArea.height/2;
        this.sizeMultiplier = 0.5;
    }
    if(this.position == 2 || this.position == 3){
        this.xOnScreen = (this.position-2)*gameArea.width/2;
        this.yOnScreen = gameArea.height/2;
        this.width = gameArea.width/2;
        this.height = gameArea.height/2;
        this.sizeMultiplier = 0.5;
    }
    this.loop = function(){
        this.updatePos();
        this.drawGroundCeil();
        this.drawBorders();
    }
    this.updatePos = function(){
        this.x = players[this.number].x - 0.2*this.width;
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
                gameArea.ctx.rect(this.xOnScreen, this.yOnScreen, this.width, this.height);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                gameArea.ctx.fillStyle=color;
                gameArea.ctx.arc(this.xOnScreen+this.sizeMultiplier*(x - this.x), this.yOnScreen+this.sizeMultiplier*(y - this.y), this.sizeMultiplier*radius, 0, 2*Math.PI);
                gameArea.ctx.fill();
            gameArea.ctx.restore();
        }
    }
    this.drawLine = function(startx, starty, endx, endy, color){
        if(this.onScreen(startx, starty, endx-startx, endy-starty)){
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.xOnScreen, this.yOnScreen, this.width, this.height);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                gameArea.ctx.strokeStyle=color;
                gameArea.ctx.moveTo(this.xOnScreen+this.sizeMultiplier*(startx - this.x), this.yOnScreen+this.sizeMultiplier*(starty - this.y));
                gameArea.ctx.lineTo(this.xOnScreen+this.sizeMultiplier*(endx - this.x), this.yOnScreen+this.sizeMultiplier*(endy - this.y));
                gameArea.ctx.stroke();
            gameArea.ctx.restore();
        }
    }
    this.drawText = function(x, y, text, color, textAlign){ //Too much work to find width and height of text based on number of letters and font and everything. Not going to use this function too much, so it shouldn't matter if it's slightly inefficient
        gameArea.ctx.save();
            gameArea.ctx.beginPath();
            gameArea.ctx.rect(this.xOnScreen, this.yOnScreen, this.width, this.height);
            gameArea.ctx.clip();

            gameArea.ctx.fillStyle = color;
            gameArea.ctx.textAlign = textAlign;
            gameArea.ctx.fillText(text, this.xOnScreen+this.sizeMultiplier*(x - this.x), this.yOnScreen+this.sizeMultiplier*(y - this.y)); 
        gameArea.ctx.restore();
    }
    this.drawRect = function(x, y, width, height, color, fill){
        if(this.onScreen(x, y, width, height)){
            gameArea.ctx.save();
                gameArea.ctx.beginPath();
                gameArea.ctx.rect(this.xOnScreen, this.yOnScreen, this.width, this.height);
                gameArea.ctx.clip();

                gameArea.ctx.beginPath();
                if(fill == true){
                    gameArea.ctx.fillStyle = color;
                    gameArea.ctx.fillRect(this.xOnScreen+this.sizeMultiplier*(x-this.x), this.yOnScreen+this.sizeMultiplier*(y-this.y), this.sizeMultiplier*width, this.sizeMultiplier*height, color);
                }
                else{
                    gameArea.ctx.strokeStyle = color;
                    gameArea.ctx.rect(this.xOnScreen+this.sizeMultiplier*(x-this.x), this.yOnScreen+this.sizeMultiplier*(y-this.y), this.sizeMultiplier*width, this.sizeMultiplier*height, color);
                    gameArea.ctx.stroke();
                }
            gameArea.ctx.restore();
        }
    }
    this.drawGroundCeil = function(){
        // this.drawLine(this.x, gameArea.groundLevel, this.x+this.width/this.sizeMultiplier, gameArea.groundLevel, this.groundColor);
        // this.drawLine(this.x, gameArea.ceilLevel, this.x+this.width/this.sizeMultiplier, gameArea.ceilLevel, this.groundColor);
        this.drawRect(this.x, this.y, this.width/this.sizeMultiplier, gameArea.ceilLevel, this.groundColor, true);
        this.drawRect(this.x, this.y + this.height/this.sizeMultiplier - (600-gameArea.groundLevel), this.width/this.sizeMultiplier, gameArea.groundLevel, this.groundColor, true);
    }
    this.drawBorders = function(){
        this.drawLine(this.x+1, this.y, this.x+1, this.y+this.height/this.sizeMultiplier, this.groundColor);
        this.drawLine(this.x+this.width/this.sizeMultiplier-1, this.y, this.x+this.width/this.sizeMultiplier-1, this.y+this.height/this.sizeMultiplier, this.groundColor);
    }
}