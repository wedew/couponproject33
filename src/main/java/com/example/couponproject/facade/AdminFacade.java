package com.example.couponproject.facade;

import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.beans.Customer;
import com.example.couponproject.db.companyRepository;
import com.example.couponproject.db.couponRepository;
import com.example.couponproject.db.customerRepository;
import com.example.couponproject.exceptions.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
public class AdminFacade extends ClientFacade {

    public AdminFacade(companyRepository compDB, couponRepository coupDB, customerRepository custDB) {
        super(compDB, coupDB, custDB);
    }

    @Override
    public boolean login(String email, String password) {
        if(email.equalsIgnoreCase("admin@admin.com") &&
                password.equalsIgnoreCase("admin")) {
            return true;
        }else {
            return false;
        }
    }

    public void addCompany(Company company) throws CompanyAlreadyExistsException {

        for (Company comp:compDB.findAll()) {
            if(company.getName().equalsIgnoreCase(comp.getName()) || company.getEmail().equalsIgnoreCase(comp.getEmail())){
                throw new CompanyAlreadyExistsException();
            }
        }
        compDB.save(company);


    }

    public void updateCompany(Company company) throws CompanyDoesNotExistsException {
        boolean companyCheacker = false;
        for (Company comp: compDB.findAll()
        ) {
            if(comp.getId() == company.getId() && comp.getName().equalsIgnoreCase(company.getName())){
                compDB.save(company);
                companyCheacker = true;
                break;
            }
        }
        if(companyCheacker == false){
            throw new CompanyDoesNotExistsException();
        }

    }


    public void deleteCompany(long companyId) throws CompanyDoesNotExistsException {
        Company company = compDB.findById(companyId).orElseThrow(CompanyDoesNotExistsException::new);
        for (Coupon comp:company.getCoupons()
        ) {
            coupDB.deletePurcheseById(comp.getId());
        }
//        company.getCoupons().clear();
//        updateCompany(company);
        compDB.deleteById(companyId);
    }

    public List<Company> getAllCompanies(){
        return compDB.findAll();
    }


    public Company getOneCompany(long companyId) throws CompanyDoesNotExistsException {
        return compDB.findById(companyId).orElseThrow(CompanyDoesNotExistsException::new);
    }

    public void addCustomer(Customer customer) throws CustomerAlreadyExistsException {

        for (Customer cust: custDB.findAll()
        ) {
            if(customer.getEmail().equalsIgnoreCase(cust.getEmail())){
                throw new CustomerAlreadyExistsException();
            }
        }
        custDB.save(customer);
    }

    public void updateCustomer(Customer customer) throws CannotChangeIdOfCustomerException {
        boolean customerCheaker = false;
        for (Customer customers:custDB.findAll()
        ) {
            if(customers.getId() == customer.getId()){
                custDB.save(customer);
                customerCheaker = true;
                break;
            }
        }
        if(customerCheaker == false){
            throw new CannotChangeIdOfCustomerException();
        }


    }

    public void deleteCustomer(Long customerId) throws CustomerDoesNotExistsException {
        Customer c = custDB.findById(customerId).orElseThrow(CustomerDoesNotExistsException::new);
        c.getCoupons().clear();
        custDB.save(c);
        custDB.deleteById(customerId);

    }

    public List<Customer> getAllCustomers(){
        return custDB.findAll();
    }

    public Customer getOneCustomer(Long customerId) throws CustomerDoesNotExistsException {
        return custDB.findById(customerId).orElseThrow(CustomerDoesNotExistsException::new);
    }
}
