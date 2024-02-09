import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBackground]'
})
export class ChangeBackgroundDirective {

  @Input('customBackground') text!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    this.updateBackground();
  }

  private updateBackground() {
    if (this.text === 'active') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(0, 198, 20, 0.12)');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'rgba(0, 198, 20, 1)');
    } else if (this.text === 'not active') {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(253, 212, 107, 0.28)');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'rgba(255, 193, 26, 1)');
    }
  }

}
