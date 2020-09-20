import { Component, OnInit } from '@angular/core';
import { GuideProgressionService } from '../../core/guide-progression/guide-progression.service';

@Component({
  selector: 'ng-onboarding-step',
  templateUrl: './ng-onboarding-step.component.html',
  styleUrls: ['./ng-onboarding-step.component.scss']
})
export class NgOnboardingStep implements OnInit {

  public tooltipPosition: string;

  constructor(public guideProguession: GuideProgressionService) { }

  ngOnInit(): void {
    // this.guideProguession.onStepEntered.subscribe(_ => {
    //   this.tooltipPosition = this.getStepStyle();
    // })
  }

  public getStepStyle(): string {
    const [topOffset, leftOffset, bottomOffset, rigthOffset] = this.guideProguession.getStepTooltipPosition() || ['0px', '0px', '0px', '0px'];
    return `
      ${topOffset ? `top: ${topOffset};` : ''}
      ${leftOffset ? `left: ${leftOffset};` : ''}
      ${bottomOffset ? `bottom: ${bottomOffset};` : ''}
      ${rigthOffset ? `right: ${rigthOffset};` : ''}
    `;
  }

  public getPointerClass(step: Step): string {
    return `pointer ${step.pointerDirection?.toLowerCase()} ${step.pointerLocation?.toLowerCase()}`;
  }

  public getGuideProguessBarValue(): number {
    const index = this.stepsGuideService.currentGuide.steps.findIndex(step => step === this.stepsGuideService.currentStep);

    return ((index + 1) / this.stepsGuideService.currentGuide.steps.length) * 100;
  }

  public getGuideProguessSteps(): string {
    const index = this.stepsGuideService.getCurrentStepIndex();

    return `${index + 1} of ${this.stepsGuideService.currentGuide.steps.length}`;
  }

}
