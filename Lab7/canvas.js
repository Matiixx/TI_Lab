const btn = document.getElementById("btn")

btn.addEventListener("click", (e) => {
  e.preventDefault()
  const x = document.getElementById("input-x").value;
  const y = document.getElementById("input-y").value;
  const r = document.getElementById("input-r").value;
  drawCanvas(parseInt(x), parseInt(y), parseInt(r));
  drawSVG(parseInt(x), parseInt(y), parseInt(r));
})

function drawSVG(x, y, r) {
  const svgDiv = document.getElementById("svg");
  svgDiv.innerHTML = "";
  if (r >= y) r = y - 1;
  if (r >= x) r = x - 1;

  var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  shape.cx.baseVal.value = x;
  shape.cy.baseVal.value = y;
  shape.r.baseVal.value = r;
  shape.setAttribute("fill", "green");

  svgDiv.appendChild(shape);
}

function drawCanvas(x, y, r) {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 500;

  const drawCircle = (context, x, y, r) => {
    context.beginPath();
    if (r >= y) r = y - 1;
    if (r >= x) r = x - 1;
    context.arc(x, y, r, 0, 2 * Math.PI);
    context.stroke();
  }

  const draw = (context) => {
    drawCircle(context, x, y, r);
  };

  draw(context);
}