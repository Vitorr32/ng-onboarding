import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import Guide from '../../model/Guide.model';

@Injectable({
  providedIn: 'root'
})
export class QueueControllerService implements OnDestroy {
  private _guideQueue: Guide[] = [];
  public _isActive: boolean = false;

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

        this.tryToStartGuide();
      }
    });
  }

  private setListenerForOnGuideCompleted(): void {
    this.onGuideCompletedSubscription = this.onGuideCompleted.subscribe(finishedGuide => {
      this._guideQueue.splice(0, 1);

      if (!this.isQueueEmpty()) {
        this.tryToStartGuide();
      }
    })
  }

  private tryToStartGuide(): void {
    if (!this.isQueueEmpty()) {
      this._isActive = true;
      this.onGuideStart.next(this._guideQueue[0]);
    } else {
      this._isActive = false;
    }
  }

  private isQueueEmpty(): boolean {
    return this._guideQueue.length === 0;
  }

  ngOnDestroy() {
    this.addGuideToQueueSubscription.unsubscribe();
  }
}
