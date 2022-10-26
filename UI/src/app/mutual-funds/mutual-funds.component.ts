import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
// import * as Chart from 'chart.js';
import {Chart, ChartConfiguration, ChartItem, registerables } from 'node_modules/chart.js';
import { NgxSpinnerService } from "ngx-spinner";
import ChartDataLabels from 'chartjs-plugin-datalabels';


import { MutualFundsService } from 'src/services/funds/mutual-funds.service';
import { InvestmentService } from 'src/services/investment/investment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ht-mutual-funds',
  templateUrl: './mutual-funds.component.html',
  styleUrls: ['./mutual-funds.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MutualFundsComponent implements OnInit {
  public chartColors: any = {
    investment: {
      amount: {background: '#A88532', border: '#A88532'},
      current: {background: '#294f4f', border: '#294f4f'},
      profit: {background: '#46A832', border: '#46A832'},
      xirr: {background: '#324AA8', border: '#324AA8' },
      profitper: {background: '#b0f542', border: '#b0f542'}
    },
    redeem: {
      amount: {background: '#A88532', border: '#A88532'},
      profit: {background: '#46A832', border: '#A88532'},
      xirr: {background: '#A88532', border: '#A88532'},
      profitper: {background: '#FFA726', border: '#A88532'}
    }
  };

  public portfolioInfo: any;

  public portfolioID: number = 0;
  public groupTransactions: boolean = false;
  public dateValue: Date[] = [];
  public NAVDownloadDetails: any;
  public showAddPunchaseFunds: boolean = false;

  public chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    autoPadding: true,
    interaction: { intersect: false, mode: 'nearest' },
    plugins:
    {
      tooltip: { mode: 'index', position: 'nearest' },
      legend: { position: 'top', },
      datalabels: { anchor: 'end', align: 'end', font: { size: 20, } } , hover: { mode: 'nearest', intersec: true, }
      // title: { display: true, text: 'Chart.js Bar Chart' }
    },
    xAxes: [{ offset: false, stacked: true }],
    scales: {
      y: { beginAtZero: false, display: true, position: 'left', type: 'linear', scaleLabel: { display: true, },
        ticks: {
          callback: function (value: any, index: any, values: any) {
            if (value >= 1000000 || value <= -1000000) return (value / 1000000) + ' L';
            if (value >= 100000 || value <= -100000) return (value / 100000) + ' L';
            if (value >= 10000 || value <= -10000) return (value / 1000) + ' K';
            if (value >= 1000 || value <= -1000) return (value / 1000) + ' K';
            return value;
          }
        }
      }, // type: 'logarithmic',
      y1: { beginAtZero: false, display: true, position: 'right', type: 'linear', scaleLabel: { display: true, },
        ticks: {
          callback: function (value: any, index: any, values: any) {
            if (value >= 1000000 || value <= -1000000) return (value / 1000000) + ' L';
            if (value >= 100000 || value <= -100000) return (value / 100000) + ' L';
            if (value >= 10000 || value <= -10000) return (value / 1000) + ' K';
            if (value >= 1000 || value <= -1000) return (value / 1000) + ' K';
            return value;
          }
        }
          // grid: {
          //   drawOnChartArea: false, // only want the grid lines for one axis to show up
          //   },
      },
    },
    // tooltips: {
    //   intersect: false,
    //   mode: "index",
    //   position: "nearest",
    //   callbacks: {}
    // },
    // animation: {
    //   onComplete: () => {
    //     const delayed = true;
    //   },
    //   delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number; }) => {
    //     let delay = 0;
    //     if (context.type === 'data' && context.mode === 'default' && !delay) {
    //       delay = context.dataIndex * 300 + context.datasetIndex * 100;
    //     }
    //     return delay;
    //   },
    // }
  };
  public consolidatedResponse: any;
  public downloadingNAV: boolean = false;
  public transactions: any;
  public dailyHistory: any;
  public monthlyGoalViewData: any;
  public portfolioId: number = -1;
  // public showDateFilter: boolean = false;

  @ViewChild('monthlyViewChart') private monthlyViewCanvas!: ElementRef;
  public monthlyViewDChart: any;
  @ViewChild('cICategoryChart') private cICategoryChartCanvas!: ElementRef;
  public cICategoryDChart: any;
  @ViewChild('cIFYYearChart') private cIFYYearChartCanvas!: ElementRef;
  public cIFYYearDChart: any;

  @ViewChild('categoryViewChart') private categoryViewChart!: ElementRef;
  public categoryViewDChart: any;
  // public cICategoryChartData: any;
  // public multiAxisOptions: any;


  constructor(public datepipe: DatePipe, private messageService: MessageService,
      private _investmentsService: InvestmentService, private _fundsServiceService: MutualFundsService,
      private SpinnerService: NgxSpinnerService, private route: ActivatedRoute) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(2008, 0, 1);
    var lastDay = new Date(y, m + 1, 0);
    this.dateValue.push(firstDay);
    this.dateValue.push(lastDay);

    // this.multiAxisOptions = {
    //   stacked: false,
    //   plugins: {
    //       legend: {
    //           labels: {
    //               color: '#495057'
    //           }
    //       }
    //   },
    //   scales: {
    //       x: {
    //           ticks: {
    //               color: '#495057'
    //           },
    //           grid: {
    //               color: '#ebedef'
    //           }
    //       },
    //       y: {
    //           type: 'linear',
    //           display: true,
    //           position: 'left',
    //           ticks: {
    //               color: '#495057'
    //           },
    //           grid: {
    //               color: '#ebedef'
    //           }
    //       },
    //       y1: {
    //           type: 'linear',
    //           display: true,
    //           position: 'right',
    //           ticks: {
    //               color: '#495057'
    //           },
    //           grid: {
    //               drawOnChartArea: false,
    //               color: '#ebedef'
    //           }
    //       }
    //   }
    // };
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    // this._fundsServiceService.portfolioID.subscribe(
    //   (portfolioid: number) => {
    //     if (!isNaN(portfolioid)) {
    //       this.portfolioData(portfolioid);
    //     }
    //   }
    // );

    this.route.queryParams.subscribe(params => {
      this.portfolioId = params.portfolioid;
        if (!isNaN(this.portfolioId)) {
          this.portfolioData(this.portfolioId);
        }
    });
    // this.getPortfolios();
    // this.getFolios();
    this.nAVDownloadDetails();
  }

  public downloadFundsNAV(): void {
    this.downloadingNAV = true;
    this._investmentsService.downloadFundsNAV().subscribe(
      (data: any) => {
        this.nAVDownloadDetails();
        this.downloadingNAV = false;
      },
      (error: any) => {
        console.error(error);
        this.downloadingNAV = false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Download Funds NAV Info'});
      }
    );
  }

  public refresh(): void {

  }

  public nAVDownloadDetails(): void {
    this._investmentsService.nAVDownloadDetails().subscribe(
      (data: any) => {
        if (data.success) {
          this.NAVDownloadDetails = data?.success ? data?.responseObject : null;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public purchaseFunds() : void {
    this.showAddPunchaseFunds = true;
  }

  public dateChanged(): void {
    if (this.dateValue.length >1 && this.dateValue[0] != null && this.dateValue[1] != null) {
      this.portfolioData(this.portfolioID);
    }
  }

  public handleGrpTransChange($event: any) {
    this.portfolioData(this.portfolioID);
  }

  public portfolioData(portfolioid: number): void {
    this.portfolioID = portfolioid;
    this.clearCharts();
    this.SpinnerService.show();
    this._investmentsService.portfolioData(portfolioid, this.groupTransactions, this.dateValue[0], this.dateValue[1]).subscribe(
      (data: any) => {
        if (data.success) {
          this.portfolioInfo = data.success ? data.responseObject : null;
          // this.goalConsolidated = this.portfolioInfo ? this.portfolioInfo?.consolidatedInfo : null;
          // this.goals = this.portfolioInfo ? this.portfolioInfo.goals : null;
          this.consolidatedResponse = this.portfolioInfo && this.portfolioInfo?.consolidated ? this.portfolioInfo.consolidated : null;

          this.updateMonthlyView(this.portfolioInfo && this.portfolioInfo?.categoryValuation ? this.portfolioInfo.monthlyTracker : null);
          this.updateCategoryCharts(this.portfolioInfo && this.portfolioInfo?.categoryValuation ? this.portfolioInfo.categoryValuation : null);
          this.updateFYYearCharts(this.portfolioInfo && this.portfolioInfo?.financialYearValuation ? this.portfolioInfo.financialYearValuation : null);
          this.transactions = this.portfolioInfo && this.portfolioInfo?.transactions ? this.portfolioInfo.transactions : null;
          this.dailyHistory = this.portfolioInfo && this.portfolioInfo?.fundsDailyTrack ? this.portfolioInfo.fundsDailyTrack : null;
          this.monthlyGoalViewData = this.portfolioInfo?.monthlyGoalView;

          setTimeout(() => {
            this.SpinnerService.hide();
          }, 0);

        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Get Portfolio Info'});
          this.SpinnerService.hide();
        }
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
      }
    );
  }


  public clearCharts(): void {
    if (this.monthlyViewDChart) this.monthlyViewDChart.destroy();
    if (this.cICategoryDChart) this.cICategoryDChart.destroy();
    if (this.cIFYYearDChart) this.cIFYYearDChart.destroy();
    if (this.categoryViewDChart) this.categoryViewDChart.destroy();
  }

  public updateMonthlyView(data: any): void {
    var labels: any[] = [];
    var investment: any[] = [];
    var profit: any[] = [];
    var currentValue: any[] = [];
    var profitPer: any[] = [];

    for (let i = 0; i < data.length; i++) {

      labels.push(this.datepipe.transform(data[i].date, 'MMM-yyyy'));
      investment.push(data[i].investment);
      currentValue.push(data[i].currentValue);
      profit.push(data[i].profit);
      profitPer.push(data[i].profitPer);
    }

    this.monthlyViewDChart = new Chart(this.monthlyViewCanvas.nativeElement, {
      type: 'bar',

      data: {
        labels: labels,
        datasets: [
          { type: 'line', yAxisID: 'y', fill: false, label: 'Investment', data: investment, borderWidth: 3, cubicInterpolationMode: 'monotone', tension: 0.4,
              backgroundColor: this.chartColors.investment.amount.background, borderColor: this.chartColors.investment.amount.border
            },
          { type: 'line', yAxisID: 'y', fill: false, label: 'Current Value', data: currentValue, borderWidth: 3, cubicInterpolationMode: 'monotone', tension: 0.4,
              backgroundColor: this.chartColors.investment.current.background, borderColor: this.chartColors.investment.current.border },
          { type: 'line', yAxisID: 'y', fill: false, label: 'Profit', data: profit, borderWidth: 3, cubicInterpolationMode: 'monotone', tension: 0.4,
              backgroundColor: this.chartColors.investment.profit.background, borderColor: this.chartColors.investment.profit.border },
          { type: 'line', yAxisID: 'y1', fill: false, label: 'Profit (%)', data: profitPer, borderWidth: 3, cubicInterpolationMode: 'monotone', tension: 0.4,
              backgroundColor: this.chartColors.investment.profitper.background, borderColor: this.chartColors.investment.profitper.border },
          ]
      },
      options: this.chartOptions
    });

  }

  public updateCategoryCharts(data: any): void {
    if (data && data.length > 0) {
      var allocationPercent: any[] = [];
      var currentInvestmnet: any[] = [];
      var currentxirr: any[] = [];
      var currentprofit: any[] = [];
      var currentprofitPer: any[] = [];
      var labels: any[] = [];
      var totalInvestment = 0;

      var redeemInvestment: any[] = [];
      var redeemProfit: any[] = [];
      var redeemProfitPer: any[] = [];
      var redeemXIRR: any[] = [];
      var redeemLabels: any[] = [];

      var consolidatedLabels: any[] = [];
      var consolidatedInvest: any[] = [];
      var consolidatedRedeem: any[] = [];

      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      var c = new Date(year + 1, month, day);

      labels.push('Start');
      currentInvestmnet.push(0);
      currentxirr.push(0);
      currentprofit.push(0);
      currentprofitPer.push(0);
      allocationPercent.push(0);

      for (let i = 0; i < data.length; i++) {
        totalInvestment = data[i].transactionType === "I" ? totalInvestment + data[i].amount : totalInvestment;
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i].transactionType === "I") {
          var current = data[i];
          labels.push(current.name);
          allocationPercent.push(current.amount * 100 / totalInvestment);
          currentInvestmnet.push(current.amount);
          currentxirr.push(current.xirr);
          currentprofit.push(current.profit);
          currentprofitPer.push(current.profitPer);
        }

        if (data[i].transactionType === 'R') {
          redeemLabels.push(data[i].name);
          var redeem = data[i];
          redeemInvestment.push(redeem.amount);
          redeemProfit.push(redeem.profit);
          redeemProfitPer.push(redeem.profitPer);
          redeemXIRR.push(redeem.xirr);
        }

        if (consolidatedLabels.indexOf(data[i].name) == -1) {
          consolidatedLabels.push(data[i].name);

          var investment = this.getCategory(data, data[i], "I");
          consolidatedInvest.push(investment.xirr);

          var redeem = this.getCategory(data, data[i], "R");
          consolidatedRedeem.push(redeem.xirr);
        }
      }

      labels.push('End');
      currentInvestmnet.push(0);
      currentxirr.push(0);
      currentprofit.push(0);
      currentprofitPer.push(0);

    this.categoryViewDChart = new Chart(this.categoryViewChart.nativeElement, {
      type: 'bar',
      plugins: [ ChartDataLabels ],
      data: {
        labels: labels,
        datasets: [
        { type: 'bar', yAxisID: 'y', backgroundColor: this.chartColors.investment.amount.background, label: 'Category Allocation (%)', data: allocationPercent,
          datalabels: { display: true, clamp: true, anchor: 'start', align: 'end', offset: 10, rotation: -90, color: 'black',
            formatter: function (value, context) { return value.toFixed(2); }, // return numeral(value).format('0,0');
            font: { size: 12,  }// weight: 'bold',
          }
        },
        { type: 'line', yAxisID: 'y1', backgroundColor: this.chartColors.investment.xirr.background, borderColor: this.chartColors.investment.xirr.border, borderWidth: 3,
          fill: false, label: 'XIRR', data: currentxirr, cubicInterpolationMode: 'monotone', tension: 0.4,
          datalabels: {
            display: true, color: 'black',
            formatter: function (value: any, context: any) { return value.toFixed(2); },
            font: { size: 12, }// weight: 'bold',
          }
        },
        { type: 'line', yAxisID: 'y1', backgroundColor: this.chartColors.investment.profitper.background, borderColor: this.chartColors.investment.profitper.background,
          borderWidth: 3, fill: false, label: 'Profit (%)', data: currentprofitPer, cubicInterpolationMode: 'monotone', tension: 0.4,
            datalabels: {
              display: true, color: 'black',
              formatter: function (value: any, context: any) { return value.toFixed(2); },
              font: { size: 12, }// weight: 'bold',
            }
          }
        ]
      },
      options: this.chartOptions
    });

    this.cICategoryDChart = new Chart(this.cICategoryChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { type: 'bar', yAxisID: 'y', label: 'Investment', data: currentInvestmnet, backgroundColor: this.chartColors.investment.amount.background },
          { type: 'bar', yAxisID: 'y', label: 'Profit', data: currentprofit, backgroundColor: this.chartColors.investment.profit.background },
          { type: 'line', yAxisID: 'y1', label: 'XIRR', data: currentxirr, backgroundColor: this.chartColors.investment.xirr.background, borderColor: this.chartColors.investment.xirr.border, borderWidth: 3, fill: false, cubicInterpolationMode: 'monotone', tension: 0.4 },
          { type: 'line', yAxisID: 'y1', label: 'Profit (%)', data: currentprofitPer, backgroundColor: this.chartColors.investment.profitper.background, borderColor: this.chartColors.investment.profitper.background, borderWidth: 3, fill: false, cubicInterpolationMode: 'monotone', tension: 0.4 }
        ]
      },
      options: this.chartOptions
    });

    // this.cICategoryChartData = {
    //   labels: labels,
    //   datasets: [
    //     { label: 'Investment', data: currentInvestmnet },
    //     { label: 'Profit', data: currentprofit },
    //     { label: 'XIRR', data: currentxirr },
    //     { label: 'Profit (%)', data: currentprofitPer }
    //   ]
    // };

      // this.categoryRedeems = {
      //   labels: redeemLabels,
      //   datasets: [
      //     { type: 'bar', yAxisID: 'y', backgroundColor: '#42A5F5', label: 'Investment', data: redeemInvestment },
      //     { type: 'bar', yAxisID: 'y', borderColor: '#FFA726', label: 'Profit', data: redeemProfit },
      //     { type: 'line', yAxisID: 'y1', borderColor: '#FFA726', borderWidth: 3, fill: false, label: 'XIRR', data: redeemXIRR,
      //         cubicInterpolationMode: 'monotone', tension: 0.4, lineTension: 0 }
      //   ]
      // };

      // this.categoryProfits = {
      //   labels: consolidatedLabels,
      //   datasets: [
      //     { label: 'Redeem', data: consolidatedRedeem, backgroundColor: this.chartColors.investment.profit.background },
      //     { label: 'Investment', data: consolidatedInvest, backgroundColor: this.chartColors.investment.profit.background }
      //   ]
      // };
    }
  }

  public updateFYYearCharts(data: any): void {
    if (data && data.length > 0) {

      var currentInvestmnet: any[] = [];
      var currentxirr: any[] = [];
      var currentprofit: any[] = [];
      var currentprofitPer: any[] = [];
      var currentbels: any[] = [];
      var totalInvestment = 0;

      var redeemInvestment: any[] = [];
      var redeemProfit: any[] = [];
      var redeemProfitPer: any[] = [];
      var redeemXIRR: any[] = [];
      var redeemLabels: any[] = [];

      var fyConsolidatedLabels: any[] = [];
      var fyConsolidatedCurrent: any[] =[];
      var fyConsolidatedRedeem: any[] = [];

      currentbels.push((data[0].financialYear - 1) + "-" + data[0].financialYear.toString().slice(-2));
      currentInvestmnet.push(0);
      currentxirr.push(0);
      currentprofit.push(0);
      currentprofitPer.push(0);

      for (let i = 0; i < data.length; i++) {

        var label = (data[i].financialYear.toString() + "-" + (data[i].financialYear + 1).toString().slice(-2));

        if (data[i].transactionType == 'I') {
          currentbels.push(label);
          currentInvestmnet.push(data[i].amount);
          currentxirr.push(data[i].xirr);
          currentprofit.push(data[i].profit);
          currentprofitPer.push(data[i].profitPer);
        }

        if (data[i].transactionType == 'R') {
          redeemLabels.push(label);
          redeemInvestment.push(data[i].amount);
          redeemXIRR.push(data[i].xirr);
          redeemProfit.push(data[i].profit);
          redeemProfitPer.push(data[i].profitPer);
        }

        if (fyConsolidatedLabels.indexOf(label) == -1) {
          fyConsolidatedLabels.push(label);

          var current = this.getFY(data,  data[i], "I");
          var redeem = this.getFY(data, data[i], "R");

          fyConsolidatedCurrent.push(current.xirr);
          fyConsolidatedRedeem.push(redeem.xirr);
        }
      }

      currentbels.push(data[data.length - 1].financialYear + 1 + "-" + (data[data.length - 1].financialYear + 2).toString().slice(-2));
      currentInvestmnet.push(0);
      currentxirr.push(0);
      currentprofit.push(0);
      currentprofitPer.push(0);

      this.cIFYYearDChart = new Chart(this.cIFYYearChartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: currentbels,
          datasets: [
            { type: 'bar', yAxisID: 'y', backgroundColor: this.chartColors.investment.amount.background, label: 'Investment', data: currentInvestmnet },
            { type: 'bar', yAxisID: 'y', backgroundColor: this.chartColors.investment.profit.background, label: 'Profit', data: currentprofit },
            { type: 'line', yAxisID: 'y1', backgroundColor: this.chartColors.investment.xirr.background, borderColor: this.chartColors.investment.xirr.border,
                borderWidth: 3, fill: false, label: 'XIRR', data: currentxirr, cubicInterpolationMode: 'monotone', tension: 0.4 },
            { type: 'line', yAxisID: 'y1', backgroundColor: this.chartColors.investment.profitper.background, borderColor: this.chartColors.investment.profitper.background,
              borderWidth: 3, fill: false, label: 'Profit (%)', data: currentprofitPer, cubicInterpolationMode: 'monotone', tension: 0.4 }
          ]
        },
        options: this.chartOptions
      });

      // this.fyRedeems = {
      //   labels: redeemLabels,
      //   datasets: [
      //     { type: 'bar', yAxisID: 'y', backgroundColor: '#42A5F5', label: 'Investment', data: redeemInvestment },
      //     { type: 'bar', yAxisID: 'y', borderColor: '#FFA726', label: 'Profit', data: redeemProfit },
      //     { type: 'line', yAxisID: 'y1', borderColor: '#FFA726', borderWidth: 3, fill: false, label: 'XIRR', data: redeemXIRR,
      //         cubicInterpolationMode: 'monotone', tension: 0.4, lineTension: 0 }
      //   ]
      // };

      // this.fyProfits = {
      //   labels: fyConsolidatedLabels,
      //   datasets: [
      //     { label: 'Redeem', data: fyConsolidatedRedeem },
      //     { label: 'Investment', data: fyConsolidatedCurrent }
      //   ]
      // };
    }
  }

  getCategory(categoryValues: any[], category: any, transactionType: string) {
    var returnValue = categoryValues.find(c => c.name === category.name && c.transactionType === transactionType);

    if (returnValue) return returnValue;
    return { name: category.name, amount: 0, currentValue: 0, profit: 0, transactionType: transactionType };
  }

  public getFY(values: any[], record: any, transactionType: string) {
    var returnValue = values.find(c => c.financialYear === record.financialYear && c.transactionType === transactionType);

    if (returnValue) return returnValue;
    return { financialYear: record.financialYear, amount: 0, currentValue: 0, profit: 0, transactionType: transactionType };
  }

}
