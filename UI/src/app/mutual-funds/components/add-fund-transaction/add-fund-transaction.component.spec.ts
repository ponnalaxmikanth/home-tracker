import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFundTransactionComponent } from './add-fund-transaction.component';

describe('AddFundTransactionComponent', () => {
  let component: AddFundTransactionComponent;
  let fixture: ComponentFixture<AddFundTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFundTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFundTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
