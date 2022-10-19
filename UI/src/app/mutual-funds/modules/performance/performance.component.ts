import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';

@Component({
  selector: 'ht-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PerformanceComponent implements OnInit {

  public performance: any[] = [];
  public cols: any[] = [];
  public classifications: any[] = [];
  public showCategoryFundsDetails: boolean = false;
  public category: string = '';

  constructor(private _fundsServiceService: MutualFundsService, private SpinnerService: NgxSpinnerService, private messageService: MessageService) {

    this.classifications = [
      {label: 'Debt', value: 'Debt'},
      {label: 'ELSS', value: 'ELSS'},
      {label: 'Equity', value: 'Equity'},
      {label: 'Gilt', value: 'Gilt'},
      {label: 'Growth', value: 'Growth'},
      {label: 'Hybrid', value: 'Hybrid'},
      {label: 'Income', value: 'Income'},
      {label: 'Money Market', value: 'Money Market'},
      {label: 'Other', value: 'Other'},
      {label: 'Solution Oriented', value: 'Solution Oriented'}
    ];

    this.cols = [
      { field: 'classification', header: 'Classification', type: 'string', class:'classification' },
      { field: 'category', header: 'Category', type: 'string', class: 'category' },
      { field: 'noOfFunds', header: 'No Of Funds', type: 'number', format: '1.0-0', class:'no-of-funds' },
      { field : 'oneGrowth', header: 'Month', type: 'number', format: '2.2-2', class: 'one-month-growth' },
      { field: 'threeGrowth', header: 'Three Months', type: 'number', format: '2.2-2', class: 'three-month-growth' },
      { field : 'sixGrowth', header: 'Six Months', type: 'number', format: '2.2-2', class: 'six-month-growth' },
      { field : 'nineGrowth', header: 'Nine Months', type: 'number', format: '2.2-2', class: 'nine-month-growth' },
      { field : 'yearGrowth', header: 'Year', type: 'number', format: '2.2-2', class: 'year-growth' },
    ];
  }

  ngOnInit(): void {
    this.SpinnerService.show();
    this._fundsServiceService.getPerformance().subscribe(
      (data: any) => {
        this.performance = data?.success ? data?.responseObject : null;
        this.SpinnerService.hide();
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Get Category Performance Info'});
      }
    );
  }

  public onChange(event: any): void {
    console.log(event);
  }

  public showCategoryFunds(classification: string, category: string): boolean {
    this.showCategoryFundsDetails = true;
    // this.SpinnerService.show();
    this.category = category;
    return false;
  }

}
