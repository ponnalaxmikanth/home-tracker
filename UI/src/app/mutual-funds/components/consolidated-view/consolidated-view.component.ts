import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ht-consolidated-view',
  templateUrl: './consolidated-view.component.html',
  styleUrls: ['./consolidated-view.component.scss']
})
export class ConsolidatedViewComponent implements OnInit {
  @Input() consolidateData: any;
  public consolidatedResponse: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.consolidateData) {
      this.consolidatedResponse = changes.consolidateData.currentValue;
    }
  }

}
