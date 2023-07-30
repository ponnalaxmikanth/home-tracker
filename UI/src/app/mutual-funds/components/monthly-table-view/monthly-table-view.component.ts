import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ht-monthly-table-view',
  templateUrl: './monthly-table-view.component.html',
  styleUrls: ['./monthly-table-view.component.scss']
})
export class MonthlyTableViewComponent implements OnInit {
  @Input() monthlyTracker: any;
  public cols: any[] = [];
  public montlhyView: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'date', header: 'Month', type: 'date', class: 'date month', filter: true, display: true },
      { field: 'investment', header: 'Investment', type: 'numeric', class: 'investment', filter: true, display: true },
      { field: 'currentValue', header: 'Current Value', type: 'numeric', class: 'current-value', filter: true, display: true },
      { field: 'profit', header: 'Profit', type: 'numeric', class: 'profit', filter: true, display: true },
      { field: 'profitPer', header: 'Profit (%)', type: 'numeric', class: 'profit-percent', filter: true, display: true },
      { field: 'xirr', header: 'XIRR', type: 'numeric', class: 'number xirr', filter: true, display: true }
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes && changes.monthlyTracker) {
      this.montlhyView = changes.monthlyTracker.currentValue;
    }
  }

}
