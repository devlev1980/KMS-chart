import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {KmsChartComponent} from './kms-chart.component';

const routes: Routes = [
  {
    path: '',
    component: KmsChartComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class KmsRoutingModule {
}
