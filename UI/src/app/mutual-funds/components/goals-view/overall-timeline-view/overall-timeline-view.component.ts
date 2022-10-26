import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ht-overall-timeline-view',
  templateUrl: './overall-timeline-view.component.html',
  styleUrls: ['./overall-timeline-view.component.scss']
})
export class OverallTimelineViewComponent implements OnInit {
  @Input() consolidated: any;

  constructor() { }

  ngOnInit(): void {
  }

}
