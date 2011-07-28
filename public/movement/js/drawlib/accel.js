    var gr = new jsGraphics(document.getElementById("canvasAccel"));


var col = new jsColor("green");
var col2 = new jsColor("blue");
var col3 = new jsColor("red");
var col4 = new jsColor("white");
var pen = new jsPen(col,1);
var pen2 = new jsPen(col2,1);
var pen3 = new jsPen(col3,1);
var pen4 = new jsPen(col4);

var pt1 = new jsPoint(10,300);
var pt2 = new jsPoint(315,300);
var pt3 = new jsPoint(10,300);
var pt4 = new jsPoint(315,300);
var pt5 = new jsPoint(10,300);
var pt6 = new jsPoint(315,300);
var pt7 = new jsPoint(10,300);
var pt8 = new jsPoint(315,300);
gr.drawLine(pen,pt1,pt2); 
gr.drawLine(pen2,pt3,pt4);
gr.drawLine(pen,pt5,pt6);

var startPoint= 10;
var intervalPoint =3;
var count;
var initPoint1 = new jsPoint(10,300);
var initPoint2 = new jsPoint(10,300);
var initPoint3 = new jsPoint(10,300);
var initPoint4 = new jsPoint(10,300);
var count = 0;


function onAlert(paramX, paramY, paramZ)
{
var paramXScale = Math.floor(paramX*50);
var paramYScale = Math.floor(paramY*50);
var paramZScale = Math.floor(paramZ*50);

pointXX = startPoint+count*intervalPoint;
pointXY = 300-paramXScale;
var pointX = new jsPoint(pointXX, pointXY); 
pointYY = 300-paramYScale;
var pointY = new jsPoint(pointXX, pointYY);
pointZY = 300 - paramZScale;
var pointZ = new jsPoint(pointXX, pointZY);

gr.drawLine(pen, initPoint1, pointX);
gr.drawLine(pen, initPoint2, pointY);
gr.drawLine(pen, initPoint3, pointZ);

initPoint1 = pointX;
initPoint2 = pointY;
initPoint3 = pointZ;

count++;
}

function lineDraw(){
    point1 = startPoint+count*intervalPoint;
    point2 = 300-Math.floor(Math.random()*100);
    var line1 = new jsPoint(point1, point2);
    point3 = 300-Math.floor(Math.random()*100);
    var line2 = new jsPoint(point1,point3);
    point4 = 300-Math.floor(Math.random()*100);
    var line3 = new jsPoint(point1,point4);
    gr.drawLine(pen, initPoint1, line1);
    gr.drawLine(pen, initPoint2, line2);
    gr.drawLine(pen, initPoint3, line3);
    initPoint1 = line1;
    initPoint2 = line2;
    initPoint3 = line3;
    count++;
    if(count==800)
    {
     clearInterval(iID);
    }
}
