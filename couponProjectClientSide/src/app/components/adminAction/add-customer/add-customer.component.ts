import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {LoginService} from "../../../service/login.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Company} from "../../../models/company";
import {Customer} from "../../../models/customer";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  allowed:boolean;
  customerForm:FormGroup;

  constructor(private adminService: AdminService, private loginService:LoginService, private fb: FormBuilder, private snack: MatSnackBar, private router: Router,
              private dialogRef: MatDialogRef<AddCustomerComponent>) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
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
  }

  checkPassword(control: AbstractControl){
    if(control.get("password").value != control.get("passwordConfirm").value){
      control.get("passwordConfirm").setErrors({confirmPassword: true})
    }
  }

  addCustomer(){
    if(this.customerForm.invalid){
      this.snack.open('something went wrong, please check that the form was filled correctly',null,{duration:3000});
      return;
    }

    let newCustomer: Customer = new Customer(0,
      this.customerForm.controls['firstName'].value,
      this.customerForm.controls['lastName'].value,
      this.customerForm.controls['email'].value,
      this.customerForm.controls['password'].value,[]
    );

    this.adminService.addCustomer(sessionStorage.token,newCustomer).subscribe(
      (success)=>{
        this.snack.open("customer named: " + success.firstName + " " + success.lastName + " successfully registered under the Id: "
          + success.id,null,{duration:3000});
        this.dialogRef.close();
        this.router.navigateByUrl("/getAllCustomers");
      },
      (err)=>{
        this.snack.open(err.error,null,{duration:3000});
      }
    )
  }

}
