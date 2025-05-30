import React from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";

function p5Sketch(p) { // Renamed from 'sketch' to avoid conflict with a potential 'sketch' variable if this file was named sketch.js
  // --- Sketch Variables (originally globals, now scoped to this function) ---
  let maxLevel = 4;
  let branchForce = 0.5;
  let rootBranches = [];
  let debug = false;
  let count = 0;

  // --- Branch.js.js content (adapted) ---
  // The Branch constructor needs to be defined *inside* this p5Sketch function
  // so it can access 'p' and other sketch-scoped variables like 'maxLevel'.
  function Branch(length, angle, level) {
    this.vel = 0;
    this.acc = 0;
    this.level = level;
    this.angle = angle;
    this.restAngle = angle;
    this.length = length;
    this.children = [];
    // this.leaves = []; // Not used in the original Branch.js
    count++;
    this.index = count;

    this.newBranch = function(branchAngle, mult) {
      // 'Branch' here refers to the constructor defined in this scope
      let newBranch = new Branch(this.length * mult, branchAngle, this.level + 1);
      this.children.push(newBranch);
      return newBranch;
    };

    this.applyForce = function(forceVal) {
      this.acc += forceVal;
    };

    this.move = function() {
      let windMult = p.map(this.level, 0, maxLevel, 0.1, 1) * p.random(0.75, 1.25);
      let wind = p.noise((p.frameCount + this.index) * 0.005) * windMult;
      this.applyForce(wind);

      let angleThresh = 10;
      let spring = p.createVector(this.restAngle, 0);
      let distance = p.dist(this.angle, 0, this.restAngle, 0);
      let forceOnBranch = p.map(p.min(distance, angleThresh), 0, angleThresh, 0, branchForce);

      spring.sub(p.createVector(this.angle, 0));
      spring.normalize();
      spring.mult(forceOnBranch);
      this.applyForce(spring.x);

      this.vel *= 0.95;
      this.vel += this.acc;
      this.angle += this.vel;
      this.angle = p.constrain(this.angle, this.restAngle - 45, this.restAngle + 45);
      this.acc = 0;
    };
  }

  // --- Utils.js.js content (adapted) ---
  function subDivide(branch) {
    let newBranches = [];
    let newBranchCount = p.int(p.random(1, 4));
    let minLength = 0.7;
    let maxLength = 0.85;

    if (newBranchCount === 2) {
      newBranches.push(branch.newBranch(p.random(-45.0, -10.0), p.random(minLength, maxLength)));
      newBranches.push(branch.newBranch(p.random(10.0, 45.0), p.random(minLength, maxLength)));
    } else if (newBranchCount === 3) {
      newBranches.push(branch.newBranch(p.random(-45.0, -15.0), p.random(minLength, maxLength)));
      newBranches.push(branch.newBranch(p.random(-10.0, 10.0), p.random(minLength, maxLength)));
      newBranches.push(branch.newBranch(p.random(15.0, 45.0), p.random(minLength, maxLength)));
    } else {
      newBranches.push(branch.newBranch(p.random(-45.0, 45.0), p.random(minLength, maxLength)));
    }

    for (let i = 0; i < newBranches.length; i++) {
      if (newBranches[i].level < maxLevel) {
        subDivide(newBranches[i]);
      }
    }
  }

  function generateNewTree() {
    rootBranches = [];
    count = 0; // Reset count for new tree
    for (let a = 0; a < 360; a += 12) {
      // Pass 'p' to Branch if it were to use p5 functions directly in constructor,
      // but here Branch is defined in the same scope, so it has access to 'p'.
      let newBranch = new Branch(p.random(30.0, 100.0), a, 0);
      rootBranches.push(newBranch);
      subDivide(newBranch);
    }
  }

  function treeIterator(branch, worldX, worldY, worldA) {
    worldA += branch.angle;
    let vec = p.createVector(branch.length, 0);
    vec.rotate(p.radians(worldA));

    // These are relative coordinates within the translated space
    let currentBranchTipX = worldX + vec.x;
    let currentBranchTipY = worldY + vec.y;

    p.push();
    p.stroke(p.map(branch.level, 0, maxLevel, 255, 50));
    p.strokeWeight(maxLevel - branch.level + 1);

    // Mouse interaction: Compare mouse (translated to center) with branch tip (also in translated coords)
    let d = p.dist(p.mouseX - p.width / 2, p.mouseY - p.height / 2, currentBranchTipX, currentBranchTipY);
    let distThresh = 300;

    if (d < distThresh) {
      let interactionForce = p.map(d, 0, distThresh, 1.5, 0);
      if ((p.mouseX - p.width / 2) > currentBranchTipX) { // If mouse is to the right of the branch tip (in centered coords)
        interactionForce *= -1;
      }
      interactionForce *= p.map(branch.level, 0, maxLevel, 0.2, 1);
      branch.applyForce(interactionForce);
      if (debug) {
        p.stroke(255, 0, 0);
      }
    }

    branch.move();
    p.rotate(p.radians(branch.angle));
    p.line(0, 0, branch.length, 0); // Draw from current origin along rotated x-axis

    if (debug) {
      if (d < 200) { // d is distance to branch tip
        p.stroke(0, 255, 0);
        p.strokeWeight(5);
        p.point(branch.length, 0); // Mark the tip of the branch in its local rotated coord system
      }
    }

    p.translate(branch.length, 0); // Move origin to the tip of the current branch

    for (let i = 0; i < branch.children.length; i++) {
      // Pass the new relative origin (0,0) for children. WorldA is cumulative.
      treeIterator(branch.children[i], 0, 0, worldA);
    }
    p.pop();
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight); // The wrapper handles where this canvas goes.
    generateNewTree();
  };

  p.draw = () => {
    p.background(0);
    p.push();
    p.translate(p.width / 2, p.height / 2); // Center the coordinate system for drawing the tree
    for (let i = 0; i < rootBranches.length; i++) {
      // Initial call: Start drawing each root branch from the centered origin (0,0)
      treeIterator(rootBranches[i], 0, 0, 0);
    }
    p.stroke(230);
    p.strokeWeight(25);
    p.point(0, 0); // Central point in the translated system
    p.pop();

    // Text drawn in top-left corner of the actual canvas
    p.fill(255);
    p.noStroke();
    p.text(
      "".concat(
        "Click to change to a new shape.\n",
        "Middle-click to toggle debug mode.\n",
        "Move the mouse over to interact with it.\n",
        "\n",
        "Debug mode: ", debug
      ),
      50, 50
    );
  };

  p.mousePressed = () => {
    if (p.mouseButton === p.CENTER) {
      debug = !debug;
    } else if (p.mouseButton === p.LEFT || p.mouseButton === p.RIGHT) { // Allow right click also to change tree for convenience
      generateNewTree();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}


const P5SketchComponent = () => { // Renamed the component
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
      <ReactP5Wrapper sketch={p5Sketch} />
    </div>
  );
};

export default P5SketchComponent; 