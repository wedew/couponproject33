import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Company} from "../models/company";
import {Observable} from "rxjs";
import {Customer} from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  desc:string;
  companyId:number;
  customerId:number;
  type:string;

  constructor(private client: HttpClient) { }


  addCompany(token: string, company: Company){
    return this.client.post<Company>("http://localhost:8080/admin/addCompany/" + token, company)
  }

  updateCompany(token: string, company: Company){
    return this.client.post<Company>("http://localhost:8080/admin/updateCompany/" + token, company)
  }

  getAllCompanies(token: string){
    return this.client.get<Company[]>("http://localhost:8080/admin/" + token)
  }

  deleteCompany(token: string, companyId: number){
    return this.client.delete("http://localhost:8080/admin/deleteCompany/" + token + "/" + companyId, {responseType:'text'})
  }

  getOneCompany(token: string, companyId: number): Observable<Company>{
    return this.client.get<Company>("http://localhost:8080/admin/oneCompany/" + token + "/" + companyId)
  }

  addCustomer(token: string, customer: Customer){
    return this.client.post<Customer>("http://localhost:8080/admin/addCustomer/" + token,customer)
  }

  updateCustomer(token: string, customer: Customer){
    return this.client.post<Customer>("http://localhost:8080/admin/updateCustomer/" + token,customer)
  }

  deleteCustomer(token: string, customerId: number){
    return this.client.delete("http://localhost:8080/admin/deleteCustomer/" + token + "/" + customerId, {responseType:'text'})
  }

  getAllCustomers(token: string){
    return this.client.get<Customer[]>("http://localhost:8080/admin/customers/" + token)
  }

  getOneCustomer(token: string, customerId: number): Observable<Customer>{
    return this.client.get<Customer>("http://localhost:8080/admin/oneCustomer/" + token + "/" + customerId)
  }

  sendDesc(description:string){
    this.desc = description;
  }

  getDesc(){
    return this.desc;
  }

  sendCompanyId(companyId:number){
    this.companyId = companyId;
  }

  getCompanyId(){
    return this.companyId;
  }

  sendCustomerId(customerId:number){
    this.customerId = customerId;
  }

  getCustomerId(){
    return this.customerId;
  }

  sendType(type:string){
    this.type = type;
  }

  getType(){
    return this.type;
  }


}
