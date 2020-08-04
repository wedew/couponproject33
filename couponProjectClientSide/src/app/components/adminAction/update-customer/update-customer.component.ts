import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Coupon} from "../../../models/coupon";
import {AdminService} from "../../../service/admin.service";
import {LoginService} from "../../../service/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Company} from "../../../models/company";
import {Customer} from "../../../models/customer";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  allowed:boolean;
  customerForm:FormGroup;
  customerCoupons: Coupon[];
  customerId:number;

  constructor(private adminService: AdminService, private loginService:LoginService,
              private fb: FormBuilder, private route: ActivatedRoute, private snack: MatSnackBar, private router: Router,
              private dialogRef: MatDialogRef<UpdateCustomerComponent>) { }

  ngOnInit(): void {
    this.customerId = this.adminService.getCustomerId();
    this.customerForm = this.fb.group({
      id:["", Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
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
      // this.customerForm.controls['id'].setValue(+this.route.snapshot.params['id']);
      this.customerForm.controls['id'].setValue(this.customerId);
      this.getCustomerById();
    }
  }

  checkPassword(control: AbstractControl){
    if(control.get("password").value != control.get("passwordConfirm").value){
      control.get("passwordConfirm").setErrors({confirmPassword: true})
    }
  }

  getCustomerById(){
    this.adminService.getOneCustomer(sessionStorage.token, this.customerForm.controls['id'].value).subscribe(
      (customer)=>{
        this.customerForm.controls['firstName'].setValue(customer.firstName);
        this.customerForm.controls['lastName'].setValue(customer.lastName);
        this.customerForm.controls['email'].setValue(customer.email);
        this.customerForm.controls['password'].setValue(customer.password);
        this.customerCoupons = customer.coupons;
      }
    )
  }

  updateCustomer(){
    if(this.customerForm.invalid){
      this.snack.open('something went wrong, please check that the form was filled correctly',null,{duration:3000});
      return;
    }

    let updatedCustomer: Customer = new Customer(
      this.customerForm.controls['id'].value,
      this.customerForm.controls['firstName'].value,
      this.customerForm.controls['lastName'].value,
      this.customerForm.controls['email'].value,
      this.customerForm.controls['password'].value,
      this.customerCoupons
    );

    this.adminService.updateCustomer(sessionStorage.token,updatedCustomer).subscribe(
      (success)=>{
        this.snack.open("customer named: " + success.firstName + " " + success.lastName + " successfully updated under the Id: "
          + success.id,null,{duration:3000});
        this.dialogRef.close();
        this.router.navigateByUrl("/getAllCustomers")
      },
      (err)=>{
        this.snack.open(err.error,null,{duration:3000});
      }
    )
  }


}
