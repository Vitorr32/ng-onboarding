import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import ShowCaseRepository from '../respository/ShowcaseRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-onboarding-showcase';
  public showcaseRepository = ShowCaseRepository();

  public shouldRenderAnchorOfStep2: boolean = false;

  public toInjectData: any;

  public subjectToBeWaited: Subject<string> = new Subject<string>();

  constructor() {

  }

  ngOnInit() {
    this.setInjectedDataToGuide();

    this.subjectToBeWaited.subscribe((stepId?: string) => {
      switch (stepId) {

      }
    });
  }

  private setInjectedDataToGuide(): void {
    this.toInjectData = {
      onStepExitSubject: this.subjectToBeWaited
    }
  }

  public onShowcaseStart(): void {

  }
}
