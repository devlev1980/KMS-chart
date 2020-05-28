import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KmsChartComponent } from './kms-chart.component';

describe('KmsChartComponent', () => {
  let component: KmsChartComponent;
  let fixture: ComponentFixture<KmsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KmsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KmsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
