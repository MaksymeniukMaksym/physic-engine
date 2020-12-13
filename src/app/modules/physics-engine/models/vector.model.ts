import { Point } from './../../../core/models/point';

export class Vector {
  public x: number;
  public y: number;
  private length?: number;

  constructor(a?: Point, b?: Point) {
    if (a && b) {
      this.initFromPoints(a, b);
      return;
    }

    if (a) {
      this.initFromPoint(a);
      return;
    }
  }

  private initFromPoints(a: Point, b: Point) {
    this.x = b.x - a.x;
    this.y = b.y - a.y;
  }

  private initFromPoint(a: Point) {
    this.x = a.x;
    this.y = a.y;
  }

  public getLength() {
    if (!this.length) {
      this.length = Math.sqrt(this.x * this.x + this.y * this.y);
    }

    return this.length;
  }

  public isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  public asOrt(): Vector {
    if (this.isZero()) {
      return new Vector(new Point(0, 0));
    }

    return new Vector(new Point(this.x * (1 / this.getLength()), this.y * (1 / this.getLength())));
  }
}
