export interface CustomerShowDto {
    passportNo?: string|undefined;
    id?:number|undefined;
    address?: string|undefined;
    surname: string;
    givenName: string;
    email?: string|undefined;
    phone?: string|undefined;
    country?: string|undefined;
    customerTypeName?: string|undefined;
    customerTypeId?: number|undefined;
}
