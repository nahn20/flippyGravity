function player(number, key, name, color, advancedUI, nature){
    this.number = number;
    this.x = 40*this.number+80;
    this.y = 200;
    this.xveloc = 0;
    this.yveloc = 0;
    this.xaccel = 0;
    this.yaccel = 0;
    this.radius = 10;
    this.grav = 1;
    this.score = 0;
    this.dead = false;
    this.key = key;
    this.name = name;
    this.color = color;
    this.advancedUI = advancedUI;
    this.nature = nature;
    console.log(this.nature[0])
    this.loop = function(){
        this.updatePos();
        this.draw();
    }
    this.updatePos = function(){
        if(this.dead == false){
            this.yaccel = this.grav;
            this.xveloc += this.xaccel;
            this.yveloc += this.yaccel;
            if(this.xveloc < 5){
                this.xveloc = 5;
            }
            this.x += this.xveloc;
            this.y += this.yveloc;
            this.obstacleCollision();
            this.groundCeilCollision();
        }
        this.score = Math.round(this.x-40*this.number-80); //Not really a pos update, but fits better here

    }
    this.draw = function(){
        for(var i = 0; i < camLen; i++){
            cameras[i].drawCirc(this.x, this.y, this.radius, this.color);
            if(this.y + 70 > gameArea.groundLevel){
                cameras[i].drawText(this.x, this.y - 20, this.name, "black", "center");
            }
            else{
                cameras[i].drawText(this.x, this.y + 40, this.name, "black", "center");
            }
            if(this.dead){
                cameras[i].drawText(this.x, this.y+4, "x", "black", "center")
            }
        }

        var keyText = String.fromCharCode(this.key);
        if(this.key == 32){
            keyText = "Spacebar";
        }
        cameras[this.number].drawText(cameras[this.number].x + cameras[this.number].width/cameras[this.number].sizeMultiplier, 50, "Gravity Flip: " + keyText + "    Score: " + this.score, this.color, "right");
        var winner = 0;
        for(var i = 0; i < plaLen; i++){
            if(players[i].score > players[winner].score){
                winner = i;
            }
        }
        cameras[this.number].drawText(cameras[this.number].x + cameras[this.number].width/cameras[this.number].sizeMultiplier, 80, "Current Winner: " + players[winner].name, players[winner].color, "right");
        
        if(this.advancedUI == "Yes"){
            cameras[this.number].drawText(cameras[this.number].x + cameras[this.number].width/cameras[this.number].sizeMultiplier, 110, "X: " + Math.round(this.x) + "    Y: " + Math.round(this.y) + "    X Velocity: " + Math.round(this.xveloc) + "    Y Velocity: " + Math.round(this.yveloc), this.color, "right");
        }


    }
    this.flip = function(){
        this.grav *= -1;
    }
    this.groundCeilCollision = function(){
        if(this.yveloc > 0 && this.y + this.radius >= gameArea.groundLevel){
            this.yveloc = 0;
            this.y = gameArea.groundLevel - this.radius;
        }
        if(this.yveloc < 0 && this.y - this.radius <= gameArea.ceilLevel){
            this.yveloc = 0;
            this.y = gameArea.ceilLevel + this.radius;
        }
    }
    this.obstacleCollision = function(){
        var len = zoomers.length;
        for(var i = 0; i < len; i++){ //Circle rectangle collision code found here: https://yal.cc/rectangle-circle-intersection-test/
            var DeltaX = this.x - Math.max(zoomers[i].x, Math.min(this.x, zoomers[i].x + zoomers[i].width));
            var DeltaY = this.y - Math.max(zoomers[i].y, Math.min(this.y, zoomers[i].y + zoomers[i].height));
            if(DeltaX * DeltaX + DeltaY * DeltaY < this.radius * this.radius){
                this.xveloc += zoomers[i].effect;
            }
        }
    }
}