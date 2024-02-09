import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import {Subject} from '../../global/models/subject.mode'

@Injectable({
  providedIn: 'root'
})


export class SubjectService {

  constructor(private _ApiService:ApiService) { }

  getSubjects():Observable<Subject[]> {
    return this._ApiService.get<Subject[]>('subjects')
  }

}




