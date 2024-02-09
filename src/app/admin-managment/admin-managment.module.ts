import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagmentRoutingModule } from './admin-managment-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdminManagmentLayoutComponent } from './admin-managment-layout.component';
import { WrapperComponent } from './wrapper/wrapper.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    AdminManagmentLayoutComponent,
    WrapperComponent
  ],
  imports: [
    CommonModule,
    AdminManagmentRoutingModule
  ]
})
export class AdminManagmentModule { }

