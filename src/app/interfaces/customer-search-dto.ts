export interface CustomerSearchDto {
    
    givenName: string|undefined;
    surname: string|undefined;
    
    country: string|undefined;
    phone: string|undefined;
    email: string|undefined;
    passportNo: string|undefined;
    
    customerType: number|undefined;
}
