import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantesComponent } from './participantes.component';

describe('ParticipantesComponent', () => {
  let component: ParticipantesComponent;
  let fixture: ComponentFixture<ParticipantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipantesComponent]
    });
    fixture = TestBed.createComponent(ParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
