// ------------------------------------------
// based on https://codepen.io/yutakam80/pen/EVodQJ

class Circle_1 extends PIXI.Graphics {
  constructor(radius, alpha) {
    super();

    this.alpha = alpha;
    this.beginFill(0xf00d0f, 1);
    this.drawCircle(0, 0, radius);
    this.endFill();
  }
}

class CircleContainer extends PIXI.Container {
  constructor(width, height) {
    super();

    this.circles = new Array();
    this.w = width;
    this.h = height;
    this.addCircles();
  }

  addCircles() {
    for (var i = 0; i < 400; i++) {
      let radius = Math.floor(Math.random() * 20 + 1);
      let alpha = Math.random();

      let circle = new Circle_1(radius, alpha);
      this.circles.push(circle);
      circle.count = this.w * Math.random();
      circle.reg = Math.random() * 10 + 1;
      circle.friction = Math.random() * 2;
      this.addChild(circle);
    }
  }

  update() {
    //console.log(`update ${this.w} ${this.h}`);
    for (var circle of this.circles) {
      circle.x =
        Math.sin(circle.count) * (this.w / circle.reg) +
        this.w / 2 / circle.friction;
      circle.y =
        Math.cos(circle.count) * (this.h / circle.reg) +
        this.h / 2 / circle.friction;
      circle.count += 0.01;
    }
  }
}

// -------------------------------------------------

export class AppCircles extends PIXI.Application {
  constructor(options) {
    super(options);

    this.container = new CircleContainer(options.width, options.height);
    this.stage.addChild(this.container);
    this.animate();
  }

  animate() {
    this.container.update();
    this.renderer.render(this.stage);
    window.requestAnimationFrame(this.animate.bind(this));
  }
}
