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

  public currentStepToShow: string = '';
  public shouldRenderAnchorOfStep2: boolean = false;

  public toInjectData: any;

  public subjectToBeWaited: Subject<string> = new Subject<string>();

  constructor() {

  }

  ngOnInit() {
    this.setInjectedDataToGuide();

    this.subjectToBeWaited.subscribe((stepExitCommand?: string) => {
      switch (stepExitCommand) {
        case 'step1exit':
          this.onShowAsyncStepAnchor();
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

  private onShowAsyncStepAnchor() {
    setTimeout(() => this.shouldRenderAnchorOfStep2 = true, 5000);
  }

  public shouldAddShowClassForAnchorDiv(anchorId: string): string {
    return `anchor-message ${anchorId === this.currentStepToShow ? 'reveal' : ''}`;
  }
}
