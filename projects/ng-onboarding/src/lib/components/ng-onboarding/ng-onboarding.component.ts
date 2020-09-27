import { Component, Input, OnInit } from '@angular/core';
import { GuideProgressionService } from '../../core/guide-progression/guide-progression.service';
import { NgOnboardingService } from '../../core/ng-onboarding/ng-onboarding.service';
import { Onboarding } from '../../model/Onboarding.model';
import { Step } from '../../model/Step.model';

@Component({
  selector: 'ng-onboarding',
  templateUrl: `./ng-onboarding.component.html`,
  styles: []
})
export class NgOnboardingComponent implements OnInit {
  @Input()
  repository: Onboarding[] | Onboarding;

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
  }

}
