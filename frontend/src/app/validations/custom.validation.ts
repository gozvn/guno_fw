import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function htmlTagValidator(control: FormControl) {
    const value = control.value;
    const checkHtml = /<\/?[^>]+>/.test(value);
    if (checkHtml) {
        return {htmlTag: true};
    }
    return null;
}

export function whiteSpaceValidator(minLength: number): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (typeof value === "string" && value.trim() === '' && value.length >= minLength) {
            return { excessWhiteSpace: true };
        }

        return null;
    };
}