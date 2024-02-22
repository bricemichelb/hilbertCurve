let colored = true;
let loop = true;
let buildSpeed = 15;
let order = 7;
let N = Math.pow(2,order);
let total = N * N;
let path = [];
let pathCol = [];
let shapeColor = [];
let counter = 0;
let img;
let fillWith = 2; //0 -> regular, 1 -> ellipse, 2->image 

function preload() {
  if (fillWith == 2) {    
    img = loadImage('assets/logoUdem.png');
  }
}

function setup() {
  if (fillWith == 2) {
    colorMode(RGB,360,255,255);
  }else {
    colorMode(HSB,360,255,255);
  }
  
  createCanvas(800,800);

  //get all points location
  for(let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    len = height / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);    
  }

  if(fillWith == 1 ) { //fill with an ellipse
    fill(255);
    ellipse(width/2, width/2, width/2, width/2);
    shapeColor = get(width/2, width/2);
  }else if( fillWith == 2 ) { //fill with an image
    image(img, 0, 0,800,700);
  }

  for(let i = 0; i < path.length; i++) {
    pathCol[i] = get(path[i].x, path[i].y);
  }
  background(200);
}


function draw() {   
  drawCurve();
}

function sameColor(col1, col2){
  return JSON.stringify(col1)==JSON.stringify(col2);
}

function drawCurve() {
  beginShape();
  noFill();
  strokeWeight(3);
  for(let i = 0; i < counter; i++) {      
    if(colored) {
      if (fillWith == 2) {//fill with image
        stroke(pathCol[i][0], pathCol[i][1], pathCol[i][2]);
      } else if(fillWith == 1) {// fillwith  an ellipse

        if(sameColor(shapeColor, pathCol[i])){
          h = map(i,0,path.length,0,360);
          stroke(h,255,255);
        } else {
          stroke(255);
        }      
      } else {
        h = map(i,0,path.length,0,360);
        stroke(h,255,255);
      }
    }else{
      stroke(255);
    }
    
    line(path[i].x, path[i].y, path[i+1].x, path[i+1].y);
    //triangle(path[i].x, path[i].y, path[i+1].x, path[i+1].y, path[i+2].x, path[i+2].y);
  }
  endShape();

  if(buildSpeed == 0 || buildSpeed >= total){
    counter+= total-1;
  } else{
    counter+= buildSpeed;
  }
  
  if(counter >= path.length ) {
    if(loop){
      counter = 1;
    } else{
      noLoop();
    }
  } 
}

function hilbert(i) {
  points = [createVector(0,0), createVector(0,1), createVector(1,1), createVector(1,0)];

  let index = i % 4;
  let v = points[index];
  let u = i;

  for(var j = 1;j< order;j++) {
    i = (Math.trunc(i/4));
    index = i % 4;
    let leng = Math.pow(2,j);
    if(index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    }else if(index == 1)   {
      v.y+= leng;
    }else if(index == 2) {
      v.x+= leng;
      v.y+= leng;
    }else if(index == 3) {
      var temp = leng-1-v.x
      v.x = leng-1-v.y;
      v.y = temp;
      v.x+= leng;
    }
}

  return v;
}