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
    context.strokeStyle = "#a12";
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

  const drawFunction = (context, a, b) => {
    const y = (x) => {
      return a * x + b;
    };
    context.beginPath();
    context.strokeStyle = "#000";
    for (let x = 0; x < canvas.width; x += 0.1) {
      context.fillRect(x, canvas.height - y(x), 1, 1);
    }
    context.stroke();
  };

  const draw = (context) => {
    drawLines(context);
    drawAxis(context);
    drawFunction(context, 0.5, 0);
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
