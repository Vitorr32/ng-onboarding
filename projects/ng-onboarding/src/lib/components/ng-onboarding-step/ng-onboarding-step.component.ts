import { Component, OnInit } from '@angular/core';
import { GuideProgressionService } from '../../core/guide-progression/guide-progression.service';
import { Step } from '../../model/Step.model';

@Component({
  selector: 'ng-onboarding-step',
  templateUrl: './ng-onboarding-step.component.html',
  styleUrls: ['./ng-onboarding-step.component.scss']
})
export class NgOnboardingStep implements OnInit {

  public tooltipPosition: string;
  public hasPointer: boolean;
  public pointerClass: string;
  public proguessReport: { steps: string, percentage: number };

  constructor(public guideProguession: GuideProgressionService) { }

  ngOnInit(): void {
    this.guideProguession.onPositionUpdate.subscribe(position => {
      this.tooltipPosition = this.getStepStyle(position);
      this.pointerClass = this.getPointerClass(this.guideProguession.currentStep);
      this.hasPointer = this.hasPonter(this.guideProguession.currentStep);
      this.proguessReport = this.guideProguession.getGuideProguessValues();
    })
  }

  private getStepStyle(positionArray: string[]): string {
    const [topOffset, leftOffset, bottomOffset, rigthOffset] = positionArray;
    return `
      ${topOffset ? `top: ${topOffset};` : ''}
      ${leftOffset ? `left: ${leftOffset};` : ''}
      ${bottomOffset ? `bottom: ${bottomOffset};` : ''}
      ${rigthOffset ? `right: ${rigthOffset};` : ''}
    `;
  }

  private getPointerClass(step: Step): string {
    return `pointer ${step.pointer.direction?.toLowerCase()} ${step.pointer.location?.toLowerCase()}`;
  }

  private hasPonter(step: Step): boolean {
    return step.pointer.direction !== 'NONE';
  }

}
