var canvas = document.getElementById("Background");
var ctx = canvas.getContext("2d");

//runs on window load
var Width = window.innerWidth;
var Height = window.innerHeight;

//sets canvas to size of window
canvas.width = Width;
canvas.height = Height;

//Shape Limits
const MaxShapes = 100;
var Shapes = [];

//creates array of MaxShapes length of Shapes  
for(i=0; i<MaxShapes; i++){
    Shapes.push(new Shape(ctx))
}

var fps = 60;

//main animation loop
function draw(){

    setTimeout(function(){                                  //fps limiting

        window.requestAnimationFrame(draw);

        ctx.clearRect(0,0,Width,Height);
        for(let i of Shapes){
            i.follow(Shapes);
            i.update();
            i.CheckBorders();
            i.show();
        }

    }, (1000 / fps))
}

window.requestAnimationFrame(draw);


    