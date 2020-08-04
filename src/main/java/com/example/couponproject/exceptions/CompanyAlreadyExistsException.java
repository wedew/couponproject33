package com.example.couponproject.exceptions;

public class CompanyAlreadyExistsException extends Exception {

    public CompanyAlreadyExistsException(){
        super("the comapny already exists!");
    }

}
