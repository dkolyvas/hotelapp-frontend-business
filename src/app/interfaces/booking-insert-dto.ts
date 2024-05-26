export interface BookingInsertDto {
    roomId?: number,
    customerId?: number,
    dateFrom?: string,
    dateTo?: string,
    pricingPolicyId?: number
}
