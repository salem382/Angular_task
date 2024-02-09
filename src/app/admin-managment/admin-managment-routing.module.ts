import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminManagmentLayoutComponent } from './admin-managment-layout.component';

const routes: Routes = [
  {path:'', component:AdminManagmentLayoutComponent, children:[
    {
      path:'',
      loadChildren: () =>import('./main-page/main-page.module').then((m) => m.MainPageModule),
    },
    {
      path:'subjects',
     loadChildren:()=>import('./subjects/subjects.module').then((m)=>m.SubjectsModule)
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminManagmentRoutingModule { }

