video = "";
Objects = [];
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas  = createCanvas(480,380);
    canvas.center();
}
function draw(){
    image ( video,0,0,480,380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult); 
        for (i = 0; Objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: obgects detecting";
            document.getElementById("number_of_obgects").innerHTML = "number of detected obgects are :"+Objects.length;
            fill("#00ffdd");
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label+" "+percent+"%",Objects[i].x, Objects[i].y +20);
            noFill();
            stroke("#ff8c00");
            rect(Objects[i].x , Objects[i].y ,  Objects[i].width , Objects[i].height);
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modeloaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}
function modeloaded(){
    console.log("modaloaded");
    status = "true";
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult (error,results) {
    if(error) {
console.log(error);
    }
    console.log(results);
    Objects = results;
}