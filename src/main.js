import "./style.css";
import Utils from "./utils.js";

window.onload = () => {
  const canvas = document.querySelectorAll("#canvas")[0];
  const context = canvas.getContext("2d");
  const u = new Utils();

  const screen = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  window.onresize = () => {
    (canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
  };
  canvas.width = screen.w;
  canvas.height = screen.h;

  class Circle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  const circle = new Circle(
    screen.w / 2,
    screen.h / 2,
    20,
    u.colors[u.random(0, 15, true)],
  );

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    circle.draw();
    requestAnimationFrame(animate);
  };

  animate();
};
