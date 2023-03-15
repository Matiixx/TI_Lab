function GridPoints() {
  var sketch = (p) => {
    var canvas;
    const N = 5;
    const DIMENSION = Math.pow(2, N) + 1;
    const TRANSLATE_RANGE = 50;

    p.setup = () => {
      const divWrapper = document.querySelector("#canvas-wrapper");
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.position(0, 0);
      canvas.parent(divWrapper);
    };

    p.draw = () => {
      p.frameRate(60);
      p.background(0);

      p.translate(
        p.map(
          p.mouseX,
          0,
          window.innerWidth,
          -TRANSLATE_RANGE,
          TRANSLATE_RANGE
        ),
        p.map(
          p.mouseY,
          0,
          window.innerHeight,
          -TRANSLATE_RANGE,
          TRANSLATE_RANGE
        )
      );

      p.strokeWeight(2);
      p.stroke(255);

      for (let i = 0; i < DIMENSION; i++)
        for (let j = 0; j < DIMENSION; j++)
          p.point(
            p.map(i, 0, DIMENSION - 1, 0, window.innerWidth),
            p.map(j, 0, DIMENSION - 1, 0, window.innerWidth)
          );
    };
  };
  var myP5 = new p5(sketch);
}
