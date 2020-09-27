import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import Guide from '../../model/Guide.model';
import { Onboarding } from '../../model/Onboarding.model';
import { Step } from '../../model/Step.model';
import { NgOnboardingService } from '../ng-onboarding/ng-onboarding.service';
import { QueueControllerService } from '../queue-controller/queue-controller.service';

@Injectable({
  providedIn: 'root'
})
export class GuideProgressionService implements OnDestroy {
  private currentGuide: Guide;
  private currentOnboarding: Onboarding;
  private injectedData: any;

  public currentStep: Step;
  public isPaused: boolean;

  public onPositionUpdate: Subject<string[]> = new Subject<string[]>();

  private onElementFound: Subject<HTMLElement> = new Subject<HTMLElement>();
  private onElementFoundSubscription: Subscription;

  private onGuideStartSubscription: Subscription;


  constructor(private queueControllerService: QueueControllerService, private onboardingService: NgOnboardingService) {
    this.listenToGuideStartSubject();
    this.listenToElementFoundSubject();
  }

  private listenToGuideStartSubject() {
    this.onGuideStartSubscription = this.queueControllerService.onGuideStart.subscribe(guide => {
      this.initializeGuide(guide);
    })
  }

  private listenToElementFoundSubject() {
    this.onElementFoundSubscription = this.onElementFound.subscribe(element => {
      const updatedPosition = this.getTooltipPositionFromHTMLElement(element, this.currentStep);
      this.onPositionUpdate.next(updatedPosition);
    })
  }

  private initializeGuide(guide: Guide) {
    this.currentGuide = guide;
    this.currentOnboarding = guide.onboarding;
    this.injectedData = guide.injectedData;

    this.onNextStep();
  }

  public async onNextStep(): Promise<Step> {
    const indexOfCurrentStep = this.currentOnboarding.steps.findIndex(step => step === this.currentStep);
    if (indexOfCurrentStep === this.currentOnboarding.steps.length - 1) {
      this.onGuideEnd();
    }

    const nextStep = this.currentOnboarding.steps[indexOfCurrentStep + 1];

    this.onStepEntry(nextStep, this.currentStep);
    const readyToContinue = await this.onAsyncStep(nextStep);

    if (readyToContinue) {
      this.currentStep = nextStep;
      return nextStep;
    } else {
      return null;
    }
  }

  public onGuideEnd(): void {
    if (this.currentStep.stepExit) {
      this.currentStep.stepExit(this.injectedData);
    }

    this.queueControllerService.onGuideCompleted.next(this.currentGuide);

    this.currentGuide = null;
    this.currentOnboarding = null;
    this.injectedData = null;
    this.currentStep = null;
  }

  private onStepEntry(nextStep: Step, previousStep?: Step): void {
    if (previousStep && previousStep.stepExit) {
      previousStep.stepExit(this.injectedData);
    }

    if (nextStep.stepEntry) {
      nextStep.stepEntry(this.injectedData);
    }
  }

  private onAsyncStep(step: Step): Promise<boolean> {
    return new Promise((resolve) => {
      //If step is not asynchronous, resolve immediately
      if (!step.asyncStep) { resolve(true); }

      const asyncConfiguration = step.asyncStep;

      //If the step has a subject to be listened, subscribe to it and when the value is truthy, resolve wrapping promise
      if (asyncConfiguration.subjectToListen) {
        const subscription = asyncConfiguration.subjectToListen.subscribe((isRendered) => {
          if (isRendered) {
            resolve(isRendered);
            subscription.unsubscribe();
          }
        })

      } else {
        //Else, just wait for the highlighted tag/id to be rendered

        const maxRetrys = asyncConfiguration.retryDuration || 10;
        const tooltipAnchor = step.tooltipAnchor;
        let currentTries = 0;

        const retryIntervalID = setInterval(() => {
          const anchorElement: HTMLElement = tooltipAnchor.anchorId
            ? document.getElementById(tooltipAnchor.anchorId)
            : (document.getElementsByTagName(tooltipAnchor.anchorTagName)[0] as HTMLElement);

          if (anchorElement) {
            resolve(true);
            clearInterval(retryIntervalID);
          } else {
            if (currentTries >= maxRetrys) {
              this.onGuideEnd();
              resolve(false);
              clearInterval(retryIntervalID);
              throw new Error(`Anchor element has not rendered after ${currentTries} tries, aborting guide...`);
            }
            currentTries++;
          }
        }, 1000)

      }
    })
  }

  public getGuideProguessValues(): { steps: string, percentage: number } {
    const index = this.currentOnboarding.steps.findIndex(step => step === this.currentStep);

    return {
      steps: `${index + 1} of ${this.currentOnboarding.steps.length}`,
      percentage: ((index + 1) / this.currentOnboarding.steps.length) * 100
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

      if (anchorElement) {
        this.onElementFound.next(anchorElement);
      } else {
        this.waitForElementToRender(tooltipAnchor.anchorTagName, tooltipAnchor.anchorId);
      }
    } else {
      throw new Error('The tooltip anchor configuration has no specific anchor or position declared');
    }
  }

  private getTooltipPositionFromHTMLElement(element: HTMLElement, step: Step): string[] {
    const tooltipAnchor = step.tooltipAnchor;
    const elementBoundingRect: DOMRect = element.getBoundingClientRect();
    const rawPosition: number[] = [elementBoundingRect.top, elementBoundingRect.left];
    const { width, height, arrowRadius } = this.onboardingService.configuration.tooltipDimensions;
    let { direction, location } = step.pointer;

    const hasHorizontalOverflow: boolean = elementBoundingRect.left + width + arrowRadius > window.innerWidth;
    const hasVerticalOverflow: boolean = elementBoundingRect.top + height + elementBoundingRect.height + arrowRadius > window.innerHeight;

    if (hasHorizontalOverflow && hasVerticalOverflow) {
      direction = 'RIGHT';
      location = 'END';

      rawPosition[0] -= height - 2 * arrowRadius;
      rawPosition[1] -= width + arrowRadius;
    } else if (hasHorizontalOverflow) {
      direction = 'UP';
      location = 'END';

      rawPosition[0] += elementBoundingRect.height + arrowRadius;
      rawPosition[1] -= width - 2 * arrowRadius;
    } else if (hasVerticalOverflow) {
      direction = 'DOWN';
      location = 'START';

      rawPosition[0] -= height + arrowRadius;
    } else {
      direction = 'UP';
      location = 'START';
      rawPosition[0] += elementBoundingRect.height + arrowRadius;
    }

    if (tooltipAnchor.offsetFromAnchor) {
      return [`${rawPosition[0] + tooltipAnchor.offsetFromAnchor[0]}px`, `${rawPosition[1] + + tooltipAnchor.offsetFromAnchor[1]}px`];
    } else {
      return [`${rawPosition[0]}px`, `${rawPosition[1]}px`];
    }
  }

  private waitForElementToRender(tagName?: string, id?: string): void {
    const mutationObserver = new MutationObserver((mutations, observer) => {

      const anchorElement: HTMLElement = id ? document.getElementById(id) : (document.getElementsByTagName(tagName)[0] as HTMLElement);
      if (anchorElement) {
        this.onElementFound.next(anchorElement);
        observer.disconnect();
        return;
      }
    })

    mutationObserver.observe(document, { childList: true, subtree: true });
  }

  ngOnDestroy() {
    this.onGuideStartSubscription.unsubscribe();
    this.onElementFoundSubscription.unsubscribe();
  }
}
