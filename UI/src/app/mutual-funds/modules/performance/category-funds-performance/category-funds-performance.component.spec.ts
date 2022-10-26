import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFundsPerformanceComponent } from './category-funds-performance.component';

describe('CategoryFundsPerformanceComponent', () => {
  let component: CategoryFundsPerformanceComponent;
  let fixture: ComponentFixture<CategoryFundsPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFundsPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFundsPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
