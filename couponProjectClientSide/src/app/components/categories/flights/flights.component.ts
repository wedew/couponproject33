import { Component, OnInit } from '@angular/core';
import {Coupon} from "../../../models/coupon";
import {CustomerService} from "../../../service/customer.service";
import {CategoryType} from "../../../enums/category-type.enum";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  clothesCoupons: Coupon[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // this.customerService.getAllCoupons(sessionStorage.token).subscribe(
    //   (coupons)=>{
    //     for(let c = 0; c < coupons.length; c++){
    //       if(coupons[c].category.toString() == CategoryType[0]){
    //         this.clothesCoupons.push(coupons[c])
    //       }
    //     }
    //   }
    // );

    this.loginService.getAllCoupons().subscribe(
      (coupons)=>{
        for(let c = 0; c < coupons.length; c++){
          if(coupons[c].category.toString() == CategoryType[0]){
            this.clothesCoupons.push(coupons[c])
          }
        }
      }
    );

  }

}
