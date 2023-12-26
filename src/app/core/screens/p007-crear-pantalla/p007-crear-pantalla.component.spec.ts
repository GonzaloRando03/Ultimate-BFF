import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P007CrearPantallaComponent } from './p007-crear-pantalla.component';

describe('P007CrearPantallaComponent', () => {
  let component: P007CrearPantallaComponent;
  let fixture: ComponentFixture<P007CrearPantallaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P007CrearPantallaComponent]
    });
    fixture = TestBed.createComponent(P007CrearPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
