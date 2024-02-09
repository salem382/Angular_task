import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsLayoutComponent } from './subjects-layout.component';
import { AllSubjectComponent } from './all-subject/all-subject.component';
import { AllExamComponent } from './all-exam/all-exam.component';
import { GlobalModule } from 'src/app/global/global.module';
import { QuestionComponent } from './question/question.component';
import { ButtonModule } from 'primeng/button';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {
    path: '',
    component: SubjectsLayoutComponent,children:[
      {path:'', component:AllSubjectComponent},
      {path:'allExam', component:AllExamComponent}
    ]
  }
];


@NgModule({
  declarations: [
    SubjectsLayoutComponent,
    AllSubjectComponent,
    AllExamComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    GlobalModule,
    ButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    ToastModule,
    RouterModule.forChild(routes)
  ]
})
export class SubjectsModule { }
