import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {LoginComponent} from "./components/login/login.component";
import {ClothesComponent} from "./components/categories/clothes/clothes.component";
import {ElectronicsComponent} from "./components/categories/electronics/electronics.component";
import {FlightsComponent} from "./components/categories/flights/flights.component";
import {FoodComponent} from "./components/categories/food/food.component";
import {ShoesComponent} from "./components/categories/shoes/shoes.component";
import {SpaComponent} from "./components/categories/spa/spa.component";
import {VacationComponent} from "./components/categories/vacation/vacation.component";
import {CouponComponent} from "./components/coupon/coupon.component";
import {AddCompanyComponent} from "./components/adminAction/add-company/add-company.component";
import {UpdateCompanyComponent} from "./components/adminAction/update-company/update-company.component";
import {GetAllCompaniesComponent} from "./components/adminAction/get-all-companies/get-all-companies.component";
import {GetAllCustomersComponent} from "./components/adminAction/get-all-customers/get-all-customers.component";
import {AddCustomerComponent} from "./components/adminAction/add-customer/add-customer.component";
import {UpdateCustomerComponent} from "./components/adminAction/update-customer/update-customer.component";
import {CompanyDetailsComponent} from "./components/companyAction/company-details/company-details.component";
import {AddCouponComponent} from "./components/companyAction/add-coupon/add-coupon.component";
import {UpdateCouponComponent} from "./components/companyAction/update-coupon/update-coupon.component";
import {CustomerDetailsComponent} from "./components/customerAction/customer-details/customer-details.component";
import {CustomerCartComponent} from "./components/customerAction/customer-cart/customer-cart.component";
import {WorngPageComponent} from "./components/worng-page/worng-page.component";


const routes: Routes = [
  {path:"allCoupons", component:LayoutComponent},
  {path:"", component:LayoutComponent},
  {path:"login", component:LoginComponent},
  {path:"Clothes", component:ClothesComponent},
  {path:"Electronics", component:ElectronicsComponent},
  {path:"flights", component:FlightsComponent},
  {path:"Food", component:FoodComponent},
  {path:"Shoes", component:ShoesComponent},
  {path:"Spa", component:SpaComponent},
  {path:"Vacation", component:VacationComponent},
  {path:"coupon/:id", component:CouponComponent},
  {path:"admin", component:GetAllCompaniesComponent},
  {path:"addCompany", component:AddCompanyComponent},
  {path:"updateCompany/:id", component:UpdateCompanyComponent},
  {path:"getAllCompanies", component:GetAllCompaniesComponent},
  {path:"getAllCustomers", component:GetAllCustomersComponent},
  {path:"addCustomer", component:AddCustomerComponent},
  {path:"updateCustomer/:id", component:UpdateCustomerComponent},
  {path:"company", component:CompanyDetailsComponent},
  {path:"addCoupon", component:AddCouponComponent},
  {path:"updateCoupon/:id", component:UpdateCouponComponent},
  {path:"customer", component:CustomerDetailsComponent},
  {path:"cart", component:CustomerCartComponent},
  {path:"404", component:WorngPageComponent},
  {path:"**", redirectTo:"/404"},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule { }
