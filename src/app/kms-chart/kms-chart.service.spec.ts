import { TestBed } from '@angular/core/testing';

import { KmsChartService } from './kms-chart.service';

describe('KmsChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KmsChartService = TestBed.get(KmsChartService);
    expect(service).toBeTruthy();
  });
});
