import { RoomShowDto } from "./room-show-dto";

export interface RoomBookingDetails {
    room?: RoomShowDto,
    dateFrom?: string,
    dateTo?: string
}
