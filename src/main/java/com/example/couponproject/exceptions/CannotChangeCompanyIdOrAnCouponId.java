package com.example.couponproject.exceptions;

public class CannotChangeCompanyIdOrAnCouponId extends Exception {

    public CannotChangeCompanyIdOrAnCouponId(){
        super(
                "its not possible to change an couponId OR an CompanyId of an already exists coupon.."
        );
    }
}
