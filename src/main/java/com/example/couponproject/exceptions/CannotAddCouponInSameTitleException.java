package com.example.couponproject.exceptions;

public class CannotAddCouponInSameTitleException extends Exception {

    public CannotAddCouponInSameTitleException(){
        super("this company already have coupon in this title...");
    }
}
