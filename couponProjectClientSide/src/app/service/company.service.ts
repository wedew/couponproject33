import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Company} from "../models/company";
import {Coupon} from "../models/coupon";
import {CategoryType} from "../enums/category-type.enum";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  couponId:number;

  constructor(private client: HttpClient) { }

  getCompanyDetails(token: string): Observable<Company>{
    return this.client.get<Company>("http://localhost:8080/companies/" + token)
  }

  addCoupon(token:string, coupon: Coupon){
    return this.client.post<Coupon>("http://localhost:8080/companies/" + token,coupon)
  }

  updateCoupon(token:string, coupon: Coupon){
    return this.client.post<Coupon>("http://localhost:8080/companies/update/" + token,coupon)
  }

  deleteCoupon(token:string, couponId:number){
    return this.client.delete("http://localhost:8080/companies/" + token + "/" + couponId, {responseType: 'text'})
  }

  getAllCoupons(token:string){
    return this.client.get<Coupon[]>("http://localhost:8080/companies/allCoupons/" + token)
  }

  getAllCouponsByCategory(token:string, categoryType: CategoryType){
    return this.client.get<Coupon[]>("http://localhost:8080/companies/allCouponsByCategory/" + token + "/" + categoryType)
  }

  getAllCouponsByMaxPrice(token:string, maxPrice:number){
    return this.client.get<Coupon[]>("http://localhost:8080/companies/allCouponsByMaxPrice/" + token + "/" + maxPrice)
  }

  sendCouponId(couponId:number){
    this.couponId = couponId;
  }

  getCouponId(){
    return this.couponId;
  }


}
