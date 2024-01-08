class Slider {
  constructor(xl, yl, hl, hs, w, value) {
    this.xl = xl;
    this.yl = yl;
    this.hl = hl;
    this.hs = hs;
    this.w = w;
    this.value = value;
    this.ys = yl - hl * this.value;
    this.active = false;
  }

  shapes() {
    stroke(0);
    strokeWeight(3);
    fill(255);
    rectMode(CENTER);
    line(this.xl, this.yl, this.xl, this.yl - this.hl);
    rect(this.xl, this.ys, this.w, this.hs, 3);
  }

  checkPos() {
    if (
      mouseX > this.xl - this.w / 2 &&
      mouseX < this.xl + this.w / 2 &&
      mouseY > this.ys - this.hs / 2 &&
      mouseY < this.ys + this.hs / 2
    )
      this.active = true;
  }

  updateValue() {
    if (this.active) {
      this.ys = constrain(mouseY, this.yl - this.hl, this.yl);
      this.value = map(this.ys, this.yl - this.hl, this.yl, 1, 0);
    }
  }
}