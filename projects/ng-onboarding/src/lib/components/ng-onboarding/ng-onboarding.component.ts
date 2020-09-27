import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GuideProgressionService } from '../../core/guide-progression/guide-progression.service';
import { NgOnboardingService } from '../../core/ng-onboarding/ng-onboarding.service';
import Configuration from '../../model/Configuration.model';
import { Onboarding } from '../../model/Onboarding.model';

@Component({
  selector: 'ng-onboarding',
  templateUrl: `./ng-onboarding.component.html`,
  styleUrls: ['./ng-onboarding.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgOnboardingComponent implements OnInit {
  @Input()
  repository: Onboarding[] | Onboarding;
  @Input()
  configuration?: Configuration;

  constructor(private onboardingService: NgOnboardingService, private guideProguession: GuideProgressionService) { }

  ngOnInit(): void {
    if (!this.repository) {
      throw new Error('Ng onboarding intialized with no values in the repository input');
    }

    if (Array.isArray(this.repository)) {
      this.repository.forEach(guide => this.onboardingService.addGuideToRepository(guide));
    } else {
      this.onboardingService.directStartGuide(this.repository);
    }

    if (this.configuration) {
      this.onboardingService.updateConfiguration(this.configuration);
    }
  }

  public isGuideInProguess(): boolean {
    return this.guideProguession.currentStep && !this.guideProguession.isPaused;
  }
}
