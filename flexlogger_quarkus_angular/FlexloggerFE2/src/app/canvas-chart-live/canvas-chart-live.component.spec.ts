import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasChartLiveComponent } from './canvas-chart-live.component';

describe('CanvasChartLiveComponent', () => {
  let component: CanvasChartLiveComponent;
  let fixture: ComponentFixture<CanvasChartLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasChartLiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasChartLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
