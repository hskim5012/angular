import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';

@Directive({
     // tslint:disable-next-line: directive-selector
     selector: '[validateLocation]',
     providers: [{provide: NG_VALIDATORS, useExisting: LocationValidatorDirective, multi: true}]

})

export class LocationValidatorDirective implements Validator {
    validate(formGroup: FormGroup): {[key: string]: any} {
        const addressControl = formGroup.controls.address;
        const cityControl = formGroup.controls.city;
        const countryControl = formGroup.controls.country;
        const onlineUrlControl = ( formGroup.root as FormGroup).controls.onlineUrl;

        if ((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value)
        || (onlineUrlControl && onlineUrlControl.value)) {
            return  null;
            // * it is passing so return null to validator
        } else {
            return {validateLocation: false};
        }
    }
}

