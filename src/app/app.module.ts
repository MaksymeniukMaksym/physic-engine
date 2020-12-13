import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './modules/main/main.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MouseMoveService } from './core/services/mouse.service';
import { BubbleWorld } from './modules/physics-engine/core/worlds/bubble.world';
import { PhysicsEngineModule } from './modules/physics-engine/physics-engine.module';
import { ConstraintsResolver } from './modules/physics-engine/core/constraints.resolver';
import { CollisionDetection } from './modules/physics-engine/core/collision.detection';
import { ImpulseResolver } from './modules/physics-engine/core/impulse.resolver';
import { Physics } from './modules/physics-engine/core/physics';
import { World } from './modules/physics-engine/core/worlds/world';
import { SmokeWorld } from './modules/physics-engine/core/worlds/smoke.world';
import { Transformations } from './modules/physics-engine/models/transformations.model';
import { BodiesFactory } from './modules/physics-engine/core/factories/bodies.factory';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    LayoutModule, PhysicsEngineModule
  ],
  providers: [MouseMoveService, ConstraintsResolver,
    CollisionDetection,
    ImpulseResolver,
    Physics,
    World,
    SmokeWorld,
    BubbleWorld,
    Transformations,
    BodiesFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
