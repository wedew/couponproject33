import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../../service/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: boolean = false;
  yourAccount:string;

  constructor(private dialog: MatDialog, public service: LoginService, private snack:MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.token != undefined){
      this.token = true;
    }else
      this.token = false;

    if(sessionStorage.token != undefined){
      this.service.identityCheck(sessionStorage.token).subscribe(
        (identity)=>{
          this.yourAccount = identity;
        }
      );
    }
  }

  openDialog(){
    this.dialog.open(LoginComponent,{

  });
    this.dialog.afterAllClosed.subscribe((result)=>{
      if(sessionStorage.token != undefined){
        this.token = true;
      }

      else{
        this.token = false;
        return;
      }

      if(sessionStorage.token != undefined){
        this.service.identityCheck(sessionStorage.token).subscribe(
          (identity)=>{
            this.yourAccount = identity;
          }
        );
      }
      this.ngOnInit()
    });
  }

  logout(){
    this.service.logout(sessionStorage.token).subscribe((response)=>{
      this.router.navigateByUrl("allCoupons").then();
      this.snack.open(response,null,{duration:3000});
    });
    sessionStorage.clear();
    this.token = false;
    this.service.cartCount = [];
  }


}
