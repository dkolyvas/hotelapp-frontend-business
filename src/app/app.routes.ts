import { NgModule } from '@angular/core';
import {RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { CustomerSearchContainerComponent } from './customers/customer-search-container/customer-search-container.component';
import { CustomerEditFormComponent } from './customers/customer-edit-form/customer-edit-form.component';
import { RoomSearchContainerComponent } from './rooms/room-search-container/room-search-container.component';
import { RoomEditComponent } from './rooms/room-edit/room-edit.component';
import { BookingListComponent } from './bookings/booking-list/booking-list.component';
import { BookingEditComponent } from './bookings/booking-edit/booking-edit.component';
import { PricingPolicyHomeComponent } from './pricing_policies/pricing-policy-home/pricing-policy-home.component';
import { RoomCategoryPageComponent } from './parameters/room-category-page/room-category-page.component';
import { CustomerTypePageComponent } from './parameters/customer-type-page/customer-type-page.component';
import { UserManagementComponent } from './users/user-management/user-management.component';
import { LoginFormComponent } from './users/login-form/login-form.component';
import { Authguard } from './authguard';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CustomerInformationComponent } from './customers/customer-information/customer-information.component';

export const routes: Routes = [
    {path: "", component: CustomerSearchContainerComponent, canActivate:[Authguard]},
    {path: "CustomerHome", component:CustomerSearchContainerComponent, canActivate: [Authguard]},
    {path: "CustomerEdit", component:CustomerEditFormComponent, canActivate: [Authguard]},
    {path: "RoomHome", component: RoomSearchContainerComponent, canActivate: [Authguard]},
    {path: "RoomEdit", component: RoomEditComponent, canActivate: [Authguard]},
    {path: "BookingList", component:BookingListComponent, canActivate: [Authguard]},
    {path: "BookingEdit", component: BookingEditComponent, canActivate: [Authguard]},
    {path: "PricingPolicy", component: PricingPolicyHomeComponent, canActivate: [Authguard]},
    {path: "RoomCategory", component: RoomCategoryPageComponent, canActivate: [Authguard]},
    {path: "CustomerType", component: CustomerTypePageComponent, canActivate: [Authguard]},
    {path: "UserManagement",component:UserManagementComponent, canActivate: [Authguard] },
    {path: "ChangePassword", component:ChangePasswordComponent, canActivate: [Authguard]},
    {path: "CustomerStatistics", component:CustomerInformationComponent, canActivate: [Authguard]},
    {path: "Login", component: LoginFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)]
    
})
export class AppRoutingModule{}
