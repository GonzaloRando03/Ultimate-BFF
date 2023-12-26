import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P008CrearVisualComponent } from './p008-crear-visual.component';

describe('P008CrearVisualComponent', () => {
  let component: P008CrearVisualComponent;
  let fixture: ComponentFixture<P008CrearVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P008CrearVisualComponent]
    });
    fixture = TestBed.createComponent(P008CrearVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
