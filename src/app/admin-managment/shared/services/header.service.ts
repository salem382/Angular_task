import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  title = new BehaviorSubject<string>("المواد");

  setTitle(title:string):void {
    this.title.next(title);
  } 

  get getTitle():Observable<string> {
    return this.title.asObservable();
  }

}


