import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';
import { InvestmentService } from 'src/services/investment/investment.service';

@Component({
  selector: 'ht-daily-history',
  templateUrl: './daily-history.component.html',
  styleUrls: ['./daily-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DailyHistoryComponent implements OnInit {
  // @Input() dailyHistorydata: any;
  @Input() dateFilter: any;
  public data: any;
  public cols: any[] = [];
  public dateRange: any;
  public portfolioID: any;

  constructor(private messageService: MessageService,
    private _investmentsService: InvestmentService, private _fundsServiceService: MutualFundsService,
    private SpinnerService: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'portfolio', header: 'Portfolio', type: 'string', class: 'portfolio' },
      { field: 'trackDate', header: 'Date', type: 'date', class: 'track-date' },
      { field : 'noOfFundHouses', header: 'AMC', type: 'number', class: 'no-of-fund-houses' },
      { field: 'noOfFolios', header: 'Folios', type: 'number', class: 'no-of-folios' },
      { field : 'noOfFunds', header: 'Funds', type: 'number', class: 'no-of-funds' },
      { field: 'investment', header: 'Investment', type: 'decimal', class: 'investment' },
      { field : 'profit', header: 'Profit', type: 'decimal', class: 'profit' },
      { field : 'absoluteReturun', header: 'Profit (%)', type: 'decimal', class: 'absolute-return' },
      { field : 'tax', header: 'Tax', type: 'decimal', class: 'tax' },
      { field : 'taxPercent', header: 'Tax (%)', type: 'decimal', class: 'tax-percent' },
      { field : 'profitAfterTax', header: 'Profit After Tax', type: 'decimal', class: 'profit-after-tax' },
      { field : 'pftaftTaxPer', header: 'Profit After Tax (%)', type: 'decimal', class: 'profit-after-tax-percent' },
      { field : 'xirr', header: 'XIRR', type: 'decimal', class: 'xirr' },
    ];

    this.route.queryParams.subscribe(params => {
      this.GetFundsDailyTrack(params.portfolioid);
    });

    // this._fundsServiceService.portfolioID.subscribe(
    //   (portfolioid: number) => {
    //     if (!isNaN(portfolioid)) {
    //       this.portfolioID = portfolioid;
    //       this.GetFundsDailyTrack(portfolioid);
    //     }
    //   }
    // );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes && changes.dailyHistorydata) {
    //   this.data = changes.dailyHistorydata.currentValue;
    // }

    if (changes && changes.dateFilter) {
      this.dateRange = changes.dateFilter.currentValue;
      this.GetFundsDailyTrack(this.portfolioID);
    }
  }

  public GetFundsDailyTrack(portfolioid: number): void {
    this.SpinnerService.show();
    portfolioid = portfolioid ?? -1;
    this._investmentsService.getFundsDailyTrack(portfolioid, this.dateRange[0], this.dateRange[1]).subscribe(
      (data: any) => {
        if (data.success) {
          this.data = data.success ? data.responseObject : null;

          setTimeout(() => {
            this.SpinnerService.hide();
          }, 0);

        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Get Daily History Info'});
          this.SpinnerService.hide();
        }
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
      }
    );
  }

}
