package com.example.couponproject.exceptions;

public class CompanyDoesNotExistsException extends Exception {

    public CompanyDoesNotExistsException(){
        super("this company does not exists or you try to change its name or id..");
    }
}
