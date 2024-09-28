import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
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

  img: File | null = null
  isDisabled!: boolean
  onChange: any = (img: File) => { }
  onTouched: any = () => { }
  imgPath: string = '../../../../../assets/img/avatar.svg'

  writeValue(img: File): void {
    this.img = img
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

  onImgPicked(input: HTMLInputElement) {
    const files = input.files;

    if (files && files.length > 0) {
      this.img = files[0];
      this.imgPath = URL.createObjectURL(this.img)
      this.onChange(this.img);
    } else {
      this.img = null;
      this.onChange(null);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const file = control.value;

    if (!file) {
      return null;
    }

    const fileType = file.type;
    if (!fileType.startsWith('image/')) {
      return { invalidFileType: true };
    }

    return null;
  }
}
