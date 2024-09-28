import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let confirmation = control.get('confirmation')
    let errors: { [key: string]: boolean } = {};

    if (password && confirmation && password?.value != confirmation?.value) {
        errors['passwordMismatch'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;;
};
