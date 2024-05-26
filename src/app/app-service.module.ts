import { Inject, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CustomertypeShowDto } from './interfaces/customertype-show-dto';
import { CustomerSearchDto } from './interfaces/customer-search-dto';
import { CustomerShowDto } from './interfaces/customer-show-dto';
import { CustomerEditDto } from './interfaces/customer-edit-dto';
import { RoomSearchDto } from './interfaces/room-search-dto';
import { RoomShowDto } from './interfaces/room-show-dto';
import { RoomCategoryShowDto } from './interfaces/room-category-show-dto';
import { RoomEditDto } from './interfaces/room-edit-dto';
import { BookingShowDto } from './interfaces/booking-show-dto';
import { ConfirmDTO } from './interfaces/confirm-dto';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { PricingPolicyShowDto } from './interfaces/pricing-policy-show-dto';
import { BookingInsertDto } from './interfaces/booking-insert-dto';
import { BookingUpdateDto } from './interfaces/booking-update-dto';
import { PricingPolicyEditDto } from './interfaces/pricing-policy-edit-dto';
import { RoomCategoryEditDto } from './interfaces/room-category-edit-dto';
import { CustomertypeEditDto } from './interfaces/customertype-edit-dto';
import { UserShowDto } from './interfaces/user-show-dto';
import { UserRegisterDto } from './interfaces/user-register-dto';
import { UserLoginDto } from './interfaces/user-login-dto';
import { UserTokenDto } from './interfaces/user-token-dto';
import { ChangePasswordDto } from './interfaces/change-password-dto';
import { CustomerInformationDto } from './interfaces/customer-information-dto';
const APIPATH = "http://localhost:8080/hotelapp"

@Injectable({providedIn:"root"} )
export class AppServiceModule {
  constructor(private http:HttpClient){}
  isLoggedOn = new BehaviorSubject<boolean>(false)
  username = new BehaviorSubject<string>('')
  userType = new BehaviorSubject<string>('')

  getCustomerTypes(){
    return this.http.get<CustomertypeShowDto[]>(`${APIPATH}/customertype`)
  }
  addCustomerType(data: CustomertypeEditDto){
    return this.http.post<CustomertypeShowDto>(`${APIPATH}/customertype`, data)
  }

  updateCustomerType(data: CustomertypeEditDto){
    return this.http.put<CustomertypeShowDto>(`${APIPATH}/customertype/${data.id}`,data)
  }

  deleteCustomerType(id?: number){
    return this.http.delete<CustomertypeShowDto>(`${APIPATH}/customertype/${id}`)
  }

  getCustomer(id: number){
    return this.http.get<CustomerShowDto>(`${APIPATH}/customer/${id}`)
  }

  getCustomers(criteria: CustomerSearchDto){
    let query: string = "";
    let hasprevious: boolean = false;
    let operator:string = "";
    if(criteria.passportNo){
      query = `?passportNo=${criteria.passportNo}`
      hasprevious= true
    }
    if(criteria.customerType){
      operator = hasprevious?"&":"?";
      query += `${operator}type=${criteria.customerType}`
      hasprevious = true;
    }
    if(criteria.surname){
      operator = hasprevious?"&":"?";
      query += `${operator}surname=${criteria.surname}`
      hasprevious = true;
    }
    if(criteria.givenName){
      operator = hasprevious?"&":"?";
      query += `${operator}givenName=${criteria.givenName}`
      hasprevious = true;
    }
    if(criteria.email){
      operator = hasprevious?"&":"?";
      query += `${operator}email=${criteria.email}`
      hasprevious = true;
    }
    if(criteria.phone){
      operator = hasprevious?"&":"?";
      query += `${operator}phone=${criteria.phone}`
      hasprevious = true;
    }
    if(criteria.country){
      operator = hasprevious?"&":"?";
      query += `${operator}country=${criteria.country}`
      hasprevious = true;
    }
    console.log(`${APIPATH}/customer${query}`)
    return this.http.get<CustomerShowDto[]>(`${APIPATH}/customer${query}`);
  }

  deleteCustomer(id:number){
    return this.http.delete<CustomerShowDto>(`${APIPATH}/customer/${id}`);
  }

  insertCustomer(data: CustomerEditDto){
    return this.http.post<CustomerShowDto>(`${APIPATH}/customer`, data);
  }

  updateCustomer(data: CustomerEditDto){
    return this.http.put<CustomerShowDto>(`${APIPATH}/customer/${data.id}`, data)
  }

  getCustomerStatistics(dateFrom?: string, dateTo?: string){
    return this.http.get<CustomerInformationDto[]>(`${APIPATH}/customer/statistics?dateFrom=${dateFrom}&dateTo=${dateTo}`)
  }

  searchRooms(criteria: RoomSearchDto){
    let hasPrevious: boolean = false;
    let operator: string;
    let queryString: string = "";
    if(criteria.personsNo){
      operator = "?"
      queryString += `${operator}personsNo=${criteria.personsNo}`;
      hasPrevious = true;
    }
    if(criteria.dateFrom){
      operator = hasPrevious?"&":"?";
      queryString += `${operator}dateFrom=${criteria.dateFrom}`;
      hasPrevious = true;
    }
    if(criteria.dateTo){
      operator = hasPrevious?"&":"?";
      queryString += `${operator}dateTo=${criteria.dateTo}`;
    }
    console.log( queryString)
    return this.http.get<RoomShowDto[]>(`${APIPATH}/room${queryString}`);
  }

  getRoomByCode(code: string){
    return this.http.get<RoomShowDto>(`${APIPATH}/room/code/${code}`)
  }

  getRoomById(id:number){
    return this.http.get<RoomShowDto>(`${APIPATH}/room/${id}`)
  }

  addRoom(data: RoomEditDto){
    return this.http.post<RoomShowDto>(`${APIPATH}/room`, data)
  }

  updateRoom(data: RoomEditDto){
    return this.http.put<RoomShowDto>(`${APIPATH}/room/${data.id}`, data)
  }

  deleteRoom(roomId: number){
    return this.http.delete(`${APIPATH}/room/${roomId}`)
  }



  getRoomCategories(){
    return this.http.get<RoomCategoryShowDto[]>(`${APIPATH}/roomcategory`)
  }

  addRoomCategory(data: RoomCategoryEditDto){
    return this.http.post<RoomCategoryShowDto>(`${APIPATH}/roomcategory`, data)
  }
  updateRoomCategory(data: RoomCategoryEditDto){
    return this.http.put<RoomCategoryShowDto>(`${APIPATH}/roomcategory/${data.id}`, data)
  }

  deleteRoomCategory(id?: number){
    return this.http.delete<RoomCategoryShowDto>(`${APIPATH}/roomcategory/${id}`)
  }

  getRoomBookings(roomId: Number, dateFrom: string, dateTo: string){
    console.log(`APIPATH/booking/room/${roomId}?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    return this.http.get<BookingShowDto[]>(`${APIPATH}/booking/room/${roomId}?dateFrom=${dateFrom}&dateTo=${dateTo}`)
  }

  getCustomerBooking(customerId: Number, dateFrom: string, dateTo: string ){
    return this.http.get<BookingShowDto[]>(`${APIPATH}/booking/customer/${customerId}?dateFrom=${dateFrom}
    &dateTo=${dateTo}`)
  }

  getBooking(id: number){
    return this.http.get<BookingShowDto>(`${APIPATH}/booking/${id}`);
  }

  addBooking(data: BookingInsertDto){
    console.log("making new booking")
    return this.http.post<BookingShowDto>(`${APIPATH}/booking`, data)
  }

  updateBooking(data: BookingUpdateDto){
    console.log("now updating booking")
    return this.http.put<BookingShowDto>(`${APIPATH}/booking/${data.id}`, data)
  }

  deleteBooking(bookingId: number){
    return this.http.delete(`${APIPATH}/booking/${bookingId}`)
  }

  checkRoomAvailability(roomId: number, dateFrom: string, dateTo: string){
    console.log(`${APIPATH}/booking/checkAvailability?roomId=${roomId}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    return  this.http.get<ConfirmDTO>(`${APIPATH}/booking/checkAvailability?roomId=${roomId}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
  }

  getSpecifiedPricingPolicies(roomCategoryId?: number, customerTypeId?: number){
    console.log(`${APIPATH}/pricingpolicy?roomCategoryId=${roomCategoryId}&customerTypeId=${customerTypeId}`)
    return this.http.get<PricingPolicyShowDto[]>(`${APIPATH}/pricingpolicy?roomCategoryId=${roomCategoryId}&customerTypeId=${customerTypeId}`)

  }

  getAllPolicies(){
    return this.http.get<PricingPolicyShowDto[]>(`${APIPATH}/pricingpolicy`)
  }

  getPoliciesForRoomCateogory(roomCategoryId?: number){
    return this.http.get<PricingPolicyShowDto[]>(`${APIPATH}/pricingpolicy?roomCategoryId=${roomCategoryId}`)
  }

  getPoliciesForCustomerType(customerTypeId?: number){
    return this.http.get<PricingPolicyShowDto[]>(`${APIPATH}/pricingpolicy?customerTypeId=${customerTypeId}`)
  }

  deletePolicy(policyId? : number){
    return this.http.delete(`${APIPATH}/pricingpolicy/${policyId}`)
  }

  addPolicy(data: PricingPolicyEditDto){
    console.log(data)
    return this.http.post<PricingPolicyShowDto>(`${APIPATH}/pricingpolicy`, data)
  }

  updatePolicy(data: PricingPolicyEditDto){
    console.log(data)
    return this.http.put<PricingPolicyShowDto>(`${APIPATH}/pricingpolicy/${data.id}`, data)
  }

  getUsers(){
    return this.http.get<UserShowDto[]>(`${APIPATH}/user/enterprise`)
  }

  registerUser(data: UserRegisterDto){
    return this.http.post<UserShowDto>(`${APIPATH}/user/enterprise`,data)
  }

  deleteUser(id?:number){
    return this.http.delete<UserShowDto>(`${APIPATH}/user/${id}`)
  }

  login(credentials: UserLoginDto){
    return this.http.post<UserTokenDto>(`${APIPATH}/user/login`, credentials)
  }

  changeUserPassword(data: ChangePasswordDto){
    console.log(data)
    return this.http.put<UserShowDto>(`${APIPATH}/user/manage`, data)
  }

  
 }
