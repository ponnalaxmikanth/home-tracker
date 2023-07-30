import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ht-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Input() budget: any;
  public _budget: any;

  @Input() credit: any;
  public _credit: any;

  @Input() debit: any;
  public _debit: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.budget) {
      this._budget = changes.budget.currentValue;
    }

    if (changes && changes.credit) {
      this._credit = changes.credit.currentValue;
    }

    if (changes && changes.debit) {
      this._debit = changes.debit.currentValue;
    }
  }

}
