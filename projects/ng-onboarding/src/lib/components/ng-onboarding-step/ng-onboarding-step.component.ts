import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { GuideProgressionService } from '../../core/guide-progression/guide-progression.service';
import { NgOnboardingService } from '../../core/ng-onboarding/ng-onboarding.service';
import { Step } from '../../model/Step.model';
import { StepRender } from '../../model/StepRender.model';
import TooltipDimensions from '../../model/TooltipDimension.model';

@Component({
  selector: 'ng-onboarding-step',
  templateUrl: './ng-onboarding-step.component.html',
  styleUrls: ['./ng-onboarding-step.component.scss']
})
export class NgOnboardingStep implements OnInit, OnDestroy {

  public tooltipWrapperStyles: SafeStyle;
  public hasPointer: boolean;
  public pointerClass: string;
  public proguessReport: { steps: string, percentage: number };
  public currentStep: Step;

  private onStepReadySubscription: Subscription;
  private onGuideEndSubscription: Subscription;

  constructor(public guideProguession: GuideProgressionService, private ngOnboardingService: NgOnboardingService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setListenerForOnStepReady();
    this.setListenerForOnGuideEnd();
  }

  private setListenerForOnGuideEnd() {
    this.onGuideEndSubscription = this.guideProguession.onGuideFinish.subscribe(_ => {
      this.tooltipWrapperStyles = null;
      this.currentStep = null;
      this.proguessReport = null;
      this.pointerClass = null;
      this.hasPointer = false;
    })
  }

  private setListenerForOnStepReady() {
    this.onStepReadySubscription = this.guideProguession.onStepReady.subscribe(({ position, step, proguess }: StepRender) => {
      console.log("Received new step from service");

      this.tooltipWrapperStyles = this.getStepStyle(position, this.ngOnboardingService.configuration.tooltipDimensions);
      this.pointerClass = this.getPointerClass(step);
      this.hasPointer = this.stepHasPointer(step);
      this.proguessReport = proguess;
      this.currentStep = step;
    })
  }

  private getStepStyle(positionArray: string[], dimensions: TooltipDimensions): SafeStyle {
    const [topOffset, leftOffset, bottomOffset, rigthOffset] = positionArray;

    return this.sanitizer.bypassSecurityTrustStyle(`
      width: ${dimensions.width}px;
      height: ${dimensions.height}px;
      ${topOffset ? `top: ${topOffset};` : ''}
      ${leftOffset ? `left: ${leftOffset};` : ''}
      ${bottomOffset ? `bottom: ${bottomOffset};` : ''}
      ${rigthOffset ? `right: ${rigthOffset};` : ''}
    `);
  }

  private getPointerClass(step: Step): string {
    return `pointer ${step.pointer.direction?.toLowerCase()} ${step.pointer.location?.toLowerCase()}`;
  }

  private stepHasPointer(step: Step): boolean {
    return step.pointer.direction !== 'NONE';
  }

  ngOnDestroy() {
    if (this.onStepReadySubscription) {
      this.onStepReadySubscription.unsubscribe();
    }

    if (this.onGuideEndSubscription) {
      this.onGuideEndSubscription.unsubscribe();
    }
  }
}
