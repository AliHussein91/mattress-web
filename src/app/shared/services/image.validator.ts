import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const imageValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;

    if (!file) {
        return null;
    }

    let errors: { [key: string]: boolean } = {};

    const fileType: string = file.type;
    if (!fileType.startsWith('image/')) {
        errors['invalidFileType'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
};
