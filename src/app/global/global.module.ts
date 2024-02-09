import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformWordPipe } from './pipes/transform-word.pipe';
import { ChangeBackgroundDirective } from './directives/change-background.directive';


@NgModule({
  declarations: [
    TransformWordPipe,
    ChangeBackgroundDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TransformWordPipe,
    ChangeBackgroundDirective
  ]
})
export class GlobalModule { }
