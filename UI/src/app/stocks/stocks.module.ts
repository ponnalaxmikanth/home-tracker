import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

import { StocksRoutingModule } from './stocks-routing.module';
import { StocksComponent } from './stocks.component';
import { PerformanceComponent } from './performance/performance.component';


@NgModule({
  declarations: [
    StocksComponent,
    PerformanceComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    TableModule,
    CalendarModule,
    FormsModule,
    FlexLayoutModule,
    ButtonModule
  ]
})
export class StocksModule { }
