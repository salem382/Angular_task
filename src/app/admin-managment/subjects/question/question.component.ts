import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { OutputItem } from 'src/app/global/models/outputItem.mode';
import { QuestionTypes } from 'src/app/global/models/questionTypes.mode';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  

  @Input() questionType!:string;
  @Input() questionId!:string;
  @Input() isSavedAsDraft!:boolean;
  @Input() questionData!:QuestionTypes | undefined;
  @Output() cancelEvent: EventEmitter<OutputItem> = new EventEmitter<OutputItem>();

  IndvidualcorrectAnserrIndex:FormControl = new FormControl('', Validators.required)
  textAnswer = new FormControl('', Validators.required)
  myForm!:FormGroup;
  intialAnswersLength:number = 2;


  // individualModel = {
  //   status:'متوسط',
  //   question:'this is question',
  //   answers:[
  //     {answer: 'answer 1'},
  //     {answer: 'answer 2'},
  //     {answer: 'answer 3'},
  //     {answer: 'answer 4'},
  //   ],
  //   correctAnswerIndex:2
  // }

  constructor(private fb:FormBuilder, private messageService: MessageService){}
  

  ngOnInit(): void {
    this.myForm = this.createForm();
    this.intialAnswers();
    this.saveAsDraftPatchForms();
  }

  saveAsDraftPatchForms():void {
    if (this.isSavedAsDraft) {
      if (this.questionType == "individual") {
        this.patchIndividualForm();
      }
      else if (this.questionType == "multi") {
        this.patchMultiForm();
      }
      else if (this.questionType == "text") {
        this.patchTextForm();
      }
    }
  }

  patchIndividualForm():void {
    if (this.questionData) {
      Array.isArray(this.questionData.answers) && this.questionData.answers.forEach((item:any)=> {
        this.pushIndividualQuestion();
      })
      this.myForm.patchValue({
        question:this.questionData.question,
        status:this.questionData.status,
        indvidualQuestions:this.questionData.answers,
      })
      // console.log("patchIndividualForm", this.questionData?.corectIndexAnswer)
      this.IndvidualcorrectAnserrIndex = new FormControl(this.questionData.correctAnswerIndex, Validators.required);
    }
  }

  patchMultiForm():void {
    if (this.questionData) {
      Array.isArray(this.questionData.answers) && this.questionData.answers.forEach((item)=> {
        this.pushMultiQuestion();
      })
      this.myForm.patchValue({
        question:this.questionData.question,
        status:this.questionData.status,
        multiQuestions:this.questionData.answers,
      })
    }
  }

  patchTextForm():void {
    if (this.questionData) {
      this.myForm.patchValue({
        question:this.questionData.question,
        status:this.questionData.status
      })
      if (typeof this.questionData.answers === 'string') {
        this.textAnswer.patchValue(this.questionData.answers);
      }
    }
  }

  createForm():FormGroup {
    return this.fb.group({
      status:['', Validators.required],
      question:['', Validators.required],
      indvidualQuestions:this.fb.array([]),
      multiQuestions:this.fb.array([])
    })
  }

  cancel(isSaved:boolean = true) {
    this.questionId
    this.cancelEvent.emit({isSavedAsDraft:this.isSavedAsDraft, id:this.questionId});
    if(!isSaved)
      this.showMEssage('error', 'تم الحذف', 'تم حذف العنصر بنجاح');
  }

  addNewItem():void {
    if (this.questionType == "multi") {
      this.pushMultiQuestion();
    } else if (this.questionType == "individual") {
      this.pushIndividualQuestion();
    }
  }

  pushIndividualQuestion():void {
    this.indvidualQuestions.push(this.createIndvidualQuestion());
  }
  pushMultiQuestion():void {
    this.multiQuestions.push(this.createMultiQuestion());
  }

  createIndvidualQuestion():FormGroup {
    return this.fb.group({
      answer:['', Validators.required],
    })
  }
  createMultiQuestion():FormGroup {
    return this.fb.group({
      answer:['', Validators.required],
      correctAnswer:[false]
    })
  }
  removeIndividualQuestion(index:number) {
    this.indvidualQuestions.removeAt(index)
  }

  removeMultiQuestion(index:number) {
    this.multiQuestions.removeAt(index)
  }

  intialAnswers():void {
    if (!this.isSavedAsDraft) {
      for (let i = 0; i < this.intialAnswersLength; i++) {
        this.addNewItem();
      }
    }
  }

  saveAsDraft():void {
    if (this.questionType == "individual") {
      this.saveIndividualQuestion(true);
    }
    else if (this.questionType == "multi") {
      this.saveMultiQuestion(true);
    }
    else if (this.questionType == "text"){
      this.saveTextQuestion(true);
    }
  }

  save() {
    if (this.questionType == "individual") {
      this.saveIndividualQuestion();
    }
    else if (this.questionType == "multi") {
      this.saveMultiQuestion();
    }
    else if (this.questionType == "text"){
      this.saveTextQuestion();
    }
  }


  saveIndividualQuestion(isSavedAsDraft:boolean = false):void {

    // save as a draft
    if (isSavedAsDraft) {
      let model = {
        question:this.myForm.get('question')?.value,
        status:this.myForm.get('status')?.value,
        answers:this.myForm.get('indvidualQuestions')?.value,
        correctAnswerIndex:this.IndvidualcorrectAnserrIndex.value
      }

      let questions = localStorage.getItem('questions');

      if(questions) {
        let qus = JSON.parse(questions);
        //if it found i will update it
        if (this.isSavedAsDraft) {
          let index = qus.findIndex((item:any)=>item.id == this.questionId)
          qus[index] = {id:this.questionId ,type:this.questionType,...model}
        }
        else {
          qus.push({id:this.questionId ,type:this.questionType,...model});
        }
        localStorage.setItem("questions",JSON.stringify(qus))
      } 
      else {
        let qus = [];
        qus.push({id:this.questionId ,type:this.questionType,...model});
        localStorage.setItem("questions",JSON.stringify(qus))
      }
      this.showMEssage('success','تم بنجاح','تم الحفظ كمسوده بنجاح');
    }
    else {
      //normal save send to data base
      if(this.myForm.valid && this.IndvidualcorrectAnserrIndex.valid) {
        let model = {
          question:this.myForm.get('question')?.value,
          status:this.myForm.get('status')?.value,
          answers:this.myForm.get('indvidualQuestions')?.value,
          corectIndexAnswer:this.IndvidualcorrectAnserrIndex.value
        }
        console.log(model);
        this.myForm.reset();
        this.IndvidualcorrectAnserrIndex.reset(); 
        this.showMEssage('success','تم بنجاح','تم ارسال البيانات بنجاح');
        this.cancel();
      }
      else {
        this.myForm.markAllAsTouched();
        this.showMEssage('warn', 'اكمل البيانات', 'ادخل جميع البيانات');
      } 
    }
  }

  saveMultiQuestion(isSaveAsDraft:boolean = false) {

    //save as a draft
    if(isSaveAsDraft) {
      let model = {
        question:this.myForm.get('question')?.value,
        status:this.myForm.get('status')?.value,
        answers:this.myForm.get('multiQuestions')?.value
      }

      let questions = localStorage.getItem('questions');

      if(questions) {
        let qus = JSON.parse(questions);
        //if it found i will update it
        if (this.isSavedAsDraft) {
          let index = qus.findIndex((item:any)=>item.id == this.questionId)
          qus[index] = {id:this.questionId ,type:this.questionType,...model}
        }
        else {
          qus.push({id:this.questionId ,type:this.questionType,...model});
        }
        localStorage.setItem("questions",JSON.stringify(qus))
      } 
      else {
        let qus = [];
        qus.push({id:this.questionId ,type:this.questionType,...model});
        localStorage.setItem("questions",JSON.stringify(qus))
      }
      this.showMEssage('success','تم بنجاح','تم الحفظ كمسوده بنجاح');
    }
    //normal save
    else {
      if (this.myForm.valid) {
        let model = {
          question:this.myForm.get('question')?.value,
          status:this.myForm.get('status')?.value,
          answers:this.myForm.get('multiQuestions')?.value
        }
        console.log(model);
        this.myForm.reset();
        this.showMEssage('success','تم بنجاح','تم ارسال البيانات بنجاح');
        this.cancel();
      }
      else {
        this.myForm.markAllAsTouched();
        this.showMEssage('warn', 'اكمل البيانات', 'ادخل جميع البيانات');
      }
    }
  }

  saveTextQuestion(isSaveAsDraft:boolean = false) {

    //save as a draft
    if(isSaveAsDraft) {
      let model = {
        question:this.myForm.get('question')?.value,
        status:this.myForm.get('status')?.value,
        text:this.textAnswer.value
      }
      let questions = localStorage.getItem('questions');

      if(questions) {
        let qus = JSON.parse(questions);
        //if it found i will update it
        if (this.isSavedAsDraft) {
          let index = qus.findIndex((item:any)=>item.id == this.questionId)
          qus[index] = {id:this.questionId ,type:this.questionType,...model}
        }
        else {
          qus.push({id:this.questionId ,type:this.questionType,...model});
        }
        localStorage.setItem("questions",JSON.stringify(qus))
      } 
      else {
        let qus = [];
        qus.push({id:this.questionId ,type:this.questionType,...model});
        localStorage.setItem("questions",JSON.stringify(qus))
      }
      this.showMEssage('success','تم بنجاح','تم الحفظ كمسوده بنجاح');
    }
    //normal save
    else {
      if (this.myForm.valid && this.textAnswer.valid) {
        let model = {
          question:this.myForm.get('question')?.value,
          status:this.myForm.get('status')?.value,
          text:this.textAnswer.value
        }
        console.log(model);
        this.myForm.reset();
        this.textAnswer.reset();
        this.showMEssage('success','تم بنجاح','تم ارسال البيانات بنجاح');
        this.cancel();
      }
      else {
        this.myForm.markAllAsTouched();
        this.showMEssage('warn', 'اكمل البيانات', 'ادخل جميع البيانات');
      }
    }
  }

  showMEssage(type:string, summary:string, detail:string) {
    this.messageService.add({ severity: type, summary: summary, detail:detail});
  }

  get indvidualQuestions () {
    return this.myForm.get('indvidualQuestions') as FormArray;
  }
  get multiQuestions() {
    return this.myForm.get("multiQuestions") as FormArray;
  }

}

