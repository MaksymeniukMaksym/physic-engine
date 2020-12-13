import { Point } from './../../../core/models/point';
import { MouseMoveService } from './../../../core/services/mouse.service';
import { Constraint } from '../models/constraint';
import { Circle } from '../models/circle.model';

export class MouseOverlayConstraint extends Constraint {
  constructor(private mouseMoveService: MouseMoveService) {
    super(new Point(0, 0));
  }
  apply(body: Circle) {
    this.bodyChange(body);
    this.bodyResize(body);
  }

  private bodyResize(body: Circle): void {
    let sizeK = body.size.width / body.initSize.width ? body.size.width / body.initSize.width : 0;
    const maxSizeK = 1.1;
    if (this.mouseInCircle(body) && sizeK < maxSizeK) {
      sizeK += 0.01;
    } else if (!this.mouseInCircle(body) && sizeK > 1) {
      sizeK -= 0.01;
    }

    body.radius = (body.initSize.width / 2) * sizeK;
    body.size.width = body.size.height = body.radius * 2;
  }

  private bodyChange(body: Circle) {
    if (!this.mouseInCircle(body)) {
      body.element.classList.remove('mouse-overlay');
    } else {
      body.element.classList.add('mouse-overlay');
    }
  }
  private mouseInCircle(circle: Circle): boolean {
    const mouse = this.mouseMoveService.lastPosition;

    const distanceSqr =
      (mouse.x - circle.position.x) * (mouse.x - circle.position.x) +
      (mouse.y - circle.position.y) * (mouse.y - circle.position.y);
    return (this.notEmptyBubble(circle) && distanceSqr <= circle.radius * circle.radius) || circle.isDragged;
  }
  private notEmptyBubble(circle: Circle): boolean {
    return !!circle.element.childElementCount;
  }
}
