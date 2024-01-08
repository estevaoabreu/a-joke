class Neve {

  constructor(sx, sy, gx, gy, r) {
    let x = sx;
    let y = sy;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector();
    this.ang = random(TWO_PI);
    this.dir = (random(1) > 0.5) ? 1 : -1;
    this.xOff = 0;
    this.r = random(1, r);
    this.g = createVector(gx, gy);
  }

  move() {
    this.acc.add(this.g);
    this.xOff = sin(this.ang * 2) * 2 * this.r;
    this.vel.add(this.acc);
    this.vel.limit(this.r * 0.2);
    if (this.vel.mag() < 1) {
      this.vel.normalize();
    }
    this.pos.add(this.vel);
    this.acc.mult(0);
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    }
    this.ang += this.dir * this.vel.mag() / 200;
  }

  desenha() {
    strokeWeight(0);
    stroke(255);
    fill(255);
    push();
    translate(this.pos.x + this.xOff, this.pos.y);
    circle(0, 0, this.r, this.r);
    pop();
  }
}