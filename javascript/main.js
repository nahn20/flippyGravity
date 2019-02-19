players = [];
cameras = [];
var gameArea = {
    width : 1200,
    height : 600,
    hillInterval : 1,
    hillY : [],
    tick : 0,
    init : function(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    },
    generateWorld : function(endX){
        var len = endX/this.hillInterval;
        for(var i = 0; i < len; i++){
            //this.hillY[i] = 500;
            this.hillY[i] = 400+100*Math.sin(this.hillInterval*i/(50));
        }
    }
}
function loop(){
    gameArea.ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    for(var i = 0; i < players.length; i++){
        players[i].loop();
    }
    for(var i = 0; i < cameras.length; i++){
        cameras[i].loop();
    }
}
function startGame(playerCount, canvasSize){
    var cameraSize = 0;
    if(playerCount > 1){
        cameraSize += 1;
    }
    if(playerCount > 2){
        cameraSize += 1;
    }
    for(var i = 0; i < playerCount; i++){
        players[i] = new player(i);
        cameras[i] = new camera(i, cameraSize, i);
    }
    gameArea.init();
    gameArea.width = canvasSize[0];
    gameArea.height = canvasSize[1];
    gameArea.generateWorld(1200);
    gameArea.tick = setInterval(loop, 20);
}
var keyMap = [];
document.addEventListener('keydown', function(event) {
    keyMap[event.keyCode] = true;
});
document.addEventListener('keyup', function(event) {
    keyMap[event.keyCode] = false;
});