package com.example.couponproject.exceptions;

public class CouponDoesNotExistsException extends Exception {

    public CouponDoesNotExistsException(){
        super("coupon by that id does not exists");
    }
}
