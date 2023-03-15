function ReactionDiffusion() {
  var sketch = (p) => {
    var canvas;
    var grid = [];
    var gridNext = [];
    const DA = 1.0;
    const DB = 0.5;
    const f = 0.00878;//0.055;
    const k = 0.04481; //0.062;
    const dt = 1.0;
    var density;

    p.setup = () => {
      const divWrapper = document.querySelector("#canvas-wrapper");
      p.pixelDensity(1);
      // canvas = p.createCanvas(p.windowWidth, p.windowHeight);
      canvas = p.createCanvas(200, 200);
      canvas.position(0, 0);
      canvas.parent(divWrapper);
      density = p.pixelDensity();
      for (let x = 0; x < p.width * density; x++) {
        grid[x] = []
        gridNext[x] = [];
        for (let y = 0; y < p.height * density; y++) {
          grid[x][y] = { a: 1, b: 0 };
          gridNext[x][y] = { a: 1, b: 0 };
        }
      }

      let r1 = p.floor(getRandom(0, p.height * density));
      let r2 = p.floor(getRandom(r1, p.height * density));
      for (let x = r1; x < r2; x++) {
        for (let y = r1; y < r2; y++) {
          grid[x][y] = { a: 0, b: 1 };
        }
      }
    };

    p.draw = () => {
      p.frameRate(600);
      p.background(0);

      p.loadPixels();
      for (let x = 0; x < p.width * density; x++) {
        for (let y = 0; y < p.height * density; y++) {

          let pix = (x + y * p.width * density) * 4;
          var c = p.floor(p.abs((grid[x][y].b - grid[x][y].a)) * 255);
          c = p.constrain(c, 0, 255);
          p.pixels[pix + 0] = c;
          p.pixels[pix + 1] = c;
          p.pixels[pix + 2] = c;
          p.pixels[pix + 3] = 255;

        }
      }
      p.updatePixels();

      for (let x = 1; x < p.width * density - 1; x++)
        for (let y = 1; y < p.height * density - 1; y++)
          gridNext[x][y] = calcNextCell(x, y);

      let tmp = grid;
      grid = gridNext;
      gridNext = tmp;
    };

    function calcNextCell(x, y) {
      let a = grid[x][y].a + (
        DA * laplaceA(x, y) -
        grid[x][y].a * grid[x][y].b * grid[x][y].b +
        f * (1 - grid[x][y].a)
      ) * dt;
      let b = grid[x][y].b + (
        DB * laplaceB(x, y) +
        grid[x][y].a * grid[x][y].b * grid[x][y].b -
        (k + f) * grid[x][y].b
      ) * dt;
      return { a: p.constrain(a, 0, 1), b: p.constrain(b, 0, 1) };
    }

    function laplaceA(x, y) {
      var sum = 0;
      sum += grid[x][y].a * -1;
      sum += grid[x - 1][y].a * 0.2;
      sum += grid[x + 1][y].a * 0.2;
      sum += grid[x][y + 1].a * 0.2;
      sum += grid[x][y - 1].a * 0.2;
      sum += grid[x - 1][y - 1].a * 0.05;
      sum += grid[x + 1][y - 1].a * 0.05;
      sum += grid[x + 1][y + 1].a * 0.05;
      sum += grid[x - 1][y + 1].a * 0.05;
      return sum;
    }

    function laplaceB(x, y) {
      var sum = 0;
      sum += grid[x][y].b * -1;
      sum += grid[x - 1][y].b * 0.2;
      sum += grid[x + 1][y].b * 0.2;
      sum += grid[x][y + 1].b * 0.2;
      sum += grid[x][y - 1].b * 0.2;
      sum += grid[x - 1][y - 1].b * 0.05;
      sum += grid[x + 1][y - 1].b * 0.05;
      sum += grid[x + 1][y + 1].b * 0.05;
      sum += grid[x - 1][y + 1].b * 0.05;
      return sum;
    }

    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }

  };
  var myP5 = new p5(sketch);
}
