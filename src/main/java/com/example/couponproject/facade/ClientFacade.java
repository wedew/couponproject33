package com.example.couponproject.facade;

import com.example.couponproject.db.companyRepository;
import com.example.couponproject.db.couponRepository;
import com.example.couponproject.db.customerRepository;
import org.springframework.stereotype.Service;

@Service
public abstract class ClientFacade {

    protected companyRepository compDB;
    protected couponRepository coupDB;
    protected customerRepository custDB;

    public ClientFacade(companyRepository compDB, couponRepository coupDB, customerRepository custDB) {
        this.compDB = compDB;
        this.coupDB = coupDB;
        this.custDB = custDB;
    }



    public abstract boolean login(String email, String password);



}
