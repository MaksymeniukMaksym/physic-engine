export interface BoundRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Size implements BoundRectangle {
  x: number;
  y: number;
  width: number;
  height: number;

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }

  constructor(rect: BoundRectangle) {
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
}
