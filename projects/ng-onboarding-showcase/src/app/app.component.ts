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
  public isLoading: boolean = false;
  public waitingUserInput: boolean = true;
  public showcaseRepository;

  public currentStepToShow: string = '';
  public toInjectData: any;
  public subjectToBeWaited: Subject<string> = new Subject<string>();
  public buttonClickSubject: Subject<boolean> = new Subject<boolean>();
  public steps: string[] = [
    'anchor-1', 'anchor-2', 'anchor-3', 'anchor-4'
  ]

  constructor() {

  }

  ngOnInit() {
    this.subjectToBeWaited.subscribe((stepExitCommand?: string) => {
      console.log(stepExitCommand);
      if (stepExitCommand === 'anchor-4') {
        this.isLoading = true;
        setTimeout(() => {
          this.currentStepToShow = stepExitCommand
          this.isLoading = false;
        }, 5000);
      } else {
        this.currentStepToShow = stepExitCommand
      }
    });
  }

  private setInjectedDataToGuide(): void {
    this.toInjectData = {
      onStepExitSubject: this.subjectToBeWaited
    }
  }

  public onShowcaseStart(): void {
    this.setInjectedDataToGuide();
    this.showcaseRepository = ShowCaseRepository(this.buttonClickSubject);
    this.startedGuide = true;
  }

  public showShowAnchorDiv(anchorId: string): boolean {
    return anchorId === this.currentStepToShow;
  }

  public shouldAddShowClassForAnchorDiv(anchorId: string): string {
    return `anchor-message ${anchorId === this.currentStepToShow ? 'reveal' : ''}`;
  }
}
