import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformWord'
})
export class TransformWordPipe implements PipeTransform {

  transform(word: string): string {
    if (word == "multi") 
      return "اختيار من متعدد";
    if (word == "individual")
      return "اختيار فردي";
    if (word == "text")
      return "نص"
    return "";
  }

}
