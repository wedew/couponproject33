import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  companyId:number;
  customerId:number;
  type:string;

  constructor(private adminService: AdminService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.type = this.adminService.getType();

    if(this.adminService.getType() == 'company')
      this.companyId = this.adminService.getCompanyId();
    else if(this.adminService.getType() == 'customer')
      this.customerId = this.adminService.getCustomerId();
  }

  deleteCompany(){
    this.adminService.deleteCompany(sessionStorage.token, this.companyId).subscribe(
      (success)=>{
        this.snack.open(success,null,{duration:3000});
      },(err)=>{
        this.snack.open(err.error);
      }
    )
  }

  deleteCustomer(){
    this.adminService.deleteCustomer(sessionStorage.token, this.customerId).subscribe(
      (success)=>{
        this.snack.open(success,null,{duration:3000});
      },(err)=>{
        this.snack.open(err.error);
      }
    )
  }

}
