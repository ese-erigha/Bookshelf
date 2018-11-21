export class ValidationResult{

    public isValid: boolean;
    public error: Object;

    constructor(){

        this.isValid = true;
        this.error = null;
    }
}