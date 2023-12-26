import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P010VerPantallaComponent } from './p010-ver-pantalla.component';

describe('P010VerPantallaComponent', () => {
  let component: P010VerPantallaComponent;
  let fixture: ComponentFixture<P010VerPantallaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P010VerPantallaComponent]
    });
    fixture = TestBed.createComponent(P010VerPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
