package com.example.couponproject.login;

import com.example.couponproject.beans.ClientType;
import com.example.couponproject.exceptions.emailOrAnPasswordAreIncorrectException;
import com.example.couponproject.facade.AdminFacade;
import com.example.couponproject.facade.ClientFacade;
import com.example.couponproject.facade.CompanyFacade;
import com.example.couponproject.facade.CustomerFacade;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;

import java.sql.SQLException;

@Component

public class LoginManager {


    private ConfigurableApplicationContext ctx;

    public LoginManager(ConfigurableApplicationContext ctx) {
        this.ctx = ctx;
    }


    public ClientFacade login(String email, String password, ClientType clientType) throws emailOrAnPasswordAreIncorrectException, SQLException {

        switch (clientType){
            case Administrator:
                AdminFacade admin = ctx.getBean(AdminFacade.class);
                if(admin.login(email, password))
                    return admin;
                break;

            case Company:
                CompanyFacade company = ctx.getBean(CompanyFacade.class);
                if(company.login(email, password))
                    return company;
                break;

            case Customer:
                CustomerFacade customer = ctx.getBean(CustomerFacade.class);
                if(customer.login(email, password))
                    return customer;
                break;

            default:
                throw new SQLException();
        }
        throw new emailOrAnPasswordAreIncorrectException();

    }


}
