import { Point } from '@core/models/point';
import { Constraint } from '../models/constraint';
import { SolidBody } from '../models/solid-body.model';
import { Vector } from '../models/vector.model';
import { VectorMath } from '../core/vector-math';
export class ScaleConstraint extends Constraint {
  constructor(pos: Point) {
    super(pos);
  }
  private maxLenght = 0;

  apply(body: SolidBody) {
    const vectorLenght = new Vector(
      new Point(body.position.x + body.size.width / 2, body.position.y + body.size.height / 2),
      this.position
    ).getLength();

    if (this.maxLenght < vectorLenght) {
      this.maxLenght = vectorLenght;
      body.transformations.scale = 1;
      return;
    }

    let scale = vectorLenght / this.maxLenght;
    if (scale > 1) {
      scale = 1;
    }
    if (scale < 0.1) {
      body.isMustDelete = true;
      scale = 0;
    }
    body.size.width = body.initSize.width * scale;
    body.size.height = body.initSize.height * scale;

    body.transformations.scale = scale;
  }
}
