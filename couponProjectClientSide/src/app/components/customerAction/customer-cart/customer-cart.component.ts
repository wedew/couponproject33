import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../service/customer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../../service/login.service";
import {Coupon} from "../../../models/coupon";

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {

  coupons: Coupon[] = [];
  done: boolean = false;
  purchaseDisabled: boolean = false;
  unDone: boolean = false;
  beforePurchase: boolean = true;

  constructor(private customerService: CustomerService, private snack: MatSnackBar, private loginService: LoginService) { }

  ngOnInit(): void {
    if(this.loginService.cartCount.length > 0){
      for (let i = 0; i < this.loginService.cartCount.length; i++){
        this.customerService.getOneCoupon(sessionStorage.token, this.loginService.cartCount[i]).subscribe(
          (coupon)=>{
            this.coupons.push(coupon);
          }
        )
      }
    }else
      this.purchaseDisabled = true;
  }

  purchaseCoupons(){
    if(this.loginService.cartCount.length <1)
      return;
    for (let i = 0; i < this.coupons.length; i++){
      this.customerService.purchaseCoupon(sessionStorage.token,this.coupons[i]).subscribe(
        (couponDetails)=>{
          this.beforePurchase = false;
          this.done = true;
        },(err)=>{
          this.snack.open(err.error,null,{duration:3000});
          this.beforePurchase = false;
          this.unDone = true;
        }
      )
    }
    this.purchaseDisabled = true;
    this.loginService.cartCount = [];
  }

  deleteCoupon(couponId:number){
    for (let i = 0; i < this.coupons.length; i++){
      if(couponId == this.coupons[i].id)
        this.coupons.splice(i,1);
    }

    for(let i = 0; i < this.loginService.cartCount.length; i++){
      if(couponId == this.loginService.cartCount[i])
        this.loginService.cartCount.splice(i,1);
    }
    if(this.loginService.cartCount.length == 0)
    this.ngOnInit();
  }

  emptyCart(){
    this.loginService.cartCount = [];
    this.coupons = [];
    this.ngOnInit();
  }

}
