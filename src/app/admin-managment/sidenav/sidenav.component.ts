import { Component, OnDestroy } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {

  open:boolean = true;
  mobileScreen:boolean = false;
  sidenavWidth!:number;
  openSubscribtion!:Subscription;
  mobileScreenSubscribtion!:Subscription;


  constructor(private _SidenavService:SidenavService){}
  
  ngOnInit(): void {
    this.getValues();
  }

  getValues():void {
    this.openSubscribtion = this._SidenavService.getSidenavStatus.subscribe({
      next:(res)=>{
        this.open =res;
      }
    })
    this._SidenavService.getMobileStatus.subscribe({
      next:(res)=>{
        this.mobileScreen = res;
      }
    })
    this.sidenavWidth = this._SidenavService.sidenavWidth;
  }
  

  handleCloseSidebar():void {
    this._SidenavService.closeSidebar();
  }
  ngOnDestroy(): void {
    this.openSubscribtion.unsubscribe();
    this.mobileScreenSubscribtion.unsubscribe();
  }

}

