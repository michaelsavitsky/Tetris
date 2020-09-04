function loadGame(){
    var canvas = document.getElementById("gameCanvas");
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, 300, 600);
    }
}

function drawBlock(x, y, context, colour){
    context.fillStyle = colour;
    context.fillRect(x*15, y*15, 15, 15);
}

class Block {
    constructor(x1, x2, x3, x4, y1, y2, y3, y4) {
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.x4 = x4;
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;
        this.y4 = y4;
    }
    draw(){

    }
}
