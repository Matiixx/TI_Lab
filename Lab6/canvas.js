(() => {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  const drawLines = (context) => {
    context.beginPath();
    context.strokeStyle = "#ddd";
    context.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 15) {
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += 15) {
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
    }
    context.stroke();
  };

  const drawAxis = (context) => {
    context.beginPath();
    context.strokeStyle = "#4339c7";
    context.lineWidth = 2;

    //X
    context.moveTo(0, 0.95 * canvas.height);
    context.lineTo(0.95 * canvas.width, 0.95 * canvas.height);
    context.moveTo(0.95 * canvas.width, 0.95 * canvas.height);
    context.lineTo(0.93 * canvas.width, 0.93 * canvas.height);
    context.moveTo(0.95 * canvas.width, 0.95 * canvas.height);
    context.lineTo(0.93 * canvas.width, 0.97 * canvas.height);

    //Y
    context.moveTo(0.05 * canvas.width, canvas.height);
    context.lineTo(0.05 * canvas.width, 0.05 * canvas.height);
    context.moveTo(0.05 * canvas.width, 0.05 * canvas.height);
    context.lineTo(0.03 * canvas.width, 0.07 * canvas.height);
    context.moveTo(0.05 * canvas.width, 0.05 * canvas.height);
    context.lineTo(0.07 * canvas.width, 0.07 * canvas.height);

    context.stroke();
  };

  const drawFunction = (context) => {

    context.beginPath();
    context.strokeStyle = "#4339c7";
    context.lineWidth = 2;

    context.moveTo(0.03 * canvas.width, 0.8 * canvas.height)
    context.lineTo(0.6 * canvas.width, 0.1 * canvas.height)

    context.stroke();
  };

  const drawText = (context) => {
    context.font = "bold 20px sans-serif";
    context.fillText("y", 0.05 * canvas.width - 20, 0.5 * canvas.height);
    context.fillText("x", 0.5 * canvas.width, 0.96 * canvas.height + 20)

    context.font = "bold 40px sans-serif";
    context.fillText("y = ax + b", 0.4 * canvas.width, 0.5 * canvas.height)

  }

  const draw = (context) => {
    drawLines(context);
    drawAxis(context);
    drawFunction(context);
    drawText(context);
  };

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(context);
  };
  window.addEventListener("resize", resize, false);

  resize();
  draw(context);
})();
