//Using Shapes as boids
class Shape {
    constructor(context){
        //Descriptions
        this.ctx = context;
        this.radius = RndInt(0,3)
        this.position = new Vector(RndInt(0,window.innerWidth),RndInt(0,window.innerHeight))
        this.velocity = new Vector(RndInt(-2,2),RndInt(-2,2));
        this.acceleration = new Vector(0,0);
        this.maxVelo = 3;
        this.maxForce = .1;
    }

  align(boids){
    var ViewDistance = 50;                              //how far boid can view

    var average = new Vector(0,0);                        //average veloctity of passed boid velocities
    var AverageTotal = 0;                                 //keeps track of total boids averaged inside radius check
    var Force = new Vector(0,0);

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

      Force.x = (average.x - this.velocity.x)             //sub method for vectors does not want to work?
      Force.y = (average.y - this.velocity.y)

      //Limits Force
      Force.limitMag(this.maxForce)
    }

    return Force
  }

  follow(boids){
    let alignment = this.align(boids)
    this.acceleration.add(alignment);
  }

  show(){
    drawCircle(ctx, this.position.x, this.position.y, 3, 'white', 'white', this.radius)
  }

  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limitMag(this.maxVelo);
    // console.log(this.velocity)
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