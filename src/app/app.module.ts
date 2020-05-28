import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KmsChartModule} from './kms-chart/kms-chart.module';
import { HomeComponent } from './home/home.component';
import {GoogleChartsModule} from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KmsChartModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
