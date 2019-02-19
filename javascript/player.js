function player(number){
    this.number = number;
    this.x = 80*this.number+80;
    this.y = 200;
    this.xveloc = 0;
    this.yveloc = 0;
    this.xaccel = 0;
    this.yaccel = 0;
    this.radius = 10;
    this.loop = function(){
        this.updateForces();
        this.updatePos();
        this.draw();
    }
    this.updateForces = function(){
        this.xaccel = 0;
        this.yaccel = 0;
        var forces = [[-0.1, (3/2)*Math.PI]];
        if(keyMap[32]){
            forces[0] = [-0.3, (3/2)*Math.PI];
        }

        var currentHillY = gameArea.hillY[Math.floor(this.x/gameArea.hillInterval)];
        var groundAngle = Math.atan2(currentHillY-gameArea.hillY[Math.ceil(this.x/gameArea.hillInterval)+1], -gameArea.hillInterval);

        var color = "black";
        if(groundAngle > Math.PI/2){
            color = "red";
        }

        cameras[0].drawLine(this.x-50*Math.cos(groundAngle), currentHillY-50*Math.sin(groundAngle), this.x+50*Math.cos(groundAngle), currentHillY+50*Math.sin(groundAngle), color);
        if(this.y + this.radius > currentHillY){
            forces.push([forces[0][0]/Math.sin(groundAngle), groundAngle]);
            if(this.yveloc > 0){
                this.yveloc = 0;
            }
            if(groundAngle > Math.PI/2){
                this.y = currentHillY - this.radius;
            }
        }

        var len = forces.length;
        for(var i = 0; i < len; i++){
            this.xaccel += forces[i][0]*Math.cos(forces[i][1]);
            this.yaccel += forces[i][0]*Math.sin(forces[i][1]);
            cameras[0].drawLine(this.x, this.y + i, this.x + 1000*forces[i][0]*Math.cos(forces[i][1]), this.y + i + 1000*forces[i][0]*Math.sin(forces[i][1]), "black");
        }
        console.log(this.xaccel)
    }
    this.updatePos = function(){
        this.xveloc += this.xaccel;
        this.yveloc += this.yaccel;
        if(this.xveloc < 1){
            this.xveloc = 1;
        }
        this.x += this.xveloc;
        this.y += this.yveloc;
    }
    this.draw = function(){
        cameras[0].drawCirc(this.x, this.y, this.radius, "black");
    }
}