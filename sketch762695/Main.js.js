/*
T-Virus

Recursively creates `branches` that uses dynamics to drive their angles.

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/


var maxLevel = 4; // The amount of nested branches it will subdivide to. More is slower!
var branchForce = 0.5; // The branch's resistance against the mouse. A lower value will make it feel sluggish, while a bigger value will make it spring-like.
var rootBranches = [];
var debug = false;
var count = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
  generateNewTree();
}


function draw() {
  background(0);
	
	push();
		translate(width / 2, height / 2);
		for (let i = 0; i < rootBranches.length; i++) {
			treeIterator(rootBranches[i], 0, -height / 2, 0);
		}
	
		stroke(230);
		strokeWeight(25);
		point(0, 0);
	pop();
	
	fill(255);
	noStroke();
	
	text(
	"".concat(
		"Click to change to a new shape.\n",
		"Middle-click to toggle debug mode.\n",
		"Move the mouse over to interact with it.\n",
		"\n",
		"Debug mode: ", debug), 
	50, 50);
}


function mousePressed() {
	if (mouseButton == CENTER) {
		debug = !debug;
	} else {
		generateNewTree();
	}
}