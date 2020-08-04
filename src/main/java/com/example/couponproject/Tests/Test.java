package com.example.couponproject.Tests;

import com.example.couponproject.beans.CategoryType;
import com.example.couponproject.beans.ClientType;
import com.example.couponproject.beans.Company;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.exceptions.*;
import com.example.couponproject.facade.AdminFacade;
import com.example.couponproject.facade.ClientFacade;
import com.example.couponproject.facade.CompanyFacade;
import com.example.couponproject.facade.CustomerFacade;
import com.example.couponproject.login.LoginManager;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.SQLException;
import java.util.Calendar;

@Component
public class Test {

    private LoginManager loginManager;

    public Test(LoginManager loginManager) {
        this.loginManager = loginManager;
    }


    public void testAll() throws emailOrAnPasswordAreIncorrectException, SQLException {
        ClientFacade adminFacade = loginManager.login("admin@admin.com", "admin", ClientType.Administrator);
        if (adminFacade instanceof AdminFacade) {
            System.out.println("Admin Facade:");
            // ---------- Add Company -----------
//            try {
//                ((AdminFacade) adminFacade).addCompany(new Company("transavia3", "trans3@gmail.com", "123456"));
//            } catch (CompanyAlreadyExistsException e) {
//                System.out.println(e.getMessage());
//            }

            // ---------- Update Company -----------
//            try {
//                Company company = ((AdminFacade) adminFacade).getOneCompany(5);
//                company.setName("test");
//                ((AdminFacade) adminFacade).updateCompany(company);
//            } catch (CompanyDoesNotExistsException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Delete Company -----------
//            try {
//                ((AdminFacade) adminFacade).deleteCompany(4);
//            } catch (CompanyDoesNotExistsException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Get All Companies -----------
//            for (Company companies:((AdminFacade) adminFacade).getAllCompanies()
//            ) {
//                System.out.println(companies);
//            }

            // ----------- Get One Company -----------
//            try {
//                System.out.println(((AdminFacade) adminFacade).getOneCompany(1));
//            } catch (CompanyDoesNotExistsException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Add New Customer -----------
//            try {
//                ((AdminFacade) adminFacade).addCustomer(new Customer("test", "supertest", "super@gmail.com", "123465"));
//            } catch (CustomerAlreadyExistsException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Add New Customer -----------
//            try {
//                Customer customer =  ((AdminFacade) adminFacade).getOneCustomer(44);
//                customer.setEmail("itaydiaz@gmail.com");
//                ((AdminFacade) adminFacade).updateCustomer(customer);
//            } catch (CustomerDoesNotExistsException | CannotChangeIdOfCustomerException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Delete Customer -----------
//            try {
//                ((AdminFacade) adminFacade).deleteCustomer(3);
//            } catch (CustomerDoesNotExistsException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Get All Customers -----------

//            for (Customer customers: ((AdminFacade) adminFacade).getAllCustomers()
//                 ) {
//                System.out.println(customers);
//            }

            // ----------- Get One Customer -----------
//            try {
//                System.out.println(((AdminFacade) adminFacade).getOneCustomer(4));
//            } catch (CustomerDoesNotExistsException e) {
//                System.out.println(e.getMessage());
//            }


        }


        ClientFacade companyFacade = loginManager.login("agadir@gmail.com", "123456", ClientType.Company);
        if (companyFacade instanceof CompanyFacade) {
            System.out.println("Company Facade:");

            // ----------- Add Coupon -----------

//            Calendar calStart = Calendar.getInstance();
//            calStart.set(2020, Calendar.MAY, 13);
//            Date dateStart = new Date(calStart.getTimeInMillis());
//            Calendar calEnd = Calendar.getInstance();
//            calEnd.set(2022, Calendar.JULY, 01);
//            Date dateEnd = new Date(calEnd.getTimeInMillis());
//
//            try {
//                ((CompanyFacade) companyFacade).addCoupon(new Coupon(((CompanyFacade) companyFacade).getCompanyDetails(),
//                        CategoryType.Food,"first seats","Contrary to popular belief, Lorem Ipsum is not simply random text" +
//                        " It has roots in a piece of classical Latin literature from 45 BC," +
//                        "making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia," +
//                        " looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage," +
//                        "and going through the cites of the word in classical literature, discovered the undoubtable source.",
//                        dateStart ,dateEnd,450,210,"link"));
//            } catch (CannotAddCouponInSameTitleException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Update Coupon -----------
//            try {
//                Calendar calEnd = Calendar.getInstance();
//            calEnd.set(2022, Calendar.FEBRUARY, 14);
//            Date dateEnd = new Date(calEnd.getTimeInMillis());
//                for (Coupon compCoupon:((CompanyFacade) companyFacade).getAllCoupons()
//                     ) {
//                    if(compCoupon.getId() == 9){
//                        compCoupon.setEndDate(dateEnd);
//                        compCoupon.setDescription("biggest burger in town!");
//                        ((CompanyFacade) companyFacade).updateCoupon(compCoupon);
//                        break;
//                    }
//                }
//            } catch (CannotChangeCompanyIdOrAnCouponId e) {
//                System.out.println(e.getMessage());
//            }


            // ----------- Delete Coupon -----------
            ((CompanyFacade) companyFacade).deleteCoupon(8);

            // ----------- Get All Coupons -----------
//            for (Coupon compCoupon:((CompanyFacade) companyFacade).getAllCoupons()
//                 ) {
//                System.out.println(compCoupon);
//            }

            // ----------- Get All Coupons By Category -----------
//            for (Coupon compCoupon:((CompanyFacade) companyFacade).getAllCoupons(CategoryType.Food)
//                 ) {
//                System.out.println(compCoupon);
//            }

            // ----------- Get All Coupons By Max Price! -----------
//            for (Coupon compCoupon:((CompanyFacade) companyFacade).getAllCoupons(35)
//            ) {
//                System.out.println(compCoupon);
//            }
            // ----------- Get Company Details -----------
//            System.out.println(((CompanyFacade) companyFacade).getCompanyDetails());

        }


        ClientFacade customerFacade = loginManager.login("itaydiaz@gmail.com", "123456", ClientType.Customer);
        if (customerFacade instanceof CustomerFacade) {
            System.out.println("Customer Facade:");

            // ----------- purchase Coupon -----------
//            try {
//                Coupon c = ((CustomerFacade) customerFacade).getOneCoupon(11);
//                ((CustomerFacade) customerFacade).purchaseCoupon(c);
//            } catch (emailOrAnPasswordAreIncorrectException | AmountOfCouponIsZeroException | CouponExpiredException | CustomerAlreadyBoughtThatCouponException e) {
//                System.out.println(e.getMessage());
//            }

            // ----------- Get Customer Coupons -----------
//            for (Coupon customerCoupon: ((CustomerFacade) customerFacade).getCustomerCoupons()
//                 ) {
//                System.out.println(customerCoupon);
//            }
            // ----------- Get Customer All Coupons By Category -----------
//            for (Coupon customerCoupon: ((CustomerFacade) customerFacade).getCustomerCoupons(CategoryType.Food)
//                 ) {
//                System.out.println(customerCoupon);
//            }

            // ----------- Get Customer All Coupons By Max Price! -----------
//            for (Coupon customerCoupon: ((CustomerFacade) customerFacade).getCustomerCoupons(33)
//                 ) {
//                System.out.println(customerCoupon);
//            }

            // ----------- Get Customer Details -----------
//            System.out.println(((CustomerFacade) customerFacade).getCustomerDetails());


        }
    }

}
