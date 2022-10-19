import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { InvestmentService } from 'src/services/investment/investment.service';

@Component({
  selector: 'ht-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  public goals: any[] = [];
  public displayGoalEdit : boolean = false;
  public goalToEdit: any;

  constructor(private _investmentsService: InvestmentService, private SpinnerService: NgxSpinnerService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getGoals();
  }

    public getGoals(): void {
    this._investmentsService.goals().subscribe(
      (data: any) => {
        this.goals = data.success ? data.responseObject : null;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
