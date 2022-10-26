import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';
import { InvestmentService } from 'src/services/investment/investment.service';

@Component({
  selector: 'ht-current-month-view',
  templateUrl: './current-month-view.component.html',
  styleUrls: ['./current-month-view.component.scss']
})
export class CurrentMonthViewComponent implements OnInit {
  // @Input() currentMonth: any;
  public currentMonth: any;
  public chartView: boolean = true;
  constructor(private messageService: MessageService, private _investmentsService: InvestmentService, private _fundsService: MutualFundsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this._fundsService.portfolioID.subscribe(
    //   (portfolioid: number) => {
    //     if (!isNaN(portfolioid)) {
    //       this.getCurrentMonthTracker(portfolioid);
    //     }
    //   });

    this.route.queryParams.subscribe(params => {
      this.getCurrentMonthTracker(params.portfolioid);
    });
  }

  public getCurrentMonthTracker(portfolioid: number) : void {
    this._investmentsService.getCurrentMonthTracker(portfolioid).subscribe(
      (data: any) => {
        if (data.success) {
          this.currentMonth = data.success ? data.responseObject : null;
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail: data.message});
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public handleViewChangeChange(event: any) : void {

  }

}
