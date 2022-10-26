import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallTimelineViewComponent } from './overall-timeline-view.component';

describe('OverallTimelineViewComponent', () => {
  let component: OverallTimelineViewComponent;
  let fixture: ComponentFixture<OverallTimelineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallTimelineViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverallTimelineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
