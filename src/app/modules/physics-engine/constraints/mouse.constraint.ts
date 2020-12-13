import { MouseMoveService } from './../../../core/services/mouse.service';
import { BreakpointService } from './../../../core/services/breakpoint.service';
import { Point } from './../../../core/models/point';
import { VectorMath } from '../core/vector-math';
import { Constraint } from '../models/constraint';
import { SolidBody } from '../models/solid-body.model';
import { Vector } from '../models/vector.model';

export class MouseConstraint extends Constraint {
  constructor(private mouseMoveService: MouseMoveService, private breakpointService: BreakpointService) {
    super(new Point(0, 0));
  }

  apply(body: SolidBody) {
    if (this.breakpointService.isMobile) {
      return;
    }
    let vector = new Vector(body.position, this.mouseMoveService.lastPosition);
    let distance = vector.getLength();

    const k = 400000;
    vector = vector.asOrt();

    let impulse;
    const r = body.size.width / 2;
    if (distance < r) {
      // its work
      // manually deduced the coefficient of the formula for fixing the shaking of bubbles in the center of the circle
      const d = Math.sqrt(1 - Math.pow(1 - distance / r, 2));
      distance = body.size.width / 2;
      impulse = VectorMath.product(vector, (body.mass * k * d) / (distance * distance));
    } else {
      impulse = VectorMath.product(vector, (body.mass * k) / (distance * distance));
    }

    body.impulses.push(impulse);
  }
}
