import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KmsChartModule} from './kms-chart/kms-chart.module';

@NgModule({
  declarations: [
    AppComponent,
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
