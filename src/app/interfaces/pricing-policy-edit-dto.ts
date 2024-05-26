export interface PricingPolicyEditDto {
    id?: number,
    price?: number,
    specification?: string,
    roomCategoryId?: number,
    customerTypeId? : number
}
