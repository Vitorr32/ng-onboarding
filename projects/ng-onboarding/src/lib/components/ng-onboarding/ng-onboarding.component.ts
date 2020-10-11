import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
export class NgOnboardingComponent implements OnInit, OnChanges {
  @Input()
  repository: Onboarding[] | Onboarding;
  @Input()
  injectedData?: any;
  @Input()
  width?: number;
  @Input()
  height?: number;
  @Input()
  backdropColor?: string;
  @Input()
  configuration?: Configuration;

  constructor(private onboardingService: NgOnboardingService, private guideProguession: GuideProgressionService) { }

  ngOnInit(): void {

    console.log(this.injectedData);
    if (!this.repository) {
      throw new Error('Ng onboarding intialized with no values in the repository input');
    }

    if (this.injectedData) {
      this.onboardingService.injectedData = this.injectedData;
    }

    if (Array.isArray(this.repository)) {
      this.repository.forEach(guide => this.onboardingService.addGuideToRepository(guide));
    } else {
      this.onboardingService.directStartGuide(this.repository, this.injectedData);
    }

    const newConfiguration = this.configuration || new Configuration();

    newConfiguration.tooltipDimensions.height = this.height || newConfiguration.tooltipDimensions.height;
    newConfiguration.tooltipDimensions.width = this.width || newConfiguration.tooltipDimensions.width;
    newConfiguration.backdropColor = this.backdropColor || newConfiguration.backdropColor;

    this.onboardingService.updateConfiguration(this.configuration);
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}
