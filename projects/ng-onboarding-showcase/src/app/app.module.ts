import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgOnboardingModule } from '../../../ng-onboarding/src/lib/ng-onboarding.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOnboardingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
