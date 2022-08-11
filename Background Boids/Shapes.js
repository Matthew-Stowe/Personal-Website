//Using Shapes as boids
class Shape {
    constructor(context){
        //Descriptions
        this.ctx = context;
        this.radius = RndInt(0,3)
        this.position = new Vector(RndInt(0,window.innerWidth),RndInt(0,window.innerHeight))
        this.velocity = new Vector(RndInt(-3,3),RndInt(-3,3));
        this.acceleration = new Vector(0,0);
        this.maxVelo = new Vector(10,10);
        this.maxAcell = new Vector(2,2);
        // this.AlignForce = new Vector(0,0)
    }

  align(boids){
    var ViewDistance = 100;                              //how far boid can view

    var average = new Vector(0,0);                        //average veloctity of passed boid velocities
    var AverageTotal = 0;                                 //keeps track of total boids averaged inside radius check

    for(let Surrounding of boids){
      var Delta = this.position.distance(Surrounding.position)
      if(Surrounding != this && Delta < ViewDistance){
        average.add(Surrounding.velocity)
        AverageTotal ++
      }
    }

    if(AverageTotal > 0){
      average.x = average.x / AverageTotal
      average.y = average.y / AverageTotal

      this.velocity = average
    }
  }

  show(){
    drawCircle(ctx, this.position.x, this.position.y, 10, 'white', 'white', this.radius)
  }

  update(){
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y



    this.velocity.x += this.acceleration.x
    this.velocity.y += this.acceleration.y
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