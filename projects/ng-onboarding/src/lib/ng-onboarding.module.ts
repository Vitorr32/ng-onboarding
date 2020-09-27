import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgOnboardingStep } from './components/ng-onboarding-step/ng-onboarding-step.component';
import { NgOnboardingComponent } from './components/ng-onboarding/ng-onboarding.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NgOnboardingComponent, NgOnboardingStep],
  imports: [CommonModule, MatProgressBarModule, MatIconModule],
  exports: [NgOnboardingComponent]
})
export class NgOnboardingModule { }
