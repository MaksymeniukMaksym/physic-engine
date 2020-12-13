import { VectorMath } from '../core/vector-math';
import { Vector } from '../models/vector.model';
import { Constraint } from '../models/constraint';
import { Circle } from '../models/circle.model';
import { SolidBody } from '../models/solid-body.model';
import { MouseMoveService } from 'src/app/core/services/mouse.service';
import { Point } from 'src/app/core/models/point';

export class MouseDragConstrait extends Constraint {
  constructor(private mouseMoveService: MouseMoveService, allBodies: SolidBody[]) {
    super(new Point(0, 0));

    this.mouseMoveService.isPressed$.subscribe(value => {
      for (let i = 0; i < allBodies.length; i++) {
        const circle = allBodies[i] as Circle;

        circle.isDragged = value && this.isMouseInCircle(circle);
      }
    });
  }

  apply(body: Circle) {
    if (!body.isDragged) {
      return;
    }

    body.impulses = [];
    body.velocity = new Vector(body.position, this.mouseMoveService.lastPosition);
    body.velocity = VectorMath.product(body.velocity, 10);
  }

  private isMouseInCircle(circle: Circle): boolean {
    const mouse = this.mouseMoveService.lastPosition;

    const distanceSqr =
      (mouse.x - circle.position.x) * (mouse.x - circle.position.x) +
      (mouse.y - circle.position.y) * (mouse.y - circle.position.y);
    return this.isEmptyBubble(circle) && distanceSqr <= circle.radius * circle.radius;
  }

  private isEmptyBubble(circle: Circle): boolean {
    return !!circle.element.childElementCount;
  }
}
