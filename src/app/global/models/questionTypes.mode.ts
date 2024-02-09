export interface QuestionTypes {
    status:string,
    question:string,
    answers:Object[] | string,
    correctAnswerIndex?:number;
}