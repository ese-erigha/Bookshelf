export interface ValidationResult{
    target: object,
    property: string,
    children: string[],
    constraints: object,
    isValid: boolean 
}