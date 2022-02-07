Status=false;
Srray=[];
picDC="";
r=0;
b=0;
g=0;
function preload() {
    picDC=loadImage("dog_cat.jpg");
}
function setup() {
    canvas=createCanvas(800,450);
    canvas.position(250,160);
    video=createCapture(VIDEO);
    video.hide();
    coCo=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("statusTag").innerHTML="Sniffing Objects";
}
function draw() {
    image(video,0,0,800,450);
    r=random(255);
    g=random(255);
    b=random(255);
    noFill();
    stroke(r,g,b);
    coCo.detect(video,gotResult);
    if (Status==true) {
        for (i = 0; i < Srray.length; i++) {
            rect(Srray[i].x,Srray[i].y,Srray[i].width,Srray[i].height);
            Conf=(Srray[i].confidence*100).toFixed(2);
            text(Srray[i].label+" "+Conf+"%",(Srray[i].x)+10,(Srray[i].y)+10);
        }
    }
}
function modelLoaded() {
    console.log("Yeet");
    Status=true;
}
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        Srray=results;
        document.getElementById("statusTag").innerHTML="Sniffed Objects";
        document.getElementById("status").style.background="lightgreen";
        document.getElementById("status").style.border="lightgreen";
        document.getElementById("NODTag").innerHTML=Srray.length;
    }
}