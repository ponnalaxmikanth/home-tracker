import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

import { InvestmentService } from 'src/services/investment/investment.service';

@Component({
  selector: 'ht-goal-allocation',
  templateUrl: './goal-allocation.component.html',
  styleUrls: ['./goal-allocation.component.scss']
})
export class GoalAllocationComponent implements OnInit {
  public allocations: any[] = [];

  constructor(private _investmentsService: InvestmentService, private SpinnerService: NgxSpinnerService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.goalAllocations();
  }

  public goalAllocations(): void {
    this.allocations = [];
    this._investmentsService.goalAllocations().subscribe(
      (data: any) => {
        this.allocations = data.success ? data.responseObject : null;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
