import { Point } from './../../../core/models/point';
import { SolidBody } from './solid-body.model';

export abstract class Constraint {
  position: Point;

  constructor(pos: Point) {
    this.position = {
      x: pos.x,
      y: pos.y
    };
  }

  abstract apply(body: SolidBody): void;
}
