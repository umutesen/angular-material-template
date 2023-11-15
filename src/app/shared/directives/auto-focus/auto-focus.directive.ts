import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[auto-focus]'
})
export class AutoFocusDirective implements AfterViewInit {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  constructor(private element: ElementRef<HTMLInputElement>) { }
 
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 300);
    
  }
}
