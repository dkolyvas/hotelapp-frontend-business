export interface BookingUpdateDto {
    id?: number,
    roomId?: number,
    customerId?: number,
    dateFrom?: string,
    dateTo?: string,
    pricingPolicyId: number
}
