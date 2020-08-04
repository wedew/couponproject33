import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientType} from "../../enums/client-type.enum";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

interface type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:FormGroup;
  account: string;

  clientType1: type[] = [
    {value: ClientType[0], viewValue:"administrator"},
    {value: ClientType[1], viewValue:"Company"},
    {value: ClientType[2], viewValue:"Customer"},
  ];

  constructor(private service: LoginService, private fb: FormBuilder, private snack: MatSnackBar, private router: Router, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password:["", Validators.required],
      clientType:["", Validators.required],
    })
  }

  log(){
    if(this.login.invalid)
      return;

    this.service.login(
      this.login.controls['email'].value,
      this.login.controls['password'].value,
      this.login.controls['clientType'].value
    ).subscribe((tokenFromServer)=>{
      sessionStorage.token = tokenFromServer;
      switch (this.login.controls['clientType'].value) {
        case "Administrator":
          this.account = "admin";
          break;
        case "Company":
          this.account = "company";
          break;
        case "Customer":
          this.account = "customer";
          break;
      }
        this.snack.open("welcome back!",null,{duration:3000});
      this.router.navigateByUrl(this.account).then();
      this.dialogRef.close()
    },(err)=>{
      this.snack.open(err.error,null,{duration:3000});
    })
  }



}
