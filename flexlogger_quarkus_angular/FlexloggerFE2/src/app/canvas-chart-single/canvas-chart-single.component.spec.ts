import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasChartSingleComponent } from './canvas-chart-single.component';

describe('CanvasChartSingleComponent', () => {
  let component: CanvasChartSingleComponent;
  let fixture: ComponentFixture<CanvasChartSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasChartSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasChartSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
