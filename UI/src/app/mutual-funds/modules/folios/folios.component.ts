import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";

import { MutualFundsService } from 'src/services/funds/mutual-funds.service';
import { InvestmentService } from 'src/services/investment/investment.service';

@Component({
  selector: 'ht-folios',
  templateUrl: './folios.component.html',
  styleUrls: ['./folios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FoliosComponent implements OnInit {
  public folios: any[] = [];
  public cols: any[] = [];
  public showEditFolio: boolean = false;
  public selectedFolio: any;

  constructor(private messageService: MessageService, private _investmentsService: InvestmentService,
    private _fundsServiceService: MutualFundsService, private SpinnerService: NgxSpinnerService) {
      this.cols = [
        { field: 'portfolio', header: 'Portfolio', type: 'String' },
        { field: 'folioNumber', header: 'Folio', type: 'String' },
        { field: 'dateOpened', header: 'Date Opened', type: 'Date' },
        { field: 'fundHouse', header: 'House', type: 'String' },
        { field : 'defaultBank', header: 'Bank', type: 'String' },
        { field: 'defaultAccountNumber', header: 'Account', type: 'String' },
        { field : 'mobileNumber', header: 'Mobile', type: 'String' },
        { field : 'email', header: 'Email', type: 'String' },
        { field: 'isActive', header: 'Active', type: 'String' },

      ];
     }

  ngOnInit(): void {
    this.getFolios();
  }

  public getFolios(): void {
    this.folios = [];
    this.SpinnerService.show();
    this._fundsServiceService.getFolios().subscribe(
      (data: any) => {
        if (!data.success) {
          this.messageService.add({severity:'error', summary: 'Error', detail: data.message});
        }
        var lstfolios = data?.success ? data?.responseObject : null;
        let portfolio = '';
        let folio : any = {};

        for (let i = 0; i < lstfolios.length; i++) {
          portfolio = lstfolios[i]?.portfolio;

          for (let j = 0; j < lstfolios[i]?.folios.length; j++) {
            folio = lstfolios[i]?.folios[j];
            folio.portfolio = portfolio;
            this.folios.push(folio);
          }
        }
        console.log(this.folios);
        this.SpinnerService.hide();
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
      }
    );
  }

}
