import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P100DocsComponent } from './p100-docs.component';

describe('P100DocsComponent', () => {
  let component: P100DocsComponent;
  let fixture: ComponentFixture<P100DocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [P100DocsComponent]
    });
    fixture = TestBed.createComponent(P100DocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
