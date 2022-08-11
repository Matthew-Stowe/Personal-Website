//Vector Objcet
class Vector{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    //adds z vector parameter
    add(z){
        this.x = this.x + z.x;
        this.y = this.y + z.y;
    }

    //subtracts parameter to each value
    sub(z){
        this.x = this.x - z
        this.y = this.y - z
    }

    //returns magnitude of the distance from one vector to another
    distance(Vec){
        var Distance = new Vector(0,0)          //vector to hold distance
        
        Distance.x = Vec.x - this.x             //delta x
        Distance.y = Vec.y - this.y             //delta y

        return Distance.mag();                  //returns mag as single number
    }

    //returns the magitude of the vector
    mag(){
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
    }
}