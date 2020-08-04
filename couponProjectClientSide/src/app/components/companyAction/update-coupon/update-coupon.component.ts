import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Company} from "../../../models/company";
import {CategoryType} from "../../../enums/category-type.enum";
import {LoginService} from "../../../service/login.service";
import {CompanyService} from "../../../service/company.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Coupon} from "../../../models/coupon";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
interface category {
  value: CategoryType;
  viewValue: string;
}
@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {


  allowed:boolean;
  couponForm:FormGroup;
  company:Company;
  categoryType = CategoryType;
  category: category[] = [
    {value: this.categoryType.Clothes, viewValue:"Clothes"},
    {value: this.categoryType.Electronics, viewValue:"Electronics"},
    {value: this.categoryType.flights, viewValue:"flights"},
    {value: this.categoryType.Food, viewValue:"Food"},
    {value: this.categoryType.Shoes, viewValue:"Shoes"},
    {value: this.categoryType.Spa, viewValue:"Spa"},
    {value: this.categoryType.Vacation, viewValue:"Vacation"},
  ];

  constructor(private loginService:LoginService, private companyService:CompanyService,
              private fb: FormBuilder, private snack: MatSnackBar,  private route: ActivatedRoute, private router: Router,
              private dialogRef: MatDialogRef<UpdateCouponComponent>) { }

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
      }
    );
    this.couponForm = this.fb.group({
      id:["",Validators.required],
      category:["", Validators.required],
      title:["", Validators.required],
      description:["",Validators.required],
      startDate:["",Validators.required],
      endDate:["",Validators.required],
      amount:["",Validators.required],
      price:["",Validators.required],
      image:["",]
    });

    if(this.route.snapshot.params['id'] !=0){
      // this.couponForm.controls['id'].setValue(+this.route.snapshot.params['id']);
      this.couponForm.controls['id'].setValue(this.companyService.getCouponId());
      this.getCouponById();
    }
  }

  getCouponById(){
    this.companyService.getAllCoupons(sessionStorage.token).subscribe(
      (coupons)=>{
        for(let i = 0; i < coupons.length; i++){
          if(coupons[i].id == this.couponForm.controls['id'].value){
              if(coupons[i].category.toString() == "flights")
                this.couponForm.controls['category'].setValue(0);
              else if(coupons[i].category.toString() == "Spa")
                this.couponForm.controls['category'].setValue(1);
              else if(coupons[i].category.toString() == "Vacation")
                this.couponForm.controls['category'].setValue(2);
              else if(coupons[i].category.toString() == "Electronics")
                this.couponForm.controls['category'].setValue(3);
              else if(coupons[i].category.toString() == "Clothes")
                this.couponForm.controls['category'].setValue(4);
              else if(coupons[i].category.toString() == "Shoes")
                this.couponForm.controls['category'].setValue(5);
              else if(coupons[i].category.toString() == "Food")
                this.couponForm.controls['category'].setValue(6);
            this.couponForm.controls['title'].setValue(coupons[i].title);
            this.couponForm.controls['description'].setValue(coupons[i].description);
            this.couponForm.controls['startDate'].setValue(coupons[i].startDate);
            this.couponForm.controls['endDate'].setValue(coupons[i].endDate);
            this.couponForm.controls['amount'].setValue(coupons[i].amount);
            this.couponForm.controls['price'].setValue(coupons[i].price);
            this.couponForm.controls['image'].setValue(coupons[i].image);
              break;
          }
        }
      }
    )
  }

  updateCoupon(){
    if(this.couponForm.invalid){
      this.snack.open('something went wrong, please check that the form was filled correctly',null,{duration:3000});
      return;
    }

    if(this.couponForm.controls['image'].value == "")
      this.couponForm.controls['image'].setValue(" ");

    let updatedCoupon: Coupon = new Coupon(
      this.couponForm.controls['id'].value,
      this.company,
      this.couponForm.controls['category'].value,
      this.couponForm.controls['title'].value,
      this.couponForm.controls['description'].value,
      this.couponForm.controls['startDate'].value,
      this.couponForm.controls['endDate'].value,
      this.couponForm.controls['amount'].value,
      this.couponForm.controls['price'].value,
      this.couponForm.controls['image'].value,);


    this.companyService.updateCoupon(sessionStorage.token,updatedCoupon).subscribe(
      (response)=>{
        this.snack.open("coupon named: " + response.title + " successfully updated under the Id: " + response.id,null,{duration:3000});
        this.dialogRef.close();
        this.router.navigateByUrl("/company")
      },(err)=>{
        this.snack.open(err.error,null,{duration:3000});
      }
    )
  }


}
