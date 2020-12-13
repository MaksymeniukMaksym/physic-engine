import { Point } from '@core/models/point';
import { Constraint } from '../models/constraint';
import { SolidBody } from '../models/solid-body.model';
import { Vector } from '../models/vector.model';
import { VectorMath } from '../core/vector-math';
export class AttractionConstraint extends Constraint {
  constructor(pos: Point) {
    super(pos);
  }
  isFirstTime = true;
  apply(body: SolidBody) {
    const vectorToCenter = new Vector(body.position, this.position);
    const k = 1500;
    const length = vectorToCenter.getLength();
    const F = (6 * (body.mass * k)) / (length * length);

    const impulse = VectorMath.product(vectorToCenter, F);
    if (this.isFirstTime) {
      this.isFirstTime = false;
      const impulseOfExplosion = VectorMath.product(impulse, this.getRandomInt(-100, -50));
      body.impulses.push(impulseOfExplosion);
    }
    body.impulses.push(impulse);
  }

  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
