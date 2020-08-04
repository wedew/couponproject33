import {Company} from "./company";
import {CategoryType} from "../enums/category-type.enum";

export class Coupon {

  constructor(public id: number,
              public company: Company,
              public category: CategoryType,
              public title: string,
              public description: string,
              public startDate: Date,
              public endDate: Date,
              public amount: number,
              public price: number,
              public image: string
              ) {
  }
}

