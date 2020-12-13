import { SolidBody } from './solid-body.model';
import { Point } from '@core/models/point';

export class Block extends SolidBody {
  constructor(element: Node, initPosition: Point) {
    super(element, initPosition);
  }
}
