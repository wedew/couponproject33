import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../../service/company.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-coupon',
  templateUrl: './delete-coupon.component.html',
  styleUrls: ['./delete-coupon.component.css']
})
export class DeleteCouponComponent implements OnInit {

  couponId:number;

  constructor(private companyService:CompanyService, private snack: MatSnackBar,) { }

  ngOnInit(): void {
    this.couponId = this.companyService.getCouponId()
  }


  deleteCoupon(){
    this.companyService.deleteCoupon(sessionStorage.token,this.couponId).subscribe(
      (response)=>{
        this.snack.open(response,"",{duration:3000});
      },(err)=>{
        this.snack.open(err.error,"",{duration:3000});
      }
    )
  }


}
