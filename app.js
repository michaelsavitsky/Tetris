class GameBlock {
    constructor() {
        var ran = Math.floor(Math.random() * 7);
        switch (ran) {
            //Line piece
            case 0:
                this.blocks = [new Block(10, 0), new Block(10, 1), new Block(10, 2), new Block(10, 3)]
                break;
            //T piece
            case 1:
                this.blocks = [new Block(10, 0), new Block(10, 1), new Block(10, 2), new Block(11, 1)]
                break;
            //Square piece
            case 2:
                this.blocks = [new Block(10, 0), new Block(10, 1), new Block(11, 0), new Block(11, 1)]
                break;
            //L piece
            case 3:
                this.blocks = [new Block(10, 0), new Block(10, 1), new Block(10, 2), new Block(11, 2)]
                break;
            //Reverse L piece
            case 4:
                this.blocks = [new Block(10, 0), new Block(10, 1), new Block(10, 2), new Block(9, 2)]
                break;
            //Squigly piece
            case 5:
                this.blocks = [new Block(10, 0), new Block(10, 1), new Block(11, 1), new Block(11, 2)]
                break;
            //Reverse squigly piece
            case 6:
                this.blocks = [new Block(10, 0), new Block(10, 1), new Block(9, 1), new Block(9, 2)]
                break;
        }
    }
}
class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colour = "red";
    }
}

var settledBlocks = Array.from(Array(20), () => new Array(40));
var newBlock = new GameBlock();
// console.log(settledBlocks)

function loadGame(){
    var canvas = document.getElementById("gameCanvas");
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        ctx.fillRect(0, 0, 300, 600)
        loop(ctx);
    }
}

function loop(ctx) {
    setInterval(function() {
        newBlock.blocks.forEach((block, index) => block.y += 1)
        let collided = false;
        newBlock.blocks.forEach((block, index) => {
            if (settledBlocks[block.x][block.y] || block.y === 40) {
                collided = true;
            }
        });
        if (collided) {
            newBlock.blocks.forEach((block, i) => {
                block.y -= 1;
                settledBlocks[block.x][block.y] = true;
                console.log(settledBlocks[block.x][block.y])
                //check for lines in settledBlocks
                //remove lines from settled blocks
                //move all lines above removed row down
            });
            newBlock = new GameBlock();
        }
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
        ctx.fillStyle = "green"
        newBlock.blocks.forEach((block, i) => ctx.fillRect(block.x * 15, block.y * 15, 15, 15));
    }, 500);
}

window.addEventListener("keydown", checkKey, false)

function checkKey(e) {
    console.log(e)
    if (e.key == 'ArrowDown') { }
    else if (e.key == 'ArrowUp') { }
    else if (e.key == 'ArrowLeft') {
        //Left arrow key
        let collided = false;
        newBlock.blocks.forEach((block, i) => {
            if (block.x <= 0 || settledBlocks[block.x][block.y]) collided = true;
        });
        if (!collided) newBlock.blocks.forEach((block, i) => block.x -= 1)
    }
    else if (e.key == 'ArrowRight') {
        //Right arrow key
        let collided = false;
        newBlock.blocks.forEach((block, i) => {
            if (block.x >= 19 || settledBlocks[block.x][block.y]) collided = true;
        });
        if (!collided) newBlock.blocks.forEach((block, i) => block.x += 1)
    }
}
