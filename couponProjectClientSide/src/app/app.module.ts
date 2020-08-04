import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { LayoutComponent } from './components/layout/layout.component';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import { LoginComponent } from './components/login/login.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ClothesComponent } from './components/categories/clothes/clothes.component';
import { FlightsComponent } from './components/categories/flights/flights.component';
import { ElectronicsComponent } from './components/categories/electronics/electronics.component';
import { VacationComponent } from './components/categories/vacation/vacation.component';
import { SpaComponent } from './components/categories/spa/spa.component';
import { ShoesComponent } from './components/categories/shoes/shoes.component';
import { FoodComponent } from './components/categories/food/food.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { AddCompanyComponent } from './components/adminAction/add-company/add-company.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { UpdateCompanyComponent } from './components/adminAction/update-company/update-company.component';
import { GetAllCompaniesComponent } from './components/adminAction/get-all-companies/get-all-companies.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { GetAllCustomersComponent } from './components/adminAction/get-all-customers/get-all-customers.component';
import { AddCustomerComponent } from './components/adminAction/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './components/adminAction/update-customer/update-customer.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { CompanyDetailsComponent } from './components/companyAction/company-details/company-details.component';
import { AddCouponComponent } from './components/companyAction/add-coupon/add-coupon.component';
import { UpdateCouponComponent } from './components/companyAction/update-coupon/update-coupon.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { CustomerDetailsComponent } from './components/customerAction/customer-details/customer-details.component';
import { DescriptionComponent } from './components/adminAction/description/description.component';
import {MatRadioModule} from "@angular/material/radio";
import { DeleteCouponComponent } from './components/companyAction/delete-coupon/delete-coupon.component';
import { DeleteComponent } from './components/adminAction/delete/delete.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import { CustomerCartComponent } from './components/customerAction/customer-cart/customer-cart.component';
import {MatTableModule} from "@angular/material/table";
import { WorngPageComponent } from './components/worng-page/worng-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    LoginComponent,
    ClothesComponent,
    FlightsComponent,
    ElectronicsComponent,
    VacationComponent,
    SpaComponent,
    ShoesComponent,
    FoodComponent,
    CouponComponent,
    AddCompanyComponent,
    UpdateCompanyComponent,
    GetAllCompaniesComponent,
    GetAllCustomersComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    CompanyDetailsComponent,
    AddCouponComponent,
    UpdateCouponComponent,
    CustomerDetailsComponent,
    DescriptionComponent,
    DeleteCouponComponent,
    DeleteComponent,
    CustomerCartComponent,
    WorngPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatStepperModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatTableModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
