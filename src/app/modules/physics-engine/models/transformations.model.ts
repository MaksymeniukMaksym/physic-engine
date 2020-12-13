import { Point } from './../../../core/models/point';
import { Vector } from './vector.model';
export class Transformations {
  scale: number;
  translate: Vector;

  scaleCache: {};

  constructor() {
    this.translate = new Vector(new Point(0, 0));
    this.scale = 0;
  }

  private _prevScale: number;
  private _scaleMatrix: string;
  private _translateMatrix: string;

  public toMatrix(): string {
    if (this._prevScale !== this.scale) {
      this._scaleMatrix = 'matrix(' + this.scale + ',0,0,' + this.scale;
      this._prevScale = this.scale;
    }
    this._translateMatrix = ',' + this.translate.x + ',' + this.translate.y + ')';
    // this._matrix = 'matrix(' + this.scale + ',0,0,' + this.scale + ',' + this.translate.x + ',' + this.translate.y + ')';
    return this._scaleMatrix + this._translateMatrix;
  }
}
