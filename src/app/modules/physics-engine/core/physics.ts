import { Point } from './../../../core/models/point';
import { VectorMath } from './vector-math';
import { Vector } from '../models/vector.model';
import { SolidBody } from '../models/solid-body.model';
import { Injectable } from '@angular/core';

@Injectable()
export class Physics {
  constructor() {}

  calcResultVelocity(body: SolidBody) {
    let resultImpulse = new Vector(new Point(0, 0));
    let resultCorection = new Vector(new Point(0, 0));

    for (const corection of body.corections) {
      resultCorection = VectorMath.add(resultCorection, corection);
    }
    body.corections = [];
    body.position = VectorMath.add(body.position, resultCorection);

    for (const impulse of body.impulses) {
      resultImpulse = VectorMath.add(resultImpulse, impulse);
    }
    body.impulses = [];

    resultImpulse = VectorMath.product(resultImpulse, body.invMass);
    body.velocity = VectorMath.add(body.velocity, resultImpulse);
    body.velocity = VectorMath.product(body.velocity, 0.9);
  }
}
