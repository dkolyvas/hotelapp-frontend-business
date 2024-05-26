export interface BookingShowDto {
    id: number,
    roomId: number,
    roomCode: string,
    customerId: number,
    customerName: string,
    customerSurname: string,
    price: number,
    dateFrom: string,
    dateTo: string
}
