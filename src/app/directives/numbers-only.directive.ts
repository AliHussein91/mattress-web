import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: 'input[restrictNumbers]',
  standalone: true
})
export class NumberRestricDirective {
  @Output() valueChange = new EventEmitter()

  constructor(private elementRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const initialValue = this.elementRef.nativeElement.value;
    const newValue = initialValue.replace(/[^0-9]*/g, '');
    this.elementRef.nativeElement.value = newValue;
    this.valueChange.emit(newValue);
    if (initialValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}