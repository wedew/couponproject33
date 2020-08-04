import { Component, OnInit } from '@angular/core';
import {Coupon} from "../../../models/coupon";
import {CategoryType} from "../../../enums/category-type.enum";
import {CustomerService} from "../../../service/customer.service";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {
  clothesCoupons: Coupon[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getAllCoupons().subscribe(
      (coupons)=>{
        for(let c = 0; c < coupons.length; c++){
          if(coupons[c].category.toString() == CategoryType[6]){
            this.clothesCoupons.push(coupons[c])
          }
        }
      }
    );
  }

}
