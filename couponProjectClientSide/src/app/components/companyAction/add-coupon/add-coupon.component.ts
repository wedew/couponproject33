import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../service/login.service";
import {CompanyService} from "../../../service/company.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Company} from "../../../models/company";
import {CategoryType} from "../../../enums/category-type.enum";
import {Coupon} from "../../../models/coupon";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
interface category {
  value: CategoryType;
  viewValue: string;
}
@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  allowed:boolean;
  couponForm:FormGroup;
  company:Company;
  categoryType = CategoryType;
  daysForExpiration:number;

  category: category[] = [
    {value: this.categoryType.Clothes, viewValue:"Clothes"},
    {value: this.categoryType.Electronics, viewValue:"Electronics"},
    {value: this.categoryType.flights, viewValue:"flights"},
    {value: this.categoryType.Food, viewValue:"Food"},
    {value: this.categoryType.Shoes, viewValue:"Shoes"},
    {value: this.categoryType.Spa, viewValue:"Spa"},
    {value: this.categoryType.Vacation, viewValue:"Vacation"},
  ];

  constructor(private loginService:LoginService, private companyService:CompanyService, private fb: FormBuilder, private snack: MatSnackBar, private router: Router,
              private dialogRef:MatDialogRef<AddCouponComponent>) { }

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
      category:["", Validators.required],
      title:["", Validators.required],
      description:["",Validators.required],
      startDate:["",Validators.required],
      endDate:["",Validators.required],
      amount:["",Validators.required],
      price:["",Validators.required],
      image:["",]
    }, {validator: this.dateValidator})
  }

  dateValidator(control: AbstractControl){
    let startDate = new Date(control.get("startDate").value);
    let endDate = new Date(control.get("endDate").value);
    if(endDate.getTime() < startDate.getTime())
      control.get("endDate").setErrors({startGraterThenEnd: true})
  }

  daysUntilExpiration(){
    if(this.couponForm.controls['startDate'].value != "" && this.couponForm.controls['endDate'].value != ""){
      let currentDate = new Date();
      let startDate = new Date(this.couponForm.controls['startDate'].value);
      let endDate = new Date(this.couponForm.controls['endDate'].value);
      if(endDate.getTime() > startDate.getTime()){
        if(startDate.getTime() < currentDate.getTime())
          this.daysForExpiration = Math.floor((endDate.getTime() - currentDate.getTime()) / (1000*60*60*24));
        else
          this.daysForExpiration = Math.floor((endDate.getTime() - startDate.getTime()) / (1000*60*60*24));
      }else{
        this.daysForExpiration = 0;
      }
    }
  }

  addCoupon(){
    if(this.couponForm.invalid){
      this.snack.open('something went wrong, please check that the form was filled correctly',null,{duration:3000});
      return;
    }

    if(this.couponForm.controls['image'].value == "")
       this.couponForm.controls['image'].setValue(" ");

    let newCoupon: Coupon = new Coupon(0,
      this.company,this.couponForm.controls['category'].value,
      this.couponForm.controls['title'].value,
      this.couponForm.controls['description'].value,
      this.couponForm.controls['startDate'].value,
      this.couponForm.controls['endDate'].value,
      this.couponForm.controls['amount'].value,
      this.couponForm.controls['price'].value,
      this.couponForm.controls['image'].value,);

    this.companyService.addCoupon(sessionStorage.token,newCoupon).subscribe(
      (success)=>{
        this.snack.open("coupon successfully registered under id: " + success.id,"",{duration:3000});
        this.dialogRef.close();
        this.router.navigateByUrl("/company").then();
      },(err)=>{
        this.snack.open(err.error,"",{duration:3000})
      }
    )
  }

}

