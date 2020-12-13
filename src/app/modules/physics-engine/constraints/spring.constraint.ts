import { Point } from './../../../core/models/point';
import { Constraint } from '../models/constraint';
import { SolidBody } from '../models/solid-body.model';
import { Vector } from '../models/vector.model';
import { VectorMath } from '../core/vector-math';
export class SpringConstraint extends Constraint {
  constructor(pos: Point) {
    super(pos);
  }

  apply(body: SolidBody) {
    const vectorToCenter = new Vector(body.position, this.position);
    // const vectorToCenterReverse =  VectorMath.product(vectorToCenter, )
    const k = 5000;
    const impulse = VectorMath.product(vectorToCenter, k);
    body.impulses.push(impulse);
  }
}
