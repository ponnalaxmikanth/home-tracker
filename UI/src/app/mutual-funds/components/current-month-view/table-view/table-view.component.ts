import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ht-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableViewComponent implements OnInit {
  @Input() data: any;
  public currentInvestments: any[] = [];
  public cols: any[] = [];

  public showActive: boolean = true;

  constructor() {
    this.cols = [
      { field: 'portfolio', header: 'Portfolio', type: 'string', class: 'portfolio', filter: false, display: true },
      { field: 'goal', header: 'Goal', type: 'string', class: 'goal', filter: false, display: true },
      { field: 'folioNumber', header: 'Folio', type: 'string', class: 'folio-number', filter: false, display: true },
      // { field: 'schemaCode', header: 'Schema Code', type: 'String', class: 'schema-code', filter: false, display: true },
      { field: 'schemaName', header: 'Schema', type: 'String', class: 'schema-name', filter: false, display: true },
      { field: 'isin', header: 'ISIN', class: 'isin', filter: false, display: true },
      { field: 'monthlyTargetAmount', header: 'Target', class: 'target-amount', filter: false, display: true },
      { field: 'currentMonthInvestment', header: 'Current Month Invest', class: 'number investment', filter: false, display: true },
      { field : 'investmentPer', header: 'Invest (%)', class: 'investment-percent number', filter: false, display: true },
      { field: 'currentMonthRemaining', header: 'Current Month Remaining', class: 'remaining-amount number', filter: false, display: true },
      { field : 'remainingPer', header: 'Remaining (%)', class: 'remaining-percent number', filter: false, display: true },
      { field : 'isActive', header: 'Active', class: 'is-active', filter: false, display: true },
    ];
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.data) {
      this.getCurrentInvestments(changes.data.currentValue);
    }
  }

  public getCurrentInvestments(data: any[]) {
    this.currentInvestments = [];

    for (var goal of data) {
      goal?.monthlySchemaTracker.forEach((element: { goal: any; portfolio: any; }) => {
        element.goal = goal.goal;
        element.portfolio = goal.portfolio;
      });
      this.currentInvestments.push(...goal?.monthlySchemaTracker);
    }
  }

  public handleActiveChange(event: any) : void {

  }

}
