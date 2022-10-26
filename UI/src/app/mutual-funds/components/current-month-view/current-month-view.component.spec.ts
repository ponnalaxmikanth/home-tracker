import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMonthViewComponent } from './current-month-view.component';

describe('CurrentMonthViewComponent', () => {
  let component: CurrentMonthViewComponent;
  let fixture: ComponentFixture<CurrentMonthViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentMonthViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
