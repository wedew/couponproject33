package com.example.couponproject.exceptions;

public class AmountOfCouponIsZeroException extends Exception {
    public AmountOfCouponIsZeroException(){

        super("unfortunately this coupon run out..");
    }
}
