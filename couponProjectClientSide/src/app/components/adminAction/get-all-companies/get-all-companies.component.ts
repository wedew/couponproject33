import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {LoginService} from "../../../service/login.service";
import {Company} from "../../../models/company";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DescriptionComponent} from "../description/description.component";
import {Customer} from "../../../models/customer";
import {UpdateCompanyComponent} from "../update-company/update-company.component";
import {AddCompanyComponent} from "../add-company/add-company.component";
import {DeleteComponent} from "../delete/delete.component";

@Component({
  selector: 'app-get-all-companies',
  templateUrl: './get-all-companies.component.html',
  styleUrls: ['./get-all-companies.component.css']
})
export class GetAllCompaniesComponent implements OnInit {

  allowed:boolean;
  companies: Company[];
  customers: Customer[] = [];
  backupCompanies: Company[];
  panelOpenState = false;
  oneCompany: Company;
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

    this.adminService.getAllCompanies(sessionStorage.token).subscribe(
      (companies)=>{
        this.companies = companies;
        this.backupCompanies = companies;
        for (let i = 0; i < companies.length; i++){
          this.couponsNumber += companies[i].coupons.length;
        }
      }
    );

    this.adminService.getAllCustomers(sessionStorage.token).subscribe(
      (customers)=>{
        this.customers = customers;
      }
    );
  }

  updateCompany(companyId:number){
    this.adminService.sendCompanyId(companyId);
    this.dialog.open(UpdateCompanyComponent,{
      width: '1000px',
      height: '400px',
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.reload()
    })
  }

  addCompany(){
    this.dialog.open(AddCompanyComponent,{
      width: '1000px',
      height: '400px',
    });
    this.dialog.afterAllClosed.subscribe((result)=>{
      this.reload()
    })
  }

  description(description:string){
    this.adminService.sendDesc(description);
    this.dialog.open(DescriptionComponent)
  }


  deleteCompany(companyId:number,type:string){
    this.adminService.sendCompanyId(companyId);
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

  getById(){
    for(let i = 0; i < this.companies.length; i++){
      if(this.companies[i].id == this.id){
        this.oneCompany = this.companies[i];
        this.companies = [];
        this.companies.push(this.oneCompany);
        return;
      }
    }
    this.companies = this.backupCompanies;
  }

}
