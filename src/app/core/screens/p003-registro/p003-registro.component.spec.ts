import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P003RegistroComponent } from './p003-registro.component';

describe('P003RegistroComponent', () => {
  let component: P003RegistroComponent;
  let fixture: ComponentFixture<P003RegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P003RegistroComponent]
    });
    fixture = TestBed.createComponent(P003RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
