import "./style.css";
import Utils from "./utils.js";

window.onload = () => {
  const canvas = document.querySelectorAll("#canvas")[0];
  const context = canvas.getContext("2d");
  const u = new Utils();

  // states
  const circles_limit = 200;
  const circles = [];
  const screen = {
    w: window.innerWidth,
    h: window.innerHeight,
  };
  const mouse = {
    x: screen.w / 2,
    y: screen.h / 2,
  };

  canvas.width = screen.w;
  canvas.height = screen.h;

  window.onresize = () => {
    (canvas.width = window.innerWidth), (canvas.height = window.innerHeight);
  };
  window.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  class Circle {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = u.chose([1, -1]);
      this.dy = u.chose([1, -1]);
      this.speedX = u.random(1.2, 2.5, true);
      this.speedY = u.random(1.2, 2.5, true);
      this.radius = radius;
      this.store_radius = radius;
      this.color = color;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
    }
    animate() {
      this.x += this.dx * this.speedX;
      this.y += this.dy * this.speedY;

      if (this.x + this.radius > screen.w || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > screen.h || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      if (u.distance(this.x, this.y, mouse.x, mouse.y) < 100) {
        this.radius += 0.83;
      } else if (this.radius > this.store_radius) {
        this.radius -= 0.83;
      }
    }
  }

  // make circles
  const make_circles = () => {
    for (let i = 0; i < circles_limit; i++) {
      const a_good_circle = new Circle(
        u.random(30, screen.w, true),
        u.random(30, screen.h, true),
        u.random(10, 18, true),
        u.getColor(),
      );
      circles.push(a_good_circle);
    }
  };
  make_circles();

  const animate_circles = () => {
    for (var i = 0; i < circles_limit; i++) {
      circles[i].draw();
      circles[i].draw();
      circles[i].draw();
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
