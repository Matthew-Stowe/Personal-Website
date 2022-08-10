const ContactInfoString = `<img id="Email-Icon" class="About-Image" src="../images/584856b4e0bb315b0f7675ac.png">
<div id="About-Text">
    <h1><b>Contact Info</b></h1>
    <p>Mobile: 07377 627858</p>
    <p>Email: matthewapstowe@gmail.com</p>
    <p>LinkedIn: /in/matthew-stowe-8372aa229</p>
    <p>Stack Overflow: /users/197228833/matthew-stowe</p>
</div>`

const LocationString = `<img id="AboutMe-Icon" class="About-Image" src="../images/LocationPointer.png">
<div id="About-Text">
    <h1><b>Location Info</b></h1>
    <p>County: Cornwall</p>
    <p>City: Plymouth</p>
    <p>Employment: Currently Not Employed</p>
</div>`

const AboutMeString = `<img id="AboutMe-Icon" class="About-Image" src="../images/AboutMeIcon.png">
<div id="About-Text">
    <h1><b>About Me</b></h1>
    <p>Name: Matthew Stowe</p>
    <p>Age: 18 years old</p>
    <p>______________________________________________________</p>
    <p>Hi and thank you for visiting!</p>
    <p>I am Mathew,</p>
    <p>I am a Computer Science A-level Student looking at expanding my Web Development Portfolio.</p>
    <p>I began Web Development at the begining of 2020 during a class, but didn't get invested in it until I had a course work idea in mind</p>
    <p>My first major Web Dev project was a Graphing Calculator, which took me around 3 month of school hours to complete and write up</p>
    <p>This project can be found on my GitHub under Euclid Map</p>
</div>`

var Count = 1;
var Text_Box = document.getElementById("About-Section");


//loops the text inside the Text-Box Div
//A case switch does not work for some reason
function LoopText(){
    if (Count == 0){
        Text_Box.innerHTML = AboutMeString
    }
    else if(Count == 1){
        Text_Box.innerHTML = LocationString
    }
    else if(Count == 2){
        Text_Box.innerHTML = ContactInfoString
    }
    else{
        console.error("Loop Exceeded 2")
    }

    Count++

    if(Count == 3){
        Count = 0
    }
}

//Timing for spinning wheel
const interval = setInterval(LoopText,25000);
