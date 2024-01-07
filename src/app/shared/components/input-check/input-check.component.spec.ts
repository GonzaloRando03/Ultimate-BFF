import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCheckComponent } from './input-check.component';

describe('AppInputCheckComponent', () => {
  let component: InputCheckComponent;
  let fixture: ComponentFixture<InputCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputCheckComponent]
    });
    fixture = TestBed.createComponent(InputCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
