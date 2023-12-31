import * as PIXI from "pixi.js";

class Layer {
  constructor() {
    this.container = new PIXI.Container();
  }

  addRectangle(rectangle) {
    this.container.addChild(rectangle.graphics);
  }
}

export { Layer };
