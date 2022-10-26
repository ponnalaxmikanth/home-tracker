import { PerformanceComponent } from './performance/performance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks.component';

const routes: Routes = [
  { path: 'performance', component: PerformanceComponent },
  { path: '', component: StocksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
