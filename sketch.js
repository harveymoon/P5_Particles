


// var nowPos;
// var acc;

var gravity = .5 ;
var particles = [];
var numParticles = 125;
var mouse ;


var imgBg;
//var d = pixelDensity;

var count = 0;

function preload() {
	imgBg = loadImage("city-skyline-silhouette.jpg");
}


function setup() {

	mouse = createVector(mouseX,mouseY);

	// nowPos = createVector(100,100);
	// acc = createVector(2,-2);

	createCanvas(windowWidth,windowHeight);

	MnowPos = createVector(100,100);
	Macc = createVector(2,-2);


	for(var i = 0; i < numParticles; i++){
		Macc.x = random(-3,3);
		Macc.y += random(-1,1);
		particles[i] = new Particle(MnowPos,Macc);
	}

  // put setup code here
  noStroke();
  fill(0);
  rectMode(CENTER);
}

//

function draw() {
  // put drawing code here
  mouse.set(mouseX,mouseY)

//image(imgBg);



count++;

if(count>255)count = 0;

fill(sin(count/255)*255,cos(count/255)*200,125+count%255);


background(255,50);
imgBg.loadPixels();

for(var i = 0; i < particles.length; i++){


	particles[i].update();

	particles[i].draw();


	if(i == 0){

		particles[i].follow(mouse);


	}


	else if(i > 0){



		particles[i].follow(particles[i-1].nowPos);
		if(mouseIsPressed){
			particles[i].follow(mouse);


		}

	}






}


for(var i = 0; i < particles.length; i++){

	// if(particles[i].nowPos.x>=width-10 || particles[i].nowPos.x <= 10 || particles[i].lifeCount <= 0){
	// 	particles.splice(i,1);
	// 	println("kill : " + i);
	// }

particles[i].acc.y+=gravity;


	i


}



  // ellipse(nowPos.x,nowPos.y,3,3);

  // nowPos.add(acc);

 



}

// function mousePressed() {


// 	MnowPos.set(mouseX,mouseY);
// 	for(var i = 0; i < numParticles; i++){
// 		Macc.x = random(-3,3);
// 		Macc.y = random(-3,.5);
// 		particles.push( new Particle(MnowPos,Macc) );
// 	}

// }



function Particle ( posN, accN){
	this.nowPos=createVector(posN.x,posN.y);
	this.acc = createVector(accN.x, accN.y);
	this.lifeCount = random(1500,1600);

}

Particle.prototype.follow = function(gaac){

	var dist = p5.Vector.dist( gaac ,  this.nowPos );

	push();
	translate(this.nowPos.x,this.nowPos.y);
	var angle = atan2(  gaac.y-this.nowPos.y, gaac.x-this.nowPos.x );
	this.acc =  p5.Vector.fromAngle(angle);

	
	//println(dist);
	this.acc.mult(10);
	if(dist < 100){
		this.acc.mult(dist/90);
	}

	//this.nowPos.mult(.4);
	//println(angle);
	rotate(angle);
	var wid = dist/4;
	if(wid>40)wid = 40;
	rect(0,0,wid,wid);
	pop();

}


Particle.prototype.update = function(){

	this.nowPos.add(this.acc);
	this.acc.y+=gravity;
//var mouseN = createVector(mouseX,mouseY);


	// if(this.acc.x > 0)this.acc.x -= .01;
	// if(this.acc.x < 0)this.acc.x += .01;
	// if(this.acc.y > 0)this.acc.x -= .01;
	// if(this.acc.y < 0)this.acc.x += .01;

	// var bright = imgBg.get(this.nowPos.x,this.nowPos.y);
	// //print(bright);
	// if(bright[0]<100){

	// 	//this.acc.mult(.9);
	// 	this.acc.y= this.acc.y *=-1;
	// }


	this.lifeCount-=1;

	

}


Particle.prototype.draw = function(){



	ellipse(this.nowPos.x,this.nowPos.y,3,3);

}