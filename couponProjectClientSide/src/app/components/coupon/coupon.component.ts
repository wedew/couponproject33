import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../service/customer.service";
import {Coupon} from "../../models/coupon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../service/login.service";
import {CompanyService} from "../../service/company.service";
import {UpdateCouponComponent} from "../companyAction/update-coupon/update-coupon.component";
import {DeleteCouponComponent} from "../companyAction/delete-coupon/delete-coupon.component";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  couponImage:string;
  companyName:string;
  id: number;
  coupon: Coupon;
  couponPurchased: boolean;
  login: boolean = false;
  companyHere: boolean = false;
  daysUntilExpiration : number;
  addedToCart:string;

  constructor(private route: ActivatedRoute, private service: CustomerService, private snack: MatSnackBar, private loginService: LoginService,
              private companyService:CompanyService,private router: Router, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
    if(sessionStorage.token != undefined){
      this.loginService.identityCheck(sessionStorage.token).subscribe(
        (identity)=>{
          if(identity != "customer"){
            this.login = false;
            if(identity == "company"){
              this.companyService.getAllCoupons(sessionStorage.token).subscribe(
                (companyCoupons)=>{
                  for(let i = 0; i < companyCoupons.length; i++){
                    if(companyCoupons[i].id == this.id){
                      this.companyHere = true;
                      return;
                    }
                  }
                }
              );
              return;
            }
            return;
          }
          this.service.getCustomerCoupons(sessionStorage.token).subscribe(
            (coupons)=>{
              for(let i = 0; i < coupons.length; i++){
                if(+this.route.snapshot.params["id"] == coupons[i].id){
                  this.addedToCart = "coupon Purchased!";
                  this.couponPurchased = true;
                  break;
                }
              }
            }
          )
        }
      );
      this.login = true;
    }else{
      this.login = false;
    }

    this.loginService.getOneCoupon(+this.route.snapshot.params["id"]).subscribe(
      (coupon)=>{
        this.coupon = coupon;
        this.couponImage = coupon.image;
        let currentDate = new Date();
        let endDate = new Date(coupon.endDate);
        this.daysUntilExpiration = Math.floor((endDate.getTime() - currentDate.getTime()) / (1000*60*60*24));
      }
    );

    this.loginService.companyName(+this.route.snapshot.params["id"]).subscribe(
      (companyName)=>{
        this.companyName = companyName;
      }
    );

    for (let i = 0; i < this.loginService.cartCount.length; i++){
      if(this.loginService.cartCount[i] == this.route.snapshot.params["id"]){
        this.addedToCart = "coupon added to cart!";
        this.couponPurchased = true;
        break;
      }
    }

  }

  updateCoupon(couponId:number){
    this.companyService.sendCouponId(couponId);
    this.dialog.open(UpdateCouponComponent,{
      width: '1500px',
      height: '700px',
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.router.navigateByUrl("/coupon/" + this.id).then();
    })
  }

  deleteCoupon(couponId:number){
    this.companyService.sendCouponId(couponId);
    this.dialog.open(DeleteCouponComponent,{

    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.router.navigateByUrl("/company").then();
    })
  }


  addToCart(){
    this.loginService.cartCount.push(this.coupon.id);
    this.addedToCart = "coupon added to cart!";
    this.couponPurchased = true;
  }


  guestChecker(){
    if(sessionStorage.token == null){
    this.dialog.open(LoginComponent)
    }
  }

}
