function ParticlesP5() {
  var sketch = (p) => {
    var canvas;
    var particles = [];
    const NUMBER_OF_PARTICLES = 250;
    const MAX_LEN = 100;

    p.setup = () => {
      const divWrapper = document.querySelector("#particles-js");
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.position(0, 0);
      canvas.parent(divWrapper);

      for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
        particles.push(new Particle());
      }
    };

    p.draw = () => {
      p.frameRate(60);
      p.background(0);
      for (let i = 0; i < NUMBER_OF_PARTICLES; i++) {
        particles[i].update();
        particles[i].draw();
        particles[i].drawLineToNeighbor(particles[i], particles);
        particles[i].drawLineToMouse(particles[i]);
      }
    };

    class Particle {
      constructor() {
        this.size = p.random(5);
        this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
        this.position = p.createVector(
          p.random(p.windowWidth),
          p.random(p.windowHeight)
        );
      }
      draw() {
        p.stroke(255, 255, 255);
        p.strokeWeight(this.size);
        p.point(this.position);
      }
      update() {
        this.position.add(this.velocity);

        if (this.isOutOfScreen()) {
          this.velocity = p.createVector(-this.velocity.x, -this.velocity.y);
        }
      }
      isOutOfScreen() {
        return (
          this.position.x > p.windowWidth ||
          this.position.x < 0 ||
          this.position.y > p.windowHeight ||
          this.position.y < 0
        );
      }
      drawLineToNeighbor(current, particles) {
        for (let particle of particles) {
          let distance = particle.position.dist(current.position);
          if (distance <= MAX_LEN) {
            p.stroke(255, 255, 255, p.map(distance, 0, 100, 0, 255));
            p.strokeWeight(p.map(distance, 0, MAX_LEN, 0.75, 0, true));
            p.line(
              current.position.x,
              current.position.y,
              particle.position.x,
              particle.position.y
            );
          }
        }
      }
      drawLineToMouse(current) {
        let distance = current.position.dist(
          p.createVector(p.mouseX, p.mouseY)
        );
        if (distance < MAX_LEN * 2) {
          p.stroke(255, 255, 255, p.map(distance, 0, 100, 0, 255));
          p.strokeWeight(p.map(distance, 0, MAX_LEN * 2, 1, 0, true));
          p.line(current.position.x, current.position.y, p.mouseX, p.mouseY);
        }
      }
    }
  };
  var myP5 = new p5(sketch);
}
