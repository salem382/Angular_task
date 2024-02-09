import { Component, HostListener } from '@angular/core';
import { SidenavService } from './admin-managment/shared/services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private _SidenavService:SidenavService) {}

  ngOnInit(): void {
    this._SidenavService.handleMobileScreen(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this._SidenavService.handleMobileScreen(window.innerWidth);
  }
}

