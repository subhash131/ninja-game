type Axis = {
  x: number;
  y: number;
};
type Constructor = {
  position: Axis;
  canvas: HTMLCanvasElement;
  velocity: Axis;
  color: string;
  offset: Axis;
};
const GRAVITY = 0.2;

export class Sprite {
  keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
  };
  lastKey = "";
  position;
  velocity;
  canvasContext;
  canvas;
  height = 150;
  width = 50;
  attackBox;
  color;
  isAttacking = false;
  constructor({
    position,
    canvas,
    velocity,
    color = "red",
    offset,
  }: Constructor) {
    this.position = position;
    this.canvas = canvas;
    this.canvasContext = canvas.getContext("2d");
    this.canvasContext?.fillRect(0, 0, canvas?.width, canvas?.height);
    this.velocity = velocity;
    this.attackBox = {
      position: { x: this.position.x, y: this.position.y },
      height: 50,
      width: 100,
      offset,
    };
    this.color = color;
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  draw() {
    if (this.canvasContext) {
      this.canvasContext.fillStyle = this.color;
      this.canvasContext.fillRect(this.position.x, this.position.y, 50, 150);

      //attack box
      if (this.isAttacking) {
        this.canvasContext.fillStyle = "green";
        this.canvasContext.fillRect(
          this.attackBox.position.x,
          this.attackBox.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
      }
    }
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x = 0;
    this.velocity.x = 0;
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    //player
    if (this.keys.a.pressed && this.lastKey === "a") {
      this.velocity.x = -5;
    } else if (this.keys.d.pressed && this.lastKey === "d") {
      this.velocity.x = 5;
    }
    //enemy
    if (this.keys.ArrowLeft.pressed && this.lastKey === "ArrowLeft") {
      this.velocity.x = -5;
    } else if (this.keys.ArrowRight.pressed && this.lastKey === "ArrowRight") {
      this.velocity.x = 5;
    }
    //y-position(gravity)
    if (this.position.y + this.height >= this.canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += GRAVITY;
    }
  }
}
