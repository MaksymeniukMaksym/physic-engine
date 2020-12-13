import { SolidBody } from '../../models/solid-body.model';
import { Circle } from '../../models/circle.model';
import { MouseConstraint } from '../../constraints/mouse.constraint';
import { SpringConstraint } from '../../constraints/spring.constraint';
import { MouseDragConstrait } from '../../constraints/mouse-drag.constrait';
import { MouseOverlayConstraint } from '../../constraints/mouse-overlay.constraint';
import { Injectable } from '@angular/core';
import { MouseMoveService } from 'src/app/core/services/mouse.service';
import { Point } from 'src/app/core/models/point';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Injectable()
export class BodiesFactory {
  constructor(private mouseMoveService: MouseMoveService, private breakpointService: BreakpointService) {}

  public buildBodies(bubblesNodes: NodeList, initialPosition: Point): SolidBody[] {
    const bubbles: SolidBody[] = [];
    for (let i = 0; i < bubblesNodes.length; i++) {
      const circle = new Circle(bubblesNodes[i], initialPosition);
      bubbles.push(circle);
    }
    this.applyConstraints(bubbles);
    return bubbles;
  }

  private applyConstraints(bodies: SolidBody[]): void {
    for (let i = 0; i < bodies.length; i++) {
      const currentBody = bodies[i];

      const position = new Point(
        currentBody.size.x + currentBody.size.width / 2,
        currentBody.size.y + currentBody.size.width / 2
      );
      const springConstraint = new SpringConstraint(position);
      const mouseConstraint = new MouseConstraint(this.mouseMoveService, this.breakpointService);
      const mouseOverlayConstraint = new MouseOverlayConstraint(this.mouseMoveService);
      const mouseDragConstrait = new MouseDragConstrait(this.mouseMoveService, bodies);

      currentBody.constraints.push(springConstraint);
      currentBody.constraints.push(mouseConstraint);
      currentBody.constraints.push(mouseOverlayConstraint);
      currentBody.constraints.push(mouseDragConstrait);
    }
  }
}
