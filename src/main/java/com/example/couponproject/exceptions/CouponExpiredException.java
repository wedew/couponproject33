package com.example.couponproject.exceptions;

public class CouponExpiredException extends Exception {

    public CouponExpiredException(){
        super("unfortunately this coupon expired..");
    }
}
