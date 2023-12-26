import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P011VerVisualComponent } from './p011-ver-visual.component';

describe('P010VerVisualComponent', () => {
  let component: P011VerVisualComponent;
  let fixture: ComponentFixture<P011VerVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P011VerVisualComponent]
    });
    fixture = TestBed.createComponent(P011VerVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
