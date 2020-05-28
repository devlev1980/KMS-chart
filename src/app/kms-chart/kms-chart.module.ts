import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KmsChartComponent} from './kms-chart.component';
import {KmsRoutingModule} from './kms-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {GoogleChartsModule} from 'angular-google-charts';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {ReactiveFormsModule} from '@angular/forms';




@NgModule({
  declarations: [KmsChartComponent],
  imports: [
    CommonModule,
    KmsRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule
  ]
})
export class KmsChartModule { }
