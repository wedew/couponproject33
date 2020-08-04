package com.example.couponproject.exceptions;

public class CustomerAlreadyExistsException extends Exception {

    public CustomerAlreadyExistsException(){
        super("this email already taken by another user...");
    }
}
