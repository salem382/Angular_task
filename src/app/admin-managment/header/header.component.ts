import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav.service';
import { HeaderService } from '../shared/services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  title!:string;
  titleSubscribtion!:Subscription;

  constructor(
    private _SidenavService:SidenavService,
    private _HeaderService:HeaderService  
    ){}


  ngOnInit(): void {
    this.getTitleValue();
  }

  getTitleValue():void {
    this.titleSubscribtion =  this.titleSubscribtion = this._HeaderService.getTitle.subscribe({
      next:(res)=> {
        this.title = res;
      }
    })
  }

  openSidenav():void {
    this._SidenavService.openSidebar();
  }

  ngOnDestroy(): void {
    this.titleSubscribtion.unsubscribe();
  }

}

