import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [

  {
    path: '',
    redirectTo: '/kms-chart',
    pathMatch: 'full'
  },
  {
    path: 'kms-chart',
    loadChildren: () => import('./kms-chart/kms-chart.module').then(module => module.KmsChartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
