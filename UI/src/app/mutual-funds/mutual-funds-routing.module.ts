import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MutualFundsComponent } from './mutual-funds.component';
// import { CategoryPerformanceComponent } from './category-performance/category-performance.component';

const routes: Routes = [
  // { path: 'performance', component: CategoryPerformanceComponent },
  { path: 'performance', loadChildren: () => import('./modules/performance/performance.module').then(m => m.PerformanceModule) },
  { path: 'goal-allocations', loadChildren: () => import('./modules/goal-allocation/goal-allocation.module').then(m => m.GoalAllocationModule) },
  { path: 'goals', loadChildren: () => import('./modules/goals/goals.module').then(m => m.GoalsModule) },
  { path: 'folios', loadChildren: () => import('./modules/folios/folios.module').then(m => m.FoliosModule) },
  { path: '', component: MutualFundsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MutualFundsRoutingModule { }
