import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentesVisualesComponent } from './componentes-visuales.component';

describe('ComponentesVisualesComponent', () => {
  let component: ComponentesVisualesComponent;
  let fixture: ComponentFixture<ComponentesVisualesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentesVisualesComponent]
    });
    fixture = TestBed.createComponent(ComponentesVisualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
