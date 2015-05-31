var gravity = .5 ;
var particles = [];
var numParticles = 125;
var mouse;
var colDir = 1;

var count = 0;

function setup() {
	mouse = createVector(mouseX,mouseY);
	createCanvas(windowWidth,windowHeight);
	MnowPos = createVector(100,100);
	Macc = createVector(2,-2);
	for(var i = 0; i < numParticles; i++){
		Macc.x = random(-3,3);
		Macc.y += random(-1,1);
		particles[i] = new Particle(MnowPos,Macc);
	}
	noStroke();
	fill(0);
	rectMode(CENTER);
}

function draw() {
	mouse.set(mouseX,mouseY)
	count+=colDir;
	if(count>=255){
		//count = 0;
		colDir*=-1;
	}
	fill(sin(count/255)*255,cos(count/255)*200,125+count%255);
	background(200,7);
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
		particles[i].acc.y+=gravity;
	}
}

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
	this.acc.mult(10);
	if(dist < 100){
		this.acc.mult(dist/90);
		if(dist <= 5) this.acc.mult(0);
	}
	rotate(angle);
	var wid = dist/4;
	if(wid>40)wid = 40;
	rect(0,0,wid,wid);
	pop();
}

Particle.prototype.update = function(){
	this.nowPos.add(this.acc);
	this.acc.y+=gravity;
}

Particle.prototype.draw = function(){
	ellipse(this.nowPos.x,this.nowPos.y,3,3);
}