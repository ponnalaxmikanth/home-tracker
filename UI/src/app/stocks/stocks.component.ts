import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { StocksService } from 'src/services/stocks/stocks.service';

@Component({
  selector: 'ht-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StocksComponent implements OnInit {
  public dateValue: Date[] = [];
  public downloadingData: boolean = false;
  public maxDateValue = new Date();
  // public downloadingIndices: boolean = false;

  constructor(private _stocksService: StocksService, private messageService: MessageService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    // var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date();
    // var lastDay = new Date(y, m + 1, 0);
    // var today = new Date();
    firstDay.setDate(this.maxDateValue.getDate() - 30);
    this.dateValue.push(firstDay);
    this.dateValue.push(this.maxDateValue);
  }

  public dateChanged(): void {

  }

  public downloadIndicesData(): void {
    // this.SpinnerService.show();
    this.downloadingData = true;
    this._stocksService.downloadIndicesData(this.dateValue[0], this.dateValue[1]).subscribe(
      (data: any) => {
        if (data?.success) {
          this.downloadingData = false;
          // this.stocksPerformance = data.success?  data.responseObject : null;
          if(data.success) {
            this.messageService.add({severity:'success', summary:'Success', detail: data.message});
          } else {
            this.messageService.add({severity:'error', summary:'Failed', detail: data.message});
          }
          // this.SpinnerService.hide();
        }
      },
      (err) => {
        console.error('Indices Data Download: ', err);
        // this.SpinnerService.hide();
        this.downloadingData = false;
        this.messageService.add({severity:'error', summary:'Failed', detail:'Failed to Download Indices Data'});
      }
    );
  }

  // public downloadIndices($event: any): void {
  //   this.SpinnerService.show();
  //   this._stocksService.downloadIndicesData(this.dateValue[0], this.dateValue[1]).subscribe(
  //     (data: any) => {
  //       if (data?.success) {
  //         if(data.success) {
  //           this.messageService.add({severity:'success', summary:'Success', detail: data.message});
  //         } else {
  //           this.messageService.add({severity:'error', summary:'Failed', detail: data.message});
  //         }
  //         this.SpinnerService.hide();
  //       }
  //     },
  //     (err) => {
  //       console.error('Indices Download: ', err);
  //       this.SpinnerService.hide();
  //       this.messageService.add({severity:'error', summary:'Failed', detail:'Failed to Download Indices'});
  //     }
  //   );
  // }

}
