import { Component, inject, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor {

  sanitizer = inject(DomSanitizer)
  svg!: SafeHtml
  onChange: any = () => { };
  onTouched: any = () => { };
  disabled = false

  @Input() type: string = 'text'
  @Input({ required: true }) name: string = 'text'
  @Input({ required: true }) placeholder: string = ''
  @Input({ required: true }) label: string = 'label'
  @Input('svg') set _(value: string) {
    this.svg = this.sanitizer.bypassSecurityTrustHtml(value);
  }

  value!: string

  writeValue(obj: any): void {
    this.value = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

}
