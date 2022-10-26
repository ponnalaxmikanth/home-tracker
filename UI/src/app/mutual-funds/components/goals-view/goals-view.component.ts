import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';
import { InvestmentService } from 'src/services/investment/investment.service';

@Component({
  selector: 'ht-goals-view',
  templateUrl: './goals-view.component.html',
  styleUrls: ['./goals-view.component.scss']
})
export class GoalsViewComponent implements OnInit {
  @Input() dateFilter: any;

  public goalConsolidated: any;
  public goals: any[] = [];
  public dateRange: any;
  public portfolioID: number = -1;

  public investment: number = 0;
  public targetInvestment: number = 0;

  constructor(private messageService: MessageService, private _investmentsService: InvestmentService, private _fundsService: MutualFundsService, private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit(): void {
    // this._fundsService.portfolioID.subscribe(
    //   (portfolioid: number) => {
    //     console.log(`GoalsViewComponent--portfolio: ${portfolioid}`);
    //     if (!isNaN(portfolioid)) {
    //       this.portfolioID = portfolioid;
    //       this.getGoalsInfo(this.portfolioID);
    //     }
    //   }
    // );

    // this._fundsService.portfolioID.subscribe(
    //   (portfolioid: number) => {
    //     console.log(`GoalsViewComponent--portfolio: ${portfolioid}`);
    //     if (!isNaN(portfolioid)) {
    //       this.portfolioID = portfolioid;
    //       this.getGoalsInfo(this.portfolioID);
    //     }
    //   });

    this.route.queryParams.subscribe(params => {
        this.portfolioID = params.portfolioid;
        console.log('GoalsViewComponent', this.portfolioID);
        this.getGoalsInfo(this.portfolioID);
      }
    );

    // this.router.events.subscribe((val) => {
    //   console.log('GoalsViewComponent', val instanceof NavigationEnd);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.dateFilter) {
      this.dateRange = changes.dateFilter.currentValue;
      if (this.portfolioID != null && this.dateRange != null && this.dateRange[0] != null && this.dateRange[1] != null) {
        this.getGoalsInfo(this.portfolioID);
      }
    }
  }

  public getGoalsInfo(portfolioid: number): void {
    if (this.portfolioID == null || this.dateRange == null || this.dateRange[0] == null || this.dateRange[1] == null)
      return;

    this._investmentsService.goalsInfo(portfolioid, this.dateRange[0], this.dateRange[1]).subscribe(
      (data: any) => {
        if (data.success) {
          var goalsInfo = data.success ? data.responseObject : null;
        this.goalConsolidated = goalsInfo ? goalsInfo?.consolidatedInfo : null;
        this.goals = goalsInfo ? goalsInfo.goals : null;
        this.calculateInvestment();
        } else {
          this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Get Goals Info'});
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public calculateInvestment(): void {
    this.investment = 0;
    this.targetInvestment = 0;
    if (this.goals && this.goals.length > 0) {
      this.goals.forEach(g => {
        this.targetInvestment = this.targetInvestment + (g?.completedMonths * g?.sipAmount);
        this.investment = this.investment + g?.investment;
        // console.log('calculateInvestment, investment: ', this.investment, ', targetInvestment: ', this.targetInvestment);
      });
    }
  }

}
