import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalAllocationRoutingModule } from './goal-allocation-routing.module';
import { GoalAllocationComponent } from './goal-allocation.component';


@NgModule({
  declarations: [
    GoalAllocationComponent
  ],
  imports: [
    CommonModule,
    GoalAllocationRoutingModule
  ]
})
export class GoalAllocationModule { }
