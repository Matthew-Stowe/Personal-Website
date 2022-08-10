//Using Shapes as boids
class Shape {
    constructor(context){
        //Descriptions
        this.ctx = context;
        this.radius = RndInt(0,3)
        this.position = new Vector(window.innerWidth/2,window.innerHeight/2)
        this.velocity = new Vector(RndInt(-10,10),RndInt(-10,10));
        this.acceleration = new Vector(0,0);
    }

  show(){
    drawCircle(ctx, this.position.x, this.position.y, 10, 'white', 'white', this.radius)
  }

  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

}

//basic function to draw a circle shape
function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
      ctx.fillStyle = fill
      ctx.fill()
    }
    if (stroke) {
      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = stroke
      ctx.stroke()
    }
  }

//random interger function
function RndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}