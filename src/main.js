import "./style.css";
import Utils from "./utils.js";

window.onload = () => {
  const canvas = document.querySelectorAll("#canvas")[0];
  const context = canvas.getContext("2d");
  const u = new Utils();

  // states
  const circles_limit = 100;
  const circles = [];

  const screen = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  canvas.width = screen.w;
  canvas.height = screen.h;
  window.onresize = () => {
    (canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
  };

  class Circle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = u.chose([1, -1]);
      this.dy = u.chose([1, -1]);
      this.radius = radius;
      this.color = color;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
    }
    animate() {
      this.x += this.dx;
      this.y += this.dy;

      if (
        this.x + this.radius >= screen.w ||
        this.x + this.radius <= screen.w
      ) {
        this.x -= this.dx;
      }
      if (
        this.y + this.radius >= screen.h ||
        this.y + this.radius <= screen.h
      ) {
        this.y -= this.dy;
      }
    }
  }

  // make circles
  const make_circles = () => {
    for (let i = 0; i < circles_limit; i++) {
      const a_good_circle = new Circle(
        u.random(0, screen.w, true),
        u.random(0, screen.h, true),
        u.random(6, 10, true),
        u.getColor(),
      );
      circles.push(a_good_circle);
    }
  };
  make_circles();

  const animate_circles = () => {
    for (var i = 0; i < circles_limit; i++) {
      circles[i].draw();
      circles[i].animate();
    }
  };

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    animate_circles();
    requestAnimationFrame(animate);
  };

  animate();
};
