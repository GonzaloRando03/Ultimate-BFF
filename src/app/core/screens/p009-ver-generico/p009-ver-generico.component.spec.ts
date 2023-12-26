import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P009VerGenericoComponent } from './p009-ver-generico.component';

describe('P009VerGenericoComponent', () => {
  let component: P009VerGenericoComponent;
  let fixture: ComponentFixture<P009VerGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P009VerGenericoComponent]
    });
    fixture = TestBed.createComponent(P009VerGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
