package com.example.couponproject.exceptions;

public class CannotChangeIdOfCustomerException extends Exception {

    public CannotChangeIdOfCustomerException(){
        super("cannot change id of a customer or you entered wrong id..");
    }
}
