import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/g.test(password);
        const isMinLength = password.length >= 8;

        let errors: { [key: string]: boolean } = {};

        if (!hasUpperCase) {
            errors['uppercase'] = true;
        }
        if (!hasLowerCase) {
            errors['lowercase'] = true;
        }
        if (!hasNumber) {
            errors['number'] = true;
        }
        if (!hasSymbol) {
            errors['symbol'] = true;
        }
        if (!isMinLength) {
            errors['minlength'] = true;
        }

        return Object.keys(errors).length > 0 ? errors : null;
    };
}