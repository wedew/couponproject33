package com.example.couponproject.exceptions;

public class CustomerAlreadyBoughtThatCouponException extends Exception {

    public CustomerAlreadyBoughtThatCouponException(){
        super("this customer already bought that coupon..");
    }
}
