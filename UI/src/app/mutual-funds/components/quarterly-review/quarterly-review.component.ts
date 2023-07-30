import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';
import { InvestmentService } from 'src/services/investment/investment.service';

export interface IquarterlyReviewInfo {
  portfolioID: number;
  portfolio: string;
  goalID:number;
  goal: string;
  currentExpense: number;
  targetExpense: number;
  startDate: Date;
  endDate: Date;
  date: Date;
  investment: Number;
  currentValue: Number;
  profit: Number;
  absoluteReturn: Number;
  xirr: Number;
  sip: Number;
  completedMonths: Number;
  estimatedInvestment: Number;
  sipAchieved: Number;
  goalCurrentAchieved: Number;
  goalTargetAchieved: Number;
}

@Component({
  selector: 'ht-quarterly-review',
  templateUrl: './quarterly-review.component.html',
  styleUrls: ['./quarterly-review.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuarterlyReviewComponent implements OnInit {
  public quarterlyReviewInfo: IquarterlyReviewInfo[] = [];
  public cols: any[] = [];
  public apiInPrigress: boolean = false;
  public portfolioId: number = -1;
  public goals: any[] = [];

  constructor(private _fundsServiceService: MutualFundsService, private messageService: MessageService, private SpinnerService: NgxSpinnerService, private route: ActivatedRoute) {
    this.cols = [
      { field: 'portfolio', header: 'Portfolio', type: "string" , class: 'portfolio', filter: false },
      { field: 'goal', header: 'Goal', type: "string", class: 'goal', filter: true },
      { field: 'currentExpense', header: 'Current Expense', type: "currency", class: 'number current-expense', filter: false },
      { field: 'targetExpense', header: 'Target Expense', type: "currency", class: 'number target-expense', filter: false },

      { field: 'startDate', header: 'Start Date', type: "date", class: 'date start-date', filter: false },
      { field: 'endDate', header: 'End Date', type: "date", class: 'date end-date', filter: false },
      { field: 'date', header: 'Review Date', type: "date", class: 'date period-date', filter: true },
      { field: 'estimatedInvestment', header: 'Estimated Investment', type: "currency", class: 'number estimated-investment', filter: false },
      { field: 'investment', header: 'Investment', type: "currency", class: 'number investment', filter: false },

      { field: 'profit', header: 'Profit', type: "currency", class: 'number profit', filter: false },
      { field: 'absoluteReturn', header: 'Profit (%)', type: "percent", class: 'number absolute-return', filter: false },
      { field: 'xirr', header: 'xirr', type: "percent", class: 'number xirr', filter: false },
      { field: 'currentValue', header: 'Current Value', type: "currency", class: 'number current-value', filter: false },

      { field: 'sip', header: 'SIP', type: "currency", class: 'number sip-amount', filter: false },

      { field: 'sipAchieved', header: 'SIP Achieved', type: "percent", class: 'number sip-achieved', filter: false },
      { field: 'goalCurrentAchieved', header: 'Goal Current Achieved', type: "percent", class: 'number goal-current-achieved', filter: false },
      { field: 'goalTargetAchieved', header: 'Goal Target Achieved', type: "percent", class: 'number goal-target-achieved', filter: false },

      { field: 'completedMonths', header: 'Completed Months', type: "number", class: 'number completed-months', filter: false },
    ];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.portfolioId = params.portfolioid;
        this.getData();
      }
    );
  }

  public getData(): void {
    this.apiInPrigress = true;
    this.quarterlyReviewInfo = [];
    this.goals = [];
    this._fundsServiceService.getGoalsReview(this.portfolioId, false).subscribe(
      (data: any) => {
        if (data.success) {
          this.quarterlyReviewInfo = data.success ? data.responseObject : [];
          this.apiInPrigress = false;
          const uniqueGoals = [...new Set(this.quarterlyReviewInfo.map(item => item.goal))];
          uniqueGoals.forEach(element => {
            this.goals.push({label: element, value: element});
          });
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Get Quaterly Review Info'});
          this.apiInPrigress = false;
        }
      },
      (err: any) => {
        this.apiInPrigress = false;
      });

  }

}
