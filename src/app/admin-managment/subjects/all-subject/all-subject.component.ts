import { Component, OnDestroy } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { Subject } from 'src/app/global/models/subject.mode';
import { SubjectService } from 'src/app/core/http/subject.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-subject',
  templateUrl: './all-subject.component.html',
  styleUrls: ['./all-subject.component.css']
})

export class AllSubjectComponent implements OnDestroy {


  subjects:Subject[] = [];
  subjectSubscribtion!:Subscription;


  constructor(
    private _HeaderService:HeaderService,
    private _SubjectService:SubjectService
    ){}

  ngOnInit(): void {
    this.setheaderValue();
    this.getSubjects();
  }

  setheaderValue():void {
    this._HeaderService.setTitle("المواد")
  }

  getSubjects():void {
    this.subjectSubscribtion =  this._SubjectService.getSubjects().subscribe({
      next:(res)=> {
        this.subjects = res;
      }
    })
  }

  ngOnDestroy(): void {
    this.subjectSubscribtion.unsubscribe();
  }
}
