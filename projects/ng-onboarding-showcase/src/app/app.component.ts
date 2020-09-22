import { Component } from '@angular/core';
import { NgOnboardingService } from 'projects/ng-onboarding/src/lib/core/ng-onboarding/ng-onboarding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-onboarding-showcase';

  constructor(private onboardingService: NgOnboardingService) {
    onboardingService.addGuideToRepository({
      identifier: 'Yolo',
      steps: [],
      trigger: () => true
    })
  }

  public onShowcaseStart(): void {

  }
}
