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
  public startedGuide: boolean = false;
  public showcaseRepository;

  public currentStepToShow: string = '';
  public toInjectData: any;
  public subjectToBeWaited: Subject<string> = new Subject<string>();

  constructor() {

  }

  ngOnInit() {
    this.subjectToBeWaited.subscribe((stepExitCommand?: string) => {
      this.currentStepToShow = stepExitCommand;
    });
  }

  private setInjectedDataToGuide(): void {
    this.toInjectData = {
      onStepExitSubject: this.subjectToBeWaited
    }
  }

  public onShowcaseStart(): void {
    this.setInjectedDataToGuide();
    this.showcaseRepository = ShowCaseRepository();
    this.startedGuide = true;
  }

  public shouldAddShowClassForAnchorDiv(anchorId: string): string {
    return `anchor-message ${anchorId === this.currentStepToShow ? 'reveal' : ''}`;
  }
}
