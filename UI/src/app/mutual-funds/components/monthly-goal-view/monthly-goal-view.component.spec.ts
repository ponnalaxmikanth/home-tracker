import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyGoalViewComponent } from './monthly-goal-view.component';

describe('MonthlyGoalViewComponent', () => {
  let component: MonthlyGoalViewComponent;
  let fixture: ComponentFixture<MonthlyGoalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyGoalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyGoalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
