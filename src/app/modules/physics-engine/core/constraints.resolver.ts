import { SolidBody } from '../models/solid-body.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ConstraintsResolver {
  constructor() {}

  public applyConstraints(body: SolidBody): void {
    for (const constraint of body.constraints) {
      constraint.apply(body);
    }
  }
}
