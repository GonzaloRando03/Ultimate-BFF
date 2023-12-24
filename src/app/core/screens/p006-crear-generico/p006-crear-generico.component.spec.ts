import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P006CrearGenericoComponent } from './p006-crear-generico.component';

describe('P006CrearGenericoComponent', () => {
  let component: P006CrearGenericoComponent;
  let fixture: ComponentFixture<P006CrearGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P006CrearGenericoComponent]
    });
    fixture = TestBed.createComponent(P006CrearGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
