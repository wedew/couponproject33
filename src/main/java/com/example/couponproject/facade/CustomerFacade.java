package com.example.couponproject.facade;

import com.example.couponproject.beans.CategoryType;
import com.example.couponproject.beans.Coupon;
import com.example.couponproject.beans.Customer;
import com.example.couponproject.db.companyRepository;
import com.example.couponproject.db.couponRepository;
import com.example.couponproject.db.customerRepository;
import com.example.couponproject.exceptions.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Scope("prototype")
public class CustomerFacade extends ClientFacade {
    private long customerId;


    public CustomerFacade(companyRepository compDB, couponRepository coupDB, customerRepository custDB) {
        super(compDB, coupDB, custDB);

    }


    public long getCustomerId() {
        return customerId;
    }



    @Override
    public boolean login(String email, String password) {
        Object obj = custDB.findByEmailAndPassword(email, password);
        if(obj instanceof Customer){
            customerId = ((Customer) obj).getId();
            return true;
        }else{
            return false;
        }
    }


    public void purchaseCoupon(Coupon coupon) throws emailOrAnPasswordAreIncorrectException, CustomerAlreadyBoughtThatCouponException,
            AmountOfCouponIsZeroException, CouponExpiredException {
        Customer customer = custDB.findById(getCustomerId()).orElseThrow(emailOrAnPasswordAreIncorrectException::new);
        Calendar cal = Calendar.getInstance();
        Date date = new Date(cal.getTimeInMillis());
        for (Coupon customerCoupon: customer.getCoupons()) {
            if(customerCoupon.getId() == coupon.getId()){
                throw new CustomerAlreadyBoughtThatCouponException();
            }
        }

        if(coupon.getAmount() == 0){
            throw new AmountOfCouponIsZeroException();
        }

        if(date.after(coupon.getEndDate())){
            throw new CouponExpiredException();
        }
        //
        coupon.setCompany(compDB.getByCoupons(coupon));
        //

        coupon.setAmount(coupon.getAmount()-1);
        coupDB.save(coupon);
        customer.getCoupons().add(coupon);
        custDB.save(customer);

    }

    public Coupon getOneCoupon(long couponId) {
        return coupDB.findById(couponId).orElse(null);
    }

    public Set<Coupon> getCustomerCoupons() {
        Customer customer = custDB.findById(getCustomerId()).orElse(null);
        return customer.getCoupons();

    }

    public Set<Coupon> getCustomerCoupons(CategoryType categoryType) {
        Customer customer = custDB.findById(getCustomerId()).orElse(null);
        HashSet<Coupon> SameCategoryCoupons = new HashSet<Coupon>();
        for (Coupon CustomerCoupon: customer.getCoupons()
        ) {
            if(CustomerCoupon.getCategory().equals(categoryType)){
                SameCategoryCoupons.add(CustomerCoupon);
            }
        }
        return SameCategoryCoupons;
    }

    public Set<Coupon> getCustomerCoupons(double maxPrice)  {
        Customer customer = custDB.findById(getCustomerId()).orElse(null);
        HashSet<Coupon> untilPriceCoupons = new HashSet<Coupon>();
        for (Coupon CustomerCoupon: customer.getCoupons()
        ) {
            if(CustomerCoupon.getPrice() <= maxPrice){
                untilPriceCoupons.add(CustomerCoupon);
            }
        }
        return untilPriceCoupons;
    }

    public Customer getCustomerDetails()  {
        return custDB.findById(getCustomerId()).orElse(null);
    }

    public List<Coupon> getAllCoupons(){
        return coupDB.findAll();
    }

    public String companyNameByCouponId(long couponId) throws CouponDoesNotExistsException {
        Coupon c = coupDB.findById(couponId).orElseThrow(CouponDoesNotExistsException::new);

        return compDB.getByCoupons(c).getName();
    }
    
}
