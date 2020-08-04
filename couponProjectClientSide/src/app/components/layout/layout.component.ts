import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  login:boolean = false;
  isCustomer:boolean;
  constructor(private service:LoginService) { }

  ngOnInit(): void {
    if(sessionStorage.token != undefined){
      this.service.identityCheck(sessionStorage.token).subscribe(
        (identity)=>{
          if(identity != "customer"){
            this.login = false;
            return;
          }
        }
      );
      this.login = true;
    }else{
      this.login = false;
    }


  }

}
