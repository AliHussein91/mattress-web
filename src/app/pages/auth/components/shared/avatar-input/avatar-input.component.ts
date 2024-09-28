import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-avatar-input',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './avatar-input.component.html',
  styleUrl: './avatar-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AvatarInputComponent,
    multi: true,

  }]
})
export class AvatarInputComponent implements ControlValueAccessor {
  img!: string|Blob 
  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

}
