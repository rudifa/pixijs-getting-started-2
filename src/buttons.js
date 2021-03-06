function onTouchDown2(e) {
  console.log("onTouchDown", e);
}

/**
 * Displays the text
 */
export class Text extends PIXI.Text {
  constructor(x, y, text) {
    super(text, {
      font: "bold 32px Helvetica",
      fill: "#0077ff",
    });
    this.x = x;
    this.y = y;
  }
}

/**
 * Provides pushbutton behavior for subclasses
 * On buttonUp calls fncButtonUp
 */
export let PushbuttonMixin = (superclass) =>
  class extends superclass {
    constructor(onClick, ...rest) {
      //console.log("PushbuttonMixin", ...arguments);
      super(...rest);
      this.onClick = onClick;
      try {
        this.anchor.set(0.5);
      } catch (error) {}
      this.interactive = true;
      this.buttonMode = true;
      this.on("click", this.onButtonUp);
    }

    onButtonDown() {
      this.isdown = true;
      this.alpha = 0.8;
      //console.log("down");
    }

    onButtonUp() {
      this.isdown = false;
      this.alpha = 1.0;
      //console.log("up", this.text);
      if (typeof this.onClick === "function") {
        this.onClick(this.text);
      }
    }

    onButtonOver() {
      this.isOver = true;
      this.alpha = 0.8;
      //console.log("over");
    }

    onButtonOut() {
      this.isOver = false;
      this.alpha = 1.0;
      //console.log("out");
    }
  };

/**
 * Provides onClick behavior for subclasses
 * On click event calls onClick(text)
 *
 * @param {*} onClick - callback(text)
 * @param  {...any} rest - arguments for the superclass
 */
export let ClickMixin = (superclass) =>
  class extends superclass {
    constructor(onClick, ...rest) {
      //console.log("ClickMixin", ...arguments);
      super(...rest);
      try {
        this.anchor.set(0.5);
      } catch (error) {}
      this.interactive = true;
      this.buttonMode = true;
      this.on("click", () => {
        onClick(this.text);
      });
    }
  };

/**
 * Creates a text pushbutton
 * On click event calls onClick
 *  app.stage.addChild(
 *      new TextButton2(350, 30, "five", (text) => console.log(text))
 *  );
 *
 * @param {*} onClick - callback(text)
 * @param {*} x - center.x
 * @param {*} y - center.y
 * @param {*} text - button text + identifier in callback
 */
export class TextButton extends ClickMixin(Text) {
  constructor(onClick, x, y, text) {
    //console.log("TextButton2", ...arguments);
    super(...arguments);
  }
}

/**
 * Creates a circle
 *
 * @param {*} x
 * @param {*} y
 * @param {*} radius
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class Circle3 extends PIXI.Graphics {
  constructor(x, y, radius, fillcolor, strokecolor, text) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 1.0);
    this.drawCircle(0, 0, radius);
    this.endFill();
    this.text = text;
    this.x = x;
    this.y = y;
  }
}

/**
 * Creates a circle pushbutton
 * On click calls onClick
 *
 * @param {*} onClick - callback()
 * @param {*} x
 * @param {*} y
 * @param {*} radius
 * @param {*} fillcolor
 * @param {*} strokecolor
 *
 * Usage example:
 *   menuApplication.stage.addChild(
 *       new CircleButton3(replaceCurrentApp, 320, 30, 15, 0xffffff, 0x000000)
 *   );
 */
export class CircleButton3 extends PushbuttonMixin(Circle3) {
  constructor(onClick, x, y, radius, fillcolor, strokecolor) {
    //console.log("CircleButton3", ...arguments);
    super(...arguments);
  }
}
