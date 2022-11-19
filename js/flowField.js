function FlowField() {
  var sketch = (p) => {

    var canvas;
    var grid = [];
    var resolution;
    var cols;
    var rows;

    const VECTOR_LENGTH = 10;
    const INC = 0.005;
    var LINE_LENGTH = 500;
    const STEP_LENGTH = 1;
    const LINE_COUNT = 20;
    const RANDOM_NOISE_MAX = 1;
    const NOISE_INC = p.random(1, 16);

    p.setup = () => {
      const divWrapper = document.querySelector("#canvas-wrapper");
      canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas.position(0, 0);
      canvas.parent(divWrapper);

      resolution = parseInt(p.windowWidth * INC);
      cols = parseInt(p.windowWidth / resolution) + 1;
      rows = parseInt(p.windowHeight / resolution) + 1;


      let y_offset = 0;
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        let x_offset = 0;
        for (let r = 0; r < rows; r++) {
          let angle = p.noise(x_offset, y_offset) * NOISE_INC * p.PI;
          grid[c].push(angle);
          x_offset += INC;
        }
        y_offset += INC;
      }
      p.background(0);
      // p.strokeWeight(1);
      // p.stroke(255);

      // for (let c = 0; c < cols; c++) {
      //   for (let r = 0; r < rows; r++) {
      //     let startPos = p.createVector(c * resolution, r * resolution)
      //     p.strokeWeight(1);
      //     let stepPos = p5.Vector.fromAngle(grid[c][r]);
      //     p.line(startPos.x, startPos.y, startPos.x + VECTOR_LENGTH * stepPos.x, startPos.y + VECTOR_LENGTH * stepPos.y);
      //   }
      // }
    }

    p.draw = () => {
      p.frameRate(60);



      LINE_LENGTH = 2 * p.windowWidth;
      p.noFill();
      p.stroke(255, 255, 255, 2)

      if (Math.random() > 0.5) {
        for (let l = 0; l < LINE_COUNT; l++) {
          p.beginShape();
          let coords = p.createVector(p.random(0, p.windowWidth), p.random(0, p.windowHeight));
          for (let i = 0; i < LINE_LENGTH; i++) {
            p.vertex(coords.x, coords.y);

            let colIndex = parseInt(coords.x / resolution);
            let rowIndex = parseInt(coords.y / resolution);

            if (grid[colIndex] === undefined || grid[colIndex][rowIndex] === undefined) break;

            let stepPos = p5.Vector.fromAngle(grid[colIndex][rowIndex]);
            coords = p.createVector(coords.x + stepPos.x + p.random(-RANDOM_NOISE_MAX, RANDOM_NOISE_MAX),
              coords.y + stepPos.y + p.random(-RANDOM_NOISE_MAX, RANDOM_NOISE_MAX));
          }
          p.endShape();
        }
      } else {

        let coords = p.createVector(p.random(0, p.windowWidth), p.random(0, p.windowHeight));
        while (true) {
          p.point(coords.x, coords.y);

          let colIndex = parseInt(coords.x / resolution);
          let rowIndex = parseInt(coords.y / resolution);

          if (grid[colIndex] === undefined || grid[colIndex][rowIndex] === undefined) break;

          let stepPos = p5.Vector.fromAngle(grid[colIndex][rowIndex]);
          coords = p.createVector(coords.x + stepPos.x + p.random(-RANDOM_NOISE_MAX, RANDOM_NOISE_MAX),
            coords.y + stepPos.y + p.random(-RANDOM_NOISE_MAX, RANDOM_NOISE_MAX));
        }
      }
    }
  }
  var myP5 = new p5(sketch);
}