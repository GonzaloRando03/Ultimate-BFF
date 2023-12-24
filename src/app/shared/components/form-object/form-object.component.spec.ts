import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormObjectComponent } from './form-object.component';

describe('FormObjectComponent', () => {
  let component: FormObjectComponent;
  let fixture: ComponentFixture<FormObjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormObjectComponent]
    });
    fixture = TestBed.createComponent(FormObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
