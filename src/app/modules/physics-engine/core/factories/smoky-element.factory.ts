import { Vector } from '../../models/vector.model';
import { Point } from '../../../../core/models/point';
import { Circle } from '../../models/circle.model';
import { SolidBody } from '../../models/solid-body.model';
import { SmokeConstraint } from '../../constraints/smoke.constraint';
import { Injectable } from '@angular/core';

@Injectable()
export class SmokyElementFactory {
  constructor() {}

  public buildElement(element: Node, velocity: Vector, sizeChange: number): SolidBody {
    const circle = new Circle(element, new Point(0, 0));
    const smokeConstraint = new SmokeConstraint(velocity, sizeChange);

    circle.constraints.push(smokeConstraint);
    return circle;
  }
}
