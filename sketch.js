let colored = true;
let order = 7;
let N = Math.pow(2,order);
let total = N * N;
let path = [];
let counter = 0;
function setup() {
  colorMode(HSB,360,255,255);
  createCanvas(800,800);

  for(let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }

}
function draw() {
  background(51);
  beginShape();
  noFill();
  strokeWeight(1);
  for(let i = 1; i < counter; i++) {
    if(colored) {
      h = map(i, 0, path.length, 0, 360);
      stroke(h,255,255);
    }else{
      stroke(255)
    }
    line(path[i].x, path[i].y, path[i-1].x, path[i-1].y);
  }
  endShape();

  counter+=5;
  if(counter >= path.length) {
    counter = 1;
  }
}

function hilbert(i) {
  points = [createVector(0,0), createVector(0,1), createVector(1,1), createVector(1,0)];

  let index = i & 3;
  let v = points[index];

  for(var j = 1;j< order;j++) {
    i = i >>> 2;
    index = i & 3;
    let leng = Math.pow(2,j);
    if(index == 0) {
      let temp = v.x;
      v.x = v.y;
      v.y = temp;
    }else if(index == 1) {
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

  return v
}
