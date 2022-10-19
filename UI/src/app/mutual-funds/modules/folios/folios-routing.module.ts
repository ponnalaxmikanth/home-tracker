import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoliosComponent } from './folios.component';

const routes: Routes = [{ path: '', component: FoliosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoliosRoutingModule { }
