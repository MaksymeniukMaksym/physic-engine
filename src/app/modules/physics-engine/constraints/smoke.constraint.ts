import { style } from '@angular/animations';
import { VectorMath } from '../core/vector-math';
import { Circle } from '../models/circle.model';
import { Constraint } from '../models/constraint';
import { Point } from '@core/models/point';
import { Vector } from '../models/vector.model';

export class SmokeConstraint extends Constraint {
  constructor(private velocity: Vector, private sizeChange: number) {
    super(new Point(0, 0));
  }

  apply(body: Circle) {
    if (body.isDragged) {
      this.change(body);
    }
  }

  change(body: Circle) {
    let newRadius = body.radius + this.sizeChange;
    if (newRadius > 1000) {
      newRadius = 1000;
    }

    const scale = newRadius / (body.initSize.width / 2);

    body.radius = newRadius;
    body.transformations.translate.x += this.velocity.x / 30;
    body.transformations.translate.y += this.velocity.y / 30;
    body.transformations.scale = scale;
  }
}
