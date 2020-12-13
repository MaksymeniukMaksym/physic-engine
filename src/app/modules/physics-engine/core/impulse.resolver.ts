import { Vector } from '../models/vector.model';
import { CollidedPair } from '../models/collided-pair.model';
import { VectorMath } from './vector-math';
import { SolidBody } from '../models/solid-body.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ImpulseResolver {
  private collisionCircles: CollidedPair[];

  constructor() {}

  public resolveCollisionImpulses(collisionCircles: CollidedPair[]): void {
    this.collisionCircles = collisionCircles;
    for (let i = 0; i < collisionCircles.length; i++) {
      this.resolveCollision(collisionCircles[i].firstItem, collisionCircles[i].secondItem);
    }
  }

  private resolveCollision(firstCircle: SolidBody, secondCircle: SolidBody): void {
    const e = 0.8;
    const relativeVelocity: Vector = new Vector({
      x: secondCircle.velocity.x - firstCircle.velocity.x,
      y: secondCircle.velocity.y - firstCircle.velocity.y
    });

    const normal = this.getNormal(firstCircle, secondCircle);
    const velocityAlongNormal = VectorMath.dotProduct(relativeVelocity, normal);

    if (velocityAlongNormal > 0) {
      return;
    }

    const impulseScalar = (-(1 + e) * velocityAlongNormal) / (firstCircle.invMass + secondCircle.invMass);

    // friction
    const tangent = VectorMath.add(relativeVelocity, VectorMath.product(normal, -velocityAlongNormal));
    const ortTangent = tangent.asOrt();

    let impulseFriction: Vector = null;
    if (!ortTangent.isZero()) {
      const magnitudeAlongFrictionVector =
        -VectorMath.dotProduct(relativeVelocity, ortTangent) / (firstCircle.invMass + secondCircle.invMass);
      const dynamicFriction = 0.001;
      const frictionCoefficients = 0.05;

      if (Math.abs(magnitudeAlongFrictionVector) < impulseScalar * frictionCoefficients) {
        impulseFriction = VectorMath.product(ortTangent, magnitudeAlongFrictionVector);
      } else {
        impulseFriction = VectorMath.product(ortTangent, dynamicFriction * -impulseScalar);
      }
    }

    // penetration
    const percent = 0.2;
    const slop = 0.1;

    const vectorAlongCentor = new Vector(firstCircle.position, secondCircle.position);
    const penetration = firstCircle.size.width / 2 + secondCircle.size.width / 2 - vectorAlongCentor.getLength();

    if (penetration - slop > 0) {
      const correctionScalar = ((penetration - slop) / (firstCircle.invMass + secondCircle.invMass)) * percent;
      const correction = VectorMath.product(normal, correctionScalar);

      firstCircle.corections.push(VectorMath.product(correction, -firstCircle.invMass));
      secondCircle.corections.push(VectorMath.product(correction, secondCircle.invMass));
    }

    let impulse = VectorMath.product(normal, impulseScalar);

    if (impulseFriction) {
      impulse = VectorMath.add(impulse, VectorMath.product(impulseFriction, 1));
    }

    const collisionsCountFirst = this.collisionCircles.filter(
      s => s.firstItem === firstCircle || s.secondItem === firstCircle
    ).length;
    const collisionsCountSecond = this.collisionCircles.filter(
      s => s.firstItem === secondCircle || s.secondItem === secondCircle
    ).length;

    firstCircle.impulses.push(VectorMath.product(impulse, -1 / collisionsCountFirst));
    secondCircle.impulses.push(VectorMath.product(impulse, 1 / collisionsCountSecond));
  }

  private getNormal(firstCircle: SolidBody, secondCircle: SolidBody) {
    const vector = new Vector(firstCircle.position, secondCircle.position);
    return VectorMath.product(vector, 1 / vector.getLength());
  }
}
