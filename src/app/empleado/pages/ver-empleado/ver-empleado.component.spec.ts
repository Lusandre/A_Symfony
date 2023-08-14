import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEmpleadoComponent } from './ver-empleado.component';

describe('VerEmpleadoComponent', () => {
  let component: VerEmpleadoComponent;
  let fixture: ComponentFixture<VerEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerEmpleadoComponent]
    });
    fixture = TestBed.createComponent(VerEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
