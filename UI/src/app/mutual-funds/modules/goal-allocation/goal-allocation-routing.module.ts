import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalAllocationComponent } from './goal-allocation.component';

const routes: Routes = [{ path: '', component: GoalAllocationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalAllocationRoutingModule { }
