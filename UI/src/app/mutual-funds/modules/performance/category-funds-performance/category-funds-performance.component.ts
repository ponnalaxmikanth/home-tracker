import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { MutualFundsService } from 'src/services/funds/mutual-funds.service';

@Component({
  selector: 'ht-category-funds-performance',
  templateUrl: './category-funds-performance.component.html',
  styleUrls: ['./category-funds-performance.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoryFundsPerformanceComponent implements OnInit {
  @Input() category: any;
  public categoryFunds: any[] = [];

  constructor(private _fundsServiceService: MutualFundsService, private SpinnerService: NgxSpinnerService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.category && changes.category.currentValue && changes.category.currentValue != '') {
      this.categoryFunds = [];
      this.SpinnerService.show();
      this._fundsServiceService.getCategoryPerformance('', changes.category.currentValue).subscribe(
      (data: any) => {
        this.categoryFunds = data?.success ? data?.responseObject : null;
        this.SpinnerService.hide();
      },
      (error: any) => {
        console.error(error);
        this.SpinnerService.hide();
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to Get Category Funds Performance Info'});
      }
    );
    }
  }



}
