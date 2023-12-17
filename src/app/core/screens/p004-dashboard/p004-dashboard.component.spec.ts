import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P004DashboardComponent } from './p004-dashboard.component';

describe('P004DashboardComponent', () => {
  let component: P004DashboardComponent;
  let fixture: ComponentFixture<P004DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P004DashboardComponent]
    });
    fixture = TestBed.createComponent(P004DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
