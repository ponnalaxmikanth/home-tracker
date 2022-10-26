import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyReviewComponent } from './quarterly-review.component';

describe('QuarterlyReviewComponent', () => {
  let component: QuarterlyReviewComponent;
  let fixture: ComponentFixture<QuarterlyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuarterlyReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterlyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
