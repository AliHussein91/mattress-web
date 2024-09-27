import { Component, inject, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  sanitizer = inject(DomSanitizer)
  svg!: SafeHtml
  value!: string
  onChange: any = (value: string) => { };
  onTouched: any = () => { };
  isDisabled!: boolean

  @Input() type: string = 'text'
  @Input({ required: true }) name: string = 'text'
  @Input({ required: true }) placeholder: string = ''
  @Input({ required: true }) label: string = 'label'
  @Input('svg') set _(value: string) {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(value);
  }


  writeValue(value: string): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

  onInputChange(inputElment: HTMLInputElement) {
    const inputValue = inputElment.value
    if (inputValue) {
      this.onChange(inputValue)
    } else {

      this.onChange('')
    }
  }
}
