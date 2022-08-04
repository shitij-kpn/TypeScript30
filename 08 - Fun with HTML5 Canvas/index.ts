const canvas = <HTMLCanvasElement>document.querySelector("canvas");
const context = <CanvasRenderingContext2D>canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = "#BADA55";
context.lineJoin = "round";
context.lineCap = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;

function draw(e: PointerEvent) {
  if (!isDrawing) return;
  context.strokeStyle = `hsl(${hue},100%,50%)`;
  hue++;
  hue %= 360;
  context.moveTo(lastX, lastY);
  context.lineTo(e.offsetX, e.offsetY);
  context.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

window.addEventListener("pointermove", draw);
window.addEventListener("pointerdown", (e: PointerEvent) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
window.addEventListener("pointerup", () => (isDrawing = false));
window.addEventListener("pointerout", () => (isDrawing = false));
