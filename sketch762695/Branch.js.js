// A branch's position is always relative to its parent.
function Branch(length, angle, level) {
	this.vel = 0;
	this.acc = 0
	this.level = level;
	this.angle = angle;
	this.restAngle = angle;
	this.length = length;
	this.children = [];
	this.leaves = [];
	count++;
	this.index = count;
	
	// Adds a new branch as a child.
	this.newBranch = function(angle, mult) {
		let newBranch = new Branch(this.length * mult, angle, this.level + 1)
		this.children.push(newBranch);
    return newBranch;
	}
	
	// Adds a new velocity to its acceleration.
	this.applyForce = function(force) {
    this.acc += force;
	}
	
	// Simulates its new angle.
	this.move = function() {
		// Add some weak wind so there's subtle motion when it's idle.
		let windMult = map(this.level, 0, maxLevel, 0.1, 1) * random(0.75, 1.25);
		let wind = noise((frameCount + this.index) * 0.005) * windMult;
		this.applyForce(wind);
		
		// Always have the angle chasing back to its rest pose.
		// This is what causes the branches to bounce.
		let angleThresh = 10;
		let spring = new p5.Vector(this.restAngle, 0);
		let distance = dist(this.angle, 0, this.restAngle, 0);
		let force = map(min(distance, angleThresh), 0, angleThresh, 0, branchForce);
		
		spring.sub(new p5.Vector(this.angle, 0));
		spring.normalize();
		spring.mult(force);
		this.applyForce(spring.x);
		
		// Slow down velocity with air drag.
		this.vel *= 0.95;
		
		// Add acceleration to velocity, and then to the angle.
		this.vel += this.acc;
		this.angle += this.vel;
		this.angle = constrain(this.angle, this.restAngle - 45, this.restAngle + 45);  // Limit how far its angle can bend, otherwise it could spin!
		this.acc = 0;
	}
}