import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CountryCode, isValidPhoneNumber, ParseError, parsePhoneNumber, parsePhoneNumberWithError } from 'libphonenumber-js';

export function phoneValidator(alpha: CountryCode): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const phone = control.value;

        let errors: { [key: string]: boolean } = {};
        try {
            const parsedNumber = parsePhoneNumberWithError(phone, alpha)
            if(!isValidPhoneNumber(parsedNumber.number, alpha)){
                errors['invalid'] = true
            }
        } catch (error) {
            if (error instanceof ParseError) {
                if (error.message == 'TOO_SHORT') {
                    errors['short'] = true
                } else if (error.message == 'NOT_A_NUMBER') {
                    errors['nan'] = true
                } else if (error.message == 'TOO_LONG') {
                    errors['long'] = true
                }
            }
        }
        return Object.keys(errors).length > 0 ? errors : null;
    };
}