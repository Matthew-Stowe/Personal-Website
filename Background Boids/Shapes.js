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
    var distance = new Vector(0,0);                       //vector for the radius around boid
    var Force = new Vector(0,0);                          //turning force applied to boids

    for(i of boids){
      distance.x = i.position.x - this.position.x;       //x-distance from boid to boid[i]
      if(distance.x < 0){
        distance.x = distance.x * -1
      }

      distance.y = i.position.y - this.position.y;       //y-distance fom boid to boid[i]
      if(distance.y < 0){
        distance.y = distance.x * -1
      }

      if((boids[i] != this)){                                   //only adds averages of boid[i] if inside view distance of boid
        if(distance.x < ViewDistance){
          if(distance.y < ViewDistance){
            average.x += i.position.x;
            average.y += i.position.y;

            AverageTotal += 1;
          }
        }
      }
    }

    if (AverageTotal > 0) {                         //to not divide by 0!
      average.x = average.x / AverageTotal;
      average.y = average.y / AverageTotal;
        
      Force.x = this.velocity.x - average.x
      Force.y = this.velocity.y - average.y
    }
    return Force
  }

  followBoids(boids){
    var AlignForce = this.align(boids)
    this.acceleration.x += AlignForce.x
    this.acceleration.y += AlignForce.y
  }

  show(){
    drawCircle(ctx, this.position.x, this.position.y, 10, 'white', 'white', this.radius)
  }

  update(){
    //max speed and acceleration checks
    if((this.velocity.x < this.maxVelo.x) && (this.velocity.y < this.maxVelo.y)){
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
    else{
      this.velocity.x = this.maxVelo.x
      this.velocity.y = this.maxVelo.y
    }


    if((this.acceleration.x < this.maxAcell.x) && (this.acceleration.y < this.maxAcell.y)){
      this.velocity.x += this.acceleration.x
      this.velocity.y += this.acceleration.y
    }
    else{
      this.acceleration.x = this.maxAcell.x
      this.acceleration.y = this.maxAcell.y
    }

    //check if boid is out of bounds
    if(this.position.x > window.innerWidth){
      console.log("this code is ran!")
      this.position.x = 0
    }
    if(this.position.y > window.innerHeight){
      console.log("this code is ran!")
      this.position.y = 0
    }
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