import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { StocksService } from 'src/services/stocks/stocks.service';

@Component({
  selector: 'ht-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  stocksPerformance: any[] = [];
  public cols: any[] = [];

  constructor(private _stocksService: StocksService,
    private messageService: MessageService,
    private SpinnerService: NgxSpinnerService) {
    this.cols = [
      { field: 'code', header: 'Code', type: 'string' },
      { field: 'alias', header: 'Name', type: 'string' },
      { field : 'monthCloseGrowth', header: 'Month', type: 'number', format: '2.2-2' },
      { field: 'month3CloseGrowth', header: 'Three Months', type: 'number', format: '2.2-2' },
      { field : 'month6CloseGrowth', header: 'Six Months', type: 'number', format: '2.2-2' },
      { field : 'month9CloseGrowth', header: 'Nine Months', type: 'number', format: '2.2-2' },
      { field : 'month12CloseGrowth', header: 'Year', type: 'number', format: '2.2-2' },
    ];
  }

  ngOnInit(): void {
    this.getStockPerfomance();
  }

  public getStockPerfomance(): void {
    this.stocksPerformance = [];
    this.SpinnerService.show();
    this._stocksService.getPerformance().subscribe(
      (data: any) => {
        if (data?.success) {
          this.stocksPerformance = data.success?  data.responseObject : null;
          this.SpinnerService.hide();
        }
      },
      (err) => {
        console.error('Stocks Performance: ', err);
        this.SpinnerService.hide();
        this.messageService.add({severity:'error', summary:'Failed', detail:'Failed to get Stocks Performance Info'});
      }
    );
  }

}
