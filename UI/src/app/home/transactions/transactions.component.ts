import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ht-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TransactionsComponent implements OnInit {
  @Input() transactionsData: any;
  public transactions: any;

  public cols: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'group', header: 'Group', type: 'string', class: 'group', filter: true, display: true },
      { field: 'subGroup', header: 'Sub Group', type: 'string', class: 'sub-group', filter: true, display: true },
      { field : 'budget', header: 'Budget', type: 'usd', class: 'budget number', filter: false, display: true },
      { field : 'debit', header: 'Debit', type: 'usd', class: 'debit number', filter: false, display: true },
      { field : 'credit', header: 'Credit', type: 'usd', class: 'credit number', filter: false, display: true },
      { field : 'usedPercent', header: 'Used (%)', type: 'percent', class: 'credit number', filter: false, display: true },
      { field : 'remaining', header: 'Remaining', type: 'usd', class: 'credit number', filter: false, display: true },
      { field : 'remainingPer', header: 'Remaining (%)', type: 'percent', class: 'credit number', filter: false, display: true },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.transactionsData) {
      this.transactions = changes.transactionsData.currentValue;
    }
  }

}
