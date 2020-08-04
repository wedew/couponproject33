import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {LoginService} from "../../../service/login.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Company} from "../../../models/company";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  allowed:boolean;
  companyForm:FormGroup;
  constructor(private adminService: AdminService, private loginService:LoginService, private fb: FormBuilder, private snack: MatSnackBar, private router: Router,
              private dialogRef: MatDialogRef<AddCompanyComponent>) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
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
  }

  checkPassword(control: AbstractControl){
    if(control.get("password").value != control.get("passwordConfirm").value){
      control.get("passwordConfirm").setErrors({confirmPassword: true})
    }
  }

  addCompany(){
    if(this.companyForm.invalid){
    this.snack.open('something went wrong, please check that the form was filled correctly',null,{duration:3000});
    return;
    }

  let newCompany: Company = new Company(0,
    this.companyForm.controls['name'].value,
    this.companyForm.controls['email'].value,
    this.companyForm.controls['password'].value,[]
    );

  this.adminService.addCompany(sessionStorage.token,newCompany).subscribe(
    (success)=>{
      this.snack.open("company named: " + success.name + " successfully registered under the Id: " + success.id,null,{duration:3000});
      this.dialogRef.close();
      this.router.navigateByUrl("/admin").then();
    },
    (err)=>{
      this.snack.open(err.error,null,{duration:3000});
    }
  )
  }

}
