import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldComponent } from './world/world.component';



@NgModule({
  declarations: [WorldComponent],
  imports: [
    CommonModule
  ],
  exports: [WorldComponent]
})
export class SharedModule { }
