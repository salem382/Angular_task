import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../shared/services/header.service';
import { QuestionTypes } from 'src/app/global/models/questionTypes.mode';
import { OutputItem } from 'src/app/global/models/outputItem.mode';
import { MessageService } from 'primeng/api';

interface Question {
  id:string;
  type:string;
  isSavedAsDraft:boolean;
  questionDate?:QuestionTypes; 
}


@Component({
  selector: 'app-all-exam',
  templateUrl: './all-exam.component.html',
  styleUrls: ['./all-exam.component.css']
})

export class AllExamComponent implements OnInit {

  constructor(private _HeaderService:HeaderService, private messageService: MessageService){}

 
  questionsArray:Question[] = [];


  ngOnInit(): void {
    this.setheaderValue();
    this.getDraftedQuestions();
  }
  
  getDraftedQuestions():void {
    let questions = localStorage.getItem('questions');
      if(questions) {
        let qus = JSON.parse(questions);
        console.log("drafted question : ",qus);
        qus.forEach((item:any)=> {

          let id = item.id;
          let type = item.type;
          delete item.id;
          delete item.type;
          let model = {
            id:id,
            type:type,
            isSavedAsDraft:true,
            questionDate:JSON.parse(JSON.stringify(item)) 
          }
          this.questionsArray.push(model);
        })
        console.log(this.questionsArray);
      } 
  }

  generateUniqueId():string {
    return '_' + Math.random().toString(36).slice(2, 11);
  }

  deleteItem(e:OutputItem):void {

    //delete from question array
    this.questionsArray = this.questionsArray.filter(question=> question.id != e.id);

    //delete from local strorag if is a draft
    if(e.isSavedAsDraft) {
      let questions = localStorage.getItem('questions');
      if (questions) {
        let qus = JSON.parse(questions);
        qus = qus.filter((q:Question)=> q.id != e.id); 
        localStorage.setItem("questions", JSON.stringify(qus));
      }
    }
  }

  showMEssage(type:string, summary:string, detail:string) {
    this.messageService.add({ severity: type, summary: summary, detail:detail});
  }

  setheaderValue():void {
    this._HeaderService.setTitle("كل التمارين")
  }
  onDrop(e: any): void {
    
    // Prevent default behavior of the drop
    e.preventDefault();
    
    const droppedItemValue = e.dataTransfer.getData('text/plain');

    let question:Question = {
      id:this.generateUniqueId(),
      type:"",
      isSavedAsDraft:false
    }
   

    if (droppedItemValue == "اختيار فردي") {
      question.type = "individual";
      this.questionsArray.push({...question});
      this.showMEssage('success', 'تم بنجاح', 'تم اضافة سؤال اختيار فردي بنجاح');
    }
    else if (droppedItemValue == "اختيار من متعدد") {
      question.type = "multi";
      this.questionsArray.push({...question});
      this.showMEssage('success', 'تم بنجاح', 'تم اضافة سؤال اختيار من متعدد بنجاح');
    }
    else {
      question.type = "text";
      this.questionsArray.push({...question});
      this.showMEssage('success', 'تم بنجاح', 'تم اضافة سؤال نصي بنجاح');
    }
    console.log(this.questionsArray);
  
  }
  onDragStart(event: any): void {
    // Set the data transfer property with the text content of the dragged item
    event.dataTransfer.setData('text/plain', event.target.textContent);
  }
  onDragOver(event:any) {
    console.log("onDragOver")
    event.preventDefault();
  }
}
