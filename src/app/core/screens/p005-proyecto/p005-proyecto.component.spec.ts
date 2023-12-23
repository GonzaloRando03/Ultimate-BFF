import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P005ProyectoComponent } from './p005-proyecto.component';

describe('P005ProyectoComponent', () => {
  let component: P005ProyectoComponent;
  let fixture: ComponentFixture<P005ProyectoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P005ProyectoComponent]
    });
    fixture = TestBed.createComponent(P005ProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
