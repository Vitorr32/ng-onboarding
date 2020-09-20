import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepByStepGuideComponent } from './ng-onboarding-step.component';

describe('StepByStepGuideComponent', () => {
  let component: StepByStepGuideComponent;
  let fixture: ComponentFixture<StepByStepGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepByStepGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepByStepGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
