package com.example.couponproject.exceptions;

public class CustomerDoesNotExistsException extends Exception{

    public CustomerDoesNotExistsException(){
        super("this customer does not exists..");
    }
}
