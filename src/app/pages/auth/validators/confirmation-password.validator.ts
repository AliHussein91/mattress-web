import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmPasswordValidator(password: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const confirmation = control.value;
        const match = confirmation == password
        let errors: { [key: string]: boolean } = {};

        if (!match) {
            errors['passwordMismatch'] = true;
            console.log(password, confirmation);
            
        }
        
        return Object.keys(errors).length > 0 ? errors : null;;
    };
}