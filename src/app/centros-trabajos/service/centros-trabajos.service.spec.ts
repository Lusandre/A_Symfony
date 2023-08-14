import { TestBed } from '@angular/core/testing';

import { CentrosTrabajosService } from './centros-trabajo.service';

describe('CentrosTrabajosService', () => {
  let service: CentrosTrabajosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentrosTrabajosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
