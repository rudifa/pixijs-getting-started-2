import {
  Circle,
  DraggableCircle,
  Square,
  DraggableSquare,
  HexaGrid,
  DragSnapHexagonCluster,
  Hexagon,
  DragSnapHexagon,
  SnappingHexagon,
} from "./hexagons.js";

class HexaSprite extends PIXI.Sprite {
  constructor(x, y, imageFilePath) {
    super(PIXI.Texture.from(imageFilePath));

    this.anchor.set(0.5);
    this.x = x;
    this.y = y;
  }
}

export class HexaApplication extends PIXI.Application {
  constructor(options) {
    super({
      ...options,
      antialias: true,
      autoDensity: true, // !!!
      resolution: 2,
    });

    //this.renderer.plugins.interaction.moveWhenInside = true; // NBG!

    // add HexaSprite

    this.hexaSprite = new HexaSprite(0, 0, "assets/7-hexagons.png");
    this.stage.addChild(this.hexaSprite);

    this.ticker.add((delta) => {
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      this.hexaSprite.rotation += 0.02 * delta;
    });

    let side = 40;

    // add horizontal grid
    let horizontalGrid = new HexaGrid(15, 6, 0, 0, side, false, null, 0x00cc77);
    this.stage.addChild(horizontalGrid);

    // add vertical grid
    let verticalGrid = new HexaGrid(
      16,
      4,
      0,
      12 * side,
      side,
      true,
      null,
      0xff5522
    );
    this.stage.addChild(verticalGrid);

    let dragHexagons = new DragSnapHexagonCluster(true, 0xff5522);
    this.stage.addChild(dragHexagons);

    let dragHexagons3 = new DragSnapHexagonCluster(false, 0x00cc77);
    this.stage.addChild(dragHexagons3);

    // add more objects

    this.stage.addChild(new Circle(100, 100, 50, 0x222222, 0x778899));
    this.stage.addChild(new DraggableCircle(100, 200, 50, 0x22ff22, 0xffffff));

    this.stage.addChild(new Square(200, 100, 100, 0xbbbbbb, 0x778899));
    this.stage.addChild(new DraggableSquare(200, 200, 100, 0xaa2222, 0xffffff));

    // this.stage.addChild(new Hexagon(40, 540, 40, true, 0xffffff, 0xff0000));
    // this.stage.addChild(new Hexagon(120, 540, 40, true, 0xffffff, 0x00ff00));
    // this.stage.addChild(new Hexagon(200, 540, 40, true, 0xffffff, 0x0000ff));

    // this.stage.addChild(new Hexagon(40, 620, 40, false, 0xff0000, 0xffffff));
    // this.stage.addChild(new Hexagon(120, 620, 40, false, 0x00ff00, 0xffffff));
    // this.stage.addChild(new Hexagon(200, 620, 40, false, 0x0000ff, 0xffffff));

    // this.stage.addChild(
    //   new DragSnapHexagon(40, 720, 40, false, 0xff0000, 0xffffff)
    // );

    this.stage.addChild(
      new DragSnapHexagon(120, 720, 40, false, 0x0099ff, 0xffffff)
    );

    this.stage.addChild(
      new SnappingHexagon(120, 650, 40, false, 0x0099ff, 0xffffff)
    );

    this.stage.addChild(
      new DragSnapHexagon(200, 720, 40, true, 0xff00ff, 0xffffff)
    );

    this.stage.addChild(
      new SnappingHexagon(280, 720, 40, true, 0xff00ff, 0xffffff)
    );
  }
}
