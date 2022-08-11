//Optimisation:
//  Spacial Sub Division

//Using Shapes as boids
class Shape {
    constructor(context, canvas){
        //Descriptions
        this.canvas = canvas
        this.ctx = context;
        this.radius = RndInt(0,3)
        this.position = new Vector(RndInt(0,window.innerWidth),RndInt(0,window.innerHeight))
        this.velocity = new Vector(RndInt(-2,2),RndInt(-2,2));
        this.acceleration = new Vector(0,0);
        this.maxVelo = 3;
        this.maxForce = .1;
        this.maxCohesion = .01;
        this.maxSeperationForce = .2;
        this.shapeType = RndInt(0,1)
        this.colour = RndInt(0,1)
    }

  align(boids){
    var ViewDistance = 25;                              //how far boid can view

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

      Force.setMag(this.maxVelo);                         //allways travel at max speed

      Force.limitMag(this.maxForce)                       //Limits Force
    }

    return Force
  }


  //copied from align method
  //refactor this!
  cohesion(boids){
    var ViewDistance = .05;

    var average = new Vector(0,0);
    var AverageTotal = 0;
    var Force = new Vector(0,0);

    for(let Surrounding of boids){
      var Delta = this.position.distance(Surrounding.position)
      if(Surrounding != this && Delta < ViewDistance){
        average.add(Surrounding.position)
        AverageTotal ++
      }
    }

    if(AverageTotal > 0){
      average.x = average.x / AverageTotal
      average.y = average.y / AverageTotal

      Force.x = (average.x - this.position.x)
      Force.y = (average.y - this.position.y)

      Force.setMag(this.maxVelo);

      Force.x = (Force.x - this.velocity.x)
      Force.y = (Force.y - this.velocity.y)

      Force.limitMag(this.maxCohesion)
    }

    return Force
  }

  //copied from cohesion method
  //refactor this!
  seperation(boids){
    var ViewDistance = .001;

    var average = new Vector(0,0);
    var AverageTotal = 0;
    var Force = new Vector(0,0);

    for(let Surrounding of boids){
      var Delta = this.position.distance(Surrounding.position)
      if(Surrounding != this && Delta < ViewDistance){
        let diff = new Vector(0,0)

        diff.x = this.position.x - Surrounding.position.x
        diff.y = this.position.y - Surrounding.position.y

        if(diff.mag() != 0 ){
          diff.mult(1/Delta)
        }
        else{
          diff.x = 0
          diff.y = 0
        }

        

        average.x += diff.x
        average.y += diff.y

        AverageTotal ++
      }
    }

    if(AverageTotal > 0){
      average.x = average.x / AverageTotal
      average.y = average.y / AverageTotal

      Force.setMag(this.maxVelo);

      Force.x = (Force.x - this.velocity.x)
      Force.y = (Force.y - this.velocity.y)

      Force.limitMag(this.maxSeperationForce)
    }

    return Force
  }

  follow(boids){       
    // this.acceleration.mult(0);             //restets force
    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(seperation);
  }

  CheckBorders(){                                 //moves to otherside of canvas if outside canvas bounds
    if(this.position.x > this.canvas.width){
      this.position.x = 0;
    }
    if(this.position.x < 0){
      this.position.x = this.canvas.width;
    }

    if(this.position.y > this.canvas.height){
      this.position.y = 0;
    }
    if(this.position.y < 0){
      this.position.y = this.canvas.height;
    }
  }

  show(){
    switch(this.shapeType){
      case 0:
        drawCircle(ctx, this.position.x, this.position.y, 3, Colours[this.colour], Colours[this.colour], this.radius)
        break;
      
      case 1:
        DrawTri(ctx, this.position.x, this.position.y, 1, Colours[this.colour], Colours[this.colour])
        break;
    }
    // drawCircle(ctx, this.position.x, this.position.y, 3, 'white', 'white', this.radius)
    // DrawTri(ctx, this.position.x, this.position.y, 2, "white", "white")
  }

  update(){
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limitMag(this.maxVelo);
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

//Basic function to draw a triangle
function DrawTri(ctx,x,y,scalar,fill,stroke){

  ctx.beginPath()
  ctx.moveTo(x+(0*scalar), y+(5*scalar))
  ctx.lineTo(x+(5*scalar), y+(0*scalar))
  ctx.lineTo(x+(10*scalar), y+(5*scalar))
  ctx.lineTo(x+(0*scalar), y+(5*scalar))
  ctx.stroke()
  ctx.closePath()

  ctx.strokeStyle = stroke
  ctx.stroke()

  ctx.fillStyle = fill
  ctx.fill()
}

var Colours = ["#c2b7b5", "#F26C4F"]