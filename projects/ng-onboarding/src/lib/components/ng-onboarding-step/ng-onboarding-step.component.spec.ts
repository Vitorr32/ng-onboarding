import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOnboardingStep } from './ng-onboarding-step.component';

describe('StepByStepGuideComponent', () => {
  let component: NgOnboardingStep;
  let fixture: ComponentFixture<NgOnboardingStep>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgOnboardingStep ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgOnboardingStep);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
