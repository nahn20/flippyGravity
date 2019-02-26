players = [];
plaLen = 0;
cameras = [];
camLen = 0; //Yes I know it's always the same as plaLen in the current code, but I might add an extra camera if I copy and paste this code later
zoomers = [];
natures = [];
var gameArea = {
    width : 1200,
    height : 600,
    hillInterval : 1,
    hillY : [],
    tick : 0,
    groundLevel : 580,
    ceilLevel : 20,
    init : function(){
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    },
}
function startGame(playerCount, playerKeys, playerNames, playerColors, advancedUI, nature, cameraColors, canvasSize){
    plaLen = playerCount;
    camLen = playerCount
    for(var i = 0; i < plaLen; i++){
        players[i] = new player(i, playerKeys[i], playerNames[i], playerColors[i], advancedUI, nature[i]);
        var cameraPos = i;
        if(playerCount == 1){
            cameraPos = 6;
        }
        if(playerCount == 2){
            cameraPos = 4 + i;
        }
        cameras[i] = new camera(i, cameraPos, cameraColors[i]);
    }
    gameArea.init();
    gameArea.width = canvasSize[0];
    gameArea.height = canvasSize[1];
    gameArea.tick = setInterval(loop, 20);
    for(var i = 0; i < 5; i++){
        zoomers.push(new zoomer(400 + i*Math.random()*200, Math.random()*560+20, Math.random() + 0.3, Math.random()*5, Math.random()*100+50, Math.random()*100+50, Math.random()));
    }
}
function loop(){
    gameArea.ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    for(var i = 0; i < plaLen; i++){ //Yes I could compact players, cameras, zoomers, and anything else I might add into one array which would be more efficient, but I'd rather do this for simplicity
        players[i].loop();
    }
    for(var i = 0; i < camLen; i++){
        cameras[i].loop();
    }
    var len = zoomers.length;
    for(var i = 0; i < len; i++){
        zoomers[i].loop();
    }
    var len = natures.length;
    for(var i = 0; i < len; i++){
        natures[i].loop();
    }
    createObstacles();
}
function createObstacles(){
    var largestX = players[0].x;
    var veloc = 0; //Need veloc for when the player goes super super fast, the zoomers won't spawn behind. 
    for(var i = 0; i < plaLen; i++){
        if(players[i].x > largestX){
            largestX = players[i].x;
            veloc = players[i].xveloc;
        }
    }
    if(Math.random() > 0.99){
        zoomers.push(new zoomer(largestX + veloc + 1200, Math.random()*560+20, Math.random() + 0.3, Math.random()*5, Math.random()*100+50, Math.random()*100+50, Math.random()));
    }
    if(Math.random() > 0.99){
        var ran = Math.random();
        if(ran > 0.9){ //Tree
            var height = 30+Math.random()*50; //Using height in y pos soo have to determine earlier
            natures.push(new nature(largestX + veloc + 1200, gameArea.groundLevel-height, 10+Math.random()*20, height, "tree"));
        }
        if(ran > 0.3 && ran <= 0.9){ //Cloud
            natures.push(new nature(largestX + veloc + 1200, gameArea.ceilLevel+200+Math.random()*150, Math.random()*500, Math.random()*100, "cloud"));
        }
        if(ran <= 0.3){ //Bush
            var height = Math.random()*20;
            natures.push(new nature(largestX + veloc + 1200, gameArea.groundLevel-height, Math.random()*50, height, "bush"));
        }
    }
}
var keyMap = [];
document.addEventListener('keydown', function(event) {
    keyMap[event.keyCode] = true;
    for(var i = 0; i < plaLen; i++){
        if(players[i].key == event.keyCode){
            players[i].flip();
        }
    }
});
document.addEventListener('keyup', function(event) {
    keyMap[event.keyCode] = false;
});