import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const imageValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const file: File = control.value;

    if (!file) {
        return null;
    }

    let errors: { [key: string]: boolean } = {};

    const fileType: string = file.type;
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(fileType)) {
        errors['invalidFileType'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
};
