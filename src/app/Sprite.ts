type Position = {
  x: number;
  y: number;
};

export class Sprite {
  position: Position;
  canvasContext: CanvasRenderingContext2D;
  constructor(position: Position, canvasContext: CanvasRenderingContext2D) {
    this.position = position;
    this.canvasContext = canvasContext;
  }
  draw() {
    this.canvasContext.fillStyle = "red";
    this.canvasContext.fillRect(this.position.x, this.position.y, 50, 150);
  }
}
