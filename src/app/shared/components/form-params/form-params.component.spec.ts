import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParamsComponent } from './form-params.component';

describe('FormParamsComponent', () => {
  let component: FormParamsComponent;
  let fixture: ComponentFixture<FormParamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormParamsComponent]
    });
    fixture = TestBed.createComponent(FormParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
