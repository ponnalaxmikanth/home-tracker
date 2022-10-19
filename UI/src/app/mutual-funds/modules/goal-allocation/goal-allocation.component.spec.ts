import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAllocationComponent } from './goal-allocation.component';

describe('GoalAllocationComponent', () => {
  let component: GoalAllocationComponent;
  let fixture: ComponentFixture<GoalAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
