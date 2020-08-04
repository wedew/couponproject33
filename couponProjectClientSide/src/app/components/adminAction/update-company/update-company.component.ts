import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AdminService} from "../../../service/admin.service";
import {LoginService} from "../../../service/login.service";
import {Company} from "../../../models/company";
import {Coupon} from "../../../models/coupon";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  allowed:boolean;
  companyForm:FormGroup;
  companyCoupons: Coupon[];
  companyId:number;


  constructor(private adminService: AdminService, private loginService:LoginService,
              private fb: FormBuilder, private route: ActivatedRoute, private snack: MatSnackBar, private router: Router,
              private dialogRef: MatDialogRef<UpdateCompanyComponent>) { }

  ngOnInit(): void {
    this.companyId = this.adminService.getCompanyId();
    this.companyForm = this.fb.group({
      id:["",[Validators.required]],
      name:["", [Validators.required]],
      email:["", [Validators.required,Validators.email]],
      password:["", [Validators.required]],
      passwordConfirm:["",[Validators.required]]
    }, {validator: this.checkPassword});

    if(sessionStorage.token != undefined){
      this.loginService.identityCheck(sessionStorage.token).subscribe(
        (identity)=>{
          if(identity == "admin"){
            this.allowed = true
          }else{
            this.allowed = false;
          }
        }
      );
    }

    if(this.route.snapshot.params['id'] !=0){
       // this.companyForm.controls['id'].setValue(+this.route.snapshot.params['id']);
      this.companyForm.controls['id'].setValue(this.companyId);
      this.getCompanyById();
    }
  }

  checkPassword(control: AbstractControl){
    if(control.get("password").value != control.get("passwordConfirm").value){
      control.get("passwordConfirm").setErrors({confirmPassword: true})

    }
  }

  getCompanyById(){
  this.adminService.getOneCompany(sessionStorage.token, this.companyForm.controls['id'].value).subscribe(
    (company)=>{
      this.companyForm.controls['name'].setValue(company.name);
      this.companyForm.controls['email'].setValue(company.email);
      this.companyForm.controls['password'].setValue(company.password);
      this.companyCoupons = company.coupons;
    }
  )
  }


  updateCompany(){
    if(this.companyForm.invalid){
      this.snack.open('something went wrong, please check that the form was filled correctly',null,{duration:3000});
      return;
    }

    let updatedCompany: Company = new Company(
      this.companyForm.controls['id'].value,
      this.companyForm.controls['name'].value,
      this.companyForm.controls['email'].value,
      this.companyForm.controls['password'].value,
      this.companyCoupons
    );

    this.adminService.updateCompany(sessionStorage.token,updatedCompany).subscribe(
      (success)=>{
        this.snack.open("company named: " + success.name + " successfully updated under the Id: " + success.id,null,{duration:3000});
        this.dialogRef.close();
        this.router.navigateByUrl("/admin")

      },
      (err)=>{
        this.snack.open(err.error,null,{duration:3000});
      }
    )
  }


}
