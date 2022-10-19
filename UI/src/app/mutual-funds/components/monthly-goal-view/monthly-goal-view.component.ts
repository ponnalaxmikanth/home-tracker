import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ht-monthly-goal-view',
  templateUrl: './monthly-goal-view.component.html',
  styleUrls: ['./monthly-goal-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonthlyGoalViewComponent implements OnInit {
  @Input() monthlyGoalViewData: any;
  public goalViewData: any;
  public cols: any[] = [];

  constructor() {
    this.cols = [
      { field: 'date', header: 'Date', type: 'date' },
      { field: 'portfolio', header: 'Portfolio', type: 'string' },
      { field: 'goalName', header: 'Goal', type: 'string' },
      { field : 'sip', header: 'SIP', type: 'number', format: '2.2-2' },
      { field: 'investment', header: 'Investment', type: 'number', format: '2.2-2' },
      { field: 'investment', header: 'Investment (%)', type: 'number', format: '2.2-2' },
      { field: 'profit', header: 'Profit', type: 'number', format: '2.2-2' },
      { field: 'profitPer', header: 'Profit (%)', type: 'number', format: '2.2-2' },
      { field: 'xirr', header: 'XIRR', type: 'number', format: '2.2-2' },
    ];
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.monthlyGoalViewData) {
      this.goalViewData = changes.monthlyGoalViewData.currentValue;
    }
  }

}
