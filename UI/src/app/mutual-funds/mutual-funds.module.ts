import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { ChartModule } from 'primeng/chart';

import { MutualFundsRoutingModule } from './mutual-funds-routing.module';
import { MutualFundsComponent } from './mutual-funds.component';
import { GoalsViewComponent } from './components/goals-view/goals-view.component';
import { ConsolidatedViewComponent } from './components/consolidated-view/consolidated-view.component';
import { OverallTimelineViewComponent } from './components/goals-view/overall-timeline-view/overall-timeline-view.component';
import { CurrentMonthViewComponent } from './components/current-month-view/current-month-view.component';
import { DailyHistoryComponent } from './components/daily-history/daily-history.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MonthlyGoalViewComponent } from './components/monthly-goal-view/monthly-goal-view.component';
import { AddFundTransactionComponent } from './components/add-fund-transaction/add-fund-transaction.component';
// import { CategoryPerformanceComponent } from './category-performance/category-performance.component';
import { GoalsModule } from './modules/goals/goals.module';
import { QuarterlyReviewComponent } from './components/quarterly-review/quarterly-review.component';
import { TableViewComponent } from './components/current-month-view/table-view/table-view.component';
import { MonthlyTableViewComponent } from './components/monthly-table-view/monthly-table-view.component';


@NgModule({
  declarations: [
    MutualFundsComponent,
    GoalsViewComponent,
    ConsolidatedViewComponent,
    OverallTimelineViewComponent,
    CurrentMonthViewComponent,
    DailyHistoryComponent,
    TransactionsComponent,
    MonthlyGoalViewComponent,
    AddFundTransactionComponent,
    QuarterlyReviewComponent,
    TableViewComponent,
    MonthlyTableViewComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MutualFundsRoutingModule,
    TabViewModule,
    FieldsetModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    TableModule,
    SidebarModule,
    DropdownModule,
    CascadeSelectModule,
    InputTextareaModule,
    GoalsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    // ChartModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "en-IN" }],
})
export class MutualFundsModule { }
