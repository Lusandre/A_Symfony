import { TestBed } from '@angular/core/testing';

import { RelacionEmpleadosCentrosService } from './relacion-empleados-centros.service';

describe('RelacionEmpleadosCentrosService', () => {
  let service: RelacionEmpleadosCentrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacionEmpleadosCentrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
