import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HomeService } from 'src/services/home/home.service';

@Component({
  selector: 'ht-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  public dateValue: Date[] = [];
  public transactions: any;

  constructor(public _homeService: HomeService, private messageService: MessageService) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    this.dateValue.push(firstDay);
    this.dateValue.push(lastDay);
    this.getHomeTransactions();
   }

  ngOnInit(): void {
  }

  public dateChanged(): void {
    if (this.dateValue.length >1 && this.dateValue[0] != null && this.dateValue[1] != null) {
      // this.portfolioData(this.portfolioID); getHomeTransactions
      this.getHomeTransactions();
    }
  }

  public getHomeTransactions() : void {
    this.transactions = [];
    this._homeService.getHomeTransactions(this.dateValue[0], this.dateValue[1]).subscribe(
      (data: any) => {
        if (data?.success) {
          this.transactions = data?.responseObject;
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail: data.Message});
        }
      },
      (error: any) => {
        console.error(error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Get Transactions'});
      }
    );
  }

}
