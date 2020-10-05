import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Configuration from '../../model/Configuration.model';
import { Onboarding } from '../../model/Onboarding.model';
import { QueueControllerService } from '../queue-controller/queue-controller.service';

@Injectable({
  providedIn: 'root'
})
export class NgOnboardingService {
  private _configuration: Configuration = new Configuration();
  private _guideRepository: Onboarding[] = [];
  private _injectedData: any;

  public get injectedData(): any {
    return this._injectedData;
  }
  public set injectedData(value: any) {
    this._injectedData = value;
  }

  public get configuration(): Configuration {
    return this._configuration;
  }

  public get guideRepository(): Onboarding[] {
    return this._guideRepository;
  }

  constructor(private queueController: QueueControllerService, private router: Router) {
  }

  private onActionTriggered(identifier: string, injectedData?: any) {
    const index = this.guideRepository.findIndex(guide => guide.identifier === identifier);

    if (index === -1) {
      throw Error(`The guide with identifier ${identifier} does not exist in the onboarding guide repository`);
    }

    const onboardingGuide = this.guideRepository[index];
    const isTriggered = this.isGuideTriggerActive(onboardingGuide, injectedData || this.injectedData);

    if (!isTriggered) {
      throw Error(`The guide with identifier ${identifier} has a trigger that is not allowing the guide start`);
    }

    this.queueController.addGuideToQueue.next({ onboarding: onboardingGuide, injectedData: injectedData || this.injectedData })
  }

  public addGuideToRepository(newGuide: Onboarding): Onboarding[] {
    if (this._guideRepository.find(guide => newGuide.identifier === guide.identifier)) {
      throw new Error(`Guide with the identifier '${newGuide.identifier}' already exist, use the function updateGuide() for updates`);
    }

    this._guideRepository.push(newGuide);
    return this._guideRepository;
  }

  public directStartGuide(newGuide: Onboarding, injectedData?: any): void {
    if (this.queueController._isActive) {
      throw new Error(`Can't direct start new guide while another is currently running`);
    }

    this.addGuideToRepository(newGuide);
    this.manuallyStartGuideInRepository(newGuide.identifier, injectedData || this.injectedData);
  }

  public manuallyStartGuideInRepository(identifier: string, injectedData: any): void {
    this.onActionTriggered(identifier, { ...(injectedData || this.injectedData), router: this.router });
  }

  private isGuideTriggerActive(onboardingGuide: Onboarding, injectedData?: any): boolean {
    return onboardingGuide.trigger ? onboardingGuide.trigger(injectedData || this.injectedData) : true;
  }

  public updateConfiguration(config: Configuration): void {
    this._configuration = { ...this._configuration, ...config };
  }
}
