import { Injectable } from '@angular/core';
import { ConstraintsResolver } from '../constraints.resolver';
import { CollisionDetection } from '../collision.detection';
import { ImpulseResolver } from '../impulse.resolver';
import { VectorMath } from '../vector-math';
import { Physics } from '../physics';
import { SolidBody } from '../../models/solid-body.model';

@Injectable()
export class World {
  public bodies: SolidBody[] = [];

  constructor(
    private physics: Physics,
    private constraints: ConstraintsResolver,
    private collision: CollisionDetection,
    private impulseResolver: ImpulseResolver
  ) {}

  public updatePosition(elapsedTime: number) {
    if (!elapsedTime) {
      return;
    }

    for (const body of this.bodies) {
      const positionChange = VectorMath.product(body.velocity, elapsedTime / 1000);
      body.position = VectorMath.add(body.position, positionChange);
    }
  }

  public resolveCollisions() {
    const collisionCircle = this.collision.checkCollision(this.bodies);
    this.impulseResolver.resolveCollisionImpulses(collisionCircle);
  }
  public applyConstraints() {
    for (const body of this.bodies) {
      this.constraints.applyConstraints(body);
    }
  }

  public calculateVelocity() {
    for (const body of this.bodies) {
      this.physics.calcResultVelocity(body);
    }
  }
}
