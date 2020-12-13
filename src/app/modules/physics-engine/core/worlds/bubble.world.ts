import { World } from './world';
import { Injectable, Optional } from '@angular/core';
import { Physics } from '../physics';
import { ConstraintsResolver } from '../constraints.resolver';
import { CollisionDetection } from '../collision.detection';
import { ImpulseResolver } from '../impulse.resolver';

@Injectable()
export class BubbleWorld extends World {
  constructor(
    physics: Physics,
    constraints: ConstraintsResolver,
    collision: CollisionDetection,
    impulseResolver: ImpulseResolver
  ) {
    super(physics, constraints, collision, impulseResolver);
  }
  public update(elapsedTime: number) {
    super.updatePosition(elapsedTime);
    super.resolveCollisions();
    super.applyConstraints();
    super.calculateVelocity();
  }
}
