import { Component, OnInit } from '@angular/core';
import {Coupon} from "../../../models/coupon";
import {CustomerService} from "../../../service/customer.service";
import {CategoryType} from "../../../enums/category-type.enum";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.component.html',
  styleUrls: ['./vacation.component.css']
})
export class VacationComponent implements OnInit {
  clothesCoupons: Coupon[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    // this.customerService.getAllCoupons(sessionStorage.token).subscribe(
    //   (coupons)=>{
    //     for(let c = 0; c < coupons.length; c++){
    //       if(coupons[c].category.toString() == CategoryType[2]){
    //         this.clothesCoupons.push(coupons[c])
    //       }
    //     }
    //   }
    // );
    this.loginService.getAllCoupons().subscribe(
      (coupons)=>{
        for(let c = 0; c < coupons.length; c++){
          if(coupons[c].category.toString() == CategoryType[2]){
            this.clothesCoupons.push(coupons[c])
          }
        }
      }
    );
  }

}
