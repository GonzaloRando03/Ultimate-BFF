import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P001HomeComponent } from './p001-home.component';

describe('P001HomeComponent', () => {
  let component: P001HomeComponent;
  let fixture: ComponentFixture<P001HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P001HomeComponent]
    });
    fixture = TestBed.createComponent(P001HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
