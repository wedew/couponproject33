import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../service/customer.service";
import {Coupon} from "../../../models/coupon";
import {LoginService} from "../../../service/login.service";
import {CategoryType} from "../../../enums/category-type.enum";
import {Customer} from "../../../models/customer";
interface category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  allowed:boolean;
  maxPrice: number;
  customer: Customer;
  customerCoupon: Coupon[];
  panelOpenState = false;
  isChecked:boolean;
  categoryType: CategoryType;

  category: category[] = [
    {value: null, viewValue:"All"},
    {value: CategoryType[0], viewValue:"flights"},
    {value: CategoryType[1], viewValue:"Spa"},
    {value: CategoryType[2], viewValue:"Vacation"},
    {value: CategoryType[3], viewValue:"Electronics"},
    {value: CategoryType[4], viewValue:"Clothes"},
    {value: CategoryType[5], viewValue:"Shoes"},
    {value: CategoryType[6], viewValue:"Food"},
  ];

  constructor(private customerService: CustomerService,private loginService:LoginService) { }

  ngOnInit(): void {

    if(sessionStorage.token != undefined){
      this.loginService.identityCheck(sessionStorage.token).subscribe(
        (identity)=>{
          if(identity == "customer"){
            this.allowed = true
          }else{
            this.allowed = false;
          }
        }
      );
    }

    this.customerService.getCustomerDetails(sessionStorage.token).subscribe(
      (customer)=>{
        this.customer = customer;
        this.customerCoupon = customer.coupons;

      }
    );
  }

  reload(){
    this.ngOnInit();
    this.categoryType = null;
  }

  getByCategory() {
    if(this.categoryType != null){
      this.customerService.getCustomerCouponsByType(sessionStorage.token,this.categoryType).subscribe(
        (coupons)=>{
          this.customerCoupon = coupons;
        }
      )
    }else{
      this.reload();
    }
  }

  getByMaxPrice(){
    if(this.maxPrice != null){
      this.customerService.getCustomerCouponsByMaxPrice(sessionStorage.token,this.maxPrice).subscribe(
        (coupons)=>{
          this.customerCoupon = coupons;
        }
      )
    }else{
      this.reload();
    }
  }

}
