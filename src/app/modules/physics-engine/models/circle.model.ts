import { Point } from 'src/app/core/models/point';
import { SolidBody } from './solid-body.model';

export class Circle extends SolidBody {
  radius: number;
  constructor(element: Node, initPosition: Point) {
    super(element, initPosition);
    this.radius = parseFloat((element as Element).getAttribute('r'));
  }
}
