import { Component, OnInit } from '@angular/core';
import { StepsGuideService } from 'src/app/core/service/steps-guide.service';
import { Step } from '../../models/components/step-by-step/Step.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-step-by-step-guide',
  templateUrl: './step-by-step-guide.component.html',
  styleUrls: ['./step-by-step-guide.component.scss']
})
export class StepByStepGuideComponent implements OnInit {

  public tooltipPosition: string;

  constructor(public stepsGuideService: StepsGuideService) { }

  ngOnInit(): void {
    this.stepsGuideService.onStepEntered.subscribe(_ => {
      this.tooltipPosition = this.getStepStyle();
    })
  }

  public getStepStyle(): string {
    const [topOffset, leftOffset, bottomOffset, rigthOffset] = this.stepsGuideService.getStepTooltipPosition() || ['0px', '0px', '0px', '0px'];
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
