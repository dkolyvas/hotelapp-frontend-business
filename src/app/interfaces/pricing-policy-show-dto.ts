export interface PricingPolicyShowDto {
    id: number,
    price: number,
    specification: string,
    roomCategoryId: number,
    roomCategoryDescription: string,
    customerTypeId?: number,
    customerTypeDescription?: string
}
