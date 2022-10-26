import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsViewComponent } from './goals-view.component';

describe('GoalsViewComponent', () => {
  let component: GoalsViewComponent;
  let fixture: ComponentFixture<GoalsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
