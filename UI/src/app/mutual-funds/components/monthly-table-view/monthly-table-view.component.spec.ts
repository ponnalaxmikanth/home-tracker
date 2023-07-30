import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTableViewComponent } from './monthly-table-view.component';

describe('MonthlyTableViewComponent', () => {
  let component: MonthlyTableViewComponent;
  let fixture: ComponentFixture<MonthlyTableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyTableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
