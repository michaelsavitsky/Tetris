var settledBlocks = Array.from(Array(20), () => new Array(40));
console.log(settledBlocks)

function loadGame(){
    var canvas = document.getElementById("gameCanvas");
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, 300, 600)
        loop(ctx);
    }
}

function loop(ctx){
    var newBlock = new GameBlock();
    setInterval(function() {
        //Fill background
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 300, 600);
        //Fill settled blocks
        ctx.fillStyle = "red"
        for (let i=0 ; i<settledBlocks.length ; i++){
            let temp = settledBlocks[i];
            for (let j=0 ; j<temp.length ; j++){
                if (settledBlocks[i][j] === true){
                    ctx.fillRect(i*15, j*15, 15, 15);
                }
            }
        }

        //Fill current block
        newBlock.blocks.forEach((item, i) => {
            item.draw(ctx)
        });
        //Update current block
        newBlock.blocks.forEach((item, i) => {
            item.y += 1;
            if (item.y === 39){
                //Block has hit bottom
                newBlock.blocks.forEach((item, i) => {
                    settledBlocks[item.x][item.y] = true
                });
                console.log(settledBlocks)
                newBlock = new GameBlock();
            }
        });
    }, 300);
}

class GameBlock {
    constructor() {
        var ran = Math.floor(Math.random() * 20);
        this.blocks = [
            new Block(ran, 0),
            new Block(ran, 1),
            new Block(ran, 2),
            new Block(ran, 3)
        ]
    }
    draw(ctx) {
        this.blocks.forEach((item, i) => {
            item.draw();
        });
    }
}
class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colour = "red";
    }
    draw(ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x*15, this.y*15, 15, 15)
    }
}
