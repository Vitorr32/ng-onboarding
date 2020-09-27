import { Component } from '@angular/core';
import ShowCaseRepository from '../respository/ShowcaseRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-onboarding-showcase';
  public showcaseRepository = ShowCaseRepository();

  constructor() {
  }

  public onShowcaseStart(): void {

  }
}
