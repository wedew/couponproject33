import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {LoginService} from "../../../service/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Customer} from "../../../models/customer";
import {DescriptionComponent} from "../description/description.component";
import {MatDialog} from "@angular/material/dialog";
import {Company} from "../../../models/company";
import {AddCompanyComponent} from "../add-company/add-company.component";
import {AddCustomerComponent} from "../add-customer/add-customer.component";
import {UpdateCompanyComponent} from "../update-company/update-company.component";
import {UpdateCustomerComponent} from "../update-customer/update-customer.component";
import {DeleteComponent} from "../delete/delete.component";

@Component({
  selector: 'app-get-all-customers',
  templateUrl: './get-all-customers.component.html',
  styleUrls: ['./get-all-customers.component.css']
})
export class GetAllCustomersComponent implements OnInit {

  allowed:boolean;
  customers: Customer[];
  companies: Company[];
  backupCustomer: Customer[];
  panelOpenState = false;
  oneCustomer: Customer;
  id:number;
  couponsNumber:number = 0;


  constructor(private adminService: AdminService, private loginService:LoginService,private snack: MatSnackBar,private route:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
    this.couponsNumber = 0;
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

    this.adminService.getAllCustomers(sessionStorage.token).subscribe(
      (customers)=>{
        this.customers = customers;
        this.backupCustomer = customers;
      }
    );

    this.adminService.getAllCompanies(sessionStorage.token).subscribe(
      (companies)=>{
        for (let i = 0; i < companies.length; i++){
          this.couponsNumber += companies[i].coupons.length;
          this.companies = companies;
        }
      }
    )

  }

  description(description:string){
    this.adminService.sendDesc(description);
    this.dialog.open(DescriptionComponent)
  }

  deleteCustomer(customerId:number,type:string){
    this.adminService.sendCustomerId(customerId);
    this.adminService.sendType(type);
    this.dialog.open(DeleteComponent,{
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.reload();
    })
  }

  reload() {
    this.ngOnInit();
  }

  addCustomer(){
    this.dialog.open(AddCustomerComponent,{
      width: '1000px',
      height: '400px',
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.reload()
    })
  }

  updateCustomer(customerId:number){
    this.adminService.sendCustomerId(customerId);
    this.dialog.open(UpdateCustomerComponent,{
      width: '1000px',
      height: '400px',
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.reload()
    })
  }

  getById(){
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].id == this.id){
        this.oneCustomer = this.customers[i];
        this.customers = [];
        this.customers.push(this.oneCustomer);
        return;
      }
    }
    this.customers = this.backupCustomer;
  }

}
