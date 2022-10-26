import { DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { NgxSpinnerService } from "ngx-spinner";
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';

@Component({
  selector: 'ht-add-fund-transaction',
  templateUrl: './add-fund-transaction.component.html',
  styleUrls: ['./add-fund-transaction.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddFundTransactionComponent implements OnInit {

  public portfolios: any[] = [];
  public folios: any[] = [];
  public filteredFolios: any[] = [];
  public pfolios: any[] = [];
  public panCards: any[] = [];
  public maxDateValue: Date = new Date();
  public stampDuty: number = 0.00005;
  public fundPurchaseForm: any;
  public saveApiInProgress: boolean = false;
  // public autoResize: boolean = true;
  public disabled: boolean = true;
  public jsonData: string = '';

  constructor(public datepipe: DatePipe, private messageService: MessageService, private _fundsServiceService: MutualFundsService,
    private SpinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.fundPurchaseForm = new FormGroup({
      portfolioID: new FormControl(1, [Validators.required]),
      folioID: new FormControl(0, [Validators.required]),
      schemaCode: new FormControl(125500, [Validators.required, Validators.min(1)]),
      purchaseDate: new FormControl(new Date(), [Validators.required]),

      units: new FormControl(0, [Validators.required, Validators.min(1), Validators.minLength(2), Validators.maxLength(30)]),
      charges: new FormControl(0.25),
      nav: new FormControl(0, [Validators.required, Validators.min(1)]),
      amount: new FormControl(5000, [Validators.required, Validators.min(1)]),

      house: new FormControl('test'),
      schemaName: new FormControl('-'),
      option: new FormControl('-'),
      category: new FormControl('-'),
      folioNumber: new FormControl('-'),
      panCard: new FormControl('-'),
      portfolioRegisterID: new FormControl(-1)
    });

    this.panCards = [ {pan: 'ATDPP6918L'}, {pan: 'AVTPV3207G' }, { pan: 'GSDPP6542P'} ];
    this.getPortfolios();
    this.getFolios();
  }

  public getPortfolios(): void {
    this.SpinnerService.show();
    this._fundsServiceService.getPortfolios().subscribe(
      (data: any) => {
        this.portfolios = data?.success ? data?.responseObject : null;
        this.SpinnerService.hide();
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
      }
    );
  }

  public getFolios(): void {
    this.SpinnerService.show();
    this._fundsServiceService.getFolios().subscribe(
      (data: any) => {
        this.folios = data?.success ? data?.responseObject : null;
        // this.portfolioChanged();
        this.SpinnerService.hide();
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
      }
    );
  }

  public getFundNAV(): void {
    this.SpinnerService.show();
    if(!this.disabled && this.jsonData) {
      this.resetSchemeDetails();
    }
    let date = this.datepipe.transform(this.fundPurchaseForm.value.purchaseDate, 'MM/dd/yyyy');
    let schemaCode = this.fundPurchaseForm.value.schemaCode;
    let fundHouse = this.getFundHouseFromFolio();

    this._fundsServiceService.getFundNAV(fundHouse, schemaCode, date).subscribe(
      (data: any) => {
        if (data.success) {
          this.fundPurchaseForm.patchValue({
            // nav: (!this.disabled && this.jsonData) ? data.responseObject.nav : this.fundPurchaseForm.value.nav,
            schemaName: data.responseObject.name,
            house: data.responseObject.fundHouse,
            option: data.responseObject.fundOption,
            category: data.responseObject.category,
            // units: (!this.disabled && this.jsonData) ? this.fundPurchaseForm.value.amount / data.responseObject.nav : this.fundPurchaseForm.value.units,
          });
        }
        this.SpinnerService.hide();
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
      }
    );
  }

  // public amountChanged() : void {
  //   let duty = this.fundPurchaseForm.value.amount * this.stampDuty;
  //   let _units = this.fundPurchaseForm.value.amount / this.fundPurchaseForm.value.nav;
  //   this.fundPurchaseForm.patchValue({ charges: duty, units: _units });
  // }

  public portfolioChanged(): void {
    this.filteredFolios = [];
    var folios = this.folios.filter((folio: any) => folio.portfolio.id === this.fundPurchaseForm.value.portfolioID);
    this.filteredFolios = folios ? folios[0].folios : [];
    var groupByName : any[] = [];

    this.filteredFolios.forEach(function (a) {
        const groupfiltered = groupByName?.filter(f => {
          return f.label == a.fundHouse;
        });

        if (groupfiltered.length == 0) {
          groupByName.push({ label: a.fundHouse, value: a.fundHouse, items: [{ value: a.id, label: a.folioNumber, goal: a.goal }]});
        }
        else {
          groupfiltered[0].items.push({ value: a.id, label: a.folioNumber, goal: a.goal });
        }
    });
    this.pfolios = groupByName;

    if(this.disabled && this.jsonData) {
      let transaction = JSON.parse(this.jsonData);

      // this.fundPurchaseForm.patchValue({
      //   folioNumber: transaction.folioNumber,
      //   folioID: transaction.folioID,
      // });
      this.getFundNAV();
    } else {
      this.getFundHouseFromFolio();
    }
  }

  public getFundHouseFromFolio(): string {
    let folioDetails = this.filteredFolios.filter((folio: any) => folio.folioNumber === this.fundPurchaseForm.value.folioNumber);
    var portfolio = this.portfolios.filter((p: any) => p.id === this.fundPurchaseForm.value.portfolioRegisterID);

    // this.fundPurchaseForm.patchValue({ folioNumber : folioDetails[0].folioNumber });
    this.fundPurchaseForm.patchValue({ panCard: portfolio[0].investorPAN });
    return folioDetails[0].fundHouse;
  }

  public resetSchemeDetails(): void {
    this.fundPurchaseForm.patchValue({ nav: 0, schemaName: '-', house: '-', option: '-', category: '-', units: 0, charges: 0.25 });
  }

  // public addFundTransaction(): void {
  //   // this.SpinnerService.show();
  //   this.saveApiInProgress = true;

  //   let purchaseRequest = this.fundPurchaseForm.getRawValue();
  //   var request = {
  //     portfolioID: purchaseRequest.portfolioID,
  //     folioNumber: purchaseRequest.folioNumber,
  //     folioID: purchaseRequest.folioID,
  //     nav: purchaseRequest.nav,
  //     schemaCode: purchaseRequest.schemaCode,
  //     purchaseDate: purchaseRequest.purchaseDate,
  //     units: purchaseRequest.units,
  //     amount: purchaseRequest.amount,
  //     charges: purchaseRequest.charges,
  //     pANCard: purchaseRequest.panCard,
  //     fundOption: "Purchase"
  //   };


  //   // this._fundsServiceService.addFundTransaction(request)
  //   // .subscribe(
  //   //   (response: any) => {
  //   //     this.saveApiInProgress = false;
  //   //     if (response?.success)
  //   //       this.messageService.add({severity:'success', summary:'Success', detail:'Fund Transaciton Saved Successfully'});
  //   //     else
  //   //       this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Save Fund Transaction'});

  //   //     this.SpinnerService.hide();
  //   //   },
  //   //   (err) => {
  //   //     console.log('Add Fund Purchase response: ', err);
  //   //     this.saveApiInProgress = false;
  //   //     this.SpinnerService.hide();
  //   //   }
  //   // );
  // }

  public saveTransaction(): void {

    this.saveApiInProgress = true;

    let transaction = JSON.parse(this.jsonData);
    let date = new Date(transaction.date);
    var portfolio = this.portfolios.filter((p: any) => p.id === this.fundPurchaseForm.value.portfolioRegisterID);
      // portfolioID: transaction.portfolioID,
      // portfolioRegisterID: transaction.portfolioRegisterID,
      // folioNumber: transaction.folioNumber,
      // folioID: transaction.folioID,
      // schemaCode: transaction.schemaCode,
      // purchaseDate: date,
      // nav: transaction.price,
      // units: transaction.units,
      // charges: transaction.stampDuty,
      // amount: transaction.amount

    var request = {
      portfolioID: transaction.portfolioID,
      groupOrder: transaction.groupOrder,
      folioNumber: transaction.folioNumber,
      folioID: transaction.folioID,
      nav: transaction.price,
      schemaCode: transaction.schemaCode,
      purchaseDate: date,
      units: transaction.units,
      amount: transaction.amount,
      charges: transaction.stampDuty,
      pANCard: portfolio[0].investorPAN,
      fundOption: "Purchase"
    };


    this._fundsServiceService.addFundTransaction(request)
    .subscribe(
      (response: any) => {
        this.saveApiInProgress = false;
        if (response?.success)
          this.messageService.add({severity:'success', summary:'Success', detail:'Fund Transaciton Saved Successfully'});
        else
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Save Fund Transaction'});

        this.SpinnerService.hide();
      },
      (err) => {
        console.log('Add Fund Purchase response: ', err);
        this.saveApiInProgress = false;
        this.SpinnerService.hide();
      }
    );

  }

  public populateFields(): void {
    if(!this.jsonData) {
      return;
    }
    let transaction = JSON.parse(this.jsonData);
    let date = new Date(transaction.date);

    this.fundPurchaseForm.patchValue({
      portfolioID: transaction.portfolioID,
      portfolioRegisterID: transaction.portfolioRegisterID,
      folioNumber: transaction.folioNumber,
      folioID: transaction.folioID,
      schemaCode: transaction.schemaCode,
      purchaseDate: date,
      nav: transaction.price,
      units: transaction.units,
      charges: transaction.stampDuty,
      amount: transaction.amount
    });

    // console.log(`patch value: ${JSON.stringify({
    //   portfolioID: transaction.portfolioID,
    //   portfolioRegisterID: transaction.portfolioRegisterID,
    //   folioNumber: transaction.folioNumber,
    //   folioID: transaction.folioID,
    //   schemaCode: transaction.schemaCode,
    //   purchaseDate: date,
    //   nav: transaction.price,
    //   units: transaction.units,
    //   charges: transaction.stampDuty,
    //   amount: transaction.amount
    // })}`);

    this.portfolioChanged();
  }

}
