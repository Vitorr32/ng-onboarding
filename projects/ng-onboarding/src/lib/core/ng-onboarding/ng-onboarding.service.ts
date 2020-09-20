import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Onboarding } from '../model/Onboarding.model';

@Injectable({
  providedIn: 'root'
})
export class NgOnboardingService {
  private _guideQueue: Onboarding[] = [];
  private _guideRepository: Onboarding[] = [];

  private onGuideAdd: Subject<Onboarding> = new Subject<Onboarding>();

  public get guideRepository(): Onboarding[] {
    return this._guideRepository;
  }

  public addGuideToRepository(newGuide: Onboarding): Onboarding[] {
    if (this._guideRepository.find(guide => newGuide.identifier === guide.identifier)) {
      throw new Error(`Guide with the identifier '${newGuide.identifier}' already exist, use the function updateGuide() for updates`);
    }

    this._guideRepository.push(newGuide);
    return this._guideRepository;
  }
  

  constructor() { }

  //Method that is called when the service detected a new action that could trigger the start of one of the onboarding guides
  private onTriggerableActionDone(injectedData?: any): Onboarding[] {
    return this.guideRepository.filter(
      (onboardingGuide: Onboarding) => onboardingGuide.trigger(injectedData)
    )
  }

  // public onStartGuide(identifier: string): void {
  //   if (this._guideRepository.find(guide => identifier === guide.identifier)) {
  //     this.
  //   }
  // }

  public onTriggerAction(injectedData?: any): void {

  }
}
