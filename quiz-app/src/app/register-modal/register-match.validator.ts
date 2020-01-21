import {FormGroup} from "@angular/forms";

export function registerMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) =>{
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if(matchingControl.errors && !matchingControl.errors.registerMatch){
            return;
        }
        if(control.value !== matchingControl.value){
            matchingControl.setErrors({registerMatch: true});
        }else{
            matchingControl.setErrors(null);
        }
    }
}