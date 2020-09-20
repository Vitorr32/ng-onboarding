import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Guide from '../../model/Guide.model';

@Injectable({
  providedIn: 'root'
})
export class QueueControllerService implements OnDestroy {
  private _guideQueue: Guide[] = [];

  public addGuideToQueue: Subject<Guide> = new Subject<Guide>();
  public addGuideToQueueSubscription: Subscription;

  public onGuideCompleted: Subject<Guide> = new Subject<Guide>();
  public onGuideCompletedSubscription: Subscription;

  constructor() {
    this.setListernerForAddToQueueRequest();

  }

  private setListernerForAddToQueueRequest(): void {
    this.addGuideToQueueSubscription = this.addGuideToQueue.subscribe(newGuide => {
      if (this._guideQueue.find(guide => guide.onboardingGuide.identifier === newGuide.onboardingGuide.identifier)) {
        this._guideQueue.push(newGuide)
      }
    });
  }

  private setListenerForOnGuideCompleted(): void {
    this.onGuideCompletedSubscription = this.onGuideCompleted.subscribe(finishedGuide => {
      this._guideQueue.splice(0, 1);

    })
  }

  private tryToStartGuide(guide: Guide): void {
    
  }

  private isQueueEmpty(): boolean {
    return this._guideQueue.length === 0;
  }

  ngOnDestroy() {
    this.addGuideToQueueSubscription.unsubscribe();
  }
}
