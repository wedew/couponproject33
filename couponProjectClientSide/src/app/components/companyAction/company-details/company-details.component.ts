import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {Company} from "../../../models/company";
import {CompanyService} from "../../../service/company.service";
import {Coupon} from "../../../models/coupon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryType} from "../../../enums/category-type.enum";
import {MatDialog} from "@angular/material/dialog";
import {AddCouponComponent} from "../add-coupon/add-coupon.component";
import {UpdateCouponComponent} from "../update-coupon/update-coupon.component";
import {DeleteCouponComponent} from "../delete-coupon/delete-coupon.component";

interface category {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  maxPrice: number;
  allowed:boolean;
  isChecked:boolean;
  company:Company;
  panelOpenState = false;
  compCoupons: Coupon[];
  categoryType: CategoryType;
  aboutToExpire: number = 0;
  myDate = new Date();

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

  constructor(private loginService:LoginService, private companyService:CompanyService, private snack: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if(sessionStorage.token != undefined){
      this.loginService.identityCheck(sessionStorage.token).subscribe(
        (identity)=>{
          if(identity == "company"){
            this.allowed = true
          }else{
            this.allowed = false;
          }
        }
      );
    }
    this.companyService.getCompanyDetails(sessionStorage.token).subscribe(
      (company)=>{
        this.company = company;
        this.compCoupons = company.coupons;

        for(let i = 0; i < company.coupons.length; i++){
          let couponDate = new Date(company.coupons[i].endDate);
          if(Math.floor((couponDate.getTime() - this.myDate.getTime()) / (1000*60*60*24)) <= 5 ){
            this.aboutToExpire ++;
          }
        }
      }
    );
  }

  newCoupon(){
    this.dialog.open(AddCouponComponent, {
      width: '1500px',
      height: '700px',
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
    this.reload();

    })
  }

  updateCoupon(couponId:number){
    this.companyService.sendCouponId(couponId);
    this.dialog.open(UpdateCouponComponent,{
      width: '1500px',
      height: '700px',
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.reload();
    })
  }

  deleteCoupon(couponId:number){
    this.companyService.sendCouponId(couponId);
    this.dialog.open(DeleteCouponComponent,{

    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.reload();
    })
  }

  // deleteCoupon(couponId:number){
  //   this.companyService.deleteCoupon(sessionStorage.token,couponId).subscribe(
  //     (response)=>{
  //       this.snack.open(response,"",{duration:3000});
  //       this.reload();
  //     },(err)=>{
  //       this.snack.open(err.error,"",{duration:3000});
  //       this.reload();
  //     }
  //   )
  // }

  reload(){
    this.ngOnInit();
    this.categoryType = null;
  }

  getByCategory() {
    if(this.categoryType != null){
      this.companyService.getAllCouponsByCategory(sessionStorage.token,this.categoryType).subscribe(
        (coupons)=>{
          this.compCoupons = coupons;
        }
      )
    }else{
      this.reload();
    }
  }

  getByMaxPrice(){
    if(this.maxPrice != null){
      this.companyService.getAllCouponsByMaxPrice(sessionStorage.token,this.maxPrice).subscribe(
        (coupons)=>{
          this.compCoupons = coupons;
        }
      )
    }else{
      this.reload();
    }
  }
}
