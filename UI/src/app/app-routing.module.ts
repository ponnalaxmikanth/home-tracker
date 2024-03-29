import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mutual-funds', loadChildren: () => import('./mutual-funds/mutual-funds.module').then(m => m.MutualFundsModule) },
  { path: 'stocks', loadChildren: () => import('./stocks/stocks.module').then(m => m.StocksModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
