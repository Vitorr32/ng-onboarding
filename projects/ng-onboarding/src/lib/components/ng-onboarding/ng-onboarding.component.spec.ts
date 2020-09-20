import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOnboardingComponent } from './ng-onboarding.component';

describe('NgOnboardingComponent', () => {
  let component: NgOnboardingComponent;
  let fixture: ComponentFixture<NgOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
