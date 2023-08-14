import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProvinciaComponent } from './ver-provincia.component';

describe('VerProvinciaComponent', () => {
  let component: VerProvinciaComponent;
  let fixture: ComponentFixture<VerProvinciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerProvinciaComponent]
    });
    fixture = TestBed.createComponent(VerProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
