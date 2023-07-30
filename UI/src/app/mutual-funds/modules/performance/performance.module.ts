import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

import { PerformanceRoutingModule } from './performance-routing.module';
import { PerformanceComponent } from './performance.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoryFundsPerformanceComponent } from './category-funds-performance/category-funds-performance.component';


@NgModule({
  declarations: [
    PerformanceComponent,
    CategoryFundsPerformanceComponent
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    TableModule,
    SidebarModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    ButtonModule,
  ]
})
export class PerformanceModule { }
