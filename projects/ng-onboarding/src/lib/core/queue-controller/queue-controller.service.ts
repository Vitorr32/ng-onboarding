import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Guide from '../../model/Guide.model';

@Injectable({
  providedIn: 'root'
})
export class QueueControllerService implements OnDestroy {
  private _guideQueue: Guide[] = [];

  public addGuideToQueue: Subject<Guide> = new Subject<Guide>();
  private addGuideToQueueSubscription: Subscription;

  public onGuideCompleted: Subject<Guide> = new Subject<Guide>();
  private onGuideCompletedSubscription: Subscription;

  public onGuideStart: Subject<Guide> = new Subject<Guide>();

  constructor() {
    this.setListernerForAddToQueueRequest();
    this.setListenerForOnGuideCompleted();
  }

  private setListernerForAddToQueueRequest(): void {
    this.addGuideToQueueSubscription = this.addGuideToQueue.subscribe(newGuide => {
      if (this._guideQueue.find(guide => guide.onboarding.identifier === newGuide.onboarding.identifier)) {
        this._guideQueue.push(newGuide);

        this.tryToStartGuide(newGuide);
      }
    });
  }

  private setListenerForOnGuideCompleted(): void {
    this.onGuideCompletedSubscription = this.onGuideCompleted.subscribe(finishedGuide => {
      this._guideQueue.splice(0, 1);

      if (!this.isQueueEmpty()) {
        this.tryToStartGuide(this._guideQueue[0]);
      }
    })
  }

  private tryToStartGuide(guide: Guide): void {
    if (!this.isQueueEmpty()) {
      this.onGuideStart.next(guide);
    }
  }

  private isQueueEmpty(): boolean {
    return this._guideQueue.length === 0;
  }

  ngOnDestroy() {
    this.addGuideToQueueSubscription.unsubscribe();
  }
}
