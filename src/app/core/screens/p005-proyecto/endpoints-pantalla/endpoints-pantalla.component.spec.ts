import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointsPantallaComponent } from './endpoints-pantalla.component';

describe('EndpointsPantallaComponent', () => {
  let component: EndpointsPantallaComponent;
  let fixture: ComponentFixture<EndpointsPantallaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EndpointsPantallaComponent]
    });
    fixture = TestBed.createComponent(EndpointsPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
