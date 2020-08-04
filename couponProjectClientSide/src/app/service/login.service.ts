import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientType} from "../enums/client-type.enum";
import {Coupon} from "../models/coupon";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  cartCount: number[] = [];

  constructor(private client: HttpClient) {

  }

  login(email: string, password: string, clientType: ClientType){
    return this.client.post("http://localhost:8080/login/" + email + "/" + password + "/" + clientType,null,{responseType:'text'})
  }

  logout(token: string){
    return this.client.post("http://localhost:8080/logout/" + sessionStorage.token, null,{responseType: 'text'})
  }

  identityCheck(token: string){
    return this.client.get("http://localhost:8080/check/" + sessionStorage.token,{responseType:'text'})
  }

  getAllCoupons(){
    return this.client.get<Coupon[]>("http://localhost:8080/allCoupons/")
  }

  getOneCoupon(couponId:number){
    return this.client.get<Coupon>("http://localhost:8080/oneCoupon/" + couponId)
  }

  companyName(couponId:number){
    return this.client.get("http://localhost:8080/companyName/" + couponId,{responseType: 'text'})
  }





}

