import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Guide from '../../model/Guide.model';
import { Onboarding } from '../../model/Onboarding.model';
import { Step } from '../../model/Step.model';
import { NgOnboardingService } from '../ng-onboarding/ng-onboarding.service';
import { QueueControllerService } from '../queue-controller/queue-controller.service';

@Injectable({
  providedIn: 'root'
})
export class GuideProgressionService implements OnDestroy {
  private currentGuide: Onboarding;
  private injectedData: any;

  public currentStep: Step;
  public isPaused: boolean;

  public onGuideStart: Subject<Guide> = new Subject<Guide>();
  private onGuideStartSubscription: Subscription;

  constructor(private queueControllerService: QueueControllerService, private onboardingService: NgOnboardingService) {
    this.listenToGuideStartSubject();
  }

  private listenToGuideStartSubject() {
    this.onGuideStartSubscription = this.onGuideStart.subscribe(guide => {
      this.initializeGuide(guide);
    })
  }

  private initializeGuide(onboardingGuide: Guide) {
    this.currentGuide = onboardingGuide.onboardingGuide;
    this.injectedData = onboardingGuide.injectedData;
    this.currentStep = onboardingGuide.onboardingGuide.steps[0];

    this.currentStep.stepEntry(this.injectedData);
  }

  private onNextStep() {

  }

  public getGuideProguessValues(): { steps: string, percentage: number } {
    const index = this.currentGuide.steps.findIndex(step => step === this.currentStep);

    return {
      steps: `${index + 1} of ${this.currentGuide.steps.length}`,
      percentage: ((index + 1) / this.currentGuide.steps.length) * 100
    };
  }

  public getStepTooltipPosition(): string[] {
    const tooltipAnchor = this.currentStep.tooltipAnchor;
    if (tooltipAnchor.absolutePosition) {
      return this.currentStep.tooltipAnchor.absolutePosition;
    } else if (tooltipAnchor.anchorTagName || tooltipAnchor.anchorId) {
      const anchorElement: HTMLElement = tooltipAnchor.anchorId
        ? document.getElementById(tooltipAnchor.anchorId)
        : (document.getElementsByTagName(tooltipAnchor.anchorTagName)[0] as HTMLElement);

      if (!anchorElement) {
        return;
      }

      const elementBoundingRect: DOMRect = anchorElement.getBoundingClientRect();
      const rawPosition: number[] = [elementBoundingRect.top, elementBoundingRect.left];
      const elementConfiguredDimensions = this.onboardingService.configuration.tooltipDimensions;

      const hasHorizontalOverflow: boolean = elementBoundingRect.left + elementConfiguredDimensions.width + elementConfiguredDimensions.arrowRadius > window.innerWidth;
      const hasVerticalOverflow: boolean = elementBoundingRect.top + TOOLTIP_DIMENSIONS.HEIGHT + elementBoundingRect.height + TOOLTIP_DIMENSIONS.ARROW_OFFSET > window.innerHeight;

      if (hasHorizontalOverflow && hasVerticalOverflow) {
        this.currentStep.pointerDirection = 'RIGHT';
        this.currentStep.pointerLocation = 'END';

        rawPosition[0] -= TOOLTIP_DIMENSIONS.HEIGHT - 2 * TOOLTIP_DIMENSIONS.ARROW_OFFSET;
        rawPosition[1] -= TOOLTIP_DIMENSIONS.WIDTH + TOOLTIP_DIMENSIONS.ARROW_OFFSET;
      } else if (hasHorizontalOverflow) {
        this.currentStep.pointerDirection = 'UP';
        this.currentStep.pointerLocation = 'END';

        rawPosition[0] += elementBoundingRect.height + TOOLTIP_DIMENSIONS.ARROW_OFFSET;
        rawPosition[1] -= TOOLTIP_DIMENSIONS.WIDTH - 2 * TOOLTIP_DIMENSIONS.ARROW_OFFSET;
      } else if (hasVerticalOverflow) {
        this.currentStep.pointerDirection = 'DOWN';
        this.currentStep.pointerLocation = 'START';

        rawPosition[0] -= TOOLTIP_DIMENSIONS.HEIGHT + TOOLTIP_DIMENSIONS.ARROW_OFFSET;
      } else {
        this.currentStep.pointerDirection = 'UP';
        this.currentStep.pointerLocation = 'START';
        rawPosition[0] += elementBoundingRect.height + TOOLTIP_DIMENSIONS.ARROW_OFFSET;
      }

      if (tooltipAnchor.offsetFromAnchor) {
        return [`${rawPosition[0] + tooltipAnchor.offsetFromAnchor[0]}px`, `${rawPosition[1] + + tooltipAnchor.offsetFromAnchor[1]}px`];
      } else {
        return [`${rawPosition[0]}px`, `${rawPosition[1]}px`];
      }
    }
  }

  ngOnDestroy() {
    this.onGuideStartSubscription.unsubscribe();
  }
}
