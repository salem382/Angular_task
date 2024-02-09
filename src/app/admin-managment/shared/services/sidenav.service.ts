import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {


  private open  = new BehaviorSubject(true);
  private mobileScreen = new BehaviorSubject(false);
  private sideNavWidth:number = 250;

  closeSidebar():void {
    this.open.next(false);
  }
  openSidebar():void {
    this.open.next(true);
  }
  setMobileMode():void {
    this.mobileScreen.next(true);
  }
  setWideMode():void {
    this.mobileScreen.next(false);
  }
  handleMobileScreen(screenWidth:number):void{
    if(screenWidth > 992) {
      this.openSidebar();
      this.mobileScreen.next(false);
    }
    else {
      this.closeSidebar();
      this.mobileScreen.next(true);
    }
  }
  get getSidenavStatus():Observable<boolean> {
    return this.open.asObservable();
  }
  get getMobileStatus():Observable<boolean> {
    return this.mobileScreen.asObservable();
  }
  get sidenavWidth():number {
    return this.sideNavWidth;
  }
}
