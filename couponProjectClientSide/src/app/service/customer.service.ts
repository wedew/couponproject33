import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Coupon} from "../models/coupon";
import {Observable} from "rxjs";
import {CategoryType} from "../enums/category-type.enum";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private client: HttpClient) {
  }

  purchaseCoupon(token:string, coupon:Coupon){
    return this.client.post<Coupon>("http://localhost:8080/customers/purchase/" + token, coupon)
  }

  getOneCoupon(token:string, couponId:number): Observable<Coupon>{
    return this.client.get<Coupon>("http://localhost:8080/customers/oneCoupon/" + token + "/" + couponId)
  }

  getCustomerCoupons(token:string){
    return this.client.get<Coupon[]>("http://localhost:8080/customers/Coupons/" + token)
  }

  getCustomerCouponsByType(token:string, categoryType:CategoryType){
    return this.client.get<Coupon[]>("http://localhost:8080/customers/CouponsByType/" + token + "/" + categoryType)
  }

  getCustomerCouponsByMaxPrice(token:string, maxPrice:number){
    return this.client.get<Coupon[]>("http://localhost:8080/customers/Coupons/" + token + "/" + maxPrice)
  }

  getCustomerDetails(token:string): Observable<Customer>{
    return  this.client.get<Customer>("http://localhost:8080/customers/" + token)
  }

  getAllCoupons(token:string){
    return this.client.get<Coupon[]>("http://localhost:8080/customers/allCoupons/" + token)
  }

  companyNameByCoupon(token:string, couponId:number){
    return this.client.get("http://localhost:8080/customers/companyName/" + token + "/" + couponId,{responseType: 'text'})
  }

}
