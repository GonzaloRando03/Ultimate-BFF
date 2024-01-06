import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointsGenericosComponent } from './endpoints-genericos.component';

describe('EndpointsGenericosComponent', () => {
  let component: EndpointsGenericosComponent;
  let fixture: ComponentFixture<EndpointsGenericosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndpointsGenericosComponent]
    });
    fixture = TestBed.createComponent(EndpointsGenericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
