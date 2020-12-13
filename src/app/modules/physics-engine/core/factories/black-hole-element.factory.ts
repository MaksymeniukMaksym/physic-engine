import { Block } from './../../models/block.model';
import { SolidBody } from '../../models/solid-body.model';
import { Point } from '@core/models/point';
import { Injectable } from '@angular/core';
import { AttractionConstraint } from '@modules/physics-engine/constraints/attraction.constrait';
import { ScaleConstraint } from '@modules/physics-engine/constraints/scale.constraint';

@Injectable()
export class BlackHoleElementFactory {
  constructor() {}

  public buildBlock(bubblesNodes: Array<any>, initialPosition: Point, blackHolePosition: Point): SolidBody[] {
    const bubbles: SolidBody[] = [];
    for (let i = 0; i < bubblesNodes.length; i++) {
      const circle = new Block(bubblesNodes[i], initialPosition);
      bubbles.push(circle);
    }
    this.applyConstraints(bubbles, blackHolePosition);
    return bubbles;
  }

  private applyConstraints(bodies: SolidBody[], springPoint: Point): void {
    for (let i = 0; i < bodies.length; i++) {
      const currentBody = bodies[i];

      const springConstraint = new AttractionConstraint(
        new Point(springPoint.x - currentBody.initSize.width / 2, springPoint.y - currentBody.initSize.height / 2)
      );
      const scaleConstraint = new ScaleConstraint(
        new Point(springPoint.x - currentBody.initSize.width / 2, springPoint.y - currentBody.initSize.height / 2)
      );

      currentBody.constraints.push(springConstraint);
      currentBody.constraints.push(scaleConstraint);
    }
  }
}
