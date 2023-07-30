import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  declarations: [
    HomeComponent,
    TransactionsComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    TableModule,
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
