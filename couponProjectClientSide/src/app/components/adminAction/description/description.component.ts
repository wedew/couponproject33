import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/admin.service";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  description:string;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.description = this.adminService.getDesc()
  }

}
