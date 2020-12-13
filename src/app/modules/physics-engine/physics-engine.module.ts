import { Transformations } from './models/transformations.model';
import { BubbleWorld } from './core/worlds/bubble.world';
import { SmokeWorld } from './core/worlds/smoke.world';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstraintsResolver } from './core/constraints.resolver';
import { CollisionDetection } from './core/collision.detection';
import { ImpulseResolver } from './core/impulse.resolver';
import { Physics } from './core/physics';
import { World } from './core/worlds/world';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ConstraintsResolver,
    CollisionDetection,
    ImpulseResolver,
    Physics,
    World,
    SmokeWorld,
    BubbleWorld,
    Transformations
  ]
})
export class PhysicsEngineModule {}
