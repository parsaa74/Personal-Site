// Takes a branch and spawns new children branches that will come from it.
// This is a recursive function that makes up the tree's structure.
function subDivide(branch) {
  let newBranches = [];
  let newBranchCount = int(random(1, 4));
  let minLength = 0.7;
  let maxLength = 0.85;
  
	// The angles will change depending on how many new branches will be created.
	// This will allow the tree to have more natural looking angles than being random.
  if (newBranchCount == 2) {
		newBranches.push(branch.newBranch(random(-45.0, -10.0), random(minLength, maxLength)));
		newBranches.push(branch.newBranch(random(10.0, 45.0), random(minLength, maxLength)));
	} else if (newBranchCount == 3) {
		newBranches.push(branch.newBranch(random(-45.0, -15.0), random(minLength, maxLength)));
		newBranches.push(branch.newBranch(random(-10.0, 10.0), random(minLength, maxLength)));
		newBranches.push(branch.newBranch(random(15.0, 45.0), random(minLength, maxLength)));
	} else {
		newBranches.push(branch.newBranch(random(-45.0, 45.0), random(minLength, maxLength)));
  }
	
	// If the new branches haven't reach the max level yet then spawn new branches from them.
  for (let i = 0; i < newBranches.length; i++) {
    if (newBranches[i].level < maxLevel) {
      subDivide(newBranches[i]);
    }
  }
}


// Creates a new tree. The first branch is always vertical in the scene's center.
function generateNewTree() {
	rootBranches = [];
	for (let a = 0; a < 360; a+=12) {
		let newBranch = new Branch(random(30.0, 100.0), a, 0)
		rootBranches.push(newBranch);
		subDivide(newBranch);
	}
}


// A recursive function to display the tree.
// It uses `push` and `pop` so that we don't have to deal with actual positions.
// Instead we only care about a branch's length and angle so that we can position them relatively.
function treeIterator(branch, worldX, worldY, worldA) {
	// Even though `push` and `pop` will help *display* the tree, we still need a means to interact with it.
	// So to interact with the mouse, we must keep track of the current branch's world position/rotation.
	worldA += branch.angle;
	
	let vec = new p5.Vector(branch.length, 0);
	vec.rotate(radians(worldA));
	
	worldX += vec.x;
	worldY += vec.y;
	
	push();
		stroke(map(branch.level, 0, maxLevel, 255, 50));
		strokeWeight(maxLevel - branch.level + 1);
		
		// Push the branch if it's within distance of the mouse.
		let d = dist(mouseX, mouseY, worldX + width / 2, worldY + height - 20);
		let distThresh = 300;
		if (d < distThresh) {
			let force = map(d, 0, distThresh, 1.5, 0);  // Closer branches will be pushed more.
			
			// Reverse angle depending on mouse position.
			if (mouseX > worldX + width / 2) {
				force *= -1;
			}

			// Lower branches have greater resistance.
			force *= map(branch.level, 0, maxLevel, 0.2, 1);
			branch.applyForce(force);
			
			// While we're here, we can visualize if this branch is being pushed.
			if (debug) {
				stroke(255, 0, 0);
			}
		}
	
		// Simulate branch.
		branch.move();
	
		rotate(radians(branch.angle));
		
		// Draw branch.
		line(0, 0, branch.length, 0);
	
		if (debug) {
			// Draw debug points.
			if (d < 200) {
				stroke(0, 255, 0);
				strokeWeight(5);
				point(0, 0);
			}
		}
	
		translate(branch.length, 0);
		
		// Continue iterating to children branches, and pass world values.
		for (let i = 0; i < branch.children.length; i++) {
			treeIterator(branch.children[i], worldX, worldY, worldA);
		}
	pop();
}