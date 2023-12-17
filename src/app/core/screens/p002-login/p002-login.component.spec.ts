import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P002LoginComponent } from './p002-login.component';

describe('P002LoginComponent', () => {
  let component: P002LoginComponent;
  let fixture: ComponentFixture<P002LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P002LoginComponent]
    });
    fixture = TestBed.createComponent(P002LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
