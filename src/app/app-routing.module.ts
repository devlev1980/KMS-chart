import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';


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
