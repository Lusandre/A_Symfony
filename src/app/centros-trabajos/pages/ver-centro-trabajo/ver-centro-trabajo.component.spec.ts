import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCentroTrabajoComponent } from './ver-centro-trabajo.component';

describe('VerCentroTrabajoComponent', () => {
  let component: VerCentroTrabajoComponent;
  let fixture: ComponentFixture<VerCentroTrabajoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCentroTrabajoComponent]
    });
    fixture = TestBed.createComponent(VerCentroTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
