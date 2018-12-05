export interface ValidationResult{
    target: object,
    property: string,
    children: Array<string>,
    constraints: object,
    isValid: boolean 
}